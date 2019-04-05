const shinobaApp = {}
shinobaApp.weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
shinobaApp.weatherApiKey = '53676921d77f931b9699b38ab357d31e';
shinobaApp.artApiUrl = 'https://www.rijksmuseum.nl/api/en/collection/';
shinobaApp.artApiKey = 'NYUbDvNc';

const audio1 = $('#audio-1')[0];
const audio2 = $('#audio-2')[0];
const audio3 = $('#audio-3')[0];
const audio4 = $('#audio-4')[0];

const playMusic = () => {
	const pause = {}
	if (checkPause.status === false) {
		checkPause.status = true;
		audio4.pause();
		// audio4.currentTime = 0;
	} else {
		checkPause.status = false
		audio4.play();
	}
}

const checkPause = {
	status: false
}
$('button').on('click', function (e) {
	e.preventDefault();
	playMusic();
})

// -------------

//Get Weather Temperature
shinobaApp.getWeather = (temp) => {
	let weather = {}
	$.ajax({
		url: shinobaApp.weatherApiUrl,
		appid: shinobaApp.weatherApiKey,
		method: 'GET',
		dataType: 'json',
		data: {
			appid: shinobaApp.weatherApiKey,
			format: 'json',
			units: 'metric',
			q: temp
		}
	}).then((res) => {
		//Populate the weather object
		weather.status = true
		weather.city = res.name;
		weather.temp = Math.floor(res.main.temp);
		weather.condition = res.weather[0].main;
		shinobaApp.sync.splice(0, 1, weather);
		//Passes argument to getArtList
		shinobaApp.getArtList(res.weather[0].main);
	}).fail((error) => {
		console.log(error);
		// console.log("api called");
	})
}

// Get Art Pieces
shinobaApp.getArtList = (condition) => {
	console.log(condition)
	$.ajax({
		url: shinobaApp.artApiUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			key: shinobaApp.artApiKey,
			format: 'jsonp',
			imgonly: true,
			q: `${condition} painting`
		}
	}).then((res) => {
		console.log(res)
		shinobaApp.getRandomArt(res);
	}).fail((error) => {
		console.log(error);
	})
}

//Get Random Art Piece
shinobaApp.getRandomArt = (artPiece) => {
	let selectedArt = {}
	//Gets art pieces that have an Image
	const artList = artPiece.artObjects.filter((piece) => {
		return piece.hasImage != ''
	});
	//A new array made of art pieces with images
	const filteredArtList = artList.map((piece) => {
		return piece
	})
	//Random Image Picker
	const randomArtImage = Math.floor(Math.random() * filteredArtList.length);
	//Populates the selectedArt object
	selectedArt.status = true;
	selectedArt.title = filteredArtList[randomArtImage].title;
	selectedArt.artist = filteredArtList[randomArtImage].principalOrFirstMaker;
	selectedArt.url = filteredArtList[randomArtImage].webImage.url;
	shinobaApp.sync.splice(1, 1, selectedArt);
	//Checks sync of two calls
	shinobaApp.checkSync();
}

//Syncs all the information to trigger the DOM at the same time
shinobaApp.sync = ["temp", "artPiece"];
shinobaApp.checkSync = () => {
	const [weather] = shinobaApp.sync;
	const [, art] = shinobaApp.sync;
	if (shinobaApp.sync[0].status === true && shinobaApp.sync[1].status === true) {
		//Triggers function at the same time
		shinobaApp.displayArt(art.url);
		shinobaApp.displayTitle(art.title);
		shinobaApp.displayArtist(art.artist)
		shinobaApp.displayTemp(weather.temp);
		shinobaApp.displayCity(weather.city);
		shinobaApp.displayCondition(weather.condition);
		setTimeout(function () {
			$('button').addClass('button-opacity');
		}, 1000)
	}
}

//DOM Manipulation Area
// Display Art and Info
shinobaApp.displayArt = (art) => {
	$('.info-container').fadeIn(1000);
	$('.info-container').addClass('animated slideInLeft slow delay-.1s fadeIn delay-.1s');
	$('.painting').css('background-image', `url("${art}")`);
	$('.painting').addClass('painting-left');
	setTimeout(function () {
		$('.painting').fadeIn(1200);
	}, 500);
}
shinobaApp.displayTitle = (title) => {
	$('.info-painting').fadeIn(1500);
	$('.info-painting h2').text(title);
}
shinobaApp.displayArtist = (artist) => {
	$('.info-painting h3').text(artist);
}
//Display Weather and Info
shinobaApp.displayTemp = (temp) => {
	$('.temp').text(temp);
	$('.temp').fadeIn(1500);
	$('.temp-bg').fadeIn(1200);
}

shinobaApp.displayCity = (city) => {
	$('.city').text(`Location: ${city}`);
}
shinobaApp.displayCondition = (condition) => {
	$('.condition').text(`Condition: ${condition}`);
}


$('.info').on('click', function (e) {
	e.preventDefault();
	$('.info-painting').toggle();
	$('.info-weather').toggle();
})

//Get Date
shinobaApp.displayDate = () => {
	shinobaApp.monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
	shinobaApp.today = new Date();
	shinobaApp.day = shinobaApp.today.getDate();
	shinobaApp.month = shinobaApp.today.getMonth() + 1;
	shinobaApp.year = shinobaApp.today.getFullYear();
	shinobaApp.thisMonth = shinobaApp.monthName[shinobaApp.month - 1];
	$('.date').text(`${shinobaApp.thisMonth} ${shinobaApp.day} ${shinobaApp.year}`);
}

//Get's the user's input here
shinobaApp.getUserCity = () => {
	$('form').on('submit', function (e) {
		e.preventDefault();
		audio4.play();
		$('.temp').fadeOut();
		$('.info-painting').fadeOut();
		$('.info-weather').fadeOut();
		$('.painting').fadeOut(300);
		$('.con').addClass('animated fadeIn delay-1s');
		$('.con').addClass('con-class');
		$('.search-bar').addClass('search-bottom');
		const city = $('input[type=text]').val();
		if (city != '') {
			$('input').val('');
			shinobaApp.getWeather(city);
		}
	})
}

//Triggers the first function
shinobaApp.init = () => {
	shinobaApp.getUserCity();
	shinobaApp.displayDate();
}

// DOC READY
$(function () {
	shinobaApp.init();
	console.log("yes");
});
