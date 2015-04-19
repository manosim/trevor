Trevor [![Build Status](https://magnum.travis-ci.com/ekonstantinidis/trevor.svg?token=9QR4ewbqbkEmHps6q5sq&branch=master)](https://magnum.travis-ci.com/ekonstantinidis/trevor)
=====================
A hybrid app based on Ionic Framework, AngularJS and Apache Cordova.

![Trevor App](www/images/press.png)


## Install Packages
*NPM* will install all the project dependecies. Then *gulp* will install **ionic** through bower.

    npm install
    gulp install


## Running the app on the browser

    ionic serve
    gulp watch


## Releasing the app

    ionic platform add ios
    ionic platform add android
    gulp release
    ionic build ios
    ionic build android

Then prepare to release for each store.


## Running the tests
There are jshint tests(through *gulp*) and karma-jasmine tests(through *NPM*). To run both:

    npm test
