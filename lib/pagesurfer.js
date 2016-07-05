
/**
 * PageSurfer
 * @module {pagesurfer}
 */

(function() {
  var clickOnPage, clickOnPageNoApi, jsdom, nullCallBack, p_proxy, printCallBack, request;

  jsdom = require('node-jsdom');

  request = require('request');

  p_proxy = null;


  /**
   * Retrieve url and pass windows content to the callback function to parse the content
   * Example:
   * 	clickOnPage 'https://google.com', defaultCallBack
   * @param {url} URL del sito da visualizzare
   * @param {callback} callback che accetta errors e windows per elaborarela pagina restituita
   */

  clickOnPage = function(url, callback) {
    return request.get({
      method: 'GET',
      url: 'http://api.useragent.io/'
    }, function(error, response, body) {
      var ua;
      if (error) {
        return callback(error, null);
      } else {
        ua = JSON.parse(body).ua;
        return jsdom.env({
          url: url,
          headers: {
            'User-Agent': ua
          },
          proxy: p_proxy,
          scripts: ["http://code.jquery.com/jquery.js"],
          done: callback
        });
      }
    });
  };


  /**
   * Retrieve url and pass windows content to the callback function to parse the content using predefined UserAgents
   * Example:
   * 	clickOnPage 'https://google.com', defaultCallBack
   * @param {url} URL del sito da visualizzare
   * @param {callback} callback che accetta errors e windows per elaborarela pagina restituita
   */

  clickOnPageNoApi = function(url, callback) {
    var randomIntInc, user_agents;
    user_agents = {
      'Mozilla/5.0 (Linux; Android 4.4.2; CHC-U01 Build/HuaweiCHC-U01) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36': 'Mozilla/5.0 (Linux; Android 4.4.2; CHC-U01 Build/HuaweiCHC-U01) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
      'Mozilla/5.0 (Windows NT 5.1; rv:21.0) Gecko/20100101 Firefox/21.0': 'Mozilla/5.0 (Windows NT 5.1; rv:21.0) Gecko/20100101 Firefox/21.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:6.0.2) Gecko/20100101 Firefox/6.0.2': 'Mozilla/5.0 (Windows NT 5.1; rv:6.0.2) Gecko/20100101 Firefox/6.0.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
      'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon',
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:23.0) Gecko/20100101 Firefox/23.0': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:23.0) Gecko/20100101 Firefox/23.0',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
    };
    randomIntInc = function(low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low);
    };
    return jsdom.env({
      url: url,
      headers: {
        'User-Agent': user_agents[randomIntInc(0, user_agents.length - 1)]
      },
      proxy: p_proxy,
      scripts: ["http://code.jquery.com/jquery.js"],
      done: callback
    });
  };


  /**
   * Default callback for clickOnPage (it just print the current URL or the error message)
   * @param {error} Error is null in case of success
   * @param {window} windows variable of emulated browser
   */

  printCallBack = function(errors, window) {
    if (errors) {
      return console.log(errors);
    } else {
      return console.log(window.location.href);
    }
  };


  /**
   * Null callback for clickOnPage (it just do nothing)
   * @param {error} Error is null in case of success
   * @param {window} windows variable of emulated browser
   */

  nullCallBack = function(errors, window) {};


  /**
   * Exprt usable functions
   * @params {api} Define if API will be used to generate user agent
   * @type {Array|boolean}
   */

  module.exports = function(api, proxy) {
    p_proxy = proxy;
    if (typeof api === 'boolean') {
      if (api) {
        return {
          'clickOnPage': clickOnPage,
          'printCallBack': 'printCallBack',
          printCallBack: printCallBack,
          'nullCallBack': nullCallBack
        };
      } else {
        return {
          'clickOnPage': clickOnPage,
          'printCallBack': 'printCallBack',
          printCallBack: printCallBack,
          'nullCallBack': nullCallBack
        };
      }
    }
    if (typeof api === 'object') {
      return {
        'clickOnPage': function(url, callback) {
          var randomIntInc;
          randomIntInc = function(low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
          };
          return jsdom.env({
            url: url,
            headers: {
              'User-Agent': api[randomIntInc(0, api.length - 1)]
            },
            proxy: p_proxy,
            scripts: ["http://code.jquery.com/jquery.js"],
            done: callback
          });
        },
        'printCallBack': printCallBack,
        'nullCallBack': nullCallBack
      };
    }
  };

}).call(this);
