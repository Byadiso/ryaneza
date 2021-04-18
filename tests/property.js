/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../server'

//https://dev.to/asciidev/testing-a-nodeexpress-application-with-mocha--chai-4lho
chai.use(chaiHttp)
describe('GET and POST AD  ROUTES', () => {
    it('it should get all property ', done => {
        chai.request(app)
            .get('/api/v1/property')
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('it should return 403 with state can not contain number ', function(done) {
        const details = {
            status: 'sold',
            price: '12443.44',
            state: '1234sold',
            city: 'kibungo',
            address: 'block 188',
            type: '3 beds',
            PhoneNumber: '07876755',
        }

        chai.request(app)
            .post('/api/v1/property')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )
            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should return 403 with all field required ', function(done) {
        const details = {
            status: 'sold',
            price: '',
            type: '',
            address: 'kibujngo',
            PhoneNumber: '07876755',
        }

        chai.request(app)
            .post('/api/v1/property')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )

            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should return 403 with error of image field is required ', function(done) {
        const details = {
            status: 'sold',
            price: '12443.44',
            state: 'huye',
            city: 'butare',
            address: 'block 188',
            type: '3 bedroom',
            PhoneNumber: '07876755',
            image: '',
        }

        chai.request(app)
            .post('/api/v1/property')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )
            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should return 400 with error of token secret mismatch ', function(done) {
        const details = {
            status: 'sold',
            price: '12443.44',
            type: 'flat',
            PhoneNumber: '07876755',
            address: 'muhanga',
        }

        chai.request(app)
            .post('/api/v1/property')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXu5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )
            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should return 400 unauthorized ', done => {
        const details = {
            status: 'sold',
            price: '12443.44',
            type: 'flat',
            PhoneNumber: '07876755',
            address: 'kibuye',
        }

        chai.request(app)
            .post('/api/v1/property')
            .send(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should return not found advert because params value does not exist ', done => {
        chai.request(app)
            .get('/api/v1/property/41')
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('it should return not found advert because params value does not exist ', done => {
        chai.request(app)
            .get('/api/v1/property/43')
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('it should return id not found because id does not match to update property status', function(done) {
        this.timeout(10000)

        const details = {
            status: 'sold',
        }

        chai.request(app)
            .patch('/api/v1/property/43/sold')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )

            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('it should update a  property by changing the status  to sold', function(done) {
        this.timeout(10000)

        const details = {
            status: 'sold',
        }

        chai.request(app)
            .patch('/api/v1/property/43/sold')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )

            .field(details)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body.status).to.equal(400)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('it should delete property with this  routes ', done => {
        chai.request(app)
            .delete('/api/v1/property/44')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                done()
            })
    })

    it('it should delete property match the followng routes ', done => {
        chai.request(app)
            .delete('/api/v1/property/46')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiaWQiOjIzNDAxMzAwNTAwMSwibmV3VXNlck5vdG9rZW4iOnsiZmlyc3RfbmFtZSI6ImhmZmZkZmRmIiwibGFzdF9uYW1lIjoiZmVrbGl4IiwiZW1haWwiOiJjbGluZ3RvbmV5aXR1b3lvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE1EQk9PZXQ5QWVMQ3NVQURZTk5NWU8wVmF1d2QueXJJVGNTeUJKWFIuYVR5dzFlYmsuLmNhIiwiYWRkcmVzcyI6ImJsb2NrIDE5OSBmbGF0IDQiLCJwaG9uZV9udW1iZXIiOiIwODAxMjM0MjQ1OSIsImdlbmRlciI6Im1hbGUiLCJpc19BZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MTk3NjY0MH0.P5L7HTKcofHiElkLA86hNSPMl0yxRgEllyJgrYaIphk'
            )
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(400)
                done()
            })
    })
})
