const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time=document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const error=document.querySelector('.error');
const inputBox=document.querySelector('.input-box');
const updateCity = async (city)=> {
    const cityDets = await getCity(city);
    let weather=undefined;
    if(cityDets)
    weather = await getWeather(cityDets.Key);
    return { cityDets, weather };
};

const updateUI = (data)=>{
    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties i.e creating variables from object properties
    const {cityDets,weather} = data;
    //checking if location not found by the api
    if(!cityDets){
        
        card.classList.add('d-none');
        error.textContent='Location not available :(';
        error.classList.remove('d-none');
        return;
    }
    //if location found hide error div
    error.classList.add('d-none');
    //update details on the template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    //create images icons
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    let timeSrc = null;
    timeSrc = (weather.IsDayTime)?'img/day.svg':'img/night.svg';
    time.setAttribute('src',timeSrc);

    //show card if not present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};





cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    inputBox.blur();
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new city info
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err=>console.log(err));
    localStorage.setItem('city',city);

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data=>updateUI(data))
        .catch(err=>console.log(err));
}
