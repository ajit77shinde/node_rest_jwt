const app = require('../server'),
    chai = require('chai'),
    should = require('should'),
    request = require('supertest');

let defaultUser = {
    name: 'amit shinde',
    email: 'amit@gmail.com',
    password: 'ajit@123',
    address: 'kalamboli',
    state: 'Maharashtra',
    created_at: '2021-2-10',
    dob: '1992-03-01'
}
let token = ''
let userId = ''

describe('POST /register', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/users/register')
            .send(defaultUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // console.log("res - ",res)
                res.status.should.equal(200);
                // res.body.status.should.equal("success")
                // token = res.body.data.token;
                // userId = res.body.data.user._id
                // console.log("token = ", token)
                done();
            });
    });
});
describe('POST /authenticate', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/users/authenticate')
            .send(defaultUser)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                // console.log("res - ",res)
                res.status.should.equal(200);
                res.body.status.should.equal("success")
                token = res.body.data.token;
                userId = res.body.data.user._id
                console.log("token = ", token)
                done();
            });
    });
});
describe("/get users", () => {
    it("should fetch all users successfully", (done) => {
        request(app)
            .get("/users")
            .set('Accept', 'application/json')
            .set({ 'x-access-token': token })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                res.status.should.equal(200);
                // console.log("res.body.data.users = ",res.body)
                // res.body.should.a("object");
                res.body.data.should.have.property("users");
                done();
            });
    });
});

describe("/get /:userId", () => {
    it("should fetch user by id successfully", (done) => {
        request(app)
            .get("/users/" + userId)
            // .query({ userId: userId })
            .set('Accept', 'application/json')
            .set({ 'x-access-token': token })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                res.status.should.equal(200);
                // console.log("res.body.data.users = ",res.body)
                // res.body.should.a("object");
                res.body.data.should.have.property("users");
                done();
            });
    });
});

describe("/put /:userId", () => {
    it("should Update user by id successfully", (done) => {
        request(app)
            .put("/users/" + userId)
            // .query({ userId: userId })
            .set('Accept', 'application/json')
            .set({ 'x-access-token': token })
            .expect('Content-Type', /json/)
            .send(defaultUser)
            .end((err, res) => {
                res.status.should.equal(200);
                // console.log("res.body.data.users = ",res.body)
                // res.body.should.a("object");
                // res.body.data.should.have.property("users");
                done();
            });
    });
});

// describe("/delete /:userId", () => {
//     it("should delete user by id successfully", (done) => {
//         request(app)
//             .delete("/users/" + userId)
//             // .query({ userId: userId })
//             .set('Accept', 'application/json')
//             .set({ 'x-access-token': token })
//             .expect('Content-Type', /json/)
//             .end((err, res) => {
//                 res.status.should.equal(200);
//                 // console.log("res.body.data.users = ",res.body)
//                 // res.body.should.a("object");
//                 res.body.data.should.have.property("users");
//                 done();
//             });
//     });
// });