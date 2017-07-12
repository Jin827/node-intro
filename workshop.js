//[CALLING APIs]

var request = require('request-promise');

var ADDRESS = "Montreal";

request('http://api.open-notify.org/iss-now.json')
    .then(function(responce) {
      data= JSON.parse(responce)}
      


function getIssPosition() {
  //returning the promise // it will return 'undefined'
  return (     
    request('http://api.open-notify.org/iss-now.json')
    .then(function(responce) {
        
        var issResObj = JSON.parse(responce)
  //    console.log(issResObj.iss_position)
  
        var issLatLng = {};
        
        issLatLng.lat = issResObj.iss_position.latitude;
        issLatLng.lng = issResObj.iss_position.longitude;
        
        
        return issLatLng;
        
    })
    .catch(function(){
      throw new Error ('ISS API not available')
    })
  )//end of return
  
}



function getAddressPosition(address) {
  
  var key = 'AIzaSyAIHMLYaRYccsC0xaIjVs5omGzeA5_T3Z0';
  var position = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "CA&key=" + key;
    
    return request(position)
    
    .then ( 
      function(response){
      var getResObj = JSON.parse(response)
        
        
        
      var googleObj = {};
      googleObj.lat = getResObj.results[0].geometry.location.lat;
      googleObj.lng = getResObj.results[0].geometry.location.lng;
      
  //  console.log("googleObj:"+ JSON.stringify(googleObj, null, 4))
      return googleObj;
      
    })
}









function getCurrentTemperatureAtPosition(position) {
  
  var latlng = 'https://api.darksky.net/forecast/803c0d898b2f31c3c85dc9221769b784/' + position.lat + "," + position.lng
  return request (latlng)
    
    .then ( 
      function(response) {
      
        var getTemp = JSON.parse(response)
        
        var temp = getTemp.currently.temperature;
        console.log("temp:" + temp);
        return temp;
      }
      
    )
};




function getCurrentTemperature (address) {
  getAddressPosition(address)
  .then(getCurrentTemperatureAtPosition)
  .then(function(data){
    console.log(data, "current temp at position result");
  })
  .catch(function(err){
    console.log(err,"sorry ERR ERR ERR :P");
  })
}



// Euclidian distance between two points
function getDistance(arrayOfPositions) {
  var pos1 = arrayOfPositions[0];
  var pos2 = arrayOfPositions[1];
  console.log(pos1, pos2, "positions")
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getDistanceFromIss(address) {
  Promise.all([
    getAddressPosition(address),
    getIssPosition()
    ])
  //address ==> position
  //nothing ==> position
  // .then (function (response){
  //   var data = []
  //   data.push(response[0], response[1])
  //   console.log(JSON.stringify(firData, null, 4), JSON.stringify(secData, null, 4), "promise all response format");
  
  //   return [firData, secData];
  // })
  .then(getDistance);
    
    
}

/*getAddressPosition(ADDRESS)
.catch(function(err){
  console.log(err,"sorry ERR ERR ERR :P");
});*/
//getCurrentTemperatureAtPosition({lat: -10.7397, lng: -177.6245});

//getCurrentTemperature (ADDRESS);


