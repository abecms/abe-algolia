'use strict';

var fs = require('fs');
var path = require('path');

var route = function route(req, res, next, abe) {
  if(req.query.active != null){
    var json = {
      algolia:{
        active: req.query.active,
        apiKey: req.query.apiKey,
        applicationID: req.query.applicationID,
        index: req.query.algoliaIndex,
      }
    }

    abe.config.save(json)
    res.json({'ok': 'ok'})
    return;
  }

  var data = path.join(__dirname + '/../../partials/configuration.html')
  var html = abe.coreUtils.file.getContent(data);
  var template = abe.Handlebars.compile(html, {noEscape: true})
  var tmp = template({
    manager: {config: JSON.stringify(abe.config)},
    config: abe.config,
    user: res.user,
    isPageConfigAlgolia: true
  })
  res.send(tmp);

  return 
}

exports.default = route