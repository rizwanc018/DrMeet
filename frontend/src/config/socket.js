import io from 'socket.io-client';

// const socketInstance = io.connect('http://localhost:5001');
const socketInstance = io.connect('http://10.4.4.27:5001');

// const socketInstance = io()


export default socketInstance;