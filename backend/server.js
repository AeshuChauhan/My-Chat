import app from './app.js';
import { PORT } from './constants.js';
import { connectDB } from './db/db.connect.js';

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
            process.on('error', () => {
                console.log('Server error');
            })
        });
    })
    .catch(err => console.error("DB Connection Error", err));