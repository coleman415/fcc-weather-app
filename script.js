/** Long function that gets location from geolocation api
then uses that location to get weather data from weather api
then outputs it as HTML onto our index page */
function getLoc() {
    /** Gets coordinates */
    /** navigator.geolocation.getCurrentPosition( */
    $.get('http://ipinfo.io', function(p) {
            const locStr = p.loc;
            const locArr = locStr.split(',');
            /** Debug warn, to be repeated many times */
            console.warn('Coordinate Array:', locArr);
            /** set api URL */
            const apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat='
            + locArr[0] + '&lon=' + locArr[1] +
            '&APPID=d02ce233789788884574bba8d648b095';
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
                        '% humidity').fadeIn(5000);
                    console.warn(w.weather[0].description);
                    /** set weather description */
                    $('#description').hide().html(w.weather[0].description)
                        .fadeIn(5000);
                    /** calls convertTemp function after ajax data
                    is written to html so it can use it */
                    convertTemp();
                    const iconStr = w.weather[0].icon.toString();
                    console.warn('String for changeBackground is:', iconStr);
                    console.warn('The type is: ', typeof iconStr);
                    changeBackground(iconStr);
                    $('#loading').hide();
                },
            });
        }, 'jsonp'
    );
}

/** Temperature unit converstion function on click, can't use console to debug
because it will be used as a callback and use data from the ajax call */
function convertTemp() {
    const initTempStr = $('#temperature').text();
    const initTemp = parseFloat(initTempStr);
    /** if Celsius, convert to Fahrenheit on click, then call function again */
    if ($('#unit').text() == '°C') {
        const tempF = initTemp * (9 / 5) + 32;
        const tempF2 = tempF.toFixed(1);
        $('#unit').click(function() {
            $('#temperature').text(tempF2);
            $('#unit').text('°F');
            /** recursive call */
            convertTemp();
        });
    }
    /**
    * if Fahrenheit, convert to Celsius on click, then call function again */
    else if ($('#unit').text() == '°F') {
        const setTempStr = $('#temperature').text();
        const setTemp = parseFloat(setTempStr);
        const tempC = (setTemp - 32) * (5 / 9);
        const tempC2 = tempC.toFixed(1);
        $('#unit').click(function() {
            $('#temperature').text(tempC2);
            $('#unit').text('°C');
            /** recursive call */
            convertTemp();
        });
    }
}
/**
* Change background image depending on weather, can't use console to debug
* because it will use data from the ajax call
* @param {param} icon string id of weather icon
*/
function changeBackground(icon) {
    console.warn(arguments);
    switch (icon) {
        case '01d':
            console.warn('changeBackground icon switch case 01d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/clearday.jpg')")
                .fadeIn(5000);
            break;
        case '01n':
            console.warn('changeBackground icon switch case 01n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/clearnight.jpg')")
                .fadeIn(5000);
            break;
        case '02d':
            console.warn('changeBackground icon switch case 02d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/fewcloudday.jpg')")
                .fadeIn(5000);
            break;
        case '02n':
            console.warn('changeBackground icon switch case 02n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/fewcloudnight.jpg')")
                .fadeIn(5000);
            break;
        case '03d':
            console.warn('changeBackground icon switch case 03d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/scattercloudday.jpg')")
                .fadeIn(5000);
            break;
        case '03n':
            console.warn('changeBackground icon switch case 03n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/scattercloudnight.jpg')")
                .fadeIn(5000);
            break;
        case '04d':
            console.warn('changeBackground icon switch case 04d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/brokencloudday.jpg')")
                .fadeIn(5000);
            break;
        case '04n':
            console.warn('changeBackground icon switch case 04n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/brokencloudnight.jpg')")
                .fadeIn(5000);
            break;
        case '09d':
            console.warn('changeBackground icon switch case 09d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/showerday.jpg')")
                .fadeIn(5000);
            break;
        case '09n':
            console.warn('changeBackground icon switch case 09n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/showernight.jpg')")
                .fadeIn(5000);
            break;
        case '10d':
            console.warn('changeBackground icon switch case 10d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/rainday.jpg')")
                .fadeIn(5000);
            break;
        case '10n':
            console.warn('changeBackground icon switch case 10n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/rainnight.jpg')")
                .fadeIn(5000);
            break;
        case '11d':
            console.warn('changeBackground icon switch case 11d');
            $('#background').hide().css('background-image', url('http://u.cubeupload.com/csmaher87/thunderday.jpg'))
                .fadeIn(5000);
            break;
        case '11n':
            console.warn('changeBackground icon switch case 11n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/thundernight.jpg')")
                .fadeIn(5000);
            break;
        case '13d':
            console.warn('changeBackground icon switch case 13d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/snowday.jpg')")
                .fadeIn(5000);
            break;
        case '13n':
            console.warn('changeBackground icon switch case 13n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/snownight.jpg')")
                .fadeIn(5000);
            break;
        case '50d':
            console.warn('changeBackground icon switch case 50d');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/mistday.jpg')")
                .fadeIn(5000);
            break;
        case '50n':
            console.warn('changeBackground icon switch case 50n');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/mistnight.jpg')")
                .fadeIn(5000);
            break;
        default:
            console.warn('changeBackground icon switch case default');
            $('#background').hide().css('background-image', "url('http://u.cubeupload.com/csmaher87/clearday.jpg')")
                .fadeIn(5000);
    }
}

/** Execute code on document ready */
$(document).ready(() => {
    $('#unit').hide();
    getLoc();
    convertTemp();
});
