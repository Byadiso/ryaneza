/* eslint-disable no-undef */
import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../server'

chai.should()
chai.use(chaiHttp)

// describe('/POST User /register', () => {
//     it('it should register new user ', done => {
//         const details = {
//             email: 'ngana@gmail.com',
//             firstname: 'tech',
//             lastname: 'ngana',
//             password: '111111111',
//             address: 'kigali',
//             PhoneNumber: '08790990',
//         }

//         chai.request(app)
//             .post('/api/v1/auth/signup')
//             .send(details)
//             .end((err, res) => {
//                 if (err) done(err)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.user).to.have.property('firstname')
//                 expect(res.body.user).to.have.property('lastname')
//                 expect(res.body.user).to.have.property('email')
//                 expect(res.body.user).to.have.property('PhoneNumber')
//                 expect(res.body.user).to.have.property('id')
//                 res.should.have.status(201)
//                 expect(res.body).to.be.a('object')
//                 done()
//             })
//     })

it('it should return email already in use ', done => {
    const details = {
        email: 'nganatech@gmail.com',
        firstname: 'tech',
        lastname: 'ngana',
        password: '111111111',
        address: 'rwanga, kigali',
        PhoneNumber: '08790990',
    }

    chai.request(app)
        .post('/api/v1/auth/signup')
        .send(details)
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(400)
            expect(res.body).to.be.a('object')
            done()
        })
})

// it('it should return PhoneNumber can only be  number  ', function(done) {
//     const details = {
//         email: 'nganatech@gmail.com',
//         firstname: 'tech',
//         lastname: 'ngana',
//         password: 'j12341234',
//         address: 'kigali',
//         PhoneNumber: '0fg7878787812',
//     }

//     chai.request(app)
//         .post('/api/v1/auth/signup')
//         .send(details)
//         .end((err, res) => {
//             if (err) done(err)
//             expect(res.body).to.have.property('message')
//             expect(res.body.status).to.equal(400)
//             expect(res.body).to.be.a('object')
//             done()
//         })
// })

it('it should login existing user ', function(done) {
    const details = {
        email: 'rubavu@gmail.com',
        firstname: 'tech',
        lastname: 'ngana',
        password: 'desire',
        address: 'kigali',
        PhoneNumber: '787788787',
        status: 'login',
        isadmin: true,
    }

    chai.request(app)
        .post('/api/v1/auth/signin	')
        .send(details)
        .end((err, res) => {
            if (err) done(err)
            expect(res.body).to.have.property('message')
            res.should.have.status(400)
            expect(res.body).to.be.a('object')
            done()
        })
})

it('it should return password  does not match ', function(done) {
    const details = {
        email: 'nganatech@gmail.com',
        password: '123451234',
    }

    chai.request(app)
        .post('/api/v1/auth/signin')
        .send(details)
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(400)
            // expect(res.body.status).to.equal(403)
            expect(res.body).to.be.a('object')
            done()
        })
})

it('it should return all field required ', function(done) {
    const details = {
        email: 'nganatech@gmail.com',
        first_name: '12341234',
        last_name: '',
        password: '12341234',
        address: '',
        phone_number: '',
    }

    chai.request(app)
        .post('/api/v1/auth/signup')
        .field(details)
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(400)
            expect(res.body).to.be.a('object')
            done()
        })
})

it('it should return first_name and last_name field can only be letter ', done => {
    const details = {
        email: 'kigali@gmail.com',
        firstname: 'k234igali',
        lastname: '11rwanda',
        password: '12341234',
        address: 'kigali-rwanda',
        PhoneNumber: '0878787',
    }

    chai.request(app)
        .post('/api/v1/auth/signup')
        .field(details)
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(400)
            // expect(res.body.status).to.equal(403)
            expect(res.body).to.be.a('object')
            done()
        })
})

it('it should return invalid email ', done => {
    const details = {
        email: 'kigaligml.com',
        password: '12341234',
    }

    chai.request(app)
        .post('/api/v1/auth/signin')
        .send(details)
        .end((err, res) => {
            if (err) done(err)
            res.should.have.status(400)
            expect(res.body).to.be.a('object')
            done()
        })
})

// // it('it should register user as admin ', done => {
// //     const details = {
// //         email: 'biryogo@yahoo.com',
// //         firstname: 'biryogo',
// //         lastname: 'nyammirambo',
// //         password: '0000000',
// //         address: 'ifelodun',
// //         PhoneNumber: '09012343212',
// //         isadmin: true,
// //     }

// //     chai.request(app)
// //         .post('/api/v1/auth/signup')
// //         .send(details)
// //         .end((err, res) => {
// //             if (err) done(err)
// //             expect(res.body).to.have.property('message')
// //             expect(res.body.user).to.have.property('firstname')
// //             expect(res.body.user).to.have.property('lastname')
// //             expect(res.body.user).to.have.property('id')
// //             expect(res.body.user).to.have.property('email')
// //             expect(res.body.user).to.have.property('PhoneNumber')
// //             expect(res.body.user)
// //                 .to.have.property('isadmin')
// //                 .equal(true)
// //             res.should.have.status(201)
// //             expect(res.body).to.be.a('object')
// //             done()
// //         })
// })
// })
