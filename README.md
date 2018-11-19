[![Coverage Status](https://coveralls.io/repos/github/biolabalo/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/biolabalo/SendIT?branch=develop)
[![Build Status](https://travis-ci.org/biolabalo/SendIT.svg?branch=develop)](https://travis-ci.org/biolabalo/SendIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/b1448592b95dc873c5bf/maintainability)](https://codeclimate.com/github/biolabalo/SendIT/maintainability)
# SendIT
SendIT is a Courier Service App that helps users deliver parcels to different destinations

---
## Implemented Features
* Users can create a parcel delivery order
* Users can fetch all parcel delivery orders they have made
* Users can fetch a specific order to view details
* Users can cancel an order

## Templates
UI templates are hosted on Github pages [here](https://biolabalo.github.io/SendIT/UI/)

## Technologies Used
* [Node.js](https://nodejs.org) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
* [Express.js](https://expressjs.com) - Web framework based on Node.js.
* [Babel](https://babeljs.io) - Javascript transpiler.
* [Eslint](https://eslint.org/) - Javascript linter. 
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.

## Testing tools
* [Mocha](https://mochajs.org/) - A Javascript test framework.
* [Chai](http://chaijs.com) - Assertion library.


## API Infomormation
   Heroku https://biola-sendit.herokuapp.com/api/v1/

  | METHOD  | DESCRIPTION                  |             ENDPOINTS                                |
  | --------| -------------                |          -------------------------------             |
  | GET     | Get all orders               |      `/api/v1/parcels`                               |
  | GET     | Get particular order         |    `/api/v1/parcels/:parcelId`                       |
  | POST    | Create an order              |    `/api/v1/parcels`                                 |
  | PUT     | Cancel order                 |     `/api/v1/parcels/:parcelId`                      | 
  | GET     | Fetch all orders by a user   |     `/api/users/:userId/parcels`                     | 

### Installation
* Install [NodeJs](https://nodejs.org/en/download/) .
* Clone this repository using `git clone https://github.com/biolabalo/SendIT.git`.
* Run `npm install` to install all dependencies.
* Run `npm start` to start the server.
* Navigate to [`localhost:5000/api/v1`](localhost:3000/api/v1) in your browser to access the application.

## Tests

* The tests were written using Mocha and Mocha-http
* To run tests, navigate to the project's root directory
* After installation, run the following command
    - `npm run test`
    
## Author
* Balogun Akeem Abiola 