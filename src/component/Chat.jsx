import './chat.css'
import { Avatar } from '@material-ui/core'
import { MicOutlined, SearchOutlined, InsertEmoticon } from '@material-ui/icons'
import { AttachFile } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase'
import { useStateValue } from '../StateProvider'


export default function Chat() {
    
    const [{user}, dispatch] = useStateValue()
    
    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)

    const {roomId} = useParams()



    const handleType = (e)=> {
        console.log(e.target.value)
        if(!input){
            setIsTyping(false)
        }else{
            setIsTyping(false)
        }
    }

    const handleInputChange = (e)=> {
        setInput(e.target.value)
        setIsTyping(true)

        if(e.target.value === ''){
            setIsTyping(false)
        }

       
    }
    
    const handleSubmit = (e)=> {
        e.preventDefault()
        console.log(input)
        setInput('')
        setIsTyping(false)

        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=> (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (setMessages(snapshot.docs.map(doc => doc.data()))))
        }
    }, [roomId])

    return (
        <div className='chat'>
           <div className="chat_header">
               <Avatar src='https://avatars.dicebear.com/api/human/jfkdj.svg' />
               <div className="chat_header_info">
                   <h2>{roomName}</h2>
                   <p>Monday, 2:45pm</p>
                   {isTyping && <span className='isTyping'>{user.displayName}</span>}
               </div>
               <div className="chat_header_right">
                   <SearchOutlined />
                   <AttachFile />
               </div>
           </div>
           <div className="chat_body">
               {
                   messages.map(message=> (
                    <p className={`chat_message ${user.displayName === message.name && 'chat_reciever'}`} >
                    <span className='chat_user'>{message.name}</span>
                    {message.message}
                    <span className="chat_time_stamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                   ))
               }
              
           </div>
           <div className="chat_footer">
               <InsertEmoticon />
               <form>
                   <input type="text" onInput={handleType} value={input} placeholder='Type a message here...' 
                   onChange={handleInputChange} 
                       />
                   <button onClick={handleSubmit} type='submit'>send a message</button>
               </form>
               <MicOutlined />
           </div>
        </div>
    )
}
