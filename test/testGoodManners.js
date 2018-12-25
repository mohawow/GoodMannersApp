'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('./server');
const { Task } = require('../models/task');
const taskRouter = require('./routes/tasks');
const { TEST_DATABASE_URL } = require('./config');


chai.use(chaiHttp);

describe("static routes", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function() {
      return closeServer();
    });
  
    it("should get index.html", function() {
      return chai
        .request(app)
        .get("/")
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
});

 
it("should list tasks on GET", function() {
return chai
    .request(app)
    .get("/")
    .then(function(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.a("string");
    expect(res.body.length).to.be.at.least(1);
    const expectedKeys = ["id", "taskName", "rewardType", "complete"];
    res.body.forEach(function(task) {
        expect(task).to.be.a("object");
        expect(task).to.include.keys(expectedKeys);
    });
    });
});

it("should add an task on POST", function() {
const newTask = { taskName: "Sleep on time", rewardType: "Go to park", complete: false };
return chai
    .request(app)
    .post("/")
    .send(newTask)
    .then(function(res) {
    expect(res).to.have.status(201);
    expect(res).to.be.json;
    expect(res.body).to.be.a("object");
    expect(res.body).to.include.keys("id", "taskName", "rewardType", "complete");
    expect(res.body.id).to.not.equal(null);
    expect(res.body).to.deep.equal(
        Object.assign(newTask, { id: res.body.id })
    );
    });
});

it("should update task on PUT", function() {
const updateData = {
    taskName: "Go clean room",
    rewardType: "Watch a movie in theater",
    complete:false
};

return (
    chai
    .request(app)
    .get("/")
    .then(function(res) {
        updateData.id = res.body[0].id;
        return chai
        .request(app)
        .put(`/${updateData.id}`)
        .send(updateData);
    })
    .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.deep.equal(updateData);
    })
);
});

it("should delete task on DELETE", function() {
return (
    chai
    .request(app)
    .get("/")
    .then(function(res) {
        return chai.request(app).delete(`/${res.body[0].id}`);
    })
    .then(function(res) {
        expect(res).to.have.status(204);
    })
);
});
