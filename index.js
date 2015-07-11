/*jslint node:true*/

'use strict';

var Socks5ClientHttpAgent = require('./node_modules/socks5-http-client/lib/Agent');
var Socks5ClientHttpsAgent = require('./node_modules/socks5-https-client/lib/Agent');
var request = require("request");
var url = require("url");

var defaultTorHost = "localhost";
var defaultTorPort = 9050;


module.exports = function (opts, cb){
    var proto, params, torHost, torPort;
    params = {};
    if (typeof opts === "string") {
        proto = url.parse(opts).protocol;
        params.url = opts;
    } else if (opts.uri) {
        proto = url.parse(opts.uri).protocol;
        params = opts;
    } else if (opts.url) {
        proto = url.parse(opts.url).protocol;
        params = opts;
    } else {
        proto = opts.protocol;
        params = opts;
    }

    torHost = opts.torHost || defaultTorHost;
    torPort = opts.torPort || defaultTorPort;

    proto = proto || "http:"; // Fallback

    delete params.torHost;
    delete params.torPort;

    if (/https/.test(proto)) {
        params.agentClass = Socks5ClientHttpsAgent;
        params.agentOptions = {
            socksHost: torHost,
            socksPort: torPort
        };
    } else {
        params.agentClass = Socks5ClientHttpAgent;
        params.agentOptions = {
            socksHost: torHost,
            socksPort: torPort
        };
    }
    if (typeof cb === 'function') {
        return request(params, cb);
    }
    return request(params);
};
