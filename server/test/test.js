/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
// import ParcelOrdersDb from '../model/ParcelOrdersDb';


chai.use(chaiHttp);
const { expect } = chai;

describe('SendIT', () => {
  describe('GET \'/api/v1\'', () => {
    it('It should return  welcome message', (done) => {
      chai.request(server)
        .get('/api/v1')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.headers;
          expect(res).to.have.status(200);
          expect(res).to.not.redirect;
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });


  describe('GET /parcels', () => {
    it('should return all parcel order records', (done) => {
      chai.request(server)
        .get('/api/v1/parcels')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.empty;
          done(err);
        });
    });
   });


  // describe('GET /users/:userId/parcels', () => {
  //   it('should return all parcel order records created by a specific user', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/users/123abi3/parcels')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  //   it('should return 404 if id  of the user is invalid', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/users/419/parcels')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });


  // describe('GET /parcels/:parcel_id', () => {
  //   it('should return 404 if id is invalid', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/parcels/32')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done(err);
  //       });
  //   });
  //   it('should return a parcel  record if id is valid', (done) => {
  //     chai.request(server)
  //       .get('/api/v1/parcels/1')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // describe('PUT /parcels/:parcel_id/cancel', () => {
  //   it('should return 404 if id is invalid', (done) => {
  //     chai.request(server)
  //       .put('/api/v1/parcels/32/cancel')
  //       .end((err, res) => {
  //         expect(res.status).to.equal(404);
  //         done(err);
  //       });
  //   });

  //   it('should change return 401 if the status ', (done) => {
  //     chai.request(server)
  //       .put('/api/v1/parcels/3/cancel')
  //       .end((err, res) => {
  //         expect(res.body).to.have.property('message').eql('You cannot cancel parcel order');
  //         expect(res.status).to.equal(401);
  //         expect(res.body).to.not.be.empty;
  //         done(err);
  //       });
  //   });
  // });

  // it('should change the status of a particular order to cancel', (done) => {
  //   chai.request(server)
  //     .put('/api/v1/parcels/3/cancel')
  //     .end((err, res) => {
  //       expect(res.body).to.have.property('status').eql('cancelled');
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.not.be.empty;
  //       done(err);
  //     });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order', (done) => { // WHEN EVERY FIELD IS INPUTED
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Gunshot',
  //         receiverEmail: 'xrolediamond@gmail.com',
  //         itemName: 'sugar',
  //         itemWeight: 34,
  //         pickUpAddress: '154 murtala mohammed way yaba lagos',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(200);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error when the sender name is omiited', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: '',
  //         receiverEmail: 'xrolediamond@gmail.com',
  //         itemName: 'sugar',
  //         itemWeight: 34,
  //         address: '154 murtala mohammed way yaba lagos',
  //         pickUpAddress: '154 - murtala mohammed way yaba lagos',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('name cannot be empty and must be at least three characters');
  //         done();
  //       });
  //   });
  // });
  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error 400 when the sender email is omiited', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Abiola',
  //         receiverEmail: '',
  //         itemName: 'sugar',
  //         itemWeight: 34,
  //         address: '154 murtala mohammed way yaba lagos',
  //         pickUpAddress: '154 murtala mohammed way yaba lagos',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('email is invalid');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error 400 when the item name is omitted', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Abiola',
  //         receiverEmail: 'b@b.com',
  //         itemName: '',
  //         itemWeight: 34,
  //         address: '154 , murtala mohammed way yaba lagos',
  //         pickUpAddress: '154 murtala mohammed way yaba lagos',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('parcel name cannot be empty and must be at least three characters');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error 400 when the weight of the item is omitted or invalid', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Abiola',
  //         receiverEmail: 'b@b.com',
  //         itemName: 'gold',
  //         itemWeight: 'gold',
  //         address: '154 , murtala mohammed way yaba lagos',
  //         pickUpAddress: '154 murtala mohammed way yaba lagos',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('invalid input. The weight cannot be empty  must be greater than zero and a number');
  //         done();
  //       });
  //   });
  // });


  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error 400 when the pick up address is empty', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Abiola',
  //         receiverEmail: 'b@b.com',
  //         itemName: 'gold',
  //         itemWeight: 45,
  //         address: '154 , murtala mohammed way yaba lagos',
  //         pickUpAddress: '',
  //         destinationAddress: '154 murtala mohammed way yaba lagos',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('Address cannot be empty and must be at least five characters');
  //         done();
  //       });
  //   });
  // });

  // describe('Post \'/api/v1\'', () => {
  //   it('POST create parcel  delivery order It should return Error 400 when the Destination address is empty', (done) => {
  //     chai.request(server)
  //       .post('/api/v1/parcels')
  //       .send({
  //         receiverName: 'Abiola',
  //         receiverEmail: 'b@b.com',
  //         itemName: 'gold',
  //         itemWeight: 30,
  //         address: '154 , murtala mohammed way yaba lagos',
  //         pickUpAddress: '900 , murtala mohammed way yaba lagos',
  //         destinationAddress: '',
  //       })
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.headers;
  //         expect(res).to.have.status(400);
  //         expect(res).to.not.redirect;
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('error').eql('Address cannot be empty and must be at least five characters');
  //         done();
  //       });
  //   });
  // });