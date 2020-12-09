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
    client.connect().then(x => console.log("Connect Database",x)).catch(e => console.log("caught error", e))

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
        client.query("select * from nearbyplaces.newtable where name ilike $1 and city ilike $2 and state ilike $3", [wildcard(text),wildcard(city),wildcard(state)],(err, res) => {
            response.status(200).json("find done")
        })
    },
    addbusiness:(response,b) => {
        client.query("INSERT INTO nearbyplaces.newtable (name, address, city, state, zip, phone)\
        VALUES($1,$2,$3,$4,$5,$6);",[b.name,b.address,b.city,b.state,b.zip,b.phone], (err, res) => {
            response.status(200).json("add done")
        })
    },
    updatebusiness:(response,b) => {
        client.query("UPDATE nearbyplaces.newtable SET name=$1, address=$2, city=$3, state=$4, zip=$5, phone=$6 WHERE id=$7;",
            [b.name,b.address,b.city,b.state,b.zip,b.phone,b.id],(err, res) => {
            response.status(200).json("update done")
        })
        
    },
    addupdatebusiness:(business) => {
        data.addbusiness(business)
    },
    deletebusiness:(response,id) => {
        client.query("DELETE FROM nearbyplaces.newtable WHERE id=$1;",[id],
        (err, res) => {
            response.status(200).json("delete done")
        })
    },

    allbusinesses:(response) => {
        client.query('SELECT * from nearbyplaces.business; SELECT text , br.busid FROM nearbyplaces.review r, nearbyplaces.bus_review br where r.id = br.reviewid',
         (err, res) => {
           for (let a = 0 ; a < res[0].rows.length; a++) {
                let b = res[0].rows[a]
                b.reviews = []
                for (c = 0; c <res[1].rows.length; c++){
                    let d = res[1].rows[c]
                    if (b.id == d.busid){
                       b.reviews.push(d.text) 
                    }}
           }
            response.status(200).json(res[0].rows)
        })
    },

    businessbyid:(id) => {
        return businesses[id]
    },

addreview:(response,bid,review) => {
        client.query("INSERT INTO nearbyplaces.review (text) VALUES($1) returning bid",[review],
         (err, res) => {
            client.query("INSERT INTO nearbyplaces.b_to_review (bid,reviewid) VALUES($1,$2)",[bid,res.rows[0].id],
         (err, res) => {
            response.status(200).json("review add done")
         })})  
    }
}
module.exports.data = data