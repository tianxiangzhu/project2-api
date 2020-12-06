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
    console.log("TCS",term,city,state)
    services.findbusinesses(response,term,city,state)
})
app.post('/place', (request, response) => {
    console.log("place:", request.body)
    if (request.body.update){
        services.updatebusiness(response,request.body)

    }
    else {
        services.addbusiness(response,request.body)  
    }
    

})

app.get('/places',(request, response) => {
    console.log("services",services)
    console.log("allb", services.allbusinesses)
    services.allbusinesses(response)
})
app.post('/review/:placeId',(request, response) => { 
    let placeid = parseInt(request.params.placeId)
    console.log(request.body)
    let review = request.body.review
    services.addreview(placeid,review)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
