const express = require('express')

require('./db/connection')

const User = require('./models/user')
const Task = require('./models/task')
const PORT = process.env.PORT | 3000
const app = express()

app.use(express.json())

// USER Routes

// Create Users
app.post('/users',(req,res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Get all users
app.get('/users',(req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get user by id
app.get('/users/:id',(req,res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Task routes

// Create Task
app.post('/tasks',(req,res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// Get all users
app.get('/tasks',(req,res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

// Get user by id
app.get('/tasks/:id',(req,res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(PORT,() => {
    console.log('Server running in port '+ PORT)
})

