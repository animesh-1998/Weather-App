const request = require("request");

const forecast = (latitude,longitude,callback) => {
    const URL = "http://api.weatherstack.com/current?access_key=ea02daa85ed9e652b86830923715bb7d&query="+latitude+","+longitude+"&units=m";
    request({url:URL,json:true},(error,{body}) => {
        if(error){
            callback(undefined,"Unable to connect to location services");
        }
        else if(body.error){
            callback(undefined,"Something went wrong!Please try again with another search");
        }
        else{
            callback(body.current.weather_descriptions[0]+".It is currently "+body.current.temperature+" degrees out.It feels like "+body.current.feelslike+" degrees out there.The humidity is "+body.current.humidity+"% and the wind speed is "+body.current.wind_speed+"km/hr.",undefined);
        }
    })
}
module.exports = forecast;