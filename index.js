const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const deliveries = {};

function generateId() {
  return Math.floor(Math.random() * 100000).toString();
}

// HOME PAGE
app.get('/', function(req, res) {
  res.send(
    '<h1>FIRST CLASS DELIVERY</h1>' +
    '<form method="POST" action="/submit">' +

    '<h3>Sender</h3>' +
    '<input name="senderName" placeholder="Sender Name" required><br><br>' +
    '<input name="senderCountry" placeholder="Sender Country" required><br><br>' +
    '<input name="senderPhone" placeholder="Sender Phone" required><br><br>' +

    '<h3>Receiver</h3>' +
    '<input name="receiverName" placeholder="Receiver Name" required><br><br>' +
    '<input name="receiverAddress" placeholder="Receiver Address" required><br><br>' +
    '<input name="receiverCountry" placeholder="Receiver Country" required><br><br>' +
    '<input name="receiverPhone" placeholder="Receiver Phone" required><br><br>' +

    '<h3>Schedule</h3>' +
    '<input type="datetime-local" name="departure" required><br><br>' +
    '<input type="datetime-local" name="arrival" required><br><br>' +

    '<button type="submit">Submit</button>' +
    '</form>'
  );
});

// SUBMIT
app.post('/submit', function(req, res) {
  const id = generateId();
  deliveries[id] = req.body;

  res.redirect('/track/' + id);
});

// TRACK PAGE
app.get('/track/:id', function(req, res) {
  const data = deliveries[req.params.id];

  if (!data) {
    return res.send('Tracking not found');
  }

  // ✅ ONLY CORRECTION ADDED HERE
  const depDate = data.departure.split('T')[0];
  const depTime = data.departure.split('T')[1];

  const arrDate = data.arrival.split('T')[0];
  const arrTime = data.arrival.split('T')[1];

  res.send(
    '<h1>FIRST CLASS DELIVERY</h1>' +

    '<h3>SENDER</h3>' +
    '<p>NAME: ' + data.senderName + '</p>' +
    '<p>COUNTRY: ' + data.senderCountry + '</p>' +
    '<p>PHONE: ' + data.senderPhone + '</p>' +

    '<h3>RECEIVER</h3>' +
    '<p>NAME: ' + data.receiverName + '</p>' +
    '<p>ADDRESS: ' + data.receiverAddress + '</p>' +
    '<p>COUNTRY: ' + data.receiverCountry + '</p>' +
    '<p>PHONE: ' + data.receiverPhone + '</p>' +

    '<h3>DELIVERY SCHEDULE</h3>' +

    '<h4>DEPARTURE</h4>' +
    '<p>DATE: ' + depDate + '</p>' +
    '<p>TIME: ' + depTime + '</p>' +

    '<h4>ARRIVAL</h4>' +
    '<p>DATE: ' + arrDate + '</p>' +
    '<p>TIME: ' + arrTime + '</p>'
  );
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});