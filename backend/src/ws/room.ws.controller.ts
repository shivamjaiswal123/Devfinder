import WebSocket from 'ws';
import { prisma } from '../config/prisma.config';

export interface CreateRoomPayload {
    user_id: string;          // User ID of the room creator
    room_id: string;
  }

const rooms = new Map<string, Set<string>>();
const users = new Map<string, Set<string>>();

export const handle_room_ws = (ws: WebSocket, message: WebSocket.RawData) => {
  try {
    const data = JSON.parse(message.toString());
    const { type, payload } = data;

    switch (type) {

      case 'create':
        create(ws, payload);

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
    console.error('Error processing WebSocket message:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
  }
};

const create = async (ws: WebSocket, payload: CreateRoomPayload) => {
    const { user_id, room_id } = payload;
   
    try {

        // Check if the room exists in the database
        const room = await prisma.room.findUnique({
            where: { room_id: room_id },
        });

        if (!room) {
            ws.send(JSON.stringify({ type: 'error', message: `Room ${room_id} does not exist` }));
            return;
        }

        //Check if user_id already presend in room_id
        if(rooms.has(room_id)){
            if(rooms.get(room_id)?.has(user_id)){
                ws.send(JSON.stringify({ type: 'Already Present', message: `User ${user_id} already in the room ${room_id}` }));
                return;
            }
        }
  
        // add in room - user map
        if (!rooms.has(room_id)) {
            rooms.set(room_id, new Set());
        }
        rooms.get(room_id)?.add(user_id);

        // add in user - room map
        if (!users.has(user_id)) {
            users.set(user_id, new Set());
        }
        users.get(user_id)?.add(room_id);

        ws.send(JSON.stringify({ type: 'roomJoined', message: `User ${user_id} has joined room ${room.room_id}` }));
        console.log(`User ${user_id} joined room ${room_id}`);
          
      }
      catch(e){
          console.error('Error joining room:', e);
          ws.send(JSON.stringify({ type: 'error', message: 'Error joining the room' }));
      }   
  };

const join = async (ws: WebSocket, payload: CreateRoomPayload) => {
  const { room_id, user_id } = payload;
 
  try {
        // Check if the room exists in the database
        const room = await prisma.room.findUnique({
            where: { room_id: room_id },
        });

        if (!room) {
            ws.send(JSON.stringify({ type: 'error', message: `Room ${room_id} does not exist` }));
            return;
        }

        // add in room - user map
        if (!rooms.has(room_id)) {
            rooms.set(room_id, new Set());
        }
        rooms.get(room_id)?.add(user_id);

        // add in user - room map
        if (!users.has(user_id)) {
            users.set(user_id, new Set());
        }
        users.get(user_id)?.add(room_id);

        ws.send(JSON.stringify({ type: 'roomJoined', message: `User ${user_id} has joined room ${room_id}` }));
        console.log(`User ${user_id} joined room ${room_id}`);
        
    }
    catch(e){
        console.error('Error joining room:', e);
        ws.send(JSON.stringify({ type: 'error', message: 'Error joining the room' }));
    }   
};

const leave = (ws: WebSocket, payload: any) => {

}
