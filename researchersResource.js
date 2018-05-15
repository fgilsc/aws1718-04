'use strict';

var urljoin = require('url-join');
var researchersServer = ('https://aws1718-02.herokuapp.com/api/v1/'); //por determinar la URL
var researchersKey = 'asdf1234';

module.exports = function(url) {
    return urljoin(researchersServer, url, '?apikey='+researchersKey);
};
