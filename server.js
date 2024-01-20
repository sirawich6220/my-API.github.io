const express = require('express');
const app = express();
const cors = require('cors'); // เพิ่มบรรทัดนี้
const port = 3000;

app.use(cors());

app.use(cors({
    origin: 'http://127.0.0.1:5500', // กำหนด origin ของเว็บไซต์ที่อนุญาต
}));

app.all('/check-my-ip', (req, res) => {
    const forwardedIP = req.headers['x-forwarded-for'];

    if (forwardedIP && typeof forwardedIP === 'string' && forwardedIP.trim() !== '') {
        const myIP = forwardedIP.split(',')[0].trim();
        console.log('API Result:', myIP);
        res.json({ myIP });
    } else {
        const myIP = req.socket.remoteAddress || '';
        console.log('API Result:', myIP);
        res.json({ myIP });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
