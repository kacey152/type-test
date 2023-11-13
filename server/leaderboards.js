const mongoose = require('mongoose')

const leaderboardsSchema = new mongoose.Schema({
    name: String,
    wpm: Number,
    mode: String,
},{
    timestamps: true,
});

const Leaderboards = mongoose.model('leaderboards', leaderboardsSchema)

module.exports = Leaderboards