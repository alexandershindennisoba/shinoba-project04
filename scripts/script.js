
// Create myApp namespace to hold all properties
const myWeatherApp = {};
myWeatherApp.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
myWeatherApp.apiKey = '53676921d77f931b9699b38ab357d31e';
  
const myArtApp = {};
myArtApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/';
myArtApp.apiKey = 'ge9zS0UR';

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
    // Gives the result of the city weather condition and input that condition into getArt
    myArtApp.getArt(res.weather[0].main)
  })
  .fail((error) => {
    // console.log(error);
  })
};

// Art Promise
  myArtApp.getArt = (query) => {
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
    // res is result of the query weather condition. gives back an object with array of artObjects
    // console.log(res);
    const artList = res.artObjects.filter((piece) => {
      // only returns images with value of true
      return piece.hasImage != ''
    });
    // console.log(artList);
    
    // map through the array and return array of image urls
    const filteredArtList = artList.map((piece) => {
      return piece.webImage.url
    })
    // console.log(filteredArtList);
    
    // takes array of image urls and chooses a random one
    const randomArtImage = Math.floor(Math.random() * filteredArtList.length);
    console.log(filteredArtList[randomArtImage]);

  }).fail((error) => {
    console.log(error);
  })
}


// MUSIC PLAYER TEST
audioPlayer();
function audioPlayer(){
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
    currentSong ++;
    if (currentSong === $('.playlist li a').length)
      currentSong = 0;
    $('.playlist li').removeClass('current-song');
    $('.playlist li:eq('+currentSong+')').addClass('current-song');
    $('.audioPlayer')[0].src = $('.playlist li a')[currentSong].href;
    $('.audioPlayer')[0].play();
  });
}
// Instructions for audioPlayer https://www.youtube.com/watch?v=vtZCMTtP-0Y


// MUSIC PLAYER TRUE
// playlist = {};

// playlist.song1 = 'audio/The Most Relaxing Classical Album In The World Ever - 03 - Pachelbel - Canon.mp3';
// playlist.song2 = 'audio/The Most Relaxing Classical Album In The World Ever - 14 - Vivaldi - The Four Seasons Largo ' Winter'.mp3';
// playlist.song3 = 'audio/The Most Relaxing Classical Album In The World Ever - 02 - Grieg -  Peer Gynt, Op. 23 Morning.mp3';
// playlist.song4 = 'audio/The Most Relaxing Classical Album In The World Ever - 01 - J.S. Bach - Air On The G String.mp3';

// $(".music-player").trigger('load');
// function play-audio(task) {
//   if (task == 'play') {
//     $(".music-player").trigger('play');
//   } 
//   if (task == 'stop') {
//     $(".music-player").trigger('pause');
//     $(".music-player").prop("currentTime", 0);
//   }
// }

// keys = Object.keys(playlist);
// $('.music-player').append(`<source id="sound-src" src="${playlist[keys[0]]}" type="audio/mpeg">`);

// count = 0;
// $('.music-player').on('ended', function () {
//   count++;
//   $(".sound-src").attr("src", playlist[keys[count]])[0];
//   $(".music-player").trigger('load');
//   play_audio('play');
// });


  // MUSIC PLAYER UNTESTED
// let audio = $('.music-player');

// audio = new Audio("start url");

// audio.addEventListener('ended', function () {
//   audio.src = "new url";
//   audio.pause();
//   audio.load();
//   audio.play();
// });


// MUSIC PLAYER WORKS NO CONTROL STARTS
// let sounds = new Array(new Audio("audio/The Most Relaxing Classical Album In The World Ever - 01 - J.S. Bach - Air On The G String.mp3"), new Audio("audio/The Most Relaxing Classical Album In The World Ever - 02 - Grieg -  Peer Gynt, Op. 23 Morning.mp3"));
// let i = -1;
// playSnd();

// function playSnd() {
//   i++;
//   if (i == sounds.length) return;
//   sounds[i].addEventListener('ended', playSnd);
//   sounds[i].play();
// }
// MUSIC PLAYER WORKS NO CONTROL ENDS

// const imageList = res.artObjects[i].map()
// imageList = [0, 1, ]



// myArtApp.displayArt = (pieces) => {
//   console.log(pieces);
//   if (pieces.hasImage === true){
//   }
// }


  // Start myWeatherApp
  myWeatherApp.init = () => {
    myWeatherApp.getUserCity('toronto');
    // myArtApp.getArt();
  }
  
  // DOC READY
  $(function (){
    myWeatherApp.init();
  });

// PSEUDO CODE
// CONNECT MUSEUM API
// GET 'WEATHER' OBJECT THAT HAS PROPERTY 'MAIN' 
// THAT IS THE VALUE THAT WILL BE 
// run reijk museum api into above
// cheeck classical music, sort according to weather
