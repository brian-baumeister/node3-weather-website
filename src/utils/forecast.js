const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/9cb77abb36087c0266c9e5c08796f384/' + latitude + ', ' + longitude + '';
	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('No Connection');
		} else if (body.error) {
			callback('Unable to find location');
		} else {
			callback(
				undefined,
				`Current forecast is ${body.currently.icon}. It is currently ${body.currently
					.temperature} out. The hight today is ${body.daily.data[0].temperatureHigh} with a low of ${body
					.daily.data[0].temperatureLow}  There is a ${body.currently.precipProbability}% chance of rain!`
			);
		}
	});
};

module.exports = forecast;
