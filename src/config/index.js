import { connect } from "mongoose"

const connectDb = () => {
    connect('mongodb://127.0.0.1:27017/ecommerce')
    console.log('Base de Datos Conectada')
}

export default connectDb