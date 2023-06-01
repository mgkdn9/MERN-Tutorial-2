const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // console.log('.env: ',process.env)
    // const conn = await mongoose.connect(process.env.MONGO_URI)
    const conn = await mongoose.connect('mongodb+srv://MikeKohlberg:ygBXsbb6L8WhUgEl@cluster0.p8po5yx.mongodb.net/?retryWrites=true&w=majority')

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
 module.exports = connectDB