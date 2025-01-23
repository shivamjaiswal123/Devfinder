import { app  } from './app' 
import { startWebscoketServer } from './ws/ws.server';

const PORT = process.env.PORT || 3000

const http_server = app.listen(PORT, () => {
    console.log(`HTTP Server started on port: ${PORT}`);
})

startWebscoketServer(http_server);

app.on('error', (error) => {
    console.error('Error while running the server:', error);
})

