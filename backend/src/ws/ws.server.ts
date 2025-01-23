import { WebSocketServer } from "ws";
import { handle_room_ws, rooms } from "./room.ws.controller";
import { handle_chat_ws } from "./chat.ws.controller";
import jwt from "jsonwebtoken"

export const startWebscoketServer = (http_server: any) => {

    const wss = new WebSocketServer({ server: http_server });

    wss.on('connection', (ws,req) => {
        console.log('A client connected.');
        console.log(`Conn Url ${req.url}`);
        const token = req.headers.cookie;
        console.log("cookies ",token)
        if (!token) {
            ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized: No cookies provided' }));
            ws.close(1008, 'Unauthorized');
            return;
        }
        
        try{
            const decodedToken =jwt.verify(token, process.env.JWT_SECRET_KEY!!);
            console.log(decodedToken)
        }catch(e){
            console.log(e);
            ws.send(JSON.stringify({ type: 'error', message: 'Unauthorized: Wrong Cookies' }));
            ws.close(1008, 'Unauthorized');
        } 
    
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
}