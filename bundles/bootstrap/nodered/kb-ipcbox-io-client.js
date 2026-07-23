#!/usr/bin/env node
"use strict";
const net = require("net");
const socketPath = "/run/kraftboks/ipcbox-io.sock";
const [op, signal, argument] = process.argv.slice(2);
if (!op) {
  console.error("Usage: kb-ipcbox-io-client.js <status|read|set|pulse|blink> [signal] [value]");
  process.exit(2);
}
const request = { op };
if (signal) request.signal = signal;
if (op === "set") request.value = ["1", "true", "on", "yes"].includes((argument || "").toLowerCase());
if (["pulse", "blink"].includes(op) && argument) request.seconds = Number(argument);
const client = net.createConnection(socketPath);
let response = "";
client.on("connect", () => client.write(`${JSON.stringify(request)}\n`));
client.on("data", chunk => {
  response += chunk.toString("utf8");
  if (response.includes("\n")) client.end();
});
client.on("end", () => {
  process.stdout.write(response);
  try {
    if (!JSON.parse(response).ok) process.exitCode = 1;
  } catch {
    process.exitCode = 1;
  }
});
client.on("error", error => {
  console.error(error.message);
  process.exit(1);
});
