import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true});
var db;

export async function createDB() {
    try {
        await client.connect();

        const dbList = await client.db().admin().listDatabases();
        const databaseNames = dbList.databases.map(db => db.name);
        
        if (!databaseNames.includes('data')) {
            db = await client.db('data')
            console.log("Show database created successfully");
            await db.createCollection('library');
            console.log('Library collection created successfully')
        }
        await client.close();

    }
    catch(err) {
        console.log(err);
    }
}

export async function connectToDB() {
    try {
        await client.connect();
        db = await client.db('data')
        console.log("Connected successfully to mongoDB");
    }
    catch (err) {
        throw err;
    }
}

export async function getDB() {
    return db;
}

export async function closeDBConnection() {
    await client.close();
    return 'Connection closed';
}

export default { connectToDB, getDB, closeDBConnection, createDB }