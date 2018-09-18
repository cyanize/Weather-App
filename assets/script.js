// Init variables, API source, etc.
var coordLa;
var coordLo;
var source = "https://fcc-weather-api.glitch.me/api/current?";
var temperature;
var displayUnit = 'C'; //default is Celsius

//Main function, get IP geolocation data and fill variables
//on page load
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coordLa = "lat=" + position.coords.latitude;
            var coordLo = "lon=" + position.coords.longitude;
            fetchWeather(coordLa, coordLo);
        });
    }

    //Convert Units on click  
    $("#convertUnit").click(function () {
        var displayUnit = $("#convertUnit").text();
        var convertedUnit = displayUnit == "C" ? "F" : "C";
        $("#convertUnit").text(convertedUnit);
        //conversion Formula for Fahrenheit/Celsius
        if (convertedUnit == "F") {
            var fTemp = Math.round(parseInt($("#locTemp").text()) * 9 / 5 + 32);
            $("#locTemp").text(fTemp + " " + String.fromCharCode(176));
        } else {
            $("#locTemp").text(temperature + " " + String.fromCharCode(176));
        }
    });
});

//Get weather Data from glitch.me API and 
//store in variables
function fetchWeather(la, lo) {
    var web = source + la + "&" + lo;
    var desc = "Weather Image";
    $.ajax({
        url: web,
        success: function (values) {
            $("#locCity").text(values.name + ", ");
            $("#locState").text(values.sys.country);
            temperature = Math.round(values.main.temp * 10) / 10;
            $("#locTemp").text(temperature + " " + String.fromCharCode(176));
            $("#convertUnit").text(displayUnit);
            $("#wicon").attr("src", values.weather[0].icon);
        }
    });
}