const http = require('http')
const server = require('./src/framework_drivers/server/server')
const sequelize = require('./src/framework_drivers/database/sequelize')
const port = process.env.PORT || 4000

const runServer = async () => {

    try {
        // connecting and syncing to the database
        //  await sequelize.sync({ force: true })
        //  await sequelize.sync()
         await sequelize.sync({ alter: true })
        console.log('Connected to the database successfully and syncing tables ...')
    } catch (error) {
        console.log('Could not connect to the database', error)
    }

    try {
        // creating express server
        const myserver = http.createServer(server)
        myserver.listen(port)
        console.log('Server running..... Port -', port)
    } catch (error) {
        console.log('failed to start the server')
    }
}

runServer()