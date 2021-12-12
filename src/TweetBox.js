import React, { useState } from 'react';
import './TweetBox.css';
import {Avatar, Button} from '@mui/material';
import db from './firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState('');
    const [tweetImage, setTweetImage] = useState('');

    const colRef = collection(db, 'posts');

    const sendTweet = (e) => {
        e.preventDefault();
        if (tweetMessage !== "" ) {
            addDoc(colRef, {
                displayName: 'Michael Scott',
                username: 'littlekidlover',
                verified: true,
                text: tweetMessage,
                image: tweetImage,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqT5DZHFpB8bee8OvAFEMdBmS3c19b1pVw&usqp=CAU',
                createdAt: serverTimestamp()
            })

            setTweetImage("");
            setTweetMessage("");
        }

    }

    return (
        <div className='tweetBox'>
            <form>
                <div className='tweetBox__input'>
                <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pqT5DZHFpB8bee8OvAFEMdBmS3c19b1pVw&usqp=CAU'></Avatar>
                <input 
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage} 
                placeholder="What's happening?" 
                type="text"
                />
                </div>
                <input 
                onChange={(e) => setTweetImage(e.target.value)}
                value={tweetImage}
                className='tweetBox__inputImage' 
                placeholder="optional: Enter image URL" 
                type="text" />
                <Button onClick={sendTweet} type='submit' className = 'tweetBox__tweetButton'>Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox
