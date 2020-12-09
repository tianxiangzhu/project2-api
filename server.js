const express = require("express")
const { response } = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT||3000
const {services} = require("./data")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
  
app.get('/search/:searchTerm/:location',(request, response) => {
    const term = request.params.searchTerm
    const [city,state] = request.params.location.split(",")
    services.findbusinesses(response,term,city,state)
})
app.post('/place', (request, response) => {
    if (request.body.update){
        services.updatebusiness(response,request.body)
    }
    else {
        services.addbusiness(response,request.body)  
    }
    

})

app.get('/places',(request, response) => {
    services.allbusinesses(response)
})
app.post('/review/:placeId',(request, response) => { 
    let place = parseInt(request.params.placeId)
    let review = request.body.review
    services.addreview(place,review)
})

app.listen(port, () => {
    console.log('${port}')
})

app.delete('/place/:placeId',(request, response) => {
    let place = parseInt(request.params.placeId)
    services.deletebusiness(response,place)
})
