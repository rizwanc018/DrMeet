import io from 'socket.io-client';

const socketInstance = io.connect('http://localhost:5001');
export default socketInstance;