'use strict'

class UpdatedIssue {
  constructor(title, text, createdBy, assignedTo, statusText, open){
    if (title) {this.issue_title = title};
    if (text) {this.issue_text = text};
    if (createdBy) {this.created_by = createdBy};
    if (assignedTo) {this.assigned_to = assignedTo};
    if (statusText) {this.status_text = statusText};
    if (open !== undefined) {this.open = open};
    if (title || text || createdBy || assignedTo || statusText || open) {this.updated_on = new Date().toISOString();}
  }
}

module.exports = UpdatedIssue;