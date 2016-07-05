###*
 * PageSurfer
 * @module {pagesurfer}
###
jsdom = require 'node-jsdom'
request = require 'request'

###*
# Retrieve url and pass windows content to the callback function to parse the content
# Example:
# 	clickOnPage 'https://google.com', defaultCallBack
# @param {url} URL del sito da visualizzare
# @param {callback} callback che accetta errors e windows per elaborarela pagina restituita
###
clickOnPage = (url, callback) ->
	request.get {
		method: 'GET',
		url: 'http://api.useragent.io/',
	}, (error, response, body) ->
		if error
			callback error, null
		else
			ua = JSON.parse(body).ua
			jsdom.env { 
				url: url,
				headers: {
					'User-Agent': ua
				},
				scripts: ["http://code.jquery.com/jquery.js"],
				done: callback
			}

###*
# Retrieve url and pass windows content to the callback function to parse the content using predefined UserAgents
# Example:
# 	clickOnPage 'https://google.com', defaultCallBack
# @param {url} URL del sito da visualizzare
# @param {callback} callback che accetta errors e windows per elaborarela pagina restituita
###
clickOnPageNoApi = (url, callback) ->
	user_agents = {
		'Mozilla/5.0 (Linux; Android 4.4.2; CHC-U01 Build/HuaweiCHC-U01) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36'
		'Mozilla/5.0 (Windows NT 5.1; rv:21.0) Gecko/20100101 Firefox/21.0'
		'Mozilla/5.0 (Windows NT 5.1; rv:6.0.2) Gecko/20100101 Firefox/6.0.2'
		'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
		'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0'
		'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20100101 Firefox/31.0'
		'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
		'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon'
		'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:23.0) Gecko/20100101 Firefox/23.0'
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
	}

	randomIntInc = (low, high) ->
		Math.floor(Math.random() * (high - low + 1) + low)

	jsdom.env { 
		url: url,
		headers: {
			'User-Agent': user_agents[randomIntInc 0, (user_agents.length - 1)]
		},
		scripts: ["http://code.jquery.com/jquery.js"],
		done: callback
	}

###*
# Default callback for clickOnPage (it just print the current URL or the error message)
# @param {error} Error is null in case of success
# @param {window} windows variable of emulated browser
###
printCallBack = (errors, window) ->
	if errors
		console.log errors
	else
		console.log window.location.href

###*
# Null callback for clickOnPage (it just do nothing)
# @param {error} Error is null in case of success
# @param {window} windows variable of emulated browser
###
nullCallBack = (errors, window) ->
	return

###*
 * Exprt usable functions
 * @params {api} Define if API will be used to generate user agent
 * @type {Array|boolean}
###
module.exports = (api) -> 
	if typeof api == 'boolean'
		if api
			return {
				'clickOnPage': clickOnPage,
				'printCallBack', printCallBack,
				'nullCallBack': nullCallBack
			}
		else
			return {
				'clickOnPage': clickOnPage,
				'printCallBack', printCallBack,
				'nullCallBack': nullCallBack
			}
	if typeof api == 'object'
		return {
			'clickOnPage': (url, callback) ->
				randomIntInc = (low, high) ->
					Math.floor(Math.random() * (high - low + 1) + low)

				jsdom.env { 
					url: url,
					headers: {
						'User-Agent': api[randomIntInc 0, (api.length - 1)]
					},
					scripts: ["http://code.jquery.com/jquery.js"],
					done: callback
				}
			, 'printCallBack': printCallBack,
			'nullCallBack': nullCallBack
		}