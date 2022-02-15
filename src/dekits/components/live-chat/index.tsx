import { useState } from "react";
import { ChatBox } from "./chat-box";
import { ChatContent } from "./chat-content";
import { ChatDisabled } from "./chat-disabled";

export function LiveChat() {
  const [hideChat, setHideChat] = useState(false);
  return (
    <div className='de-card de-live-chat'>
      <div className='de-card-header'>
        <div className='de-card-title'>live chat room</div>
      </div>
      <div className='de-card-body'>
        {
          hideChat ? <ChatDisabled /> :
            <>
              <ChatContent />
              <ChatBox onHideChat={() => setHideChat(true)} />
            </>
        }
      </div>
    </div>
  )
}
