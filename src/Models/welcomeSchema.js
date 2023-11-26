const {model, Schema} = require('mongoose');

const welcomeSchema = new Schema({
    guildId: {type: String, required: true},
    channelId: {type: String, required: true},
    message: {type: String, required: true},
    imageUrl: {type: String, required: true},
})

module.exports = model('bienvenidas', welcomeSchema);