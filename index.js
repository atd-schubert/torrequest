'use strict';

var Socks5ClientHttpAgent = require('./node_modules/socks5-http-client/lib/Agent');
var Socks5ClientHttpsAgent = require('./node_modules/socks5-https-client/lib/Agent');
var request = require("request");
var url = require("url");

var defaultTorHost = "localhost";
var defaultTorPort = 9050;


module.exports = function(opts, cb){
  var proto;
  var params = {};
  if (typeof opts === "string") {
    proto = url.parse(opts).protocol;
    params.url = opts;
  }
  else {
    proto = opts.protocol;
    params = opts;
  }
  
  var thost = opts.torHost || defaultTorHost;
  var tport = opts.torPort || defaultTorPort;
  
  
  if(proto.indexOf("https")>=0) {
    params.agent = new Socks5ClientHttpsAgent({
      socksHost: thost,
      socksPort: tport
    });
  } else {
    params.agent = new Socks5ClientHttpAgent({
      socksHost: thost,
      socksPort: tport
    });
  }
  return request(params, cb);
};