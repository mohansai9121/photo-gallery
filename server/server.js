const express = require('express')
const dotenv = require('dotenv')
const axios = require('axios')
const cors = require('cors')
const { json } = require('body-parser')

const app = express()

app.use(cors)
app.use(json)

const {parsed:config} = dotenv.config()

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`

const auth = {
    username: config.API_KEY,
    password: config.API_SECRET
}

app.get('/photos',async (req,res)=>{
    const response = await axios.get(BASE_URL+'/resources/image',{
        auth,
        params:{
            next_cursor:req.query.next_cursor
        }
    })
    return res.send(response.data)
})

app.get('/search',async (req,res)=>{
    const response = await axios.get(BASE_URL+'/resourses/search',{
        auth,
        param:{
            expression:req.query.expression
        }
    })
    return res.send(response.data)
})

const port = 7000

app.listen(port, console.log(`server running on port ${port}`))
