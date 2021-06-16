import './sidebar.css'
import SidebarChat from '../component/SidebarChat'
import {Avatar, IconButton} from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import db from '../firebase'
import { useStateValue } from '../StateProvider'

export default function SideBar() {
    const [rimg, setRimg] = useState('')
    const [rooms, setRooms] = useState([])

    const [{user}, dispatch] = useStateValue()
    

    useEffect(()=>{
       setRimg(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(()=>{
       const dbCall = db.collection('rooms').onSnapshot(snapshot=> (
           setRooms(snapshot.docs.map(doc => 
               ({
                   id: doc.id,
                   data: doc.data()
               })
           ))
       ))

       return ()=> {
          dbCall()
       }
    },[])
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL} />
                <div className='sidebar_headerRight'>
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                    <ChatIcon />
                    </IconButton>

                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
                   <SearchOutlined />
                   <input placeholder='Start or search new chat'/>
            </div>
            <div className='sidebar_chat'>
               <SidebarChat addNewChat/>
               {
                   rooms.map(room=>(
                       <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                   ))
               }
               {/* <SidebarChat />
               <SidebarChat />
               <SidebarChat /> */}
            </div>
        </div>
    )
}
