import express from 'express'
import { genNumber, getNumber } from '../core/getNumber';

const router = express.Router();

let ans = undefined;

router.post('/start', (_, res) => {
    genNumber(); // 用亂數產生一個猜數字的 number，存在 memory DB
    ans = getNumber();
    console.log(ans);
    res.json({ msg: 'The game has started.' })
});

router.get('/guess', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    const answer = ans;

    // 用 req.query.number 拿到前端輸入的數字
    const num = req.query.number;

    // check if NOT a num or not in range [1,100]
    let reg = new RegExp('^[0-9]+$');
    if (reg.test(num)) {
        if (num[0] === "0" || parseInt(num) > 100) {
            res.status(406).send({ msg: 'Not a legal number.' });
        } else if (parseInt(num) < answer) {
            res.json({ msg: 'Bigger' });
        } else if (parseInt(num) === answer) {
            res.json({ msg: 'Equal' });
        } else {
            res.json({ msg: 'Smaller' });
        }
    } else {
        res.status(406).send({ msg: 'Not a legal number.' });
    }
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.'
}); // 如果沒有問題，回傳 status

router.post('/restart', (_, res) => {
    genNumber();
    ans = getNumber(); // 用亂數產生一個猜數字的 number，存在 memory DB
    console.log(ans);
    res.json({ msg: 'The game has started.' })
});

export default router