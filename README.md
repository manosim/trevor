# Trevor
[![travis][travis-image]][travis-url]
[![cc-gpa][cc-gpa-image]][cc-gpa-url]
[![cc-coverage][cc-coverage-image]][cc-coverage-url]

[travis-image]: https://travis-ci.org/ekonstantinidis/trevor.svg?branch=master
[travis-url]: https://travis-ci.org/ekonstantinidis/trevor
[cc-gpa-image]: https://codeclimate.com/github/ekonstantinidis/trevor/badges/gpa.svg
[cc-gpa-url]: https://codeclimate.com/github/ekonstantinidis/trevor
[cc-coverage-image]: https://codeclimate.com/github/ekonstantinidis/trevor/badges/coverage.svg
[cc-coverage-url]: https://codeclimate.com/github/ekonstantinidis/trevor/coverage

### A hybrid app based on Ionic Framework, AngularJS and Apache Cordova.

![Trevor App](www/images/press.png)


### Download
You can download Trevor from the App Store([Link](http://itunes.apple.com/app/id962155187)) and Google Play Store([Link](http://play.google.com/store/apps/details?id=com.iamemmanouil.trevor)).


## Prerequisites

 - [Ionic Framework](http://ionicframework.com/)
 - [AngularJS](http://angularjs.org)
 - [Gulp](http://gulpjs.com/)
 - [NPM](https://www.npmjs.com/)


## Install Packages
*NPM* will install all the project dependencies. Then *gulp* will install **ionic** through bower.

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
To run tests:

    npm test


## License

Trevor is licensed under the MIT Open Source license. For more information, see the LICENSE file in this repository.
