import { createContext, useContext, useState, useEffect } from "react";
import { message } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION, MESSAGE_SUBSCRIPTION } from "../../graphql";

const LOCALSTORAGE_KEY = 'save-me';
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    friend: "",
    signedIn: false,
    messages: [],
    startChat: () => { },
    sendMessage: () => { },
});

const ChatProvider = (props) => {
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [friend, setFriend] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    const { data, loading, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: friend,
        },
    });

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    useEffect(() => {
        try {
            console.log('subscribeToMore', me, friend)
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: friend },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    if (newMessage.sender === friend) setMessages([...messages, newMessage]);
                    return {
                        chatbox: {
                            name: [me, friend].sort().join('_'),
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                },
            });
        } catch (e) { }
    }, [subscribeToMore, friend]);

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    useEffect(() => {
        console.log('data changed')
        if (data) {
            console.log(data)
            setMessages(data.chatbox.messages)
        }
    }, [data]);

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
                case "success":
                    message.success(content)
                    break
                case "error":
                default:
                    message.error(content)
                    break
            }
        }
    };

    return (
        <ChatContext.Provider
            value={{
                status,
                me,
                friend,
                signedIn,
                messages,
                setMe,
                setFriend,
                setSignedIn,
                startChat,
                sendMessage,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };