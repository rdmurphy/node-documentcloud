# node-documentcloud

A Node.js wrapper around the [DocumentCloud API](https://www.documentcloud.org/help/api). Requires Node.js `>= 4`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Docs](#api-docs)
    -   [DocumentCloudClient](#documentcloudclient)
    -   [ProjectClient](#projectclient)
        -   [create](#create)
        -   [delete](#delete)
        -   [list](#list)
        -   [update](#update)
    -   [DocumentClient](#documentclient)
        -   [delete](#delete-1)
        -   [entities](#entities)
        -   [get](#get)
        -   [search](#search)
        -   [update](#update-1)
        -   [upload](#upload)
-   [Major Thanks](#major-thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```sh
npm install --save documentcloud
```

## Usage

The client interface makes it possible to pass in your DocumentCloud username and password so you can do authenticated requests. While this is not required for some endpoints, your experience will likely be much better if you are authenticated.

```javascript
// import the library
var DocumentCloudClient = require('documentcloud');

// create a client
var client = new DocumentCloudClient('username', 'password');

// get to work!
client.documents.get('1659580-economic-analysis-of-the-south-pole-traverse', function (err, response) {
  if (err) throw err;

  console.log(response);
});

// {
//   "status_code": 200,
//   "response": {
//     "document": {
//       "id": "1659580-economic-analysis-of-the-south-pole-traverse",
//       "title": "Economic Analysis of the South Pole Traverse",
//       "access": "public",
//       "pages": 38,
//       ...
```

## API Docs

### DocumentCloudClient

The main DocumentCloud client. A DocumentCloud username and password are
optional, but some methods are not available to unauthenticated users.

It is also possible to override the default base API URL.

**Parameters**

-   `username` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** DocumentCloud username (optional, default `null`)
-   `password` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** DocumentCloud password (optional, default `null`)
-   `apiUrl` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** An override for
    the DocumentCloud API base URL. (optional, default `https://www.documentcloud.org/api/`)

**Examples**

```javascript
var DocumentCloudClient = require('documentcloud');

var client = new DocumentCloudClient('email@example.com', 'example_pw');
```

### ProjectClient

Handles all methods that interact with project API endpoints.

Should never be created manually — can be accessed on an instance of `DocumentCloudClient` at `DocumentCloudClient.projects`.

**Parameters**

-   `client` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Instance of DocumentCloudClient

#### create

Creates a project.

**Parameters**

-   `title` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Title of project.
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** Additional parameters to be included with project creation
    -   `opts.description` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Description of project
    -   `opts.document_ids` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>=** List documents to be associated to this project, by document identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback to handle API response

#### delete

Deletes a project. Documents associated with the project are not effected.

**Parameters**

-   `project_id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The project identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback to handle API response

#### list

Lists all projects associated with the account.

**Parameters**

-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback to handle API response

#### update

Updates data associated with a project. Do note - this _replaces_ every field,
whether it is provided or not. For example - if you do not provide a list of `document_ids`,
it will be set to none.

**Parameters**

-   `project_id` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The project identifier
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Parameters to be set during the update
    -   `opts.title` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Title of project
    -   `opts.description` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Description of project
    -   `opts.document_ids` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>=** List documents to be associated to this project, by document identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback to handle API response

### DocumentClient

Handles all methods that interact with document API endpoints.

Should never be created manually — can be accessed on an instance of `DocumentCloudClient` at `DocumentCloudClient.documents`.

**Parameters**

-   `client` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Instance of DocumentCloudClient

#### delete

Deletes a document on DocumentCloud.

**Parameters**

-   `doc_id` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Document identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

#### entities

Returns a list of entities associated with a document.

**Parameters**

-   `doc_id` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Document identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

#### get

Get a document's metadata from DocumentCloud.

**Parameters**

-   `doc_id` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Document identifier
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

**Examples**

```javascript
client.documents.get('1659580-economic-analysis-of-the-south-pole-traverse', function (err, response) {
  if (err) throw err;

  console.log(response);
});

// {
//   "status_code": 200,
//   "response": {
//     "document": {
//       "id": "1659580-economic-analysis-of-the-south-pole-traverse",
//       "title": "Economic Analysis of the South Pole Traverse",
//       "access": "public",
//       "pages": 38,
//       ...
```

#### search

Searches the DocumentCloud service for documents.

**Parameters**

-   `q` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The search query
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** Additional search parameters
    -   `opts.page` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Response page number (defaults to 1)
    -   `opts.per_page` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** The number of documents to return per page (defaults to 10, max is 1,000)
    -   `opts.sections` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Include document sections
    -   `opts.annotations` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Include document annotations
    -   `opts.data` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Include key/value data in results
    -   `opts.mentions` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Include highlighted mentions of search phrase (none by default, max is 10)
    -   `opts.order` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Order documents are listed (defaults to `created_at`, choices are: `score`, `created_at`, `title`, `page_count`, `source`)
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

#### update

Update a document's title, source, description, related article, access
level, or data values. Values passed into `opts` will be updated on the
requested document.

**Parameters**

-   `doc_id` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Document identifier
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Values to update
    -   `opts.title` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Title of document
    -   `opts.source` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Source of document
    -   `opts.description` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Description of document
    -   `opts.related_article` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** URL of article associated with document
    -   `opts.published_url` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** URL of page where document will be embedded
    -   `opts.access` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Sets access level (defaults to `private`,
        choices are: `private`, `public`, `organization`) (optional, default `private`)
    -   `opts.data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** Object of key/value pairs to associate with document
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

#### upload

Uploads a document to DocumentCloud.

The `file` can be a path to a document on disk, a Node.js Buffer, or the
URL to a public file.

**Parameters**

-   `file` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[Buffer](https://nodejs.org/api/buffer.html))** Path to a file, a Node.js Buffer, or public URL
-   `title` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Title of uploaded document
-   `opts` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** Additional parameters to be included with upload
    -   `opts.source` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Source of document
    -   `opts.description` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Description of document
    -   `opts.language` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Language of document, will be used
        determine which OCR package to be used (optional, default `eng`)
    -   `opts.related_article` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** URL of article associated with document
    -   `opts.access` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** Sets access level (defaults to `private`,
        choices are: `private`, `public`, `organization`) (optional, default `private`)
    -   `opts.project` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** Numeric ID of project to add document to
    -   `opts.data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=** Object of key/value pairs to associate with document
    -   `opts.secure` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** If the document is sensitive, setting
        `secure` to `true` will prevent it from being sent to OpenCalais for entity extraction
    -   `opts.force_ocr` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** Forces a document to OCR'd even if it has text
    -   `opts.published_url` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** URL of page where document will be embedded
-   `callback` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback that handles the API response

## Major Thanks

-   Thanks to [DocumentCloud](https://www.documentcloud.org/) for creating and maintaining such an awesome service.
-   Thanks to [python-documentcloud](https://github.com/datadesk/python-documentcloud), who served as inspiration for many parts of this.
