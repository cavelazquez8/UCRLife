import style from "../styles/messages.module.css";
import Conversation from "./Conversation";
import Message from "./Message";
import { User } from "../models/user";
import {useEffect, useRef, useState} from "react"
import axios from "axios";
import {io} from "socket.io-client"

interface MessagerPageProps {
    userLoggedIn: User | null,
}

const Messenger = ({ userLoggedIn }: MessagerPageProps) => {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [conversationMessages, setMessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    //const socket = useRef(io("ws://localhost:8900"));
    const scrollRef = useRef<HTMLDivElement>(null);

    /*useEffect(()=>{
        socket.current.emit("addUser", userLoggedIn.username);
    },[userLoggedIn]);*/

    useEffect(()=>{
            axios.get('/api/conversation/' + userLoggedIn?._id).then(response => {
            setConversations(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    },[userLoggedIn?._id]);

    useEffect(()=>{
        const getMessages = async ()=>{
            const res = await axios.get('/api/message/' + currentConversation?._id);
            setMessages(res.data);
        };
        getMessages();
    }, [currentConversation]);

    console.log(conversationMessages);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const message = {
            conversationId: currentConversation._id,
            sender: userLoggedIn._id,
            text: newMessage,
        }
        const recieverName = currentConversation.users.find(user=> user !== userLoggedIn.username);
        /*socket.current.emit("sendMessage", {
            sender: userLoggedIn.username,
            recieverName,
            text:newMessage
        })*/
        try{
            const res = await axios.post('api/message/send', message);
            setMessages([...conversationMessages, res.data]);
            setnewMessage("");
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    },[conversationMessages])

    return (
        <>
        <div className= {style.messenger}>
            <div className={style.Menu}></div>
                <div className={style.MenuWrapper}>
                    <input placeholder="Search for people" className={style.MenuInput}/>
                    {conversations.map((c)=>(
                        <div onClick={()=>setCurrentConversation(c)}>
                            <Conversation conversation={c} loggedInUser={userLoggedIn}/> 
                        </div>
                    ))}
                </div>
            <div className={style.conversationSpace}></div>
                <div className={style.conversationSpaceWrapper}>
                    {
                        currentConversation ?
                    (<>
                    <div className={style.conversationHeader}></div>
                        {conversationMessages.map((m)=>(
                            <div ref = {scrollRef}>
                            <Message xmessage={(m)} myMessage={m.sender === userLoggedIn._id}/>
                            </div>
                        ))}
                    <div className={style.conversationFloor}>
                        <textarea className={style.messageInput} placeholder="Message" onChange={(e)=>setnewMessage(e.target.value)} value ={newMessage}></textarea>
                        <button className={style.sendButton} onClick={handleSubmit}>Send</button>
                        
                    </div></>): (<span className = "noConversation">Open a conversation</span>
                    )}
                </div>
        </div>
        </>
    )
}

export default Messenger;