const shinobaApp = {}
shinobaApp.weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';
shinobaApp.weatherApiKey = '53676921d77f931b9699b38ab357d31e';
shinobaApp.artApiUrl = 'https://www.rijksmuseum.nl/api/en/collection/';
shinobaApp.artApiKey = 'ge9zS0UR';


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
				weather.city = res.name;
				weather.temp = Math.floor(res.main.temp);
				weather.condition = res.weather[0].main;
				shinobaApp.sync.splice(0, 1, weather);
				//Passes argument to getArtList
				shinobaApp.getArtList(res.weather[0].main);
      }).fail((error) => {
        console.log(error);
			})
	}

//Get Art Pieces
  shinobaApp.getArtList = (condition) => {
    $.ajax({
      url: shinobaApp.artApiUrl,
      method: 'GET',
      dataType: 'json',
      data: {
        key: shinobaApp.artApiKey,
				format: 'json',
				imgonly: true,
        q: `${condition} painting`
      }
    }).then((res) => {
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
		console.log(shinobaApp.sync)
		const [weather] = shinobaApp.sync;
		const [,art] =  shinobaApp.sync;
		if (shinobaApp.sync[0] != '' && shinobaApp.sync[1] != '') {
			//Triggers function at the same time
			shinobaApp.displayArt(art.url);
			shinobaApp.displayTitle(art.title);
			shinobaApp.displayArtist(art.artist)
			shinobaApp.displayTemp(weather.temp);
			shinobaApp.displayCity(weather.city);
			shinobaApp.displayCondition(weather.condition);
			$('.info-container').fadeIn();
			$('.info-container').addClass('animated slideInLeft delay-.5s fadeIn delay-.5s');
			setTimeout(function () {
				$('.painting').addClass('painting-left')
			}, 400);
		}
}

// AUDIO PLAYER
// audioPlayer();
function audioPlayer() {
  let currentSong = 0;
  $('.audioPlayer')[0].src = $('.playlist li a')[0];
  $('.audioPlayer')[0].play();
  $('.audioPlayer')[0].volume = .25;
  $('.playlist li a').on('click', (e) => {
    e.preventDefault();
    $('.audioPlayer')[0].src = this;
    $('.audioPlayer')[0].play();
    $('.playlist li').removeClass('current-song');
  });

  $('.audioPlayer')[0].addEventListener('ended', () => {
    currentSong++;
    if (currentSong === $('.playlist li a').length)
      currentSong = 0;
    $('.playlist li').removeClass('current-song');
    $('.playlist li:eq(' + currentSong + ')').addClass('current-song');
    $('.audioPlayer')[0].src = $('.playlist li a')[currentSong].href;
    $('.audioPlayer')[0].play();
  });
}


//DOM Manipulation Area
	// Display Art and Info
	shinobaApp.displayArt = (art) => {
		console.log(art);

		$('.painting').css('background-image', `url("${art}")`);
	}
	shinobaApp.displayTitle = (title) => {
		console.log(title);
		$('.info-painting h2').text(title);
	}
	shinobaApp.displayArtist = (artist) => {
		console.log(artist);
		$('.info-painting h3').text(artist);
	}
	//Display Weather and Info
	shinobaApp.displayTemp = (temp) => {
		console.log(temp);
		$('.temp').text(temp);
		$('.temp').fadeIn();
		$('.temp-bg').fadeIn();
	}
	shinobaApp.displayDate = (date) => {
		console.log(date);
	}
	shinobaApp.displayCity = (city) => {
		console.log(city);
		$('.city').text(city);
	}
	shinobaApp.displayCondition = (condition) => {
		console.log(condition);
		$('.condition').text(condition);
	}

	$('.info').on('click', function(e){
		e.preventDefault();
		$('.info-painting').toggle();
		$('.info-weather').toggle();
		// $('.info-painting').fadeOut();
		// $('.info-weather').fadeIn();
	})

//Get's the user's input here
	shinobaApp.getUserCity = (userCity) => {
		$('form').on('submit', function(e) {
			e.preventDefault();
			
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
	}


// DOC READY
	$(function () {
		shinobaApp.init();
	});




  





// PSEUDO CODE
// CONNECT MUSEUM API
// GET 'WEATHER' OBJECT THAT HAS PROPERTY 'MAIN' 
// THAT IS THE VALUE THAT WILL BE 
// run reijk museum api into above
// cheeck classical music, sort according to weather

// const imageList = res.artObjects[i].map()
// imageList = [0, 1,]