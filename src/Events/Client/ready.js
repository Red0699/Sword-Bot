const mongoose = require('mongoose');
const config = require('../../../config.json');
require('colors');

/*
const clientDB = new MongoClient(config.MONGODB_URL_ENCODED, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
*/

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        /*
        try {
            await clientDB.connect();

            await clientDB.db("admin").command({ ping: 1 });

            console.log("[MONGODB] is connected successfully :D".green);

        } catch (error) {
            console.log(error.red)

        } finally {
            // Ensures that the client will close when you finish/error
            await clientDB.close();

        }
        */

        //Connection to Database MongoDB
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.MONGODB_URL_ENCODED || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true 
        }).then(() => {
            console.log("[MONGODB] is connected successfully :D".green);
        }).catch(err => console.log("An error has been detected : \n" + err))

        console.log(`The ${client.user.username} is online`.yellow);
    }
}