console.log('keys.js is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id: process.env.OMDB_KEY
};

exports.bandsInTown = {
    id: process.env.BIT_KEY
};