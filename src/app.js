const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {
  //matches the name without the extention
  res.render('index', {
    title: 'Weather',
    name: 'Tzur'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tzur'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'This is a help message',
    name: 'Tzur'

  })
})


app.get('/weather', (req, res) => {
  const address = req.query.address
  console.log(address);
    
  if(!address){
    return res.send({
      error: 'You must provide a address'
    })
  }

//need to default the object, if there is error it is empty and cannot distructure
  geocode(address, (error, {latitude, longtitude, location} ={}) => {
    if (error){
      //will retun and not continue after the log
      return res.send({ error })
    }
    forecast(latitude, longtitude, (error, dataForecast) => {
      if (error){
        return res.send({ error })      
      }
        res.send({
          location,
          address: req.query.address,
          forecast: dataForecast
        });
    })
  })

  // // res.send({
  // //   forecast: 'It is raining',
  // //   location: 'Jerusalem',
  // //   address: address
  // // });
})


app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  });
})

app.get('/help*', (req, res) => {
  res.render('404', {
    errorMsg: 'Help article not exist',
    name: 'Tzur',
    title: '404'
  })
})

//has to come last
app.get('*', (req, res) => {
  res.render('404', {
    errorMsg: 'Page not found',
    title: '404',
    name: 'Tzur'
  });
})

app.listen(3000, () => {
  console.log('server is up on port 3000');
  
});



//43
// app.com
// app.com/help
// app.com/about
//C:\Users\tzurielw\Desktop\node\web-server\public

//never will happen
// app.get('', (req, res) => {
//   res.send('<h1>weather</h1>');
// })

//responsing a json
// app.get('/help', (req, res) => {
//   res.send([{
//     name: 'Tzuriel',
//     age: 29
//   },
//   {
//     name: 'Sara',
//     age: 28
//   }]);
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About page!</h1>');
// })

