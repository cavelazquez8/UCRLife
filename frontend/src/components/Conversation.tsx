import style from "../styles/conversation.module.css";
import { User } from "../models/user";
import {useEffect, useState} from "react";
import axios from "axios";

interface ConversationPageProps {
    loggedInUser: User | null,
    conversation: any
}

const ConversationPage = ({conversation, loggedInUser}: ConversationPageProps) => {
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const hasMessagedUser = conversation.users.find( (u) => u !== loggedInUser._id);

        const getUser = async ()=>{
            const res = await axios('/api/user/get?userId=' + hasMessagedUser);
            setUser(res.data);
        };
        getUser()
    },[loggedInUser, conversation]);

    return(
        <div className = {style.conversation}>
            <span className={style.userName}> {user.username} </span>
        </div>
    )
}

export default ConversationPage;