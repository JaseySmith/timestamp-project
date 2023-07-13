// Import required modules
const express = require('express');
const app = express();
const path = require('path');

// Enable CORS
const cors = require('cors');
app.use(cors());

// Set up static files serving
app.use(express.static('public'));

// Define the route for the timestamp microservice
app.get("/api/:date_string?", function (req, res) {
  const { date_string } = req.params;
  let date;

  if (!date_string) {
    date = new Date();
  } else if (isNaN(date_string)) {
    date = new Date(date_string);
  } else {
    date = new Date(parseInt(date_string));
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  const unix = date.getTime();
  const utc = date.toUTCString();

  res.json({ unix, utc });
});

// Serve the index.html file for the root URL
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Catch-all route handler for any other request
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
