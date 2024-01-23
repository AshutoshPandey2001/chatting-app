import React, { useState } from 'react'
import '../style.scss'
import Add from '../img/addAvatar.png'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            // Create a new user in Firebase Authentication
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // Generate a unique filename for the uploaded profile picture
            const date = new Date().getTime();
            const fileName = `${displayName}_${date}_${file.name}`;

            // Reference to the file in Firebase Storage
            const storageRef = ref(storage, `profilePictures/${fileName}`);

            // Upload the profile picture to Firebase Storage
            await uploadBytesResumable(storageRef, file);

            // Get the download URL of the uploaded profile picture
            const downloadURL = await getDownloadURL(storageRef);

            // Update the user's profile with the display name and photoURL
            await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
            });

            // Create a user document in Firestore
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
            });

            // Create an empty user chats document in Firestore (if needed)
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoading(false);

            navigate("/");

            // All operations were successful
            console.log('Registration successful');

        } catch (error) {
            setLoading(false);

            console.error('Error during registration:', error);
            // Handle the error or set an error state
            setErr(true);
        }
    };


    return (
        <div className='formContainer'>
            <div className='fromWrapper'>
                <span className='logo'>Chatting App</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='displayname' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input style={{ display: "none" }} type='file' id='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt='' />
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/register">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register