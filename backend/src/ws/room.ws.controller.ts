import WebSocket from 'ws';
import { prisma } from '../config/prisma.config';

export const handle_room_ws = (ws: WebSocket, message: WebSocket.RawData) => {
  try {
    const data = JSON.parse(message.toString());
    const { type, payload } = data;

    switch (type) {
      case 'join':
        join(ws, payload);
        break;

      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown event type' }));
    }
  } catch (error) {
    console.error('Error processing WebSocket message:', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
  }
};

const join = async (ws: WebSocket, payload: any) => {
  const { room_id, user_id } = payload;

  // Logic for attaching the client to the room (e.g., store in-memory or DB)
  console.log(`User ${user_id} is joining room ${room_id}`);

  // Optionally, send a confirmation back to the client
  ws.send(JSON.stringify({ type: 'roomJoined', message: `Joined room ${room_id}` }));
};
