## Description

This module works like the normal [request module for node](https://www.npmjs.org/package/request) from [mikeal](https://www.npmjs.org/~mikeal), but call it's request over a socks5-proxy. This module is able to fetch onion-domains.

## Installation
### Pre-requirements
At first you need to have a working TOR service on your machine.

For example you can install TOR on a Debian system like this:
```
apt-get install tor tor-geoipdb
```
### Installation with node
Install the package over the npm package-manager:
```
npm install torrequest
```

## Usage
You can use this module like the request module. Please see [the readme of request](https://github.com/mattcg/socks5-http-client/blob/master/README.md
) for further informations.

### Socks5 typical parameters

There are two optional parameters specially introduced for the tor settings: torHost and torPort. Normally this module use the standard localhost:9050.

### Example with custom host and port.
```
var torRequest = require("torrequest");

torRequest({
  uri: "http://example.org",
  torHost: "my-host-or-ip",
  torPort: 9050
}, function(err,res,doc){
  if(err) return console.log("Error: "+err);
  console.log("Document fetched successfully...");
});
```