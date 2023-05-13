import { getDB } from '../utils/db.mjs';

async function getLibraryCollection () {
    let db = await getDB();
    return await db.collection('library')
};

async function getDataCollection() {
    let db = await getDB();
    return await db.collection('show-data')
};

// This is the object that gets added to the movies database (either one that's watched or not)
export class Library {

    static async add(title) {
        let dataCollection = await getDataCollection();
        let libraryCollection = await getLibraryCollection();

        let object = await dataCollection.findOne({
            title: { $regex: new RegExp(title, "i") },
        });
        if (object == null) {
            return 'No movie or show found with this title.'
        }

        let testObject = await libraryCollection.findOne({
            title: { $regex: new RegExp(title, "i") },
        });
        
        if (testObject != null) {
            return 'Movie/show added previously. Not added again.'
        }

        try {
            await libraryCollection.insertOne(object);
            console.log('Show added to the library database.')
            return 'Show added.'
        }
        catch(err) {
            console.log(err);
        }
    }

    static async delete(title) {
        
    }

}