'use strict';

const apiRequest = require('./apiRequest');

/**
 * Handles all methods that interact with project API endpoints.
 *
 * Should never be created manually &mdash; can be accessed on an instance of `DocumentCloudClient` at `DocumentCloudClient.projects`.
 *
 * @param {Object} client - Instance of DocumentCloudClient
 */
function ProjectClient (client) {
  this.client = client;
}

/**
 * Creates a project.
 *
 * @param  {String} title - Title of project.
 * @param  {Object} [opts] - Additional parameters to be included with project creation
 * @param  {String} [opts.description] - Description of project
 * @param  {String[]} [opts.document_ids] - List documents to be associated to this project, by document identifier
 * @param  {Function} callback - Callback to handle API response
 */
ProjectClient.prototype.create = function (title, opts, callback) {
  this.client.requiresCredentials();

  const body = Object.assign({
    title: title
  }, opts);

  const requestParams = {
    uri: this.client.buildUri('projects.json'),
    method: 'POST',
    body: body
  };

  apiRequest(requestParams, callback);
};

/**
 * Lists all projects associated with the account.
 *
 * @param  {Function} callback - Callback to handle API response
 */
ProjectClient.prototype.list = function (callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri('projects.json'),
    method: 'GET'
  };

  apiRequest(requestParams, callback);
};

/**
 * Updates data associated with a project. Do note - this *replaces* every field,
 * whether it is provided or not. For example - if you do not provide a list of `document_ids`,
 * it will be set to none.
 *
 * @param  {Number} project_id - The project identifier
 * @param  {Object} opts - Parameters to be set during the update
 * @param  {String} [opts.title] - Title of project
 * @param  {String} [opts.description] - Description of project
 * @param  {String[]} [opts.document_ids] - List documents to be associated to this project, by document identifier
 * @param  {Function} callback - Callback to handle API response
 */
ProjectClient.prototype.update = function (project_id, opts, callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri(`projects/${project_id}.json`),
    method: 'PUT',
    body: opts
  };

  apiRequest(requestParams, callback);
};

/**
 * Deletes a project. Documents associated with the project are not effected.
 *
 * @param  {Number} project_id - The project identifier
 * @param  {Function} callback - Callback to handle API response
 */
ProjectClient.prototype.delete = function (project_id, callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri(`projects/${project_id}.json`),
    method: 'DELETE'
  };

  apiRequest(requestParams, callback);
};

module.exports = ProjectClient;
