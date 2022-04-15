
// cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
apiKey = "8188d200fe9794c1ad37fcd90a20900c"
todayDate = moment().format("l")
$(document).ready(function ()
{
    
    $("#searchBtn").click(function () {
        // console.log(JSON.stringify($("#cityInput").val()))
        var city = $("#cityInput").val().toUpperCase()
        cityApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`

        fetch(cityApiUrl)
        
        .then((response) => response.json())
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
                        // console.log('yes')
                        }
                        var iconUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
                        const icon = $(`<img src="${iconUrl}">`)
                        // loadIcon(current)
                    const searchedCity = $(`<div class="col-12 h-100 text-left bg-warning border border-dark"><h3>${city} (${todayDate})</h3></div>`)
                    const cityDataUl = $(`<ul style="list-style: none;"></ul>`)
                    const cityDataLiTemp = $(`<li>Temperature: ${current.temp}</li>`)
                    const cityDataLiWind = $(`<li>Wind Speed: ${current.wind_speed}</li>`)
                    const cityDataLiHumidity = $(`<li>Humidity: ${current.humidity}</li>`)
                    const cityDataLiUv = $(`<li>UV Index: ${current.uvi}</li>`)
                    cityDataUl.append(cityDataLiTemp)
                    cityDataUl.append(cityDataLiWind)
                    cityDataUl.append(cityDataLiHumidity)
                        cityDataUl.append(cityDataLiUv)
                        searchedCity.append(icon)
                    $("#city-current").append(searchedCity)
                        searchedCity.append(cityDataUl)
                        
                    if ($("#5-day").children().length > 0) {
                            $("#5-day").empty()
                        }    
                    for (let i = 0; i < daily.length - 3; i++) {
                        console.log(daily[i])
                        var dailyIconUrl = `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png`
                        const dailyIcon = $(`<img  src="${dailyIconUrl}" >`)
                        var fiveDayDate = moment().add(i, 'days').format("l")
                        var dayTemp = $(`<div class="row"><ul style="list-style: none;" class='col-12 card bg-dark' id="day-list${i}"><h5 class="card-title text-light">${fiveDayDate}</h5><li class="bg-primary">Temp: ${daily[i].temp.day}</li><li class="bg-primary"> Wind: ${daily[i].wind_speed}</li><li class="bg-primary"> Humidity: ${daily[i].humidity}</li></ul></div>`)
                        
                        $("#5-day").append(dayTemp)
                        $(`#day-list${i}`).append(dailyIcon)
                        }
                        
                    })
        })
        cityCheck(city)
        
    })
    var cityCheck = (city) =>
    {
        var cityThere = false
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage['city' + i] === city)
            {
                cityThere = true
                break
            }
        }
        if (cityThere === false)
            {
            localStorage.setItem('city' + localStorage.length, city)
            const preSearch = $(`<li class"pt-5">${city}</li>`)
                        $("#prev-search").append(preSearch)
        }
    }
    var loadCity = function ()
    {
        Object.keys(localStorage).forEach((key) =>
        {
            city = localStorage.getItem(key)
            const preSearch = $(`<li class="pt-3">${city}</li>`)
                        $("#prev-search").append(preSearch)
        })
    }
    loadCity()
    var loadIcon = function (current)
    {
        var iconUrl = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
        const icon = (`<img src= ${iconUrl}>`)
        // $(this).attr("src", `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`)
        $("#cityCurrent").append(icon)
        console.log('yep')
        
    }
});
