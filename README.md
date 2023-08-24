# [The Counter API](https://counter.variablef.com)
A simple api that can keep track of numbers for you. Made with cloudflare workers.
Attatched is an insomnia project that shows how to use this api.

## How to use
The basic idea is you include the key (except for the create counter function) in json (the key is just an example)
```json
{
	"key": "GXTM4BcvxTDLXIoaJgXj5SZqC9dQ4MNrFCNRcn3ZenqdXZRCZmR3YtysL6lUepA6"
}
```
and you get back the following format (the key is just an example)
```json
{
	"key": "GXTM4BcvxTDLXIoaJgXj5SZqC9dQ4MNrFCNRcn3ZenqdXZRCZmR3YtysL6lUepA6",
	"count": "2"
}
```
for the first step you create a counter by providing the following json to the /create_counter endpoint
```json
{
	"please": true
}
```

The avalible endpoints are all POST with json body and are as follows
```
/create_counter
/increment_counter (supports additional argument "ammount")
/get_counter
```

A useable hosted version is avalible on https://counter.variablef.com

## DIY
If you want to deploy it yourself you need to setup a kv space and add it to `wrangler.toml` and then run `wrangler deploy` to deploy it.


