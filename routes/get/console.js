'use strict'
var path = require('path')
var alconnection = require('../../modules/alconnection');

var route = function route(req, res, next, abe) {
  abe.abeExtend.hooks.instance.trigger('beforeRoute', req, res, next)
  if(typeof res._header !== 'undefined' && res._header !== null) return

  var nbIndexed
  var al = new alconnection(abe)

  if(al.client !== null){
    if(req.query.reindex === "true"){
      var files = abe.Manager.instance.getListWithStatusOnFolder('publish')
      Array.prototype.forEach.call(files, (fileObj) => {

        const revisionPath = path.join(abe.config.root, abe.config.data.url, fileObj.abe_meta.link.replace(`.${abe.config.files.templates.extension}`, '.json'))
        const link = fileObj.abe_meta.link
        const template = fileObj.abe_meta.template
        const content = abe.cmsData.file.get(revisionPath)

        al.index.addObject(content, link, function(err, content) {
          console.log('objectID=' + content.objectID);
        });
      })
    }

    al.index.search('', {
      attributesToRetrieve: null,
      attributesToHighlight: null,
      hitsPerPage: 0
    }, function searchDone(err, content) {
      if (err) {
        var data = path.join(__dirname + '/../../partials/console.html')
        var html = abe.coreUtils.file.getContent(data);
        var template = abe.Handlebars.compile(html, {noEscape: true})
        var tmp = template({
        manager: {
          config: JSON.stringify(abe.config)},
          config: abe.config,
          user: res.user,
          nbIndexed: 0,
          isPageConsoleAlgolia: true,
          isPageConfigAlgolia: false,
          algolia: false
        })
        
        return res.send(tmp);
      }

      var data = path.join(__dirname + '/../../partials/console.html')
      var html = abe.coreUtils.file.getContent(data);
      var template = abe.Handlebars.compile(html, {noEscape: true})
      var tmp = template({
        express: {
      config: JSON.stringify(abe.config)},
      config: abe.config,
      user: res.user,
      nbIndexed: content.hits,
      isPageConsoleAlgolia: true,
      algolia: true
    })
      
      return res.send(tmp);
    });
  } else {
    var data = path.join(__dirname + '/../../partials/console.html')
    var html = abe.coreUtils.file.getContent(data);
    var template = abe.Handlebars.compile(html, {noEscape: true})
    var tmp = template({
    manager: {
      config: JSON.stringify(abe.config)},
      config: abe.config,
      user: res.user,
      nbIndexed: 0,
      isPageConsoleAlgolia: true,
      isPageConfigAlgolia: false,
      algolia: false
    })
    
    return res.send(tmp);
  }
}

exports.default = route
