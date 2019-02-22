
const myApp = {};
myApp.apiKey = '53676921d77f931b9699b38ab357d31e';
myApp.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
  

  myApp.getUserCity = (city) => {
    console.log(`the city is ${city}`);
    $.ajax({
      url: myApp.apiUrl,
      method: 'GET',
      appid: myApp.apiKey,
      dataType: 'json',
      data: {
        appid: myApp.apiKey,
        format: 'json',
        q: city,
        units: 'metric'
      }
    }).then((res) => {
      console.log('it worked');
      console.log(res);
    })
  }
  
  
  myApp.init = () => {
    myApp.getUserCity('toronto');
  }
  
  
  // DOC READY
  $(function (){
    myApp.init();
    // console.log('Ready');
});