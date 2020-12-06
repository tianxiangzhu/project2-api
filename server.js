const express = require("express")
const { response } = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT||3000
const quizzesdata = require("./data")
const scores = []

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/quizzes', (request, response) => {
    response.json(quizzesdata.quizzes)
})

app.get('/quiz/:id',(request, response) => {
    let found = quizzesdata.questions["Quiz"+request.params.id]
    response.json(found)
})
app.post('/score', (request, response) => {
    scores.push(request.body)
    response.json({message: 'Score has saved'})

}
)

app.listen(port, () => {
    console.log(`Port: ${port}`)
})