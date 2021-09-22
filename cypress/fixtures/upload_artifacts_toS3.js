const fs = require('fs');
const path = require('path');

const AWS = require('aws-sdk');

const { BUCKET_NAME, AWS_ACCESS_ID, AWS_SECRET_KEY } = process.env;

// helpers

function uploadToS3(file, name, type) {
  const s3bucket = new AWS.S3({
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_SECRET_KEY,
    Bucket: BUCKET_NAME,
  });
  const params = {
    Bucket: BUCKET_NAME,
    Key: name,
    Body: file,
    ACL: 'public-read',
    ContentType: `image/${type}`,
  };
  s3bucket.upload(params, (err, data) => {
    if (err) { throw err; }
    /* eslint-disable no-console */
    console.log('Success!');
    console.log(data);
    /* eslint-enable no-console */
  });
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = `${dir}/${file}`;
    if (['.gitkeep', '.Trash-0'].indexOf(file) === -1) {
      if (fs.statSync(filePath).isDirectory()) {
        getFiles(filePath, fileList);
      } else {
        const obj = {
          path: filePath,
          name: file,
          type: file.split('.')[1],
        }
        fileList.push(obj);
      }
    }
  });
  return fileList;
}

// snapshots

const snapshotsDir = path.join(__dirname, 'cypress', 'snapshots');
const snapshots = getFiles(snapshotsDir, []);

snapshots.forEach((snapshotObject) => {
  fs.readFile(snapshotObject.path, (err, data) => {
    if (err) { throw err; }
    uploadToS3(data, snapshotObject.name, snapshotObject.type);
    // console.log(snapshot);
  });
});

// videos

const videosDir = path.join(__dirname, 'cypress', 'videos');
const videos = getFiles(videosDir, []);

videos.forEach((videoObject) => {
  fs.readFile(videoObject.path, (err, data) => {
    if (err) { throw err; }
    uploadToS3(data, videoObject.name, videoObject.type);
    // console.log(video);
  });
});