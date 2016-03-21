'use strict';

const request = require('request');

const wrappedRequest = request.defaults({
  json: true
});

/**
 * Wrapper around the `request` request. Standardizes what is returned from the
 * DocumentCloud API so it is consistent across all endpoints.
 *
 * @param  {Object} requestParams - Parameters of the requestParams
 * @param  {Function} callback - Callback to handle API response
 * @private
 */
function apiRequest (requestParams, callback) {
  wrappedRequest(requestParams, function (err, resp, body) {
    if (err) return callback(err);

    const response = {
      status_code: resp.statusCode
    };

    if (body) {
      response.response = body;
    }

    callback(null, response);
  });
}

module.exports = apiRequest;
