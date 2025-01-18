import 'dotenv/config'
import { app  } from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})

app.on('error', (error) => {
    console.error('Error while running the server:', error);
})