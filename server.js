const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = 3000;

// Set up Google OAuth credentials
const GOOGLE_CLIENT_ID = '233894302148-srffcts6tr3ab61kjatiuonju10drb17.apps.googleusercontent.com';  // Replace with your actual client ID
const GOOGLE_CLIENT_SECRET = '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';  // Replace with your actual client secret
const CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

// Set your institution's domain
const INSTITUTION_DOMAIN = 'vitbhopal.ac.in';

// Serve static files from each page directory
app.use('/login', express.static(path.join(__dirname, 'Login_Page')));
app.use('/search', express.static(path.join(__dirname, 'Page3-searchLocation')));
app.use('/4', express.static(path.join(__dirname, 'Page4-searchLocation-2')));
app.use('/home', express.static(path.join(__dirname, 'Page2-map')));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware for session handling
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  // Extract the email domain from the user's email address
  const emailDomain = profile.emails[0].value.split('@')[1];

  // Check if the user's email domain matches the institution's domain
  if (emailDomain !== INSTITUTION_DOMAIN) {
    return done(null, false, { message: 'Access restricted to your institution\'s domain.' });
  }

  // If the email domain matches, proceed with the authentication
  return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Middleware to check for authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

// Routes for pages
app.get('/', (req, res) => {
  res.redirect('/login'); // Redirect to the login page by default
});

app.get('/login', (req, res) => {
  // If there is an error message, pass it to the login page
  const errorMessage = req.query.error || '';
  res.sendFile(path.join(__dirname, 'Login_Page', 'index.html'), { errorMessage });
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page3-searchLocation', 'index.html'));
});

app.get('/4', (req, res) => {
  res.sendFile(path.join(__dirname, 'Page4-searchLocation-2', 'index.html'));
});

app.get('/home', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'Page2-map', 'index.html'));
});

// Google login route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login?error=true' }), (req, res) => {
  // If login is successful, redirect to the home page
  res.redirect('/home');
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
