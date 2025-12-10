const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadFile(filePath) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);

  const blob = await put(fileName, fileBuffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN
  });

  console.log(`Uploaded ${fileName}: ${blob.url}`);
  return blob.url;
}

async function uploadAllGifs() {
  const gifFiles = [
    'public/images/immersive-motion.gif',
    'assets/images/immersive-motion.gif'
  ];

  const urls = {};

  for (const file of gifFiles) {
    if (fs.existsSync(file)) {
      const url = await uploadFile(file);
      urls[file] = url;
    }
  }

  console.log('\nAll URLs:');
  console.log(JSON.stringify(urls, null, 2));
}

uploadAllGifs().catch(console.error);
