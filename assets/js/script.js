
// cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
apiKey = "8188d200fe9794c1ad37fcd90a20900c"
$(document).ready(function ()
{
    $("#searchBtn").click(function () {
        console.log($("#cityInput").val())
        var city = $("#cityInput").val()
        cityApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        fetch(cityApiUrl)
        
        .then((response) => response.json())
        // .then((data) =>
        // {
        //     console.log(cityLat)
        .then(function (data)
            {
                var cityLon = data[0].lon
                var cityLat = data[0].lat
                apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude={part}&appid=${apiKey}`
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) =>
                {
                    console.log(data.daily)
                })
            })
            
        })
        
        
        
        //var citySearch = $(this).siblings("cityInput").val()
        //console.log(citySearch.val())
    
});
