/** Long function that gets location from geolocation api
then uses that location to get weather data from weather api
then outputs it as HTML onto our index page */
function getLoc() {
    /** Gets coordinates */
    navigator.geolocation.getCurrentPosition(
        (p) => {
            const loc = {
                lat: p.coords.latitude,
                lon: p.coords.longitude,
            };
            /** Debug warn, to be repeated many times */
            console.warn('Coord:', loc);
            /** set api URL */
            const apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + loc.lat + '&lon=' + loc.lon + '&APPID=d02ce233789788884574bba8d648b095';
            console.warn('apiURL:', apiURL);
            /** ajax call */
            $.ajax({
                url: apiURL,
                /**
                 * anonymous function to run if ajax call is successful
                 * @param {param} w stores the JSON data
                 */
                success: (w) => {
                    console.warn('API Success');
                    console.warn(w.name, w.sys.country);
                    /** sets location */
                    $('#location').hide().html(w.name + ', ' +
                    w.sys.country).fadeIn(5000);
                    console.warn(w.weather[0].icon);
                    /** sets weather icon */
                    $('#icon').hide().html('<img src="http://openweathermap.org/img/w/' +
                    w.weather[0].icon + '.png">').fadeIn(5000);
                    /** get Kelvin temp and convert to C to 1 decimal */
                    const tempC = w.main.temp - 273.15;
                    const tempC2 = tempC.toFixed(1);
                    console.warn(tempC2);
                    $('#temperature').hide().html(tempC2).fadeIn(5000);
                    console.warn(w.main.humidity);
                    /** hide and fade unit link */
                    $('#unit').hide().fadeIn(5000);
                    /** set humidity */
                    $('#humidity').hide().html(w.main.humidity +
                    '%').fadeIn(5000);
                    console.warn(w.weather[0].description);
                    /** set weather description */
                    $('#description').hide().html(w.weather[0].description)
                    .fadeIn(5000);
                    /** calls convertTemp function after ajax data
                    is written to html so it can use it */
                    convertTemp();
                    changeBackground(w.weather[0].icon);
                    $('#loading').hide();
                },
            });
        }
    );
}

/** Temperature unit converstion function on click, can't use console to debug
because it will be used as a callback and use data from the ajax call */
function convertTemp() {
    const initTempStr = $('#temperature').text();
    const initTemp = parseFloat(initTempStr);
    /** if Celsius, convert to Fahrenheit on click, then call function again */
    if ($('#unit').text() == 'C') {
        const tempF = initTemp * (9 / 5) + 32;
        const tempF2 = tempF.toFixed(1);
        $('#unit').click(function() {
            $('#temperature').text(tempF2);
            $('#unit').text('F');
            /** recursive call */
            convertTemp();
        });
    }
    /** if Fahrenheit, convert to Celsius on click, then call function again */
    else if ($('#unit').text() == 'F') {
        const setTempStr = $('#temperature').text();
        const setTemp = parseFloat(setTempStr);
        const tempC = (setTemp - 32) * (5 / 9);
        const tempC2 = tempC.toFixed(1);
        $('#unit').click(function() {
            $('#temperature').text(tempC2);
            $('#unit').text('C');
            /** recursive call */
            convertTemp();
        });
    }
}
/** Change background image depending on weather, can't use console to debug
because it will use data from the ajax call */
function changeBackground() {
    switch (icon) {
        case '01d':
            console.warn('changeBackground icon switch case 01d');
            $('#background').hide().css('background-color', 'blue')
            .fadeIn(5000);
            break;
        default:
            console.warn('changeBackground icon switch case default');
            $('#background').hide().css('background-color', 'red')
            .fadeIn(5000);
    }
}

/** Execute code on document ready */
$(document).ready(() => {
    $('#unit').hide();
    getLoc();
    convertTemp();
});
