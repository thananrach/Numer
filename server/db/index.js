const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://jump:7895214@cluster0-lnwqn.azure.mongodb.net/cinema', { useNewUrlParser: true })
    .then(()=> console.log('MongoDB Connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db