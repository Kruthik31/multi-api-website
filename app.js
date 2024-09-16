import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  

const app = express();

// EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// Fictional Books Route (Open Library API)
app.get('/books', async (req, res) => {
  try {
    const response = await axios.get('https://openlibrary.org/subjects/fiction.json');
    res.render('books', { books: response.data.works });
  } catch (error) {
    console.error('Error fetching books data:', error);
    res.status(500).send('Error fetching books data');
  }
});

// Photography (Unsplash API) Route
app.get('/photos', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: { count: 10, query: 'nature' },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });
    res.render('photos', { photos: response.data });
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).send('Error fetching photos');
  }
});

// Anime Route (Jikan API)
app.get('/anime', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/anime', {
      
      params: { limit: 10 } 
  
    });
    res.render('anime', { animes: response.data.data });
  } catch (error) {
    console.error('Error fetching anime data:', error);
    res.status(500).send('Error fetching anime data');
  }
});

  

//  Server on port 4003
app.listen(4003, () => {
  console.log('Server running on http://localhost:4003');
});
