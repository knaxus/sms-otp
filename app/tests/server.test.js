// load in all the required modules 
const expect        = require('expect');
const request       = require('supertest');
const {app}         = require('./../server');

// require the dummy data 
const {dummySMS, populateSMS}   = require('./seed');

// seed the db with data 

beforeEach(populateSMS);

// test for the GET / route
describe('GET /', () => {
    it('should redirect to GET /contacts', (done) => {
        request(app)
            .get('/')
            .expect(302)
            .expect('Location', '/contacts')
            .end(done);
    })
});

// the GET /contacts route 
describe('GET /contacts', () => {
    it('should display all the contacts from .json file', (done) => {
        request(app)
            .get('/contacts')
            .expect(200)
            .end(done);
    });
});

// test for bad url
describe('GET /wrong-url', () => {
    it('should redirect to /404  for wrong urls', (done) => {
        request(app)
            .get('/sdsdfsdf') // any randon url 
            .expect(302)
            .expect('Location', '/404')
            .end(done);
    });

    it('should give 404 for GET /404', (done) => {
        request(app)
            .get('/404')
            .expect(404)
            .end(done);
    });
});

// test for the GET /contacts/details/:mobile route
describe('GET /contacts/details:mobile', () => {
    it('should give 200 for valid mobile number', (done) => {
        request(app)
            .get('/contacts/details/918826624872')
            .expect(200)
            .expect(/Ashok Dey/)
            .end(done);
    });

    it('should give a 404 for invalid mobile number', (done) => {
        request(app)
            .get('/contacts/details/21343543635634534')
            .expect(404)
            .end(done);
    })
});

// test for the GET /compose/:mobile route
describe('GET /compose/:mobile', () => {
    it('should give a 200 for valid mobile number', (done) => {
        request(app)
            .get('/compose/918826624872')
            .expect(200)
            .end(done);
    });

    it('should give a 404 for valid mobile number', (done) => {
        request(app)
            .get('/compose/91')
            .expect(404)
            .end(done);
    });
})


describe('POST /compose', () => {
    it('should give 200 for a valid sms', (done) => {
        // the message data 
        let sms = {
            mobile : '+9188266248721', // change this number to '+918826624872' to  pass this case
            otp : dummySMS[0].otp,
            message : dummySMS[0].body
        }

        request(app)
            .post('/compose')
            .send(sms)
            .expect(200)
            .end(() => {
                done();
            });
    });

    it('should give a 400 for invalid mobile number', (done) => {
        let sms = {
            mobile : '+9121188266248721', 
            otp : dummySMS[0].otp,
            message : dummySMS[0].body
        }

        request(app)
            .post('/compose')
            .send(sms)
            .expect(400)
            .end(() => {
                done();
            });
    })
});