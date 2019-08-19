/*
	Name App : Jack's Weather App
	Description :My projcet about the weather of the day
	Language : JavaScript, HTML, CSS
	Bootstrap: Bootstrap 4
	Date	 : August 18 2019
	Owner	 : Jackie Hao
*/

// CLASS
const iconElement 	= document.querySelector('.weather-icon');
const tempElement 	= document.querySelector('.temperate-value p');
const desElement  	= document.querySelector('.temperate-description p');
const humidityEl  	= document.querySelector('.humidity');
const windElement	= document.querySelector('.wind')



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
 	}

 	static displayWeather(data){
 	console.log(data)
 	 const icon 	= data.weather[0].main;
 	 const temp 	= data.main.temp;
 	 const humidity = data.main.humidity;
 	 const wind		= data.wind.speed;
 	 
 	 // check background and set up the back ground
 	 switch(icon) {
 	 	case 'Clear':
 	 		document.body.style.backgroundImage = 'url("background/clear.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	case 'Clouds':
 	 		document.body.style.backgroundImage = 'url("background/cloud.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		document.body.style.color = 'white';
 	 		document.querySelector('.location').style.color ='black';
 	 		break;

 	 	case 'Rain':
 	 	case 'Drizzle':
 	 	case 'Mist':
 	 		document.body.style.backgroundImage = 'url("background/rain.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		document.body.style.color = 'white';
 	 		//document.querySelector('.location').style.color ='black';

 	 		break;

 	 	case 'Thunderstorm':
 	 		document.body.style.backgroundImage = 'url("background/thunder.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	case 'Snow':
 	 		document.body.style.backgroundImage = 'url("background/snow.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;

 	 	default:
 	 		document.body.style.backgroundImage = 'url("background/default.jpg")';
 	 		document.body.style.backgroundSize = 'cover';
 	 		break;
 	 }

 	 // screen on the Icon of the weather
 	 iconElement.innerHTML 	= `<img src="icons/${icon}.png">`;

 	 desElement.innerHTML  	= `<h3 class="text-primary">${icon}</h3>`;
 	 tempElement.innerHTML 	= `${temp}&deg<span>F</span>`;

 	 humidityEl.innerHTML	= `<h4>Humidity</h4>
								<h4>${humidity}&#37</h4>`;

	 windElement.innerHTML	= `<h4>Wind</h4>
								<h4>${wind} km/h</h4>`;

	 document.querySelector('.text').innerHTML = `<p></p>`


 	 }
 }

	

 

document.querySelector('.btn').addEventListener('click', () => {
	let city = document.getElementById('searchInput').value;

	if(city){
		document.querySelector('.location').innerHTML = city;
		UI.getWeather(city)
		UI.clearFields()
	}

	});



