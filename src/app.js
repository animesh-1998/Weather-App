const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { resolveSoa } = require('dns');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','hbs');

app.set('views',path.join(__dirname,"../template/views"));

app.use(express.static(path.join(__dirname,"../public")));
hbs.registerPartials(path.join(__dirname,"../template/partials"));
//console.log(path.join(__dirname,"../public"));

app.get('/',(req,res) => {
    res.render('\index',{
        title:'Weather App',
        name:'Animesh Singh'
    })
})

app.get('/help',(req,res) =>{
    res.render('\help',{
        title:"Help",
        message:'We are here to help you!',
        name:'Animesh Singh'
    })
})

app.get('/about',(req,res) =>{
    res.render('\about',{
        title:'About Us',
        name:'Animesh Singh'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must have to provide an address"
        })
    }
    geocode(req.query.address,({latitude,longitude,location}={},error)=>{
        if(error===undefined){
            forecast(latitude,longitude,(forecastData,error)=>{
               if(forecastData===undefined){
                    return res.send({
                        errorMessage:error,
                    });
                }
                return res.send({
                    forecast:forecastData,
                    location:location,
                });
            })
        }
        else{
            return res.send({
                error:error
            })
        }
    });
    
})
app.get('/help/*',(req,res)=>{
    res.render('\page',{
        title:"404 Page",
        message:"Help article not found",
        name:"Animesh Singh"
    });
})
app.get('/*',(req,res)=>{
    res.render('\page',{
        message:"Page not found",
        name:"Animesh Singh"
    });
})

app.listen(port,()=>{
    console.log("Server is running on "+port);
})