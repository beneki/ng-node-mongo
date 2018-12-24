const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose')
const db = "mongodb://hoseingp:1370azizi@ds143892.mlab.com:43892/eventsdb" //process.env.MONGODB_URI || "mongodb://localhost:27017/eventsdb"
const companyModel = require('../models/company')

mongoose.connect(db, { useNewUrlParser: true }, err => {
    if(err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

const User = require('../models/user')
router.get('/', (req, res) => {
    res.send('From API route ayy')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registereduser) => {
        if(error) {
            console.error(error)
        } else {
            let payload = { subject: registereduser._id }
            let token = jwt.sign(payload, "secretKey")
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body


    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, "secretKey")
                    res.status(200).send({token})
                }
            }
        }
    })

})

router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })

router.get('/special', verifyToken, (req, res) => {
let specialEvents = [
    {
    "_id": "1",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    },
    {
    "_id": "2",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    },
    {
    "_id": "3",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    },
    {
    "_id": "4",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    },
    {
    "_id": "5",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    },
    {
    "_id": "6",
    "name": "Auto Expo Special",
    "description": "lorem ipsum",
    "date": "2012-04-23T18:25:43.511Z"
    }
]
res.json(specialEvents)
})
 
router.post('/companies', (req, res) => {
    let tbConfig = req.body
    companyModel.paginate({}, { page: tbConfig.page, limit: tbConfig.limit }, function(err, result) {
        // result.docs
        // result.total
        // result.limit - 10
        // result.page - 3
        // result.pages
        res.json(result)
    });

})

router.post('/insert', (req, res) => {
    let companyData = req.body
    let companyRow = new companyModel(companyData)
    companyRow.save((error) => {
        if(error) {
            console.error(error)
        } else {
            let payload = { subject: registereduser._id }
            res.status(200).send({msg: "Data inserted successfully"})
        }
    })
})

router.put('/update', (req, res) => {
    let companyData = req.body
    companyModel.collection.updateOne({compCode: companyData.compCode}, companyData)
    console.log('updated')
})

router.get('/modifassist', (req, res) => {
    
    let companies = [
        {
            "company": "Tad"
        },
        {
            "company": "Salvador"
        },
        {
            "company": "Channing"
        },
        {
            "company": "Castor"
        },
        {
            "company": "Damon"
        },
        {
            "company": "Randall"
        },
        {
            "company": "Abraham"
        },
        {
            "company": "Keefe"
        },
        {
            "company": "Steven"
        },
        {
            "company": "Giacomo"
        },
        {
            "company": "Xavier"
        },
        {
            "company": "Dominic"
        },
        {
            "company": "Gregory"
        },
        {
            "company": "Holmes"
        },
        {
            "company": "Marshall"
        },
        {
            "company": "Curran"
        },
        {
            "company": "Lucian"
        },
        {
            "company": "Hakeem"
        },
        {
            "company": "Sean"
        },
        {
            "company": "Avram"
        },
        {
            "company": "August"
        },
        {
            "company": "Oscar"
        },
        {
            "company": "Chester"
        },
        {
            "company": "Hop"
        },
        {
            "company": "Malcolm"
        },
        {
            "company": "Kenneth"
        },
        {
            "company": "Dennis"
        },
        {
            "company": "Burton"
        },
        {
            "company": "Armand"
        },
        {
            "company": "Alden"
        },
        {
            "company": "Finn"
        },
        {
            "company": "Owen"
        },
        {
            "company": "Quamar"
        },
        {
            "company": "Lucas"
        },
        {
            "company": "Francis"
        },
        {
            "company": "Clarke"
        },
        {
            "company": "Lance"
        },
        {
            "company": "Jeremy"
        },
        {
            "company": "Brent"
        },
        {
            "company": "Oliver"
        },
        {
            "company": "Keegan"
        },
        {
            "company": "Gavin"
        },
        {
            "company": "Ezra"
        },
        {
            "company": "Damian"
        },
        {
            "company": "Blake"
        },
        {
            "company": "Fuller"
        },
        {
            "company": "Garrett"
        },
        {
            "company": "Fritz"
        },
        {
            "company": "Ishmael"
        },
        {
            "company": "Zeph"
        },
        {
            "company": "Owen"
        },
        {
            "company": "Gage"
        },
        {
            "company": "Aaron"
        },
        {
            "company": "Honorato"
        },
        {
            "company": "Tarik"
        },
        {
            "company": "Griffith"
        },
        {
            "company": "Brent"
        },
        {
            "company": "Chancellor"
        },
        {
            "company": "Jacob"
        },
        {
            "company": "Mannix"
        },
        {
            "company": "Peter"
        },
        {
            "company": "Gray"
        },
        {
            "company": "Ciaran"
        },
        {
            "company": "Keane"
        },
        {
            "company": "Tanner"
        },
        {
            "company": "Alan"
        },
        {
            "company": "Magee"
        },
        {
            "company": "Macaulay"
        },
        {
            "company": "Lev"
        },
        {
            "company": "Rashad"
        },
        {
            "company": "Drew"
        },
        {
            "company": "Micah"
        },
        {
            "company": "Kermit"
        },
        {
            "company": "Bevis"
        },
        {
            "company": "Stewart"
        },
        {
            "company": "Leroy"
        },
        {
            "company": "Ralph"
        },
        {
            "company": "Hop"
        },
        {
            "company": "Abel"
        },
        {
            "company": "Lev"
        },
        {
            "company": "Hayes"
        },
        {
            "company": "Zephania"
        },
        {
            "company": "Wallace"
        },
        {
            "company": "Talon"
        },
        {
            "company": "Rajah"
        },
        {
            "company": "Merrill"
        },
        {
            "company": "Thane"
        },
        {
            "company": "Benedict"
        },
        {
            "company": "Tucker"
        },
        {
            "company": "Valentine"
        },
        {
            "company": "Dominic"
        },
        {
            "company": "Ross"
        },
        {
            "company": "Davis"
        },
        {
            "company": "Fuller"
        },
        {
            "company": "Valentine"
        },
        {
            "company": "Ethan"
        },
        {
            "company": "Tarik"
        },
        {
            "company": "Robert"
        },
        {
            "company": "Garth"
        },
        {
            "company": "Simon"
        }
    ];
    let i = 5;
    companyModel.collection.update(
        {},
        {$set : {"isActive": true}},
        {upsert:false,
        multi:true}
    )
    //companies.forEach((val) => {
        // companyModel.collection.insert(

        //     {
        //         "compCode": i.toString(),
        //         "compCodeHRIS": "1251",
        //         "compName": val.company,
        //         "compAbbrName": val.company,
        //         "compRegNo": "123123",
        //         "compLogo": "13221312",
        //         "compActivateDate": "21/JUL/2010"
        //       }
        // )
        // i++;
    //})
    res.send('updated')

})

module.exports = router