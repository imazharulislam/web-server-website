const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

//define path for express config.
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templete/views');
const partialsPath = path.join(__dirname, '../templete/partials');

//set up handler bar engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//set up express directory for serve.
app.use(express.static(publicDir));

app.get('' ,(req,res) => {
    res.render('index', {
       title: 'Weather ',
       name: 'Mazharul Islam Emon',
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Mazharul Islam Emon'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help Page',
        name: ' Mazharul Islam'
    })
});

app.get('/check', (req,res) => {
    if(!req.query.address){
        res.send({error: 'please provide a address.'})
    } else {
        geocode(req.query.address, (err, {latitude,longitude,location} = {}) => {
            if(err) {
                res.send({error: err})
            } else {
                forecast(latitude, longitude, (forecastErr,forecastData) => {
                    if(forecastErr){
                        res.send({error: forecastErr})
                    } else {
                        res.send({
                            forecastData,
                            location: location,
                            adress: req.query.address,
                        })
                    }
                })
            }
        })
    }
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'you must provide a address'
        });
    } else {
        geocode(req.query.address , (error,response) => {
			if(error){
				res.send({error: error});
			}  else{
				forecast( response.latitude, response.longitude, (forecastErr,forecastData) => {
					if(forecastErr){
						res.send({error: forecastErr})
					} else {
						res.send({
							location: response.location,
							forecast: forecastData
						})
					}
				})
			}
		})
    }
});

app.get('/products', (req,res) => {
    if(!req.query.search) {
      return res.send({
            error: 'you must a search terms'
        })
    } 
    console.log(req.query.search);
    res.send({
        product: []
    })

})



app.get('/help/*', (req,res) => {
    res.render('helpErr', {
        title: 'Help Article',
        details: 'Articel no found',
        name: 'Mazharul Islam Emon'
    })
})


app.get('*' ,(req,res) => {
    res.render('error', {
        title: 'page ',
        name: 'Mazharul Islam Emon'
    })
});


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
