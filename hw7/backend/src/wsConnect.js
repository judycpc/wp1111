import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox";

const makeName = (name, to) => { return [name, to].sort().join('_'); };

const validateUser = async (name) => {
    const existing = await UserModel.findOne({ name });

    if (existing) {
        return String(existing._id);
    }
    const newUser = await new UserModel({ name }).save();
    return String(newUser._id);
};

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      box = await new ChatBoxModel({ name, users: participants }).save();
    
    await participants.map(async (pid) => {
        let user = await UserModel.findOne({_id: pid});
        const bid = String(box._id);
        if (!user.chatBoxes.includes(bid)) {
            let newChatBoxes = [...user.chatBoxes, bid];
            console.log(newChatBoxes)
            user.chatBoxes = newChatBoxes;
            await user.save();
        }
    });

    return box.populate(["users", {path: 'messages', populate: 'sender' }]);
};

const sendData = (data, ws) => { ws.send(JSON.stringify(data)); };

const sendStatus = (payload, ws) => { sendData(["status", payload], ws); };

const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
      sendData(data, client);
      sendStatus(status, client);
    });
};

const chatBoxes = {};

export default {
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString;
            const { type, payload } = JSON.parse(data);
            console.log('type:', type);
            console.log('payload:', payload);
            switch (type) {
                case 'CHAT': {
                    const { name, to } = payload;
                    const chatBoxName = makeName(name, to);
                    ws.box = chatBoxName;

                    const nameId = await validateUser(name);
                    const toId = await validateUser(to);

                    const box = await validateChatBox(chatBoxName, [nameId, toId]);
                    let messages = box.messages.map(m => {
                        return {name: m.sender.name, body: m.body}
                    })

                    sendData({ type: 'CHAT', payload: messages }, ws);

                    // // save payload to db
                    // const message = new Message({ name, body });
                    // try {
                    //     await message.save();
                    // } catch (e) {
                    //     throw new Error('Message DB save error: ' + e);
                    // }
                    // // response to client
                    // broadcastMessage(
                    //     wss,
                    //     ['output', [payload]],
                    //     {
                    //         type: 'success',
                    //         msg: 'Message sent.'
                    //     }
                    // )
                    break;
                }
                case 'MESSAGE': {
                    const { name, to, body } = payload;
                    const chatBoxName = makeName(name, to);

                    let box = await ChatBoxModel.findOne({ chatBoxName });
                    let sender = await UserModel.findOne({ name });

                    const message = await new MessageModel({ chatBox: String(box._id), sender: String(sender._id), body }).save();

                    let newMessages = [...box.messages, String(message._id)]
                    box.messages = newMessages;
                    await box.save();

                    console.log(await box.populate('messages'))
                    // sendData({ type: 'MESSAGE', payload:  }, ws);

                    // Message.deleteMany({}, () => {
                    //     broadcastMessage(
                    //         wss,
                    //         ['cleared'],
                    //         {
                    //             type: 'info',
                    //             msg: 'Messages cache cleared.'
                    //         }
                    //     )
                    // })
                    break;
                }
            }
        }
    )
}
