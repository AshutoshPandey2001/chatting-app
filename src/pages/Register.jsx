import React, { useState } from 'react'
import '../style.scss'
import Add from '../img/addAvatar.png'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const [err, setErr] = useState(false)


    const handleSumbit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                    }
                });
            });
        } catch (error) {
            console.log('error', error);
            setErr(true)
        }
        console.log('values', displayName, email, password);


    }

    return (
        <div className='formContainer'>
            <div className='fromWrapper'>
                <span className='logo'>Chatting App</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSumbit}>
                    <input type='text' placeholder='displayname' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input style={{ display: "none" }} type='file' id='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something Went Worng</span>}
                </form>
                <p>You do have an account ? Login</p>
            </div>
        </div>
    )
}

export default Register