const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//added
const URL = require('url');
const bodyParser = require("body-parser");

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/prove09' , (req, res) => res.sendFile(__dirname + '/public/prove09-postal.html'))
  .use(bodyParser.urlencoded({ extended: false }));
  .use(bodyParser.json());
  .post('/getData', (req, res) => {

	//get the post values from the html form
	var weight = Number(req.body.weight);
	var mail = req.body.mail;
	var rate = calculateRate(weight, mail);
	var params = {weight: weight, mail: mail};

	//render ejs results page with the form parameters
	res.render('pages/prove09-postal', rate);
})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateRate(weight, mail){

	var calc = '';

	switch(mail)
	{
		case 'Letters (Stamped)':
			if (weight == 1) {
				calc = "0.55";
			}
			else if (weight == 2) {
				calc = "0.70";
			}
			else if (weight == 3) {
				calc = "0.85";
			}
			else {
				calc = "1.00";
			}
			break;

		case 'Letters (Metered)':
			if (weight == 1) {
				calc = "0.50";
			}
			else if (weight == 2) {
				calc = "0.65";
			}
			else if (weight == 3) {
				calc = "0.80";
			}
			else {
				calc = "0.95";
			}
			break;

		case 'Large Envelopes (Flats)':
			if (weight == 1) {
				calc = "1.00";
			}
			else if (weight == 2) {
				calc = "1.20";
			}
			else if (weight == 3) {
				calc = "1.40";
			}
			else if (weight == 4) {
				calc = "1.60";
			}
			else if (weight == 5) {
				calc = "1.80";
			}
			else if (weight == 6) {
				calc = "2.00";
			}
			else if (weight == 7) {
				calc = "2.20";
			}
			else if (weight == 8) {
				calc = "2.40";
			}
			else if (weight == 9) {
				calc = "2.60";
			}
			else if (weight == 10) {
				calc = "2.80";
			}
			else if (weight == 11) {
				calc = "3.00";
			}
			else if (weight == 12) {
				calc = "3.20";
			}
			else {
				calc = "3.40";
			}
			break;

		case 'First-Class Package Services-Retail':
			if (weight <= 4) {
				calc = "3.80";
			}
			else if (weight > 4 && weight <= 8) {
				calc = "4.60";
			}
			else if (weight > 8 && weight <= 12) {
				calc = "5.30";
			}
			else {
				calc = "5.90";
			}
			break;
	}

	return {
		weight: weight,
		mail: mail,
		calc: calc
	};
}
