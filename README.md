# mattemotor

This is the mathexercise engine that is used on [matteboken.se](http://matteboken.se/)

Example of exercise [Skolår 8/Bråk/Bråktal](http://www.matteboken.se/lektioner/skolar-8/brak/braktal/uppgifter#/exercises/10993/11058)

To be able to run and test the project you need to...

## 1) instal node.js
Node.js [https://nodejs.org/](https://nodejs.org/)

## 2) install grunt-cli and bower globaly

`npm install -g grunt-cli bower`

## 3) navigate to project folder and run

`npm install

## 4.1) Build & development

Run `grunt` for linters, `grunt build` for building and `grunt serve` for preview.

## 4.2) Testing

Running `grunt test` will run the unit tests with karma.

## 5) Creating your own exercises

If you want to create your own exercise a good way to start would be to read the excelent manual(Swedish only) [Create-Exercise](Create-Exercise.md)

The list and exercises are stored at app/json/list/ and /app/json/exercise/


[Note! the source code is not fully tested, but we are working on it]
