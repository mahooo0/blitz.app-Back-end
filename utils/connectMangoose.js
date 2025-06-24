const mongoose = require('mongoose');
const ConnectToMangoose = async () => {
    const MONGO_URI =
        'mongodb+srv://sevinmuhammed06:FOZsOlLv8jA2wkQU@cluster0.ysnk04u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
module.exports = ConnectToMangoose;
