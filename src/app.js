const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//Setup Handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup up Static Dir to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Brian Baumeister'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Must provide an address'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error
				});
			}

			res.send({
				forecast: forecastData,
				location,

				address: req.query.address
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		});
	}
	res.send({
		products: [ { games: 'Clue', rating: 5 }, { toys: 'lego', rating: 5 } ]
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Brian Baumeister'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'Welcome to the Help Page',
		title: 'Help',
		name: 'Brian Baumeister'
	});
});
app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'Help Article not Found',
		title: '404',
		name: 'Brian Baumeister'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'Page not Found',
		title: '404',
		name: 'Brian Baumeister'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
