'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('./server');
const { Task } = require('../models/task');
const taskRouter = require('./routes/tasks');
const { TEST_DATABASE_URL } = require('./config');


const expect = chai.expect;
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


describe("GET endpoint", function() {
    it("should return all existing entries", function() {
    
  let res;
      return chai
        .request(app)
        .get("/")
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.tasks).to.have.lengthOf.at.least(1);
          return Task.count();
        })
        .then(function(count) {
          expect(res.body.tasks).to.have.lengthOf(count);
        });
    });

    it("should return entries with right fields", function() {
      let resTask;
      return chai
        .request(app)
        .get("/")
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.tasks).to.be.a("string");
          expect(res.body.tasks).to.have.lengthOf.at.least(1);

          res.body.tasks.forEach(function(task) {
            expect(task).to.be.a("object");
            expect(task).to.include.keys(
              "id",
              "task",
              "reward"
            );
          });
          resTask = res.body.tasks[0];
          return Task.findById(resTask.id);
        })
        .then(function(task) {
          expect(resTask.id).to.equal(task.id);
          expect(resTask.task).to.equal(task.task);
          expect(resTask.reward).to.equal(task.reward);
        });
    });

    it("should get entry by ID", function() {
      let myTask;
      Task.findOne().then(function(_task) {
        myTask = _task;
        return chai
          .request(app)
          .get(`/${myTask.id}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.id).to.equal(myTask.id);
          });
      });
    });
  });
