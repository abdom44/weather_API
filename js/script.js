let searchInput =document.getElementById('searchInput');
// first day
///////////////////////////////
let today = document.getElementById('today');
let dateOFToday =document.getElementById('dateOfToday');
let location1 =document.getElementById('location');
let temp =document.getElementById('temp');
let weatherIcon =document.getElementById('weatherIcon');
let status1 =document.getElementById('status');
let umbrella =document.getElementById('umbrella');
let wind =document.getElementById('wind');
let compass =document.getElementById('compass');
/////////////////////////////////
// sec day 

let secDayHeader = document.getElementById('secDayHeader');
let secDayIcon = document.getElementById('secDayIcon');
let forecast2Temp = document.getElementById('forecast2Temp');
let small2 = document.getElementById('small2');
let secDayStatus = document.getElementById('secDayStatus');
////////////////////////////
// third day 
let thirdDayHeader = document.getElementById('thirdDayHeader');
let thirdDayIcon = document.getElementById('thirdDayIcon');
let forecast3Temp = document.getElementById('forecast3Temp');
let small3 = document.getElementById('small3');
let thirdDayStatus = document.getElementById('thirdDayStatus');
///////////////////////////
let Days = ["Sunday", "monday",'Thuesday','Wednesday','Thursday','Friday','Saturday' ]
function getDay(x) {
    let d =  new Date();
    let day = d.getUTCDay()+x;
    if(day>6){day-=7}
    return day
}

weather('cairo')


searchInput.addEventListener('keyup',function(){
    weather(`${searchInput.value}`);
})


async function weather(input){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=46b90b63723e42b5bfb134311212109&q=${input}&days=3`);
    let data = await res.json();
    if (!data.error){
        getCurrent(data);
        getTommorow(data);
        getAfterTommorow(data);
    }
    else{
    
    }

}



function getCurrent(data) {
    today.innerHTML=Days[getDay(0)];
    dateOFToday.innerHTML=data.forecast.forecastday[0].date;
    location1.innerHTML=data.location.name;
    temp.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
    weatherIcon.setAttribute('src',`https:${data.current.condition.icon}`);
    status1.innerHTML = data.current.condition.text;
    umbrella.innerHTML= '<img src="images/icon-umberella.png" class="me-2" alt="">20%';
    wind.innerHTML ='<img src="images/icon-wind.png" class="me-2" alt="">'+data.current.wind_kph +'km/h';
    compass.innerHTML ='<img src="images/icon-compass.png" class="me-2" alt="">'+data.current.wind_dir;
// console.log;
}

function getTommorow(data) {
    secDayHeader.innerHTML=Days[getDay(1)];
    secDayIcon.setAttribute('src',`https:${data.forecast.forecastday[1].day.condition.icon}`);
    forecast2Temp.innerHTML=data.forecast.forecastday[1].day.maxtemp_c +'<sup>o</sup>C';
    small2.innerHTML=data.forecast.forecastday[1].day.mintemp_c +'<sup>o</sup>';
    secDayStatus.innerHTML= data.forecast.forecastday[1].day.condition.text;
}

function getAfterTommorow(data) {
    thirdDayHeader.innerHTML=Days[getDay(2)];
    thirdDayIcon.setAttribute('src',`https:${data.forecast.forecastday[2].day.condition.icon}`);
    forecast3Temp.innerHTML=data.forecast.forecastday[2].day.maxtemp_c +'<sup>o</sup>C';
    small3.innerHTML=data.forecast.forecastday[2].day.mintemp_c +'<sup>o</sup>';
    thirdDayStatus.innerHTML= data.forecast.forecastday[2].day.condition.text;
}