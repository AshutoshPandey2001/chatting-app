import React, { useContext, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", ">=", username),
            where("displayName", "<", username + "\uf8ff")
        );

        try {
            const querySnapshot = await getDocs(q);
            const temp_data = []
            querySnapshot.forEach((doc) => {
                if (doc.data().uid !== currentUser.uid) {
                    temp_data.push(doc.data())
                }
            });
            console.log('temp_data', temp_data);
            setUsers(temp_data);

        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };
    // const handleSelect = async (user) => {
    //     const res = db
    //         .collection('chats')
    //         .doc(currentUser.uid)
    //         .collection('messages')
    //         .doc(user.uid).get()

    //         if (!res.exists()) {
    //             const batch = db.batch();
    //             const toUserinfo = {
    //                 touid: user.uid,
    //                 todisplayName: user.displayName,
    //                 tophotoURL: user.photoURL,
    //                 date: serverTimestamp(),
    //             }
    //             const senderChatPath = db
    //                 .collection('chats')
    //                 .doc(currentUser.uid)
    //                 .collection('messages')
    //                 .doc(user.uid)
    //             // Update the path for the receiver
    //             const receiverChatPath = db
    //                 .collection('chats')
    //                 .doc(user.uid)
    //                 .collection('messages')
    //                 .doc(currentUser.uid);
    //             batch.set(senderChatPath, { ...toUserinfo, touid: user.uid })
    //             batch.set(receiverChatPath, { ...toUserinfo, touid: currentUser.uid });
    //             try {
    //                 await batch.commit();

    //                 setMessageList(previousMessages =>
    //                   GiftedChat.append(previousMessages, myMsg),
    //                 );

    //               } catch (error) {
    //                 console.error('Error sending message:', error);
    //               }
    //         }

    //     //check whether the group(chats in firestore) exists, if not create
    //     // const combinedId =
    //     //     currentUser.uid > user.uid
    //     //         ? currentUser.uid + user.uid
    //     //         : user.uid + currentUser.uid;
    //     // try {
    //     //     const res = await getDoc(doc(db, "chats", combinedId));

    //     //     if (!res.exists()) {
    //     //         //create a chat in chats collection
    //     //         await setDoc(doc(db, "chats", combinedId), { messages: [] });

    //     //         //create user chats
    //     //         await updateDoc(doc(db, "userChats", currentUser.uid), {
    //     //             [combinedId + ".userInfo"]: {
    //     //                 uid: user.uid,
    //     //                 displayName: user.displayName,
    //     //                 photoURL: user.photoURL,
    //     //             },
    //     //             [combinedId + ".date"]: serverTimestamp(),
    //     //         });

    //     //         await updateDoc(doc(db, "userChats", user.uid), {
    //     //             [combinedId + ".userInfo"]: {
    //     //                 uid: currentUser.uid,
    //     //                 displayName: currentUser.displayName,
    //     //                 photoURL: currentUser.photoURL,
    //     //             },
    //     //             [combinedId + ".date"]: serverTimestamp(),
    //     //         });
    //     //     }
    //     // } catch (err) { }

    //     // setUsers(null);
    //     // setUsername("")
    // };

    const handleSelect = async (user) => {
        try {
            const currentUserUid = currentUser.uid;
            const userUid = user.uid;
            const senderChatPath = db
                .collection('chats1')
                .doc(currentUserUid)
                .collection('messages')
                .doc(userUid);

            const receiverChatPath = db
                .collection('chats1')
                .doc(userUid)
                .collection('messages')
                .doc(currentUserUid);

            const [senderChatDoc, receiverChatDoc] = await Promise.all([
                senderChatPath.get(),
                receiverChatPath.get(),
            ]);

            if (!senderChatDoc.exists || !receiverChatDoc.exists) {
                const batch = db.batch();

                const toUserinfo = {
                    touid: undefined,
                    todisplayName: undefined,
                    tophotoURL: user.photoURL,
                    date: serverTimestamp(),
                };

                batch.set(senderChatPath, { ...toUserinfo, tophotoURL: user.photoURL, touid: userUid, todisplayName: user.displayName });
                batch.set(receiverChatPath, { ...toUserinfo, tophotoURL: currentUser.photoURL, touid: currentUserUid, todisplayName: currentUser.displayName });

                await batch.commit();

                // Handle any UI updates or additional logic here.
            }
        } catch (error) {
            console.error('Error handling selection:', error);
        }
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Find a user'
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username} />
            </div>

            {err && <span>User not found!</span>}
            {users && users.map((item, i) =>
            (
                <div className='userChat' onClick={() => handleSelect(item)} key={i}>
                    <img src={item.photoURL} alt="" />
                    <div className='userChatInfo'>
                        <span> {item.displayName}</span>
                    </div>
                </div>
            )
            )}

        </div>
    )
}

export default Search