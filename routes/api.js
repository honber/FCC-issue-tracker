/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const NewIssueHandler = require('../controllers/newIssueHandler.js');
const UpdatedIssueHandler = require('../controllers/updatedIssueHandler.js');

const CONNECTION_STRING = process.env.MLAB_URI; //ongoClient.connect(CONNECTION_STRING, function(err, db) {});


const connectOptions = { 
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(CONNECTION_STRING, connectOptions, err => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  }
  else {
    console.log('Connection to database succesful'); 
  }
});

const Schema = mongoose.Schema;
const issuesSchema = new Schema({
  project: String,
  issue_title: String,
  issue_text: String,
  created_by: String,
  assigned_to: String,
  status_text: String,
  created_on: String,
  updated_on: String,
  open: Boolean
});
const issuesModel = mongoose.model('issue_tracker', issuesSchema);


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const currentProject = req.params.project;
      issuesModel.find({project: currentProject}, (error, response) => {
        if (error) {
          res.send(error.message);
        }
        else {
          res.json(response);
        }
      });
    })
    
    .post(function (req, res){
      const project    = req.params.project;
      const title      = req.body.issue_title;
      const text       = req.body.issue_text;
      const createdBy  = req.body.created_by;
      const assignedTo = req.body.assigned_to;
      const statusText = req.body.status_text;

      const newIssue = new NewIssueHandler(project, title, text, createdBy, assignedTo, statusText);
    
      const newIssueToSaveInDB = new issuesModel({
        project: newIssue.project,
        issue_title: newIssue.title,
        issue_text: newIssue.text,
        created_by: newIssue.createdBy,
        assigned_to: newIssue.assignedTo,
        status_text: newIssue.statusText,
        created_on: newIssue.createdOn,
        updated_on: newIssue.updatedOn,
        open: newIssue.open
      });
    
      newIssueToSaveInDB.save((error, response) => {
        if (error) {
          res.send(error.message);
        }
        else {
          res.json(newIssueToSaveInDB); 
        }
      });
    })
    
    .put(function (req, res){
      const idOfIssueToUpdate = req.body._id;
      const title = req.body.issue_title;
      const text = req.body.issue_text;
      const createdBy = req.body.created_by;
      const assignedTo = req.body.assigned_to;
      const statusText = req.body.status_text;
      let open;
      if (req.body.open === 'false') {open = false};
    
      const issueToUpdate = new UpdatedIssueHandler(title, text, createdBy, assignedTo, statusText, open)
    
      if (Object.keys(issueToUpdate).length === 0) {
        res.send('no updated field sent')
      }
      else {
        issuesModel.findOneAndUpdate({_id: idOfIssueToUpdate}, issueToUpdate, (error, response) => {
          if (error) {
            res.send(`could not update ${idOfIssueToUpdate}`);
          }
            res.send('successfully updated')
        });  
      }      
    })
    
    .delete(function (req, res){
      const issueToBeRemoved = req.body._id;
    
      if (!req.body._id) {
        res.send('id error');
      }
      else {
        issuesModel.findOneAndRemove({_id: issueToBeRemoved}, (error, response) => {
          if (error) {
            res.send(`could not delete ${issueToBeRemoved}`);
          }
          else {
            response === null ?  res.send(null) :  res.send({success: `deleted ${issueToBeRemoved}`});
          }
        });  
      }   
    });    
};

