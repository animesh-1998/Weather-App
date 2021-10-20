const request = require("request");
const geocode = (address,callback) => {
    const URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYW5pbWVzaDE5OTgiLCJhIjoiY2t1cWdncjlqMGhqczJ2cXZtbm15YTY0eiJ9.vrmTi2_YEQgteukqZ0JixA";
    request({url:URL,json:true},(error,{body}) => {
        if(error){
            callback(undefined,"Unable to connect to location services");
        }
        else if(body.features.length===0){
            callback(undefined,"Something went wrong!Please try again with another search");
        }
        else{
            callback({latitude:body.features[0].center[1],longitude:body.features[0].center[0],location:body.features[0].place_name},undefined);
        }
    })
}
module.exports = geocode;
