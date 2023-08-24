function generateKey() {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let result = "";
	const randomValues = new Uint8Array(64);
	crypto.getRandomValues(randomValues);
	for (let i = 0; i < 64; i++) {
		result += characters.charAt(randomValues[i] % charactersLength);
	}
	return result;
}

async function create_counter(request, env, ctx) {
	const json = await request.json();
	if (json.please == true) {
		var key = ''
		do {
			key = await generateKey();
			// key = 1
		} while ((await env.counterApi.get(key)) != null)
		console.log("Key", key);
		await env.counterApi.put(key, 0);
		const res = {
			"key": key,
			"count": await env.counterApi.get(key)
		}
		return new Response(JSON.stringify(res), {
			headers: { "content-type": "application/json" },
		});
	} else {
		return new Response("Please set please to true", { status: 400 });
	}
}
async function increment_counter(request, env, ctx) {
	const json = await request.json();
	var key = json.key;
	if (key == null) {
		return new Response("Key not found", { status: 400 });
	}
	const count = await env.counterApi.get(key);
	if (count == null) {
		return new Response("Key not found", { status: 400 });
	}
	if (json.ammount != null) {
		await env.counterApi.put(key, parseInt(count) + parseInt(json.ammount));
	} else {
		await env.counterApi.put(key, parseInt(count) + 1);
	}
	const newCount = await env.counterApi.get(key);
	const res = {
		"key": key,
		"count": newCount
	}
	return new Response(JSON.stringify(res), {
		headers: { "content-type": "application/json" },
	});
}
async function get_counter(request, env, ctx) {
	const json = await request.json();
	var key = json.key;
	if (key == null) {
		return new Response("Key not found", { status: 400 });
	}
	var count = await env.counterApi.get(key);
	if (count == null) {
		return new Response("Key not found", { status: 400 });
	}
	const res = {
		"key": key,
		"count": count,
	}
	return new Response(JSON.stringify(res), {
		headers: { "content-type": "application/json" },
	});
}



const routes = {
	"GET /": () => new Response("This is the api", { status: 200 }),
	"POST /create_counter": create_counter,
	"POST /increment_counter": increment_counter,
	"POST /get_counter": get_counter,
}

export default {
	async fetch(request, env, ctx) {
		console.log("Request", request);
		const { pathname } = new URL(request.url);
		var route = routes[`${request.method} ${pathname}`];
		console.log("Route", `${request.method} ${pathname}`);
		if (route) {
			return route(request, env, ctx);
		}
		return new Response("Not found", { status: 404 });
	},
};
