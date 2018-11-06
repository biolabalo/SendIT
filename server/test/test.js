import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
//import ParcelOrdersDb from '../model/ParcelOrdersDb';




chai.use(chaiHttp);
let expect = chai.expect;

describe('SendIT', () => {  // ====================================== Empty the database PASSED
    
    describe('GET \'/api/v1\'', () => { 
        it('GET Home Page', (done) => {  // =============== Testing home page route  PASSED
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
    describe('Post \'/api/v1\'', () => { 
        it('POST create parcel  delivery order', (done) => {  // WHEN EVERY FIELD IS INPUTED
            chai.request(server)
                .post('/api/v1/parcelOrders/parcels')
            .send({
                receiverName: 'Gunshot',
                receiverEmail: 'xrolediamond@gmail.com',
                itemName : 'sugar',
                itemWeight: 34,
                address: '154 murtala mohammed way yaba lagos'
            })
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
    
    describe('Post \'/api/v1\'', () => { 
        it('POST create parcel  delivery order', (done) => {  // WHEN THE RECIEVER NAME IS EMPTY
            chai.request(server)
                .post('/api/v1/parcelOrders/parcels')
            .send({
                receiverName: '',
                receiverEmail: 'xrolediamond@gmail.com',
                itemName : 'sugar',
                itemWeight: 34,
                address: '154 murtala mohammed way yaba lagos'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.headers;
                expect(res).to.have.status(400);
                expect(res).to.not.redirect;
                expect(res.body).to.be.an('object'); 
                expect(res.body).to.have.property('error').eql('name cannot be empty');
                done();
            }); 
        });
    });

});
    
