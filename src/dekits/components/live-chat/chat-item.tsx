import { ChatReport } from "./chat-report";

export function ChatItem(props) {
  return (
    <div className='de-chat-item'>
      <div className='de-chat-user'>
        <div className='de-chat-user-avatar'>
          <img src={props.avatar} alt={props.name} />
        </div>
        <div className='de-chat-user-name'>
          {props.name}
          <span>{props.time}</span>
        </div>
      </div>
      <div className='de-chat-conversions'>
        {
          props.conversions.map((c, idx) => {
            return <div key={idx} className='de-chat-conversion' dangerouslySetInnerHTML={{ __html: c }}></div>
          })
        }
      </div>
      <ChatReport />
    </div>
  )
}
