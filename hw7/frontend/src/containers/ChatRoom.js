import { useEffect, useState, useRef } from 'react';
import { Tabs, Input, Tag } from 'antd';
import styled from 'styled-components';
import { useChat } from './hooks/useChat';
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, startChat, sendMessage, displayStatus } = useChat();
  const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
  const [activeKey, setActiveKey] = useState('');
  const [msg, setMsg] = useState(''); // text input body
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let newChatBoxes = [...chatBoxes];
    for (let i = 0; i < newChatBoxes.length; i++) {
      if (newChatBoxes[i].key === activeKey) {
        newChatBoxes[i].children = displayChat(messages);
        setChatBoxes(newChatBoxes);
        break;
      }
    }
  }, [messages]);

//   const msgRef = useRef(null);
  const msgFooter = useRef(null);

  const displayChat = (chat) => {
    console.log(chat.length === 0)
    return chat.length === 0 ? (
      <p style={{ color: '#ccc' }}>No chat...</p>
    ) : (
      <ChatBoxWrapper>{
          chat.map(({ name, body }, i) => (
              <Message isMe={name === me} message={body} key={i} />
          ))}
          <FootRef ref={msgFooter}/>
      </ChatBoxWrapper>
    )
  };

//   const renderChat = (chat) => ();

  const extractChat = (friend) => {
    return displayChat(
        messages.filter(({ name, body }) => ((name === friend) || (name === me)))
    )
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({key}) => key === friend )) {
        throw new Error(friend + "'s chat box has already opened.");
    }
    // const chat = extractChat(friend) // console.log(chat)
    setChatBoxes([...chatBoxes, { label: friend, children: [], key: friend }]);
    console.log('chatBoxes set')
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBoxes);

    return activeKey
        ? activeKey === targetKey
            ? index === 0
                ? ''
                : chatBoxes[index - 1].key
            : activeKey
        : '';
  };

  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
  })};

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  return (
    <>
    <Title name={me} />
    <>
    <ChatBoxesWrapper
        tabBarStyle={{ height: '36px' }}
        type={'editable-card'}
        activeKey={activeKey}
        onChange={(key) => {
            setActiveKey(key);
            // extractChat(key);
            startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
            if (action === 'add') setModalOpen(true);
            else if (action === 'remove') {
                setActiveKey(removeChatBox(targetKey, activeKey));
            }
        }}
        items={chatBoxes}
    />
    <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          startChat(me, name);
          setModalOpen(false);
        }}
        onCancel={() => {
            setModalOpen(false);
        }}
    />
    </>
    <Input.Search
        value={msg}
        onChange={e => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={msg => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            });
            return;
          } else if (activeKey === '') {
            displayStatus({
              type: 'error',
              msg: 'Please add a chat box first.'
            });
            setMsg('');
            return;
          }
          sendMessage(me, activeKey, msg);
          setMsg('');
          setMsgSent(true);
        }}
    ></Input.Search>
    </>
  )
}

export default ChatRoom;
