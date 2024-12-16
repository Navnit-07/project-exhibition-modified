const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = 3000;

// Google OAuth credentials
const GOOGLE_CLIENT_ID = '233894302148-srffcts6tr3ab61kjatiuonju10drb17.apps.googleusercontent.com'; // Replace with your actual client ID
const GOOGLE_CLIENT_SECRET = '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'; // Replace with your actual client secret
const CALLBACK_URL = 'http://localhost:3000/auth/google/callback';

// Institution domain restriction
const INSTITUTION_DOMAIN = 'vitbhopal.ac.in';

// Serve static files for each page
app.use('/login', express.static(path.join(__dirname, 'Login_Page')));
app.use('/search', express.static(path.join(__dirname, 'Page3-searchLocation')));
app.use('/4', express.static(path.join(__dirname, 'Page4-searchLocation-2')));
app.use('/home', express.static(path.join(__dirname, 'Page2-map')));
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
  const emailDomain = profile.emails[0].value.split('@')[1];

  if (emailDomain !== INSTITUTION_DOMAIN) {
    return done(null, false, { message: 'Access restricted to your institution\'s domain.' });
  }

  // Store relevant user information
  const user = {
    id: profile.id,
    email: profile.emails[0].value,
    photo: profile.photos[0].value, // Profile picture URL
  };
  return done(null, user);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login?error=true');
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  const errorMessage = req.query.error ? 'Access restricted to institution accounts only.' : '';
  res.send(`
    <html>
    <body>
      <h1>Login Page</h1>
      ${errorMessage ? `<p style="color: red;">${errorMessage}</p>` : ''}
      <a href="/auth/google">Login with Google</a>
    </body>
    </html>
  `);
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

// API to fetch user profile
app.get('/api/user', isAuthenticated, (req, res) => {
  res.json({
    photo: req.user.photo, // Send only the profile picture URL
  });
});

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login?error=true' }), (req, res) => {
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
