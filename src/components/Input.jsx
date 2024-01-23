import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        console.log("handleSend called");

        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        try {
                            const currentUserUid = currentUser.uid;
                            const userUid = data.chatId;
                            const myMsg = {
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }
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



                            const batch = db.batch();

                            const toUserinfo = {
                                touid: undefined,
                                todisplayName: undefined,
                                lastMessage: text,
                                tophotoURL: undefined,
                                date: serverTimestamp(),
                            };

                            batch.set(senderChatPath.collection('chat'), myMsg);
                            batch.set(senderChatPath, { ...toUserinfo, touid: userUid, todisplayName: data.user.todisplayName, photoURL: data.user.tophotoURL });
                            batch.set(receiverChatPath.collection('chat'), myMsg);
                            batch.set(receiverChatPath, { ...toUserinfo, touid: currentUserUid, todisplayName: currentUser.displayName, photoURL: currentUser.photoURL });

                            await batch.commit();

                            // Handle any UI updates or additional logic here.
                        } catch (error) {
                            console.error('Error handling selection:', error);
                        }
                        // await updateDoc(doc(db, "chats", data.chatId), {
                        //     messages: arrayUnion({
                        //         id: uuid(),
                        //         text,
                        //         senderId: currentUser.uid,
                        //         date: Timestamp.now(),
                        //         img: downloadURL,
                        //     }),
                        // });
                    });
                }
            );
        } else {
            console.log('i am in else', currentUser.uid, 'data.chatId', data.chatId);
            try {
                const currentUserUid = currentUser.uid;
                const userUid = data.chatId;
                const myMsg = {
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }
                console.log('myMsg', myMsg);
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


                const batch = db.batch();

                const toUserinfo = {
                    touid: undefined,
                    todisplayName: undefined,
                    lastMessage: text,
                    tophotoURL: undefined,
                    date: serverTimestamp(),
                };

                batch.set(senderChatPath.collection('chat').doc(), myMsg);
                batch.set(senderChatPath, { ...toUserinfo, touid: userUid, todisplayName: data.user.todisplayName, tophotoURL: data.user.tophotoURL });
                batch.set(receiverChatPath.collection('chat').doc(), myMsg);
                batch.set(receiverChatPath, { ...toUserinfo, touid: currentUserUid, todisplayName: currentUser.displayName, tophotoURL: currentUser.photoURL });

                await batch.commit();

                // Handle any UI updates or additional logic here.

            } catch (error) {
                console.error('Error handling selection:', error);
            }
            // await updateDoc(doc(db, "chats", data.chatId), {
            //     messages: arrayUnion({
            //         id: uuid(),
            //         text,
            //         senderId: currentUser.uid,
            //         date: Timestamp.now(),
            //     }),
            // });
        }

        // await updateDoc(doc(db, "userChats", currentUser.uid), {
        //     [data.chatId + ".lastMessage"]: {
        //         text,
        //     },
        //     [data.chatId + ".date"]: serverTimestamp(),
        // });

        // await updateDoc(doc(db, "userChats", data.user.uid), {
        //     [data.chatId + ".lastMessage"]: {
        //         text,
        //     },
        //     [data.chatId + ".date"]: serverTimestamp(),
        // });

        setText("");
        setImg(null);
    };
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input