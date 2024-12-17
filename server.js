import express from 'express';
import { pgPool } from './pg_connections.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


app.post('/genres', async (req, res) => {
    const { genre_name } = req.body;
    try {
        const result = await pgPool.query('INSERT INTO Genres (genre_name) VALUES ($1) RETURNING *', [genre_name]);
        res.json({ message: 'Genre added', genre: result.rows[0] });
    } catch (erro) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/genres', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Genres');
        res.json({ genres: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/movies', async (req, res) => {
    const { movie_title, description, release_date, genre_name, rating } = req.body;
    try {
        const result = await pgPool.query(
            `INSERT INTO Movies (movie_title, description, release_date, genre_name, rating) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [movie_title, description, release_date, genre_name, rating]
        );
        res.json({ message: 'Movie added', movie: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/movies', async (req, res) => {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const result = await pgPool.query('SELECT * FROM Movies LIMIT $1 OFFSET $2', [limit, offset]);
        res.json({ movies: result.rows, page: parseInt(page) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/movies/:movie_title', async (req, res) => {
    const { movie_title } = req.params;
    try {
        const result = await pgPool.query('SELECT * FROM Movies WHERE movie_title = $1', [movie_title]);
        if (result.rows.length > 0) {
            res.json({ movie: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.delete('/movies/:movie_title', async (req, res) => {
    const { movie_title } = req.params;
    try {
        const result = await pgPool.query('DELETE FROM Movies WHERE movie_title = $1 RETURNING *', [movie_title]);
        if (result.rowCount > 0) {
            res.json({ message: 'Movie deleted', movie: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/movies/search/:keyword', async (req, res) => {
    const { keyword } = req.params;
    try {
        const result = await pgPool.query(
            `SELECT * FROM Movies 
             WHERE movie_title ILIKE $1 OR description ILIKE $1`,
            [`%${keyword}%`]
        );
        res.json({ movies: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/users', async (req, res) => {
    const { username, email, password_hash, year_of_birth } = req.body;
    try {
        const result = await pgPool.query(
            `INSERT INTO Users (username, email, password_hash, year_of_birth) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [username, email, password_hash, year_of_birth]
        );
        res.json({ message: 'User registered', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/reviews', async (req, res) => {
    const { movie_title, username, rating, review_text } = req.body;
    try {
        const result = await pgPool.query(
            `INSERT INTO Reviews (movie_title, username, rating, review_text) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [movie_title, username, rating, review_text]
        );
        res.json({ message: 'Review added', review: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/reviews', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM Reviews');
        res.json({ reviews: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/favorites', async (req, res) => {
    const { username, movie_title } = req.body;
    try {
        await pgPool.query(
            `INSERT INTO Reviews (movie_title, username, review_text, rating)
             VALUES ($1, $2, 'Favorite', 0) ON CONFLICT DO NOTHING`,
            [movie_title, username]
        );
        res.json({ message: 'Movie added to favorites' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/favorites/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const result = await pgPool.query(
            `SELECT R.movie_title
             FROM Reviews R 
             WHERE R.username = $1 AND R.review_text = 'Favorite'`,
            [username]
        );
        res.json({ favorites: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






