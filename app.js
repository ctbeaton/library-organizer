import express, { json, urlencoded } from 'express'
import bodyParser from 'body-parser'

import { connectToDB, closeDBConnection, createDB, getDB } from './utils/db.mjs'
import { add } from './controller/librarys.mjs'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());

var server;

import path, { dirname } from 'path';
import { fileURLToPath } from 'url'

async function createServer() {
    try {
        await createDB()
        await connectToDB()

        const __dirname = dirname(fileURLToPath(import.meta.url));
        app.use(express.static(__dirname + '/templates'));

        server = app.listen(port, () => {
            console.log('App listening at http://localhost:%d', port)
        });

        app.post('/library/:title', add);
        
    } catch(err) {
        console.log(err)
    }
}

createServer()

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing Mongo Client.');
    server.close(async function(){
      let msg = await closeDBConnection()   ;
      console.log(msg);
    });
});