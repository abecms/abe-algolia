'use strict'
var path = require('path');
var alconnection = require('../modules/alconnection');

var hooks = {
  afterPublish: function (result, postPath, abe) {
    if(abe.config.algolia && abe.config.algolia.active){
      var al = new alconnection(abe)
      const revisionPath = path.join(abe.config.root, abe.config.data.url, result.abe_meta.publish.abeUrl.replace(`.${abe.config.files.templates.extension}`, '.json'))
      const link = result.abe_meta.link
      const template = result.abe_meta.template
      const content = abe.cmsData.file.get(revisionPath)

      al.index.addObject(content, link, function(err, content) {
        console.log('objectID=' + content.objectID);
      });
    }

    return result;
  },
  afterUnpublish: function (path, json, abe) {
    if(abe.config.algolia && abe.config.algolia.active){
      var al = new alconnection(abe)
      const link = json.abe_meta.link

      al.index.deleteObject(link, function(err) {
        if (!err) {
          console.log('success');
        }
      });
    }

    return path;
  },
  afterDelete: function (path, json, abe) {
    if(abe.config.algolia && abe.config.algolia.active){
      var al = new alconnection(abe)
      
      al.index.deleteObject(path, function(err) {
        if (!err) {
          console.log('success');
        }
      });
    }

    return path;
  }
};

exports.default = hooks;
