const apiKey="75fdcfdc6696450c99b175252242403";
const apiurl="https://api.weatherapi.com/v1/current.json?q= ";

const apiForecasturl="https://api.weatherapi.com/v1/forecast.json?q= ";

const apiHistoryurl="https://api.weatherapi.com/v1/history.json?q= ";

const searchBar=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");


async function checkWeather(city){

    //----------------------------- current weather display--------------------------------------

    const response=await fetch(apiurl+city+`&key=${apiKey}`);

    if(response.status==400){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    document.querySelector(".main").style.display="none";
    }else{

        var data = await response.json();

   
    console.log(data);

    document.querySelector(".city").innerHTML=data.location.name;
    document.querySelector(".temp").innerHTML=data.current.temp_c+"°C";
    document.querySelector(".humidity").innerHTML=data.current.humidity+"%";
    document.querySelector(".wind").innerHTML=data.current.wind_kph+" km/h";
    // weatherIcon.src=data.current.condition.icon;

    if(data.current.condition.text=="Clear"){
        weatherIcon.src="img/clear.png";
    }else if(data.current.condition.text=="Partly cloudy"){
        weatherIcon.src="img/partly cloudy.png";
    }else if(data.current.condition.text=="Light rain"){
        weatherIcon.src="img/light rain.png";
    }else if(data.current.condition.text=="Moderate or heavy rain with thunder"){
        weatherIcon.src="img/Moderate or heavy rain with thunder.png";
    }else if(data.current.condition.text=="Overcast"){
        weatherIcon.src="img/overcast.png";
    }

    document.querySelector(".weather").style.display="block";
    document.querySelector(".main").style.display="block";
    document.querySelector(".error").style.display="none";
    }

    // -------------------------forecast weather display --------------------------------

    const responseForecast=await fetch(apiForecasturl+city+`&key=${apiKey}`+`&days=${7}`);

    var data2 = await responseForecast.json();

    console.log(data2);

    for(let i=0;i<6;i++){
        const d = new Date(data2.forecast.forecastday[i+1].date);
        let days = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                    ];
        let dd=days[d.getDay()];
        console.log(dd);

        const t=data2.forecast.forecastday[i+1].day.maxtemp_c; 
              

         document.querySelector(".dayName"+[i+1]).innerHTML=dd; 
        document.querySelector(".temp"+[i+1]).innerHTML=t; 
        document.querySelector(".cardIcon"+[i+1]).src=data2.forecast.forecastday[i+1].day.condition.icon;
        
          
    }

    // -----------------History weather data------------------------------------------------------

    let a=data2.forecast.forecastday[0].date;

    let month=a.substring(5,7);
    let day;

    

    console.log(day   );

    const responseHistory=await fetch(apiHistoryurl+city+`&key=${apiKey}`+`&dt=${2024+"-"+month+"-"+day}`);

    var data3 = await responseHistory.json();

    for(let i=0;i<4;i++){
        day=parseInt(a.substring(8, 10))-(i+1);

        console.log(data3);

        let historyDate=new Date(a.substring(0,4)+"-"+month+"-"+day);

         

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
                    ];        

                let dd=days[historyDate.getDay()];
                console.log(dd);

                const OldTemp=data2.forecast.forecastday[i+1].day.avgtemp_c
                ; 

                document.querySelector(".dayOldName"+[i+1]).innerHTML=dd; 
        document.querySelector(".Oldtemp"+[i+1]).innerHTML=OldTemp; 
        document.querySelector(".cardOldIcon"+[i+1]).src=data2.forecast.forecastday[i+1].day.condition.icon;
        



    }

}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBar.value);
    
})

