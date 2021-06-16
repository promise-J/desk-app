import './sidebarchat.css'
import {Avatar } from '@material-ui/core'
import { useEffect, useState } from 'react'
import db from '../firebase'
import {Link } from 'react-router-dom'


export default function SidebarChat({ addNewChat, name, id }) {
    const [rimg, setRimg] = useState('')

    useEffect(()=>{
        setRimg(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt('Click to add a new Chat')
        if(roomName){
           db.collection('rooms').add({
               name: roomName
           })
        }
    }

    return (
        !addNewChat ? (
            <Link style={{color: 'inherit', textDecoration: 'none'}} to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${rimg}.svg`} />
            <div className="sidebarchat_info">
                <div className="sidebarchat_in_info">
                <h2>{name}</h2>
                <p>last message...</p>
                </div>
                <span>2:45pm</span>
            </div>
        </div>
            </Link>
        ) : (
            <div className="sidebarChat"  onClick={createChat}>
                <p style={{textAlign: 'center', alignSelf: 'center'}}>Add New Chat</p>
            </div>
        )
    )
}
