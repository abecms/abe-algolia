'use strict'
var path = require('path')
var algoliasearch = require('algoliasearch')

function alclient (abe) {
  var apiKey
  var applicationID
  this.indexName = path.basename(abe.config.root)

  if(abe.config.algolia){
    var elt = abe.config.algolia
    apiKey = (elt.hasOwnProperty("apiKey"))?elt.apiKey:apiKey
    applicationID = (elt.hasOwnProperty("applicationID"))?elt.applicationID:applicationID
    this.indexName = (elt.hasOwnProperty("indexName"))?elt.indexName:this.indexName
  }

  try {
    this.client = algoliasearch(applicationID, apiKey);
    this.index = this.client.initIndex(this.indexName);
  } catch(e){
    this.client = null
    this.index = null
  }
}

module.exports = alclient;