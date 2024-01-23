import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { AuthContext } from "../context/AuthContext";


const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const query = db
            .collection('chats1')
            .doc(currentUser.uid)
            .collection('messages')
            .doc(data.chatId)
            .collection('chat')
            .orderBy('date', 'asc');
        const subscriber = query.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return { ...item.data() };
            });
            setMessages(allmessages)
        });
        return () => subscriber();
    }, [data.chatId]);
    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    //         doc.exists() && setMessages(doc.data().messages);
    //     });

    //     return () => {
    //         unSub();
    //     };
    // }, [data.chatId]);
    return (
        <div className="messages">
            {messages.map((m, i) => (
                <Message message={m} key={i} />
            ))}
        </div>
    )
}

export default Messages