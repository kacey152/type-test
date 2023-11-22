const mongoose = require('mongoose')

const leaderboardsSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    wpm: Number,
    mode: String,
}, {
    timestamps: true,
});

const Leaderboards = mongoose.model('leaderboards', leaderboardsSchema)

module.exports = Leaderboards