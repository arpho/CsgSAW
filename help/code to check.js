 console.log('waterfall ok',id) // id ok
 var  data = {}
 data.success = true
 data.expiredToken = false
 data.token = checkToken.token
 data.msg = 'archivio pronto per il download'
 console.log('folder',id) //id ok
 var folder = id.toString()
 var filePath = [cache.retrieve('projectRoot'),"/app/temp/",folder, "/registrazioni.zip"].join("")
 console.log('file',filePath) // path ok
 var path = require('path')
              res.download(path.resolve(file),'registrazioni.zip')// id undefined
