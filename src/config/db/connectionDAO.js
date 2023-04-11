const mongoose = require("mongoose");
async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://nguyenngocphong0924706743:eZrwQeA1MrGpeksY@cluster0.ptmflsy.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log(error);
        console.log("Connect failure!!!");
    }
}

module.exports = { connect };
