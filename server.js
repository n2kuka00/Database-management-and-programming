import express from 'express'
import {pgPool} from './pg_connections.js';

const app = express ()

app.listen(3001, ()=>{
    console.log('Server is running');
});


app.post('/genres', async (req, res) => {
    const { genre_name } = req.body;
    
    res.json({ message: 'Genre added', genre_name });
});


app.get('/genres', async (req, res) => {
    
    res.json({ genres: [] });
});


app.post('/movies', async (req, res) => {
    const { movie_title, description, release_date, genre_name, rating } = req.body;
    // SQL INSERT logic here
    res.json({ message: 'Movie added', movie_title });
});


app.get('/movies', async (req, res) => {
    // SQL SELECT * logic here
    res.json({ movies: [] });
});


app.post('/users', async (req, res) => {
    const { username, email, password_hash, year_of_birth } = req.body;
    // SQL INSERT logic here
    res.json({ message: 'User added', username });
});


app.get('/users', async (req, res) => {
    // SQL SELECT * logic here
    res.json({ users: [] });
});


app.post('/reviews', async (req, res) => {
    const { movie_title, username, rating, review_text } = req.body;
    // SQL INSERT logic here
    res.json({ message: 'Review added', movie_title, username });
});


app.get('/reviews', async (req, res) => {
    // SQL SELECT * logic here
    res.json({ reviews: [] });
});






