window.navigator.userAgent = 'ReactNative'; 
import io from 'socket.io-client'; 
const socket = io.connect(); 
export default socket; 

//create socket class if above doesn't work 
// class Main extends React.Component {
//   constructor(props) {
//     super(props);
  
//     // Creating the socket-client instance will automatically connect to the server.
//     this.socket = SocketIOClient('http://localhost:3000');
//   }
// }

// module.exports = Main;