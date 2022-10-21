import axios from "axios";

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' });

const startGame = async () => {
    const { data: { msg } } = await instance.post('/start');
    return msg;
};

const guess = (number) => {
    return (instance.get('/guess?number=' + number)
        .then(res => res.data.msg)
        .catch(e => e.response.data.msg))
};

const restart = async () => {
    const { data: { msg } } = await instance.post('/restart');
    return msg;
};

export { startGame, guess, restart };