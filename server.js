// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, ()=>{console.log(`Server is working at port:${port}`)});

//GET route
const sendData = (req, res) => {
  res.send(projectData);
}

app.get('/all', sendData);

//POST route
const addData = (req, res) => {
  let data = req.body;
  //creating value pairs for projectData object
  projectData['date'] = data.date;
  projectData['temp'] = data.temp;
  projectData['mood'] = data.mood;

  res.send(projectData);
  console.log(projectData);
}
app.post('/add', addData);
