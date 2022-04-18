
// cityApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
apiKey = "8188d200fe9794c1ad37fcd90a20900c"
todayDate = moment().format("l")
$(document).ready(function ()
{

    // var errorCheck = (response) =>
    // {
    //     if (!response.ok)
    //     {
    //         throw Error(response.statusText)
    //     }
    //     //return response
    // }
var start = function ()
{
        
        
    // console.log(JSON.stringify($("#cityInput").val()))
    var city = $("#cityInput").val().toUpperCase()
    cityApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`

    fetch(cityApiUrl).then(function (response)
    {
        if (!response.ok)
        {
            throw Error(response.statusText)
        }
        response.json().then(function (data)
        {
            console.log(data)
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
                    var uviColor
                    var humidityColor
                    // console.log(daily)
                    // console.log (current)
                    if ($("#city-current").children().length > 0)
                    {
                        $("#city-current").empty()
                        // console.log('yes')
                    }
                            var iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
                            const icon = $(`<img src="${iconUrl}">`)
                            // loadIcon(current)
                            const searchedCity = $(`<div class="col-12 h-100 text-left border border-dark mt-2"><h3>${city} (${todayDate})</h3></div>`)
                            const cityDataUl = $(`<div" "class=col"></div>`)
                            const cityDataLiTemp = $(`<h5 class="col-3">Temperature: ${current.temp}</h5>`)
                            const cityDataLiWind = $(`<h5 class="col-3">Wind Speed: ${current.wind_speed}</h5>`)
                            const cityDataLiHumidity = $(`<h5 class="col-3">Humidity: ${current.humidity}</h5>`)
                            const cityDataLiUv = $(`<h5 class="fs-6 col-3 ">UV Index: <span id="uviColor">${current.uvi}  </span></h5>`)
                            cityDataUl.append(cityDataLiTemp)
                            cityDataUl.append(cityDataLiWind)
                            cityDataUl.append(cityDataLiHumidity)
                            cityDataUl.append(cityDataLiUv)
                            searchedCity.append(icon)
                            $("#city-current").append(searchedCity)
                    searchedCity.append(cityDataUl)
                        uvColor(current)
                        
                            if ($("#5-day").children().length > 0)
                            {
                                $("#5-day").empty()
                            }
                            for (let i = 0; i < daily.length - 3; i++)
                            {
                                console.log(daily[i])
                                var dailyIconUrl = `https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png`
                                const dailyIcon = $(`<img  src="${dailyIconUrl}" >`)
                                const imgBgColor = $(`<div id="bg-color" class="bg-primary"></div>`)
                                var fiveDayDate = moment().add(i, 'days').format("l")
                                var dayTemp = $(`<div class="row"><ul style="list-style: none;" class='col-12 card bg-primary' id="day-list${i}"><h5 class="card-title text-light">${fiveDayDate}</h5><li class="bg-primary">Temp: ${daily[i].temp.day}</li><li class="bg-primary"> Wind: ${daily[i].wind_speed}</li><li class="bg-primary"> Humidity: ${daily[i].humidity}</li></ul></div>`)
                        
                                $("#5-day").append(dayTemp)
                                imgBgColor.append(dailyIcon)
                                $(`#day-list${i}`).append(imgBgColor)
                            }
                        
                        })
                })
    })
            cityCheck(city)
        }
var loadCity = function ()
    {
        Object.keys(localStorage).forEach((key) =>
        {
            city = localStorage.getItem(key)
            const preSearch = $(`<p class="py-2 pre-link bg-secondary border rounded text-center">${city}</a></p>`)
                        $("#prev-search").append(preSearch)
        })
    }
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
            const preSearch = $(`<p class="py-2 pre-link bg-secondary border rounded text-center">${city}</a></p>`)
                        $("#prev-search").append(preSearch)
        }
    }
    loadCity()
    
    
$(".pre-link").on("click", function ()
    {
    const preLink = $("#cityInput").val($(this).text())
    start()
})
    if ($("#city-current").children().length === 0)
    {
        console.log("null")
        $("#cityInput").val("minneapolis") 
        start()
    }
    $("#searchBtn").click(function ()
    {
        start()
    })
    var uvColor = function (current)
    {
        if (current.uvi <= 3)
        {
            $("#uviColor").addClass("bg-success rounded")
        }
    }

    
});
