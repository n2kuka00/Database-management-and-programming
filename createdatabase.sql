CREATE TABLE Genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Movies (
    movie_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
);


CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);


CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    movie_id INT REFERENCES Movies(movie_id),
    rating INT CHECK (rating >= 1 AND rating <= 10),
    comment TEXT,
    UNIQUE (user_id, movie_id)
);


CREATE TABLE Staff (
    staff_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
);


CREATE TABLE MovieStaff (
    movie_staff_id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES Movies(movie_id),
    staff_id INT REFERENCES Staff(staff_id),
    role VARCHAR(50) NOT NULL
);
