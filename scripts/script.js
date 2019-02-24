//Weather Api 
const myWeatherApp = {};
myWeatherApp.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
myWeatherApp.apiKey = '53676921d77f931b9699b38ab357d31e';

shinobaApp = {};
shinobaApp.weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';


// Weather Promise
myWeatherApp.getUserCity = (city) => {
  myWeatherApp.getWeather = $.ajax({
    url: myWeatherApp.apiUrl,
    method: 'GET',
    appid: myWeatherApp.apiKey,
    dataType: 'json',
    data: {
      appid: myWeatherApp.apiKey,
      format: 'json',
      q: city,
      units: 'metric'
    }
  }).then((res) => {
    console.log(res);
  })
  .fail((error) => {
  })
};

// Art Promise
const getArt = (weatherCondition) => {
  myArtApp.getArt = (query) => {
  	console.log(`the art is of ${query}`);
  	console.log(query);
  	myArtApp.getArt = $.ajax({
			url: myArtApp.apiUrl,
			method: 'GET',
			dataType: 'json',
			data: {
				key: myArtApp.apiKey,
				format: 'json',
				q: query
			}
		}).then((res) => {
			console.log(res.artObjects[0].webImage.url);
			const artList = res.artObjects.filter((value) => {
				return value.webImage.url != ''
			});
			console.log(artList);
		}).fail((error) => {
			console.log(error);
		})
	}
}

	myArtApp.displayArt = (pieces) => {
		console.log(pieces);
		if (pieces.hasImage === true){
		}
	}

// Start myWeatherApp
  myWeatherApp.init = () => {
    myWeatherApp.getUserCity('toronto');
    // myArtApp.getArt();
  }
  
// DOC READY
	$(function (){
		myWeatherApp.init();
		// console.log('Ready');
});

// PSEUDO CODE
// CONNECT MUSEUM API
// GET 'WEATHER' OBJECT THAT HAS PROPERTY 'MAIN' 
// THAT IS THE VALUE THAT WILL BE 
// run reijk museum api into above
// cheeck classical music, sort according to weather

// const imageList = res.artObjects[i].map()
// imageList = [0, 1,]