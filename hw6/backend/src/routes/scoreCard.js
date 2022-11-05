import { Router } from "express";
import mongoose from "mongoose";
import ScoreCard from "../models/ScoreCard";

const router = Router();

const clearDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        return ("Database cleared");
    } catch (e) {
        return e;
        // throw new Error("clearDB failed");
    }
};

const updateDB = async (name, subject, score) => {
    const found = await ScoreCard.findOne({name, subject});

    if (found) {
        try {
            await ScoreCard.updateOne({name, subject}, {score});
            return undefined;
        } catch (e) {
            return e;
            // throw new Error("updateDB: updating failed");
        }
    } else {
        try {
            const newScoreCard = new ScoreCard({name, subject, score});
            return (await newScoreCard.save());
        } catch (e) {
            return e;
            // throw new Error("updateDB: adding failed");
        }
    }
};

const queryDB = async (type, queryString) => {
    let queryResult = undefined;
    
    try {
        if (type === 'name')
            queryResult = await ScoreCard.find({'name': queryString});
        else if (type === 'subject')
            queryResult = await ScoreCard.find({'subject': queryString});
    } catch (e) {
        return e;
        // throw new Error("queryDB failed");
    }
    
    if (queryResult.length === 0) {
        return false;
    } else {
        const prefix = "Found card with " + type + ": ";
        let res = [];

        for (let i = 0; i < queryResult.length; i++) {
            const { _id, name, subject, score, __v } = queryResult[i];
            res[i] = (prefix + `(${name}, ${subject}, ${score})`);
        }

        return (res);
    }
};

router.delete("/cards", async (req, res) => {
    console.log("DELETE /cards");
    const result = await clearDB();
    res.json({ message: result });
});

router.post("/card", async (req, res) => {
    console.log("POST /card");
    const { name, subject, score} = req.body;
    console.log(`- name: ${name}\n- subject: ${subject}\n- score: ${score}`);

    const card = await updateDB(name, subject, score);
    if (card === undefined) {
        res.json({ message: `Updating (${name}, ${subject}, ${score})`, card });
    } else {
        res.json({ message: `Adding (${name}, ${subject}, ${score})`, card });
    }
    
});

router.get("/cards", async (req, res) => {
    console.log("GET /cards");
    const { type, queryString } = req.query;
    console.log(`- type: ${type}\n- queryString: ${queryString}`);

    const result = await queryDB(type, queryString);
    let message = ""
    if (result === false) {
        message = `${type.charAt(0).toUpperCase() + type.slice(1)} (${queryString}) not found!`
    }
    res.send({ messages: result, message});
});

mongoose.connection.once("open", async () => {
    await clearDB();
    console.log("DB Initialization: data cleared")
})

export default router; 