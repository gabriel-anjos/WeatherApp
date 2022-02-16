const api ={
    key:"b39f7751ca7b4c20ca547230d54eea6a",
    key2:"3UA_ZKdxCsNDj8B9uoHGyboI1PQOQEP4eC4Fjmfqy6M",
    base:"http://api.openweathermap.org/data/2.5/",
    base2:"https://api.unsplash.com/search/photos/"
}

const searchbox= document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        getResults2(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
    //obs:depois dar uma olhada nesse lance do pq ta funcionando.
}
function getResults2(query){
    fetch(`${api.base2}?query=${query}&per_page=1&client_id=${api.key2}`)
    .then(res=>{
        if(res.ok){
            return res.json()
        }else{
            alert(city.status)
        }

        })
        // .then(data=>{
        //     console.log(data.results[0].urls.raw)
        // })
        .then(displayResults2)
    }

    function displayResults2(data){
        console.log(data)
        let image = data.results[0].urls.raw;
        console.log(image);
         let cityImage = document.querySelector('body');
         console.log(cityImage)
        cityImage.style.backgroundImage = `url(${image})`;
    }


function displayResults(weather){
    // console.log(weather);
   
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dataBuilder(now);
    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dataBuilder(d){
    let months = ["January","February","March","April","May","June","July","August","September",
"October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}${date}${month}${year}`

}
// https://openweathermap.org/data/2.5/find?q=london&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric