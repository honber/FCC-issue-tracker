/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id1, id2, id3;


suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          id1 = res.body._id; 
          assert.equal(res.status, 200);  
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'open');
          assert.property(res.body, 'status_text');
          assert.property(res.body, '_id'); 
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Every field filled in',
        })
         .end(function(err, res){
            id2 = res.body._id; 
            assert.equal(res.status, 200);  
            assert.property(res.body, 'issue_title'); 
            assert.property(res.body, 'issue_text');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, 'created_by');
            assert.property(res.body, 'assigned_to');
            assert.property(res.body, 'open');
            assert.property(res.body, 'status_text');
            assert.property(res.body, '_id');  
            done();
        });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({})
          .end(function(err, res){
            id3 = res.body._id; 
            assert.equal(res.status, 200);  
            assert.property(res.body, 'issue_title'); 
            assert.property(res.body, 'issue_text');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, 'created_by');
            assert.property(res.body, 'assigned_to');
            assert.property(res.body, 'open');
            assert.property(res.body, 'status_text');
            assert.property(res.body, '_id'); 
            done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: id1
          })
          .end(function(err, res){
            assert.equal(res.status, 200);  
            assert.equal(res.text, 'no updated field sent');
            done();
        })
      });
      
      test('One field to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: id1,
            open: 'false'
          })
        .end(function(err, res){
          assert.equal(res.status, 200);  
          assert.equal(res.text, 'successfully updated')
          done();
        })
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
          .put('/api/issues/test')
          .send({
            _id: id1,
            issue_title: 'Issue title',
            issue_text: 'Issue text',
            created_by: 'Dispatcher'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.text, 'successfully updated')
            done();
          })
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({_id: id1}) 
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'assigned_to');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'status_text');
            assert.property(res.body[0], '_id');
            assert.equal(res.body[0].issue_title, 'Issue title');
            done();
          })
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
          .get('/api/issues/test')
          .query({
            _id: id1,
            issue_title: 'Title'
          }) 
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'assigned_to');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'status_text');
            assert.property(res.body[0], '_id');
            assert.equal(res.body[0].issue_text, 'Issue text');
            done();
          })
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({})
          .end(function(err, res){
            assert.equal(res.status, 200);  
            assert.equal(res.text, 'id error');
            done();
        });
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({_id: id1})
          .end(function(err, res){
            assert.equal(res.status, 200);  
            assert.equal(res.body.success, `deleted ${id1}`);             
            done();
        });
      });
      
      
//Deleting issues id2 and id3, created by POST tests. id1 should have been deleted by DELETE test (Valid _id test);
      
      test('Valid _id = id2', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({_id: id2})
          .end(function(err, res){
            assert.equal(res.status, 200);  
            assert.equal(res.body.success, `deleted ${id2}`);            
            done();
        });
      });
      
      test('Valid _id = id3', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({_id: id3})
          .end(function(err, res){
            assert.equal(res.status, 200);  
            assert.equal(res.body.success, `deleted ${id3}`);         
            done();
        });
      });
      
    });
});

