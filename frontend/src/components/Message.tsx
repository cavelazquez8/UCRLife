import style from "../styles/messagesSent.module.css"; 
import { format } from "timeago.js";

interface MessagePageProps {
    xmessage: any,
    myMessage: any,
}

const Message = ({xmessage, myMessage}: MessagePageProps) =>{
    return (
        <div className={myMessage ? `${style.message} ${style.own}` : style.message}>
            <div className={style.messageTop}>
                <p className={style.messageText}> {xmessage.text} </p> 
            </div>
             <div className={style.messageBottom}>{format(xmessage.createdAt)} </div> 
        </div>

        

    )
}

export default Message;