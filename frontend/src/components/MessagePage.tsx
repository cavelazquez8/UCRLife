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
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io("ws://localhost:8900"));
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
        });
      }, []);

      useEffect(() => {
        arrivalMessage &&
          currentConversation?.users.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentConversation]);

    useEffect(()=>{
        socket.current.emit("addUser", userLoggedIn._id)
        socket.current.on("getUsers", users=>{
            console.log(users);
        })
    },[socket, userLoggedIn]);

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

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const message = {
            conversationId: currentConversation._id,
            sender: userLoggedIn._id,
            text: newMessage,
        }
        const recieverId = currentConversation.users.find(
            (user) => user !== userLoggedIn._id);

        socket.current.emit("sendMessage", {
            senderId: userLoggedIn._id,
            recieverId,
            text:newMessage,
        });

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
            <div className={style.Menu}> menu 
                <div className={style.MenuWrapper}>
                    <input placeholder="Conversations" className={style.MenuInput}/>
                    {conversations.map((c)=>(
                        <div onClick={()=>setCurrentConversation(c)}>
                            <Conversation conversation={c} loggedInUser={userLoggedIn}/> 
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.conversationSpace}>
                <div className={style.conversationSpaceWrapper}>
                    {
                        currentConversation ?
                    (<>
                    <div className={style.conversationHeader}>
                        {conversationMessages.map((m)=>(
                            <div ref = {scrollRef}>
                            <Message xmessage={(m)} myMessage={m.sender === userLoggedIn._id}/>
                            </div>
                        ))}
                    </div>
                    <div className={style.conversationFloor}>
                        <textarea className={style.messageInput} placeholder="Message" 
                            onChange={(e)=>setnewMessage(e.target.value)} value ={newMessage}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) handleSubmit(e);
                            }} ></textarea>

                        <button className={style.sendButton} onClick={handleSubmit}>Send</button>
                        
                    </div></>): (<span className = {style.noConversationText}>Open a conversation</span>
                    )}
                </div>
            </div>
            <div className={style.usersOnline}>
                <div className={style.usersOnlineWrapper}>
                </div>
            </div>
        </div>
        </>
    )
}

/* return (
        <div className={style.messenger}>
            <div className={style.Menu}>
                <div className={style.MenuWrapper}>
                <input placeholder="Search for people" className={style.MenuInput}/>
                <Conversation />
                </div>
            </div>
            <div className={style.conversationSpace}>
                <div className={style.conversationSpaceWrapper}>
                    <div className={style.conversationHeader}>
                    <Message myMessage = {true}/>
                    <Message myMessage = {false}/>
                    </div>
                    <div className={style.conversationFloor}>
                    <textarea className={style.messageInput} placeholder="Message" ></textarea>
                    <button className={style.sendButton}> send </button>
                    </div>
                </div>
            </div>
            <div className={style.usersOnline}>
                <div className={style.usersOnlineWrapper}>
                    online
                </div>
            </div>
        </div>
    ) */

export default Messenger;