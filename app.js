import express, { json, urlencoded } from 'express'
import bodyParser from 'body-parser'

import { connectToDB, closeDBConnection, createDB, getDB } from './utils/db.mjs'
import { addShow, deleteShow, randomShows, getPopular } from './controller/librarys.mjs'

const app = express()
const port = 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(bodyParser.json());

var server;

import path, { dirname } from 'path';
import { fileURLToPath } from 'url'
import { Library } from './model/library.mjs'

async function createServer() {
    try {
        await createDB()
        await connectToDB()

        const __dirname = dirname(fileURLToPath(import.meta.url));
        app.use(express.static(__dirname + '/views'));
        // app.set('view engine', 'ejs');
        // app.set('views', path.join(__dirname, 'views'));
        app.post('/library/:title', addShow);
        app.delete('/library/:title', deleteShow);
        app.get('/library', randomShows);
        app.get('/popular', getPopular);
        
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/views/signup.html');
        });

        server = app.listen(port, () => {
            console.log('App listening at http://localhost:%d', port)
        });
        
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