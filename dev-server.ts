import index from "./index.html";

const server = Bun.serve({
	port: 3000,
	development: true, // enables HMR + verbose error overlay
	routes: {
		"/": index,
	},
	async fetch(req) {
        const url = new URL(req.url);
        
        const file = Bun.file(`.${url.pathname}`);
        if (await file.exists()) {
            return new Response(file);
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Listening on ${server.url}`);

// open default browser cross-platform
const opener =
	process.platform === "darwin"
		? ["open", server.url.toString()]
		: process.platform === "win32"
			? ["cmd", "/c", "start", "", server.url.toString()]
			: ["xdg-open", server.url.toString()];
Bun.spawn(opener);
