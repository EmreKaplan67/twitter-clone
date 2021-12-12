import React, { useState, useEffect } from 'react'
import "./Feed.css"
import TweetBox from './TweetBox';
import Post from './Post';
import db from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import FlipMove from 'react-flip-move';

function Feed() {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     db.collection('posts').onSnapshot(snapshot => {
    //         setPosts(snapshot.docs.map(doc => doc.data()))
    //     })
    // }, [])  OLD METHOD

    useEffect(() => {
        const colRef = collection(db, 'posts')
        let q = query(colRef, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <div className='feed'>
            {/* Header */}
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            {/* TweetBox */}
            <TweetBox />

            <FlipMove>
                {posts.map(post => (
                    <Post
                        key={post.text}
                        displayName={post.displayName}
                        username={post.username}
                        verified={post.verified}
                        text={post.text}
                        avatar={post.avatar}
                        image={post.image}
                    />
                ))}
            </FlipMove>

        </div>
    )
}

export default Feed
