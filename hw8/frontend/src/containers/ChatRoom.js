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
    height: 40px;
    padding: 20px;
`;

const ChatRoom = () => {
  const { me, friend, messages, setFriend, startChat, sendMessage, displayStatus } = useChat();
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
    return chat.length === 0 ? (
      <p style={{ color: '#ccc' }}>No chat...</p>
    ) : (
      <ChatBoxWrapper>{
        chat.map(({ sender, body }, i) => (
          <Message isMe={sender === me} message={body} key={i} />
        ))}
        <FootRef ref={msgFooter} />
      </ChatBoxWrapper>
    )
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    setChatBoxes([...chatBoxes, { label: friend, children: [], key: friend }]);
    setMsgSent(true);
    setFriend(friend);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
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
      block: 'end'
    })
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent, messages]);

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
          onCreate={async ({ name }) => {
            setActiveKey(createChatBox(name));
            await startChat({
              variables: { name1: me, name2: name }
            });
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
          if (activeKey === '') {
            displayStatus({
              type: 'error',
              msg: 'Please add a chat box first.'
            });
            setMsg('');
            return;
          } else if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            });
            return;
          }
          displayStatus({
            type: 'success',
            msg: 'Message sent.'
          })
          sendMessage({
            variables: { name: me, to: friend, body: msg }
          });
          setMsg('');
          setMsgSent(true);
        }}
      ></Input.Search>
    </>
  )
}

export default ChatRoom;
