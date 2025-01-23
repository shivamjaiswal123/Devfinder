import WebSocket from 'ws';
import { rooms } from './room.ws.controller';

const findRoom = (ws: WebSocket) => {
    for(let [key, value] of rooms.entries()) {
        if(value.has(ws)){
            return key
        }
    }
}

export const handle_chat_ws = (ws: WebSocket, payload: any) => {
    const currUserRoom = findRoom(ws)
    
    if(!currUserRoom){
        console.log('User does not belong to any room!')
        return
    }

    rooms.get(currUserRoom)?.forEach(user => {
        user.send(payload.toString())
    })
};