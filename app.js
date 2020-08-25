const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'views')))

// settings
app.set('view engine', '.hbs')
app.engine('.hbs', expressHandlebars({defaultLayout: false}))
app.set('views', path.join(process.cwd(), 'views'))

//registration
app.get('/render-reg', (req, res)=> {
    res.render('registration');
})

app.post('/reg', (req,res)=> {
    console.log(req.body);
    // res.end('Register successfully')
    res.redirect('/');
})
//logination
app.get('/login', (req, res)=> {
    res.render('login');
})
app.post('/login', (req, res)=> {
    console.log(req.body);
    // res.end('Login successfully')
    res.redirect('/');
})

////
app.get('/', (req, res)=> {
    console.log(req);
    // res.write('Write response');
    // res.end('All right');
    res.render('main')
});


app.get('/users', (req, res)=> {
    res.json([
        {name: 'Dima', age: 23},
        {name: 'Irena', age: 22}
    ])
});

app.post('/users', (req, res)=> {
    res.end('All users here')
});

//port
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server 5000');
})
