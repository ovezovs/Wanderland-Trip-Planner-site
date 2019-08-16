// Foursquare API Info
const clientId = 'XESSDILMW5KSPBJCLOOCMGOGSFQPHFS4MHLNTOVQ1WAR4HI4';
const clientSecret = '352IGL2Q3WUNCHHKMYUFJAR4523Z50EEDOK0TJS5HJJ3NG4G';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '6cc017775cfe4c4dae1183047191508';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4"), $("#weather5"), $("#weather6"), $("#weather7")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions:
const getVenues = async () => {
	const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190816`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
			const jsonResponse = await response.json();
			console.log(jsonResponse);
			const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            
			return venues;
    }
  } catch(error) {
    console.log(error);
  }
}


const getForecast = async () => {
	const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=7&hour=11&`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
  } catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
		let randVenue = Math.floor(Math.random()*8);
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    const currentDay = days[index];
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => {
    renderVenues(venues);
  });
  getForecast().then(forecast => {
    renderForecast(forecast);
  });
  return false;
}

$submit.click(executeSearch)
