import { WebSocketServer } from "ws";
import { handle_room_ws, rooms } from "./room.ws.controller";
import { handle_chat_ws } from "./chat.ws.controller";

export const startWebscoketServer = (http_server: any) => {
    const wss = new WebSocketServer({ server: http_server });

    wss.on('connection', ws => {
        console.log('New WebSocket connection established.');

        ws.on('message', messsage => {
            try {
                const { type , payload } = JSON.parse(messsage.toString())
                
                switch(type) {
                    case 'join':
                        handle_room_ws(ws, payload)
                        break
                    case 'chat':
                        handle_chat_ws(ws, payload)
                        break
                }
            } catch (error) {
                console.error('Error processing WebSocket message: ', error)
            }
        })
    })
}