'use strict';

var urljoin = require('url-join');
var groupsServer = ('https://aws1718-03.herokuapp.com/api/v1/'); //por determinar la URL
var groupsKey = 'asdfg';

module.exports = function(url) {
    return urljoin(groupsServer, url, '?apikey='+groupsKey);
};
