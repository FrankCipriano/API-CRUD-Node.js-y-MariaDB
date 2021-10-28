`use strict`

const mysql=require(`mysql`),
    myConnetion=require(`express-myconnection`),
    dboptions={
        host:`127.0.0.1`,
        port:3306,
        user:`root`,
        password:`Swordfish19.`,
        database:`Movies`
    },
    Movies=myConnetion(mysql,dboptions,`request`)

module.exports=Movies