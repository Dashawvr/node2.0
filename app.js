const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'views')))

let arr = [
    // {name: 'Dasha', age: 19},
    // {name: 'Viktor', age: 24}
];

let user = [];
// settings
app.set('view engine', '.hbs')
app.engine('.hbs', expressHandlebars({defaultLayout: false}))
app.set('views', path.join(process.cwd(), 'views'))

//main
app.get('/', (req, res)=> {
    console.log(req);
    res.render('main', {list: arr})
});

//registration
app.get('/render-reg', (req, res)=> {
    res.render('registration');
})

app.post('/reg', (req,res)=> {
    console.log(req.body.name);

    const regist = arr.find(value => value.email === req.body.email);
    if (regist === undefined) {
        arr.push({name: req.body.name, email: req.body.email, password: req.body.password})
        res.redirect('/');
    } else {
        // не дає зареєструвати юзера бо такий юзер вже існує в user List
        res.redirect('/render-reg');
    //    і редіректає його на ту саму стору
    }
})

//logination
app.get('/login', (req, res)=> {
    res.render('login', {users: user.splice(0), isUsers: arr.length > 0});
})

app.post('/login', (req, res)=> {
    console.log(req.body);
    const login = arr.find(value => value.password === req.body.password);
    user.push(login)
    if (login === false) {
        res.redirect('/render-reg')
    } else {
        res.redirect('/login')
    }
});

app.get('/user', (req, res)=> {
    res.render('user', {user: arr, hasUsers: arr.length > 0,});
    console.log(arr);
})

//port
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server 5000');
})
