'use strict';
var tap = require('tap')
var wpCache = require('../utilities/wrapperCache'),
twcCache = require('../utilities/wrapperTest');

wpCache.setCache('test',5)
tap.equal(wpCache.retrieve('test'),twcCache.retrieve('test'),'singletone')
