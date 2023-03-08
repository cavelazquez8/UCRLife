import style from "../styles/messages.module.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { User } from "../models/user";
import {useEffect, useRef, useState} from "react"
import axios from "axios";
import NavBar from "../components/NavBar";
import {io} from "socket.io-client"

interface MessagePageProps {
    userLoggedIn: User | null,
}

const MessagePage = ({ userLoggedIn }: MessagePageProps) => {
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [conversationMessages, setMessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    //const socket = useRef(io("ws://localhost:8900"));
    const scrollRef = useRef();

    /*useEffect(()=>{
        socket.current.emit("addUser", userLoggedIn.username);
    },[userLoggedIn]);*/

    useEffect(()=>{
        const getConversations = async ()=>{
            /*try {
                const res = await axios.get('/api/conversation/' + userLoggedIn?._id);
                console.log("the conversation is:");
                console.log(res);
                setConversations(res.data);
              } catch (err) {
                console.log(err);
              }*/
              axios.get('/api/conversation/' + userLoggedIn?._id).then(response => {
                console.log("the conversation is:");
                console.log(response);
                setConversations(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        getConversations();
    },[userLoggedIn]);

    /*useEffect(()=>{
        const getMessages = async ()=>{
            const res = await axios.get("/messages/"+currentConversation._id);
            setMessages(res.data);
        };
        getMessages();
    }, [currentConversation]);*/

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const message = {
            sender: userLoggedIn.username,
            text: newMessage,
            conversationId: currentConversation._id
        }
        const recieverName = currentConversation.users.find(user=> user !== userLoggedIn.username);
        /*socket.current.emit("sendMessage", {
            sender: userLoggedIn.username,
            recieverName,
            text:newMessage
        })*/
        try{
            const res = await axios.post("/message", message);
            setMessages([...conversationMessages, res.data])
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        //scrollRef.current.scrollIntoView({behavior: "smooth"});
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
                            <Message xmessage={(m)} myMessage={m.sender === userLoggedIn.username}/>
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

export default MessagePage;