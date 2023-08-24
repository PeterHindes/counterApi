# The Counter API
A simple api that can keep track of numbers for you.
Attatched is an insomnia project that shows how to use this api.

The basic idea is you include the key (except for the create counter function) in json
```json
{
	"key": "GXTM4BcvxTDLXIoaJgXj5SZqC9dQ4MNrFCNRcn3ZenqdXZRCZmR3YtysL6lUepA6"
}
```
and you get back the following format
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

The avalible endpoints are
```
/create_counter
/increment_counter (supports additional argument "ammount")
/get_counter
```
