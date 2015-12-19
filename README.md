# Trevor [![travis][travis-image]][travis-url]
[travis-image]: https://travis-ci.org/ekonstantinidis/trevor.svg?branch=master
[travis-url]: https://travis-ci.org/ekonstantinidis/trevor

> Work In Progress - Version 2 based on React Native.

### Download
You can download Trevor (Version 1 - based on Ionic Framework) from the [App Store](http://itunes.apple.com/app/id962155187) and [Google Play Store](http://play.google.com/store/apps/details?id=com.iamemmanouil.trevor).

## Install Packages
The `setup` script will handle the installation of ionic and all the other dependencies.

    npm run setup


## Running the app on the browser

    ionic serve
    npm run watch


## Releasing the app

    ionic platform add ios
    ionic platform add android
    npm run release
    ionic build ios
    ionic build android

Then prepare to release for each store.


## Running the tests
There are jshint tests(through *gulp*) and karma-jasmine tests(through *NPM*). To run both:

    npm test
