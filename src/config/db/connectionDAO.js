const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://quanglmbluewind:thanhs2lyt@cluster0.9ohvpkx.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(error);
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };