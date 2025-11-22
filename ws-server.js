#!/usr/bin/env node
// Simple WebSocket broadcaster for TouchDesigner -> Browser integration
// Usage: `node ws-server.js` (requires `ws` package)

const WebSocket = require('ws');
const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port });

console.log(`WebSocket server listening on ws://0.0.0.0:${port}`);

wss.on('connection', function connection(ws, req) {
  const clientId = (Math.random() * 1e9 >>> 0).toString(36);
  ws._id = clientId;
  console.log('client connected', clientId, 'from', req.socket.remoteAddress);

  ws.on('message', function incoming(message) {
    // Expect messages to be JSON or plain strings. Broadcast to all other clients.
    let payload = message;
    try {
      // normalize JSON to minified string for logging
      const parsed = JSON.parse(message);
      payload = JSON.stringify(parsed);
    } catch (e) {
      // not JSON, leave as-is
    }

    console.log(`recv from ${ws._id}:`, payload);

    // Broadcast to all other clients (simple orchestration)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        try { client.send(payload); } catch (e) { /* ignore send errors */ }
      }
    });
  });

  ws.on('close', function() { console.log('client disconnected', ws._id); });
  ws.on('error', function(err){ console.warn('client error', ws._id, err && err.message); });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  wss.close(() => process.exit(0));
});
