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

app.post('/api/leaderboards', async (req, res) => {
    const { name, wpm, mode } = req.body
    try {
        const existingData = await Leaderboards.findOne({ name: name, mode: mode })
        if (existingData) {
            if (existingData.wpm < wpm) { //User exists and breaks the previous record
                await Leaderboards.findOneAndUpdate({ name: name, mode: mode },
                    { $set: { wpm: wpm } },
                    { new: true, upsert: true })
                res.send("Entry updated")
            } else { // User exists but does not break the records
                res.send("Entry not added, record not broken")
            }
        } else { //New user
            const newData = new Leaderboards({
                name: name,
                wpm: wpm,
                mode: mode
            })
            await newData.save()
            res.send("New entry added")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('App running in port: ' + PORT);
});
