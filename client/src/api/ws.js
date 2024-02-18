import socket from "socket.io-client";
if (route === "chat") {
	const socket = socket("ws://localhost:3000");

	socket.on("connect", () => {
		// send message
		socket.emit("message", "Hello!");
	});

	socket.on("message", (msg) => {
		// handle incoming message
		console.log(msg);
	});
}
