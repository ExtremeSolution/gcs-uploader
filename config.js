require('dotenv').config();
const GCS = require('@google-cloud/storage');
const path = require('path');

const keyFilename = path.join(__dirname, 'key.json');
const bucketName = process.env.BUCKET_NAME;
const projectId = process.env.PROJECT_ID;

const { Storage } = GCS;

let storage;
if(process.env.NODE_ENV === 'production'){ 
    storage = new Storage({
        projectId
    });
} else {
    storage = new Storage({
        keyFilename,
        projectId,
    });
}

const bucket = storage.bucket(bucketName);

module.exports = {storage, bucket};