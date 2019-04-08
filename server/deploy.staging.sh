#!/bin/bash -x

echo "1/7) Compile sources ..."

NODE_ENV=production webpack --config webpack.server.config.js --progress

echo "2/7) Stopping existing node process ..."
forever stop control

echo "3/7) Starting node process ..."
sudo lsof -t -i tcp:5000 -s tcp:listen | sudo xargs kill
NODE_ENV=production CONFIG=production forever start --uid "control" --append -c "node server/dist/build.js" .

echo "Deployment complete"
