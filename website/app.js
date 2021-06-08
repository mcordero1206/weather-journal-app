/* Global Variables */
/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL+zipCode+apiKey)
    try{
      const data = await res.json();
      return data;
    } catch(error) {
        
        console.log("error", error);

    }
}

/* Function called by event listener */
const generateData = (e) => {
  console.log('click!');
  const zipCode = document.querySelector('#zip').value;
  const mood = document.querySelector('#feelings').value;
  getWeather(baseURL,zipCode,apiKey).then((data)=>{
    try{
      console.log(data.main);
      postData('/add', {date: newDate, temp: data.main.temp, mood: mood})
      postGet();
    }catch(error) {
       console.error(error)
    }

  });

}

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=df94e44e870a2d0342064f3302dfb7b4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let time =  d.getTime();

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', generateData);


//Async POST
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
};

// Chaining post-get
const postGet = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    document.querySelector('#date').innerHTML = allData.date;
    document.querySelector('#temp').innerHTML = allData.temp;
    document.querySelector('#content').innerHTML = allData.mood;
    console.log(allData);
    console.log(allData.date);
    console.log(allData.mood);
  }catch(error) {
    console.log("error", error);
  }
}
