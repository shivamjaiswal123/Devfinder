import WebSocket from 'ws';
import { prisma } from '../config/prisma.config';

export const rooms = new Map<string, Set<WebSocket>>();
export const users = new Map<WebSocket, Set<string>>();

export const handle_room_ws = (ws: WebSocket, message: any) => {
  try {
    const data = JSON.parse(message.toString());
    const { type, payload } = data;

    switch (type) {

      case 'join':
        join(ws, payload);
        break;
    
      case 'leave':
        leave(ws, payload);
        break;

      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown event type' }));
    }
  } catch (error) {
    console.error('Error in handling the room: ', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
  }
};

const join = async (ws: WebSocket, payload:  { room_id: string }) => {
  const { room_id } = payload;
 
  try {
        // Check if the room exists in the database
        const room = await prisma.room.findUnique({
            where: { room_id: room_id },
        });

        if (!room) {
            ws.send(JSON.stringify({ type: 'error', message: `Room ${room_id} does not exist` }));
            ws.close(1008, 'Room does not exist');
            return;
        }

        //Check if user_id already presend in room_id
        if(rooms.has(room_id)){
            if(rooms.get(room_id)?.has(ws)){
                ws.send(JSON.stringify({ type: 'Already Present', message: `User ${ws} already in the room ${room_id}` }));
                return;
            }
        }

        // add in room - user map
        if (!rooms.has(room_id)) {
            rooms.set(room_id, new Set());
        }
        rooms.get(room_id)?.add(ws);

        // add in user - room map
        if (!users.has(ws)) {
            users.set(ws, new Set());
        }
        users.get(ws)?.add(room_id);

        ws.send(JSON.stringify({ type: 'roomJoined', message: `User ${ws} has joined room ${room_id}` }));
        console.log(`User ${ws} joined room ${room_id}`);
        
    }
    catch(e){
        console.error('Error joining room:', e);
        ws.send(JSON.stringify({ type: 'error', message: 'Error joining the room' }));
    }   
};

const leave = (ws: WebSocket, payload: any) => {

}
