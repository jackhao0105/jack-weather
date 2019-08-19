/*
	Name App : Jack's Weather App
	Description :My projcet about the weather of the day
	Language : JavaScript, HTML, CSS
	Bootstrap: Bootstrap 4
	Date	 : August 18 2019
	Owner	 : Jackie Hao
*/

// Select the Element
const tempElement 	= document.querySelector('.temperate-value p');
const desElement  	= document.querySelector('.temperate-description p');
const humidityEl  	= document.querySelector('.humidity');
const windElement	= document.querySelector('.wind')
const cityHeader	= document.querySelector('.location');
const iconElement 	= document.querySelector('.weather-icon');






// API key 
const key ="e3069f0be257a43853928891a5153904";

// UNITS
const units = "imperial";

// Show the Day
const date 		= document.querySelector('.date');
const options 	= { weekday:"long", month:"short", day:"numeric"};
const today 	= new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);


// class UI : Handle UI
class UI {
	static clearFields(){
		let city = document.getElementById('searchInput').value = '';
	}

	static getWeather(searchTerm){
 		let api = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${key}&units=${units}`;
 		console.log(api)

 		fetch(api)
 			.then((response) => {
 				return response.json();;
 			})
 			.then( response => {
 				UI.displayWeather(response);
	 			})
 			.catch(() =>{
 				UI.showAlert('We can read your input. Maybe your spell wrong', 'danger')
 			})
 	}

 	static displayWeather(data){
 	console.log(data)
 	 const icon 	= data.weather[0].icon;
 	 console.log(icon)
 	 const des 		= data.weather[0].description;
 	 const temp 	= Math.floor((data.main.temp - 32) *5/9);
 	 const humidity = data.main.humidity;
 	 const wind		= data.wind.speed;
 	 const city 	= data.name;

 	 
 	 // check background and set up the back ground
 	 switch(data.weather[0].main) {
 	 	case 'Clear':
 	 		UI.showAlert("It's a nice day", "warning")
 	 		document.body.style.backgroundImage = 'url("background/clear.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	case 'Clouds':
 	 		UI.showAlert("It's cloudy day", "light")
 	 		document.body.style.backgroundImage = 'url("background/cloud.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		document.body.style.color = 'white';
 	 		document.querySelector('.location').style.color ='black';
 	 		break;

 	 	case 'Rain':
 	 	case 'Drizzle':
 	 	case 'Mist':
 	 		UI.showAlert("It's bad day", "infor")
 	 		document.body.style.backgroundImage = 'url("background/rain.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		document.body.style.color = 'white';
 	 		//document.querySelector('.location').style.color ='black';

 	 		break;

 	 	case 'Thunderstorm':
 	 		UI.showAlert("It's teribble day", "dark")
 	 		document.body.style.backgroundImage = 'url("background/thunder.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	case 'Snow':
 	 		UI.showAlert("It's snow day", "light")
 	 		document.body.style.backgroundImage = 'url("background/snow.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	default:
 	 		document.body.style.backgroundImage = 'url("background/default.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;
 	 }

 	 // The city name
 	 cityHeader.innerHTML 	= `<h2>${city}</h2>`
 	 // screen on the Icon of the weather
 	 iconElement.innerHTML	= `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
 	 // Description
 	 desElement.innerHTML  	= `<h3>${des}</h3>`;
 	 // Temparature
 	 tempElement.innerHTML 	= `${temp}&deg<span>C</span>`;

 	 humidityEl.innerHTML	= `<h4>Humidity</h4>
								<h4>${humidity}&#37</h4>`;

	 windElement.innerHTML	= `<h4>Wind</h4>
								<h4>${wind} m/s</h4>`;

	 document.querySelector('.text').innerHTML = `<p></p>`

 	 }

 	 static showAlert(message, className){
 	 	// Create a div contain a text alert
		const div = document.createElement('p');
		div.className = `alert alert-${className}`
		div.appendChild(document.createTextNode(message));

		const note = document.querySelector('.note');

		// Insert div below Container and above header
		note.appendChild(div)

		// after 3 seconds, the alert will be disappear
	 	setTimeout(() => document.querySelector('.alert').remove(), 3000 )
 	 }
 }

	

 

document.querySelector('.btn').addEventListener('click', () => {
	let city = document.getElementById('searchInput').value;

	if(city){
		// Get the Weather of the city you input
		UI.getWeather(city)

		// Clear Field input
		UI.clearFields()
	}

	});

