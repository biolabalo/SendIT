[![Coverage Status](https://coveralls.io/repos/github/biolabalo/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/biolabalo/SendIT?branch=develop)
[![Build Status](https://travis-ci.org/biolabalo/SendIT.svg?branch=develop)](https://travis-ci.org/biolabalo/SendIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/b1448592b95dc873c5bf/maintainability)](https://codeclimate.com/github/biolabalo/SendIT/maintainability)
# SendIT
SendIT is a Courier Service App that helps users deliver parcels to different destinations
 [visit App Here](https://send-it-biola.herokuapp.com/views/signIn.html)
---
## Implemented Features
* Users can create a parcel delivery order
* Users can fetch all parcel delivery orders they have made
* Users can fetch a specific order to view details
* Users can cancel an order which has been placed on in transit
* Admin can change current location of a parcel with email notifications to the parcel sender
* Admin can change status of a parcel delivery order with email notifications to the parcel sender


## status of parcels Deeliveries
* Placed
* In transit
* Delivered
* Canceled


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


## API Usage

API BASE URL https://sendit-biola.herokuapp.com/api/v1/. It's recommended to attach a `authorization` Header containing the generated `token` from `/api/v1/auth` to all access all requests.

### Parcel endpoints `/api/v1/parcels`

| method | route          | description             | data                                 |
| ------ | -------------- | ----------------------- | ------------------------------------ |
| GET    | /products/:id  | Get a product           |                                      |
| POST   | /products      | Create a product        |`{name, price, quantity_in_inventory}`|
| PUT    | /products/:id  | Update a product        |                                      |
| DELETE | /products/:id  | Delete a product        |                                      |

### Sales endpoints `/api/v1/sales`

| method | route            | description          | data                            |
| ------ | ---------------- | -------------------- | ------------------------------- |
| GET    | /sales           | Get all sale records |                                 |
| POST   | /sales           | Create a sale record | `{product_name, quantity_sold }`|             
| GET    | /sales/:id       | Get a sale record    |                                 |


### Authentication endpoints `/api/v1/auth`

| method | route        | description               | data                                          |
| ------ | ------------ | ------------------------- | ----------------------------------------------|
| POST   | /auth/sigin  | Sign In                   | `{email, password}`                           |
| POST   | /auth/signup | Sign up                   | `{fullname, username, email, password, role}` |
### Admin only endpoints 

| method | route            | description               | 
| ------ | -----------------| ------------------------- |
| GET    | /products        | Get all Parcel Deliveries |                               
| POST   | /auth/signup     | Sign up                   |
| PUT    | /api/auth/:id    | Edit a user               |




```javascript
// login as user
{
  email: "biola@gmail.com",
  password: "customer24"
}

// login as admin
{
  email: "mrb@gmail.com",
  password: "customer24"
}
```
## API Docs
https://storemanager15.docs.apiary.io/
## UI Template
https://biolabalo.github.io/SendIT/UI/
## App URL
https://store-manager-store.herokuapp.com

## Acknowledgements
Andela
    
## Author
* Balogun Akeem Abiola 