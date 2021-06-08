'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')

const exec = require('child_process').exec;
// const myShellScript = exec('sh runMergeCal.sh a.ics b.ics ddfjjdjdk.html');
const myShellScript = exec('sh test.sh');
const shell = require('shelljs')




// Database
const Content = require('../db/db').Content

app.use(express.static(path.join(__dirname, '../public')))
app.use(cors());
app.use('/express', router);

// Receive POST
router.use(bodyParser.urlencoded({ extended: true }))

// Receive JSON
router.use(bodyParser.json({limit: '10mb'}))

// Receive JPEG
router.use(bodyParser.raw({ type: 'application/pdf', limit: '10mb' }))

router.use((request, response, next) => {
  console.log(request.url)
  next()
})

router.use(express.static(path.join(__dirname, '../public')))

router.get('/', (request, response, next) => {
  response.status(200).send('Hello, world')
})

router.get('/insert', (request, response, next) => {
  Content.insertHandins()
  Content.insertAnnouncements()
  Content.insertMails()
  Content.insertCourseMenus()
  response.status(200).send('Insertion Complete!')
})

router.get('/announcements', (request, response, next) => {
  if (request.accepts('application/json') ) {
    const all = JSON.parse(Content.allAnnouncements()[0]["json"])
    response.contentType('application/json')
    response.json(all)
  }
})

router.get('/handins', (request, response, next) => {
  if (request.accepts('application/json') ) {
    const all = JSON.parse(Content.allHandins()[0]["json"])    
    response.contentType('application/json')
    response.json(all)
  }
})

router.get('/courses', (request, response, next) => {
  if (request.accepts('application/json') ) {
    const all = JSON.parse(Content.allCourses()[0]["json"])    
    response.contentType('application/json')
    response.json(all)
  }
})

router.get('/mails', (request, response, next) => {
  if (request.accepts('application/json') ) {
    const all = JSON.parse(Content.allMails()[0]["json"])
    response.contentType('application/json')
    response.json(all)
  }
})

router.post('/upload_handin', (request, response, next) => {
  if (request.accepts('application/pdf') ) {
    Content.insertUploadedHandin(request.body)
  }
})

router.post('/calendar', (request, response, next) => {
  let command = './runMergeCal.sh'
  command += filename(request.body.cal_a)
  command += filename(request.body.cal_b)
  command += " index.html"

  shell.exec(command)
  response.sendFile(path.join(__dirname, '..//index.html'))
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

function exit (err) {
  if (err) console.log('An error occurred: ' + err)

  console.log('Bye, bye!')
  process.exit()
}

// Debugging purposes
app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})

function filename(arg) {

  switch (arg) {
    case 'DA1':
      return " da1.ics"
    case 'DA2':
      return " da2.ics"
    case 'DA3':
      return " da3.ics"
    case 'DA4':
      return " da4.ics"
    case 'DA5':
      return " da5.ics"
    default:
      return " empty.ics"
  }

  
}

// Interruption from keyboard
process.on('SIGINT', exit)