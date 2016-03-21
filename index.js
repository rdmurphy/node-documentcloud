'use strict';

const uri = require('urijs');

const DocumentClient = require('./documents');
const ProjectClient = require('./projects');

/**
 * The main DocumentCloud client. A DocumentCloud username and password are
 * optional, but some methods are not available to unauthenticated users.
 *
 * It is also possible to override the default base API URL.
 *
 * @module DocumentCloudClient
 * @param {String} [username=null] DocumentCloud username
 * @param {String} [password=null] DocumentCloud password
 * @param {String} [apiUrl=https://www.documentcloud.org/api/] An override for
 * the DocumentCloud API base URL.
 * @example
 * var DocumentCloudClient = require('documentcloud');
 *
 * var client = new DocumentCloudClient('email@example.com', 'example_pw');
 */
function DocumentCloudClient (username, password, apiUrl) {
  this.username = username || null;
  this.password = password || null;
  this.apiUrl = apiUrl || 'https://www.documentcloud.org/api/';

  this.documents = new DocumentClient(this);
  this.projects = new ProjectClient(this);
}

/**
 * Builds a uri for an API request. If credentials exist, they will be used when
 * building the uri.
 *
 * @param  {String} suffix The section of the uri unique to a particular
 *                         request
 * @return {String}        The prepared uri
 * @private
 */
DocumentCloudClient.prototype.buildUri = function (suffix) {
  let requestUri;

  if (this.username && this.password) {
    requestUri = uri(this.apiUrl + suffix);
    requestUri.username(this.username);
    requestUri.password(this.password);
    requestUri = requestUri.toString();
  } else {
    requestUri = this.apiUrl + suffix;
  }

  return requestUri;
};

/**
 * Short circuits any command that requires credentials and throws an error.
 *
 * @return {void}
 * @private
 */
DocumentCloudClient.prototype.requiresCredentials = function () {
  if (!this.username && !this.password) {
    throw new Error('This API method requires a username and password when interacting with the DocumentCloud client.');
  } else {
    return true;
  }
};

module.exports = DocumentCloudClient;
