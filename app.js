`use strict`

const express=require(`express`),
    favicon=require(`serve-favicon`),
    bodyParser=require(`body-parser`),
    morgan=require(`morgan`),
    pug=require(`pug`),
    indexRoute=require(`./routes/index`),
    faviconURL=`${__dirname}/public/assets/node.ico`,
    publicDir=express.static(`${__dirname}/public`),
    viewDir=`${__dirname}/views`,
    port=(process.env.PORT || 3000),
    app=express()

app.set(`views`,viewDir)
    .set(`view engine`,`pug`)
    .set(`port`,port)
    .use(favicon(faviconURL))
    .use(bodyParser.json())//-PARSEAR DATOS A: application/json  
    .use(bodyParser.urlencoded({extended:false}))//-PARSEAR DATOS A: application/x-www-form-urlencoded
    .use(morgan(`dev`))
    .use(publicDir)
    .use(indexRoute)

module.exports=app