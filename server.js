const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from each page directory
app.use('/login', express.static(path.join(__dirname, 'Login_Page')));
app.use('/3', express.static(path.join(__dirname, 'Page3-searchLocation')));
app.use('/4', express.static(path.join(__dirname, 'Page4-searchLocation-2')));
app.use('/home',express.static(path.join(__dirname,'Page2-map')))

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes for pages
app.get('/', (req, res) => {
  res.redirect('/login'); // Redirect to the login page by default
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login_Page', 'index.html'));
});

app.get('/3', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page3-searchLocation', 'index.html'));
});
app.get('/4', (req, res) => {
    res.sendFile(path.join(__dirname, 'Page4-searchLocation-2', 'index.html'));
  });
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page2-map', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
