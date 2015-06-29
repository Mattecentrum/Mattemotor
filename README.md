# Mattemotor (Math engine)

This is the interactive mathematics exercise engine that is used on [matteboken.se](http://matteboken.se/) and [webmatematik.dk](http://webmatematik.dk).

An example of exercise used there is here: [Skolår 8/Bråk/Bråktal](http://www.matteboken.se/lektioner/skolar-8/brak/braktal/uppgifter#/exercises/10993/11058).

Note that the source code is not fully tested, but we are working on it.

## Prerequisites

To be able to run and test the project you need to:

* 1) Install Node.js: [https://nodejs.org/](https://nodejs.org/).
On Debian/Ubuntu, install the following packages: `nodejs, npm, nodejs-dev`. If you experience problems later on, also install `nodejs-legacy`.

* 2) Install certain npm packages globally: `npm install -g grunt-cli bower yo generator-karma generator-angular` (on Linux you must have root access).

* 3) Then navigate to project folder and run `bower install`.

* 4) Finally, in the project folder, run `npm install`.

## Building and development

Run `grunt` for linters, `grunt build` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

##  Creating your own exercises

If you want to create your own exercise a good way to start would be to read the excellent manual (Currently only in Swedish): [Create-Exercise](Create-Exercise.md)

The `list` and `exercises` are stored at `app/json/sv/list/` and `/app/json/sv/exercise/`.

## Language support

The first segment of the url is what decides the language for example /sv/list/1/exercise/1 will load swedish exercises from the folder json/sv and /en/list/1/exercise/1 will load the english exercises
