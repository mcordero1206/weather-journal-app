/* Global Variables */
// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=df94e44e870a2d0342064f3302dfb7b4';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
let time =  d.getHours();

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
  const zipCode = document.querySelector('#zip').value;
  const mood = document.querySelector('#feelings').value;
  const error = document.querySelector('#error');
  if (zipCode != '') {
    if(isNaN(zipCode)) {
      console.log("Please submit a valid Zipcode");
      error.classList.add("show");
      error.innerHTML = "Please submit a valid Zipcode";
    }
    else {
      console.log(`zipcode value: ${zipCode}`);
      getWeather(baseURL,zipCode,apiKey).then((data)=>{
        try{
              console.log(data.main);
              error.classList.remove("show");
              postData('/add', {date: newDate, temp: data.main.temp, mood: mood})
              postGet();
        }catch(error) {
           console.error(error)
        }
    
      })
    }
  }
  else {
      console.log('zipcode field empty');
      error.classList.add("show");
      error.innerHTML = "Please submit a valid Zipcode";
  }
};




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
    document.querySelector('#date').innerHTML = `Date: ${allData.date}`;
    document.querySelector('#temp').innerHTML = `Tempurature: ${allData.temp}`;
    document.querySelector('#content').innerHTML = `Feeling: ${allData.mood}`;
  }catch(error) {
    console.log("error", error);
  }
}

// Function to change background color based on time of day to reflect the sky

const changeBg = (time) => {
  console.log(`Time is ${time} hours`);
  let currentClass = document.querySelector('#app').classList[0];
  console.log(`current class is: ${currentClass}`);
  switch(true) {
    case (time <= 5):
      document.querySelector('#app').classList.replace(currentClass, "night");
      document.querySelector("#greeting").innerHTML = "Good Evening!";
      console.log("Theme changed to night!");
      break;
    case (time <= 6):
      document.querySelector('#app').classList.replace(currentClass, "dawn");
      document.querySelector("#greeting").innerHTML = "Good Morning!";
      console.log("Theme changed to dawn!");
      break;
    case (time <= 7):
      document.querySelector('#app').classList.replace(currentClass, "sunrise");
      document.querySelector("#greeting").innerHTML = "Good Morning!";
      console.log("Theme changed to sunrise!");
      break;
    case (time <= 11):
      document.querySelector('#app').classList.replace(currentClass, "morning");
      document.querySelector("#greeting").innerHTML = "Good Morning!";
      console.log("Theme changed to morning!");
      break;
    case (time <= 19):
      document.querySelector('#app').classList.replace(currentClass, "afternoon");
      document.querySelector("#greeting").innerHTML = "Good Afternoon!";
      console.log("Theme changed to afternoon!");
      break;
    case (time <= 20):
      document.querySelector('#app').classList.replace(currentClass, "sunset");
      document.querySelector("#greeting").innerHTML = "Good Afternoon!";
      console.log("Theme changed to sunset!");
      break;
    case (time <= 21):
      document.querySelector('#app').classList.replace(currentClass, "dusk");
      document.querySelector("#greeting").innerHTML = "Good Evening!";
      console.log("Theme changed to dusk!");
      break;    
  }
}
changeBg(time);