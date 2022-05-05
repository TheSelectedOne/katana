import "reflect-metadata"
import app from './app'
import './database'
import {connection} from './database'

const port = process.env.PORT || 5000;

const initConnection = async () => {
    await connection.initialize()
    await connection.runMigrations()
}

initConnection().then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
})