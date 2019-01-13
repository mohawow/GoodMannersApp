'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
const { Task } = require('../models/task');
const taskRouter = require('../routes/tasks');
const { TEST_DATABASE_URL } = require('../config');


chai.use(chaiHttp);

describe("static routes", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
    after(function() {
      return closeServer();
    });
  
    it("should get task.html", function() {
      return chai
        .request(app)
        .get("/")
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
});

describe("Get all tasks", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function() {
      return closeServer();
    });
    it("should list tasks on GET", function() {
        return chai
            .request(app)
            .get("/myTasks")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("Object");
                const expectedKeys = ["id", "taskName", "rewardType", "complete"];
                res.body.tasks.forEach(function(task) {
                    expect(task).to.be.a("object");
                    expect(task).to.include.keys(expectedKeys);
                });
            });
    });
});

describe("add atask", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function() {
      return closeServer();
    });
    it("should add a task on POST", function() {
    const newTask = { taskName: "Sleep on time", rewardType: "Go to park", complete: false };
        return chai
            .request(app)
            .post("/myTasks")
            .send(newTask)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.include.keys("id", "taskName", "rewardType", "complete");
                expect(res.body.id).to.not.equal(null);
                Object.keys(newTask).forEach(function(task) {
                    expect(res.body.task).to.equal(newTask.task)
                });
            })
        }); 
});

describe("update task", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function() {
      return closeServer();
    });
    it("should update task on PUT", function() {
        return (
            chai
            .request(app)
            .get("/myTasks")
            .then(function(res) {
                const updateData = Object.assign(res.body['tasks'][0], {
                    taskName: "Go clean room",
                    rewardType: "Watch a movie in theater",
                    complete:false
                });
                return chai
                .request(app)
                .put(`/myTasks/${updateData.id}`)
                .send(updateData)
                .then(function(res) {
                 expect(res).to.have.status(204);
                });
            })            
        );  
    })
})

describe("Delete tasks", function() {
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });
  
    after(function() {
      return closeServer();
    });
    it("should delete task on DELETE", function() {
        return (
            chai
            .request(app)
            .get("/myTasks")
            .then(function(res) {
                const id = res.body['tasks'][0].id;
                return chai.request(app).delete(`/myTasks/${id}`);
            })
            .then(function(res) {
                expect(res).to.have.status(204);
            })
        );
    });
})
