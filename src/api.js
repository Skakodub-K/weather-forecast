let apiKey = "439d4b804bc8187953eb36d2a8c26a02";
async function getWeather(cityId) {
    const response = await fetch(`https://openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`);
    const data = await response.json();
    
    return data;
}
async function getFindResult(str) {
    const response = await fetch(`https://openweathermap.org/data/2.5/find?q=${str}&appid=${apiKey}`);
    const data = await response.json();
    return data.list;
}
export {getWeather, getFindResult};