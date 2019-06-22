const hbs = require('hbs');
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000;

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
        title : 'About me',
        name: 'Mazharul Islam Emon'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help page',
        name: ' Mazharul Islam'
    })
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide a address.'
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


app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
});
