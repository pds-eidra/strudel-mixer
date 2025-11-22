# Strudel Mixer

An experimental, browser-first mixer for composing and blending musical compositions using Strudel.

https://pds-eidra.github.io/strudel-mixer/


```
# launch the mixer in one terminal:
npx http-server . -p 3000

# launch the WebSocket server in another terminal:
npm install
npm start

# You can do a small test with a WebSocket client:
wscat -c ws://localhost:8080
# then in the wscat shell:
{"type":"roll","category":"bass","prompt":"slow acid bass","phase":"build"}
```

To pipe the audio output from Strudel Mixer into Touch Designer, you can use a virtual audio cable like BlackHole (Mac)

```
brew install blackhole-2ch # then restart your machine and set up a virtual device
```

When you run the file in Touch Designer, you may need to "toggle" websocket1 to Inactive and back to Active again to get it going.