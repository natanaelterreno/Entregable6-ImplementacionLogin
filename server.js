import express from 'express'
import productsRouter from './routes/api/products.router.js'
import cartRouter from './routes/api/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'

import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import connectDb from './config/index.js'
connectDb()

const app = express();
const PORT = process.env.PORT || 8080

// const httpServer = app.listen('8080', err => {
//     if(err) console.log('Error: ', err)
//     console.log(`Escuchando en el puerto ${ PORT }`);
// })

// const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

const httpServer = app.listen(PORT, err => {
    if(err) console.log('Error: ', err)
    console.log(`Escuchando en el puerto ${ PORT }`);
})

const io = new Server(httpServer)

app.use(getIo(io))

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


function getIo(io){
    return (req,res,next)=>{
        req.io = io
        next()
    }
}