
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
                apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude={part}&appid=${apiKey}`
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) =>
                    {
                        console.log(data)
                        var daily = data.daily
                        var current = data.current
                        // console.log(daily)
                        // console.log (current)
                    if ($("#city-current").children().length > 0)
                    {
                        $("#city-current").empty()
                        console.log('yes')
                    }
                    const searchedCity = $(`<div class="col-12 h-100 bg-warning border border-dark">${city}</div>`)
                    const cityDataUl = $(`<ul style="list-style: none;"></ul>`)
                    const cityDataLiTemp = $(`<li>Temperature: ${current.temp}</li>`)
                    const cityDataLiWind = $(`<li>Wind Speed: ${current.wind_speed}</li>`)
                    const cityDataLiHumidity = $(`<li>Humidity: ${current.humidity}</li>`)
                    const cityDataLiUv = $(`<li>UV Index: ${current.uvi}</li>`)
                    cityDataUl.append(cityDataLiTemp)
                    cityDataUl.append(cityDataLiWind)
                    cityDataUl.append(cityDataLiHumidity)
                    cityDataUl.append(cityDataLiUv)
                    searchedCity.append(cityDataUl)
                        $("#city-current").append(searchedCity)
                        
                    for (let i = 0; i < daily.length - 3; i++) {
                        console.log(daily[i])
                        // var fiveDayLi
                        var dayTemp = $(`<li class="card col-2 bg-primary">Temp: ${daily[i].temp.day} Wind: ${daily[i].wind_speed} Humidity: ${daily[i].humidity}</li>`)
                        $("#5-day").append(dayTemp)
                    }
                    })
            })
    })
        
        //var citySearch = $(this).siblings("cityInput").val()
        //console.log(citySearch.val())
    
});
