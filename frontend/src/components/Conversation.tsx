import style from "../styles/conversation.module.css";
import { User } from "../models/user";
import {useEffect, useState} from "react";
import axios from "axios";

interface ConversationPageProps {
    userLoggedIn: User,
    conversation: any
}

const ConversationPage = ({conversation,userLoggedIn}) => {
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const hasMessagedUser = conversation.user.find(u=>u !== userLoggedIn.username);
        const getUser = async ()=>{
            const res = await axios("/user" + hasMessagedUser);
            setUser(res.data);
        };
        getUser()
    },[userLoggedIn,conversation]);
    return(
        <div className = {style.conversation}>
            <span className={style.userName}> Bob Bob</span>
        </div>
    )
}

export default ConversationPage;