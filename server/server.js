const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname + '../web/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../web/build', 'index.html'));
});

io.on("connection", socket => {

    socket.on('send-changes', delta => {
        console.log('delta:', delta);
        socket.broadcast.emit('receive-changes', delta)
    })
    console.log("connected");
});

server.listen(PORT, () => {
    console.log('Connected to port:', PORT);
})