'use strict';

const fs = require('fs');

const isURL = require('validator').isURL;

const apiRequest = require('./apiRequest');

/**
 * Handles all methods that interact with document API endpoints.
 *
 * Should never be created manually &mdash; can be accessed on an instance of `DocumentCloudClient` at `DocumentCloudClient.documents`.
 *
 * @module DocumentClient
 * @param {Object} client Instance of DocumentCloudClient
 */
function DocumentClient (client) {
  this.client = client;
}

/**
 * Searches the DocumentCloud service for documents.
 *
 * @param  {String} q - The search query
 * @param  {Object} [opts] - Additional search parameters
 * @param  {Number} [opts.page] - Response page number (defaults to 1)
 * @param  {Number} [opts.per_page] - The number of documents to return per page (defaults to 10, max is 1,000)
 * @param  {Boolean} [opts.sections] - Include document sections
 * @param  {Boolean} [opts.annotations] - Include document annotations
 * @param  {Boolean} [opts.data] - Include key/value data in results
 * @param  {Number} [opts.mentions] - Include highlighted mentions of search phrase (none by default, max is 10)
 * @param  {String} [opts.order] - Order documents are listed (defaults to `created_at`, choices are: `score`, `created_at`, `title`, `page_count`, `source`)
 * @param  {Function} callback Callback that handles the API response
 */
DocumentClient.prototype.search = function (q, opts, callback) {
  if (arguments.length === 2) {
    callback = opts;
    opts = {};
  }

  const query = Object.assign({
    q: q
  }, opts);

  const requestParams = {
    uri: this.client.buildUri('search.json'),
    method: 'GET',
    qs: query
  };

  apiRequest(requestParams, callback);
};

/**
 * Uploads a document to DocumentCloud.
 *
 * The `file` can be a path to a document on disk, a Node.js Buffer, or the
 * URL to a public file.
 *
 * @param  {String|Buffer} file - Path to a file, a Node.js Buffer, or public URL
 * @param  {String} title - Title of uploaded document
 * @param  {Object} [opts] - Additional parameters to be included with upload
 * @param  {String} [opts.source] - Source of document
 * @param  {String} [opts.description] - Description of document
 * @param  {String} [opts.language=eng] - Language of document, will be used
 * determine which OCR package to be used
 * @param  {String} [opts.related_article] - URL of article associated with document
 * @param  {String} [opts.published_url] - URL of page where document will be embedded
 * @param  {String} [opts.access=private] - Sets access level (defaults to `private`,
 * choices are: `private`, `public`, `organization`)
 * @param  {Number} [opts.project] - Numeric ID of project to add document to
 * @param  {Object} [opts.data] - Object of key/value pairs to associate with document
 * @param  {Boolean} [opts.secure] - If the document is sensitive, setting
 * `secure` to `true` will prevent it from being sent to OpenCalais for entity extraction
 * @param  {Boolean} [opts.force_ocr] - Forces a document to OCR'd even if it has text
 * @param  {Function} callback - Callback that handles the API response
 */
DocumentClient.prototype.upload = function (file, title, opts, callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri('upload.json'),
    method: 'POST'
  };

  const fileIsURL = isURL(file, {require_protocol: true});
  const fileIsBuffer = Buffer.isBuffer(file);

  if (!fileIsURL && !fileIsBuffer) {
    file = fs.createReadStream(file);
  }

  const form = Object.assign({
    file: file,
    title: title
  }, opts);

  if (fileIsURL) {
    requestParams.form = form;
  } else {
    requestParams.formData = form;
  }

  apiRequest(requestParams, callback);
};

/**
 * Get a document's metadata from DocumentCloud.
 *
 * @param  {String} doc_id - Document identifier
 * @param  {Function} callback - Callback that handles the API response
 * @example
 *
 * client.documents.get('1659580-economic-analysis-of-the-south-pole-traverse', function (err, response) {
 *   if (err) throw err;
 *
 *   console.log(response);
 * });
 *
 * // {
 * //   "status_code": 200,
 * //   "response": {
 * //     "document": {
 //       "id": "1659580-economic-analysis-of-the-south-pole-traverse",
 //       "title": "Economic Analysis of the South Pole Traverse",
 * //       "access": "public",
 * //       "pages": 38,
 * //       ...
 */

DocumentClient.prototype.get = function (doc_id, callback) {
  const requestParams = {
    uri: this.client.buildUri(`documents/${doc_id}.json`),
    method: 'GET'
  };

  apiRequest(requestParams, callback);
};

/**
 * Update a document's title, source, description, related article, access
 * level, or data values. Values passed into `opts` will be updated on the
 * requested document.
 *
 * @param  {String} doc_id - Document identifier
 * @param  {Object} opts - Values to update
 * @param  {String} [opts.title] - Title of document
 * @param  {String} [opts.source] - Source of document
 * @param  {String} [opts.description] - Description of document
 * @param  {String} [opts.related_article] - URL of article associated with document
 * @param  {String} [opts.published_url] - URL of page where document will be embedded
 * @param  {String} [opts.access=private] - Sets access level (defaults to `private`,
 * choices are: `private`, `public`, `organization`)
 * @param  {Object} [opts.data] - Object of key/value pairs to associate with document
 * @param  {Function} callback - Callback that handles the API response
 */
DocumentClient.prototype.update = function (doc_id, opts, callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri(`documents/${doc_id}.json`),
    method: 'PUT',
    body: opts
  };

  apiRequest(requestParams, callback);
};

/**
 * Deletes a document on DocumentCloud.
 *
 * @param  {String} doc_id - Document identifier
 * @param  {Function} callback - Callback that handles the API response
 */
DocumentClient.prototype.delete = function (doc_id, callback) {
  this.client.requiresCredentials();

  const requestParams = {
    uri: this.client.buildUri(`documents/${doc_id}.json`),
    method: 'DELETE'
  };

  apiRequest(requestParams, callback);
};

/**
 * Returns a list of entities associated with a document.
 *
 * @param  {String}   doc_id - Document identifier
 * @param  {Function} callback - Callback that handles the API response
 */
DocumentClient.prototype.entities = function (doc_id, callback) {
  const requestParams = {
    uri: this.client.buildUri(`documents/${doc_id}/entities.json`),
    method: 'GET'
  };

  apiRequest(requestParams, callback);
};

module.exports = DocumentClient;
