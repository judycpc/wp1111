import server from './server'
import mongo from './mongo'

mongo.connect();


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});
