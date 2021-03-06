var http = require('http');

var bookedFlight = {};

var options = {
	host : 'localhost',
	path : '/flight',
	port : '8080',
	method : 'POST',
	headers : {
		'Content-Type' : 'application/json'
	}
};

//book a flight
var flight = {
	"departure" : "2016-06-09T11:27:01Z",
	"departureAirport" : "Paris",
	"landing" : "2016-06-09T21:27:01Z",
	"landingAirort" : "New-York"
};

readResponseData = function(response) {
	var str = ''
	response.on('data', function(chunk) {
		str += chunk;
	});

	response.on('end', function() {
		console.log('Booked a Flight: ', str );
		bookedFlight = JSON.parse(str);
	});
}

var req = http.request(options, readResponseData);
// This is the data we are posting, it needs to be a string or a buffer
req.write(JSON.stringify(flight));
req.end();

module.exports = {
	getBookedFlight : function() {
		return bookedFlight;
	}
}
