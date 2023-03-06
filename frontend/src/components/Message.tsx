import style from "../styles/messagesSent.module.css"; 
import {User} from "../models/user";
import format from "timeago"

interface MessagePageProps {
    message:any,
    myMessage: any
}

const Message = ({xmessage, myMessage}) =>{
    return (
        <div className={myMessage ? style.messagemineMessage : style.message}>
            <div className={style.messageHeader}>
                <p className={style.messageText}>{xmessage.text}</p>
            </div>
            <div className={style.messageFloor}>{format(xmessage.createdAt)}</div>
        </div>

    )
}

export default Message;