import 'dotenv/config'
import { app  } from './app' 
import { WebSocketServer } from 'ws'
import { handle_room_ws } from './ws/room.ws.controller'
import { handle_chat_ws } from './ws/chat.ws.controller'


const PORT = process.env.PORT || 3000

const http_server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

export const wss = new WebSocketServer({ server: http_server });

wss.on('connection', (ws,req) => {
    console.log('A client connected.');
    console.log(`Conn Url ${req.url}`);
    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        
        try {
            const data = JSON.parse(message.toString());
            const { category } = data;

            switch (category) {
                case 'room':
                    handle_room_ws(ws, message);
                    break;

                case 'chat':
                    handle_chat_ws(ws, message);
                    break;

                default:
                  ws.send(JSON.stringify({ category: 'error', message: 'Unknown event type' }));
              }
        }catch(e){
            console.error('Error processing WebSocket message:', e);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' })); 
        }

        // ws.send(`Server received: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('A client disconnected.');
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

app.on('error', (error) => {
    console.error('Error while running the server:', error);
})

