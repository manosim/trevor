#!/usr/bin/env bash

cd app
npm install
gulp test
cd ..


cd tests
npm install
./node_modules/karma/bin/karma start --single-run