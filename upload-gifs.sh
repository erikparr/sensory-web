#!/bin/bash

export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_EaCa4835oC4RGi75_G2fMjQPkJcgayUD7de29te2jKWBrUX"

echo "Uploading GIFs to Vercel Blob..."

vercel blob put public/images/headtracking.gif
vercel blob put public/images/emotion-x.gif
vercel blob put public/images/touchless-qr.gif
vercel blob put public/images/8thWall-is-xr.gif
vercel blob put public/images/ribbonSwarm.gif
vercel blob put public/images/waterCube.gif
vercel blob put public/images/suckerpunchv.gif
vercel blob put public/images/tvMonolith.gif
vercel blob put public/images/meshFlow.gif
vercel blob put public/images/tangleCube.gif
vercel blob put public/images/shader001.gif
vercel blob put public/images/cubesWave.gif
vercel blob put public/images/shader002.gif
vercel blob put public/images/ocr.gif

echo "Done!"
