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
        const apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
            locArr[0] + '&lon=' + locArr[1] +
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
                const tempF = tempC * (9 / 5) + 32;
                tempF2 = tempF.toFixed(1);
                tempC2 = tempC.toFixed(1);
                console.warn(tempC2, tempF2);
                /** calls convertTemp function after ajax data
                is written to html so it can use it */
                convertTemp(tempC2, tempF2);
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


                const iconStr = w.weather[0].icon.toString();
                const imgURLstr = 'https://u.cubeupload.com/csmaher87/' + iconStr + '.jpg';
                console.warn('String for changeBackground is:', iconStr);
                console.warn('The type is: ', typeof iconStr);
                changeBackground(iconStr, imgURLstr);
                $('#loading').hide();
            },
        });
    }, 'jsonp');
}

/**
 * Convert temperature function
 * @param {param} valueC
 * @param {param} valueF
 */
function convertTemp(valueC, valueF) {
    if ($('#unit').text() == '°C') {
        $('#unit').click(function() {
            $('#temperature').text(valueF);
            $('#unit').text('°F');
            convertTemp(valueC, valueF);
        });
    } else if ($('#unit').text() == '°F') {
        $('#unit').click(function() {
            $('#temperature').text(valueC);
            $('#unit').text('°C');
            convertTemp(valueC, valueF);
        });
    }
};


/**
 * Change background image depending on weather icon info from ajax call
 * @param {param} icon string id of weather icon
 * @param {param} imgURL string URL of background image
 */
function changeBackground(icon, imgURL) {
    console.warn('changeBackground parameters:', icon, imgURL);
    $('#background').hide().css('background-image', 'url(' + imgURL + ')')
        .fadeIn(5000);
    console.warn($('#background').css('background-image'));
}

/** Execute code on document ready */
$(document).ready(() => {
    $('#unit').hide();
    getLoc();
    convertTemp();
});
