import WebSocket from 'ws';

export const rooms = new Map<string, Set<WebSocket>>()

export const handle_room_ws = (ws: WebSocket, payload: { room_id: string }) => {
  try {
    if(!rooms.has(payload.room_id)){
      rooms.set(payload.room_id, new Set())
    }

    rooms.get(payload.room_id)?.add(ws)

  } catch (error) {
    console.error('Error in handling the room: ', error);
    ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
  }
}