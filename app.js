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
    const email = req.body.email
    arr.push({name: req.body.name, email: req.body.email, password: req.body.password})
    // res.end('Register successfully')
    res.redirect('/');
})

//logination
app.get('/login', (req, res)=> {
    res.render('login', {users: user.splice(0), isUsers: arr.length > 0});
})

app.post('/login', (req, res)=> {
    console.log(req.body);
    const result = arr.find(value => value.password === req.body.password);
    user.push(result)
    if (result == false) {
        res.redirect('/render-reg')
    } else {
        res.redirect('/login')
    }
});

app.get('/user', (req, res)=> {
    res.render('user', {user: arr, hasUsers: arr.length > 0,});
    console.log(arr);
})

// app.post('/users-post', (req,res)=> {
//     const email = req.body.email;
//    arr.push({name: req.body.username, email: req.body.email, password: req.body.password})
//     // console.log(users)
//     res.redirect('/login');
// })

// // ---
// app.get(`/user`, (req, res) => {
//     res.render(`user`, {list: arr})
// })
// let singleUser = []
// app.get(`/:single`, (req, res) => {
//     const { single } = req.params
//     const user = arr.filter((value, index) => {
//         if (value.name === single) {
//             return value
//         }
//     })
//     singleUser.push(user)
//     res.render(`delete`, {user: user})
// })
//
// app.post(`/:single/delete`, (req, res) => {
//     let isCorrect;
//     for (let usersListElement of arr) {
//         if (usersListElement.name === req.body.nam){
//             isCorrect = true;
//             arr.splice(arr.indexOf(usersListElement),1 )
//         }else {
//             isCorrect= false
//         }
//     }
//     res.render(`last`, {corr: isCorrect})
// });

//
//
// app.get('/users', (req, res)=> {
//     res.json([
//         {name: 'Dima', age: 23},
//         {name: 'Irena', age: 22}
//     ])
// });
//
// app.post('/users', (req, res)=> {
//     res.end('All users here')
// });

//port
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server 5000');
})
