import { ChatItem } from "./chat-item";

export function ChatContent() {
  return (
    <div className='de-chat-content'>
      <ChatItem name='Corey Diaz' avatar='/assets/images/users/user-1.png' time='1m' conversions={[
        'Hey team, 😎',
        'Avoid combat, watch the jungle',
        'Focus on the tower 🐝'
      ]} />
      <ChatItem name='Terry Hodges' avatar='/assets/images/users/user-2.png' time='1m' conversions={[
        'Rush trying so hard to carry monkeys'
      ]} />
      <ChatItem name='Kevin Carpenter' avatar='/assets/images/users/user-3.png' time='1m' conversions={[
        'Great!'
      ]} />
      <ChatItem name='Corey Diaz' avatar='/assets/images/users/user-1.png' time='1m' conversions={[
        'Focus on the tower 🐝'
      ]} />
    </div>
  )
}
