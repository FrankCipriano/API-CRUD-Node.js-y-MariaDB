`use strict`

const dao=require(`../models/modelo`)
    express=require(`express`),
    router=express.Router()


router.use(dao)
.get(`/`,(req,res,next)=>{
    req.getConnection((err,dao)=>{
        dao.query(`SELECT * FROM Movie;`,(err,rows)=>{
            if (err) return next(err)
            const opciones={
                title: `Lista de Peliculas`,
                results: rows
            }
            res.render(`index`,opciones)
        })
    })
}).get(`/agregar`,(req,res,next)=>{
    res.render(`add_peli`,{title:`Agregar Pelicula`})
}).post(`/`,(req,res,next)=>{
    req.getConnection((err,dao)=>{
        const afiche={
            MovieID:    req.body.MovieID,
            Title:      req.body.Title,
            ReleaseMovie:req.body.ReleaseMovie,
            Rating:     parseFloat(req.body.Rating),
            Image:      req.body.Image
        }
        dao.query(`INSERT INTO Movie SET ?`,afiche,(err,rows)=>{
            //return (err)? res.redirect(`/agregar`):res.redirect(`/`)
            if(err){
                console.log(err)
                return res.redirect(`/agregar`)
            }
            return res.redirect(`/`)
        })
    })
}).get(`/editar/:MovieID`,(req,res,next)=>{
    const movie_id=req.params.MovieID
    console.log(movie_id)
    req.getConnection((err,dao)=>{
        dao.query(`SELECT * FROM Movie WHERE MovieID = ?;`,movie_id,(err,rows)=>{
            if(err) throw err

            const opciones={
                title:`Editar Pelicula`,
                pelicula:rows[0]
            }
            res.render(`edit_peli`,opciones)
        })
    })
}).post(`/actualizar/:MovieID`,(req,res,next)=>{
    req.getConnection((err,dao)=>{
        const pelicula={
            MovieID:    req.body.MovieID,
            Title:      req.body.Title,
            ReleaseMovie:req.body.ReleaseMovie,
            Rating:     req.body.Rating,
            Image:      req.body.Image
        }

        dao.query(`UPDATE Movie SET ? WHERE MovieID = ?`,[pelicula,pelicula.MovieID],(err,rows)=>{
            if (err) return res.redirect(`/editar/:MovieID`)
            return res.redirect(`/`)
        })
    })
}).post(`/eliminar/:MovieID`,(req,res,next)=>{
    const movie_id=req.params.MovieID

    req.getConnection((err,dao)=>{
        dao.query(`DELETE FROM Movie WHERE MovieID = ?`,movie_id,(err,rows)=>{
            if(err) return next(err)
            return res.redirect(`/`)
        })
    })
}).use((req,res,next)=>{//-MIDDLEWARE PARA ERRORES
    const error=new Error()
    error.statusCode=404
    error.statusText=`Recurso no encontrado`

    const opciones={
        title: error.statusCode,
        descripcion:error.statusText,
    }
    res.render(`404`,opciones)
})

module.exports=router