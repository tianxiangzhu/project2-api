const { Client } = require('pg');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const client = new Client({
    user: 'fwxntspyqtrmml',
    host: 'ec2-52-22-238-188.compute-1.amazonaws.com',
    database: 'd93p03icloe35f',
    password: '452dff5bffa2049a59c1266abbeafa01daf48bf6c47ca1beb260250f8695edf1',
    port: 5432,
    ssl: true 
  })
  console.log("Connecting")
    client.connect().then(x => console.log("Connect Complete DB",x)).catch(e => console.log("caught error", e))
  console.log("Connected")

function strinc (str,inc){
    return (
    str.toLowerCase().includes(inc.toLowerCase())
    )
}
function wildcard (s) {
    return `%${s}%`
}
const data = {
    findbusinesses:(response,text,city,state) => {
        
        client.query("select * from nearbyplaces.business where name ilike $1 and city ilike $2 and state ilike $3", [wildcard(text),wildcard(city),wildcard(state)],(err, res) => {

            response.status(200).json(res.rows)
        })
    },
    addbusiness:(response,b) => {
        client.query("INSERT INTO nearbyplaces.business (name, address, city, state, zip, phone)\
        VALUES($1,$2,$3,$4,$5,$6);",[b.name,b.address,b.city,b.state,b.zip,b.phone], (err, res) => {

            response.status(200).json("ok")
        })
    },
    updatebusiness:(response,b) => {
        console.log("updatebussiness",b)
        client.query("UPDATE nearbyplaces.business SET name=$1, address=$2, city=$3, state=$4, zip=$5, phone=$6 WHERE id=$7;",
            [b.name,b.address,b.city,b.state,b.zip,b.phone,b.id],(err, res) => {
            console.log(err, res)
            response.status(200).json("ok")
        })
        
    },
    addupdatebusiness:(business) => {
        console.log("addupdate:", business)
        data.addbusiness(business)
    },
    deletebusiness:(id) => {
        businesses[id].active = false
    }
    ,
    allbusinesses:(response) => {
        client.query('SELECT * from nearbyplaces.business', (err, res) => {

            response.status(200).json(res.rows)
        })
    },
    businessbyid:(id) => {

        return businesses[id]
    },
    addreview:(id,review) => {
        console.log("addreview",id,review)
        const b = businesses[id]
        console.log("review:",b)
        b.reviews.push(review)

    }
    

}
module.exports.data = data