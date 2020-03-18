'use strict'

class NewIssue {
  constructor(project, title='', text='', createdBy='', assignedTo='', statusText=''){
    this.project = project;
    this.title = title;
    this.text = text
    this.createdBy = createdBy;
    this.assignedTo = assignedTo;
    this.statusText = statusText;
    this.createdOn = new Date().toISOString();
    this.updatedOn = '';
    this.open = true;
  }
}

module.exports = NewIssue;