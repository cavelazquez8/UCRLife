import style from "../styles/conversation.module.css";
import { User } from "../models/user";
import {useEffect, useState} from "react";
import axios from "axios";

interface ConversationPageProps {
    loggedInUser: User | null,
    conversation: any
}

const ConversationPage = ({conversation, loggedInUser}: ConversationPageProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        let isMounted = true;
        async function getUser() {
            const hasMessagedUser = conversation.users.find( (u) => u !== loggedInUser._id);
            const res = await axios(`/api/user/get?userId=${hasMessagedUser}`);
            if (isMounted) {
                setUser(res.data);
              }
        };
        getUser();
        return () => {
            isMounted = false; // cleanup function to prevent state updates after unmount
          };
    },[conversation.users, loggedInUser._id]);

    return(
        <div className = {style.conversation}>
            
            <span className={style.userName}> {user?.username} </span>
        </div>
    )
}

export default ConversationPage;