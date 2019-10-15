module.exports = io => socket => {
    connectedList.push({id: socket.id});
    socket.emit('greeting', {payload: connectedList});
    socket.on('disconnect', socketOut => {
        io.emit('user left', {id: socket.id});
        connectedList = connectedList.filter(({id}) => id != socket.id)
    })
    socket.broadcast.emit('user joined', {id: socket.id});
    socket.on('message', data => {
        io.emit('message', data)
    })
}

let connectedList = [];