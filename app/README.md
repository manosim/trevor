Trevor [![Build Status](https://magnum.travis-ci.com/ekonstantinidis/travis-mobile.svg?token=9QR4ewbqbkEmHps6q5sq&branch=master)](https://magnum.travis-ci.com/ekonstantinidis/travis-mobile)
=====================
A hybrid app based on Ionic Framework, AngularJS and Apache Cordova.

![Trevor App](www/images/press.png)

## Running the app on the browser

    npm install
    ionic serve
    gulp watch


## Releasing the app

    ionic platform add ios
    ionic platform add android
    gulp release
    ionic build ios
    ionic build android

Then prepare for release for each store.


## Running the tests

    gulp test
