CREATE TABLE Genre (
    GenreID INT PRIMARY KEY,
    Drama VARCHAR(50),
    Thriller VARCHAR(50),
    Fantasy VARCHAR(50),
    Horror VARCHAR(50)
);

CREATE TABLE Movie (
    MovieID INT PRIMARY KEY,
    MovieName VARCHAR(255) NOT NULL,
    ReleaseYear INT,
    Genre INT,
    Tag VARCHAR(255),
    Review INT,
    FOREIGN KEY (Genre) REFERENCES Genre(GenreID)
);

CREATE TABLE User (
    UserID INT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL,
    YearOfBirth INT,
    FavoriteMovie INT, 
    FOREIGN KEY (FavoriteMovie) REFERENCES FavoriteMovie(FavoriteID)
);

CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,
    Username VARCHAR(50),
    Stars INT CHECK (Stars >= 1 AND Stars <= 5),
    Text TEXT,
    MovieID INT,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
);

CREATE TABLE FavoriteMovie (
    FavoriteID INT PRIMARY KEY,
    MovieID INT,
    FOREIGN KEY (MovieID) REFERENCES Movie(MovieID)
);