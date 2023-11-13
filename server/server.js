const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Leaderboards = require('./leaderboards')

dotenv.config();

const app = express();

// MongoDB Connections
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.log('Error in DB connection: ' + error);
    }
};
connectToDB();

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/leaderboards', async (req, res) => {
    try {
        const leaderboardsData = await Leaderboards.find()
        res.send(leaderboardsData)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/leaderboards', async(req, res) => {
    const {name, wpm, mode} = req.body
    try {
        newLeaderboardEntry = new Leaderboards({
            name: name,
            wpm: wpm,
            mode: mode    
        })
        newLeaderboardEntry.save()
        res.send("Entry added")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT);
});
