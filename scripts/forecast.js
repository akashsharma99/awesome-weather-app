const key = 'GrlCqWnXP4QUf6CosGaheh3hXIu5XmJY';

//get weather info
const getWeather = async (id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base+query);
    const data = await response.json();
    
    return data[0];

};

//get city key
const getCity = async (city) => {
    const base='https://dataservice.accuweather.com/locations/v1/cities/search';
    const query=`?apikey=${key}&q=${city}`;
    const response = await fetch(base+query);
    const data = await response.json();
    return data[0];
};

//getting forecast

// getCity('thakurpukur')
//     .then(data=>{
//         return getWeather(data.Key);
//     })
//     .then(data=>{
//         console.log(data);
//     })
//     .catch(error=>console.log(error));

