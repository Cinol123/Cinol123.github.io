const fs = require('fs');
const requestIp = require('request-ip');
const express = require('express');
const app = express();

app.use(requestIp.mw());

app.get('/', function(req, res) {
  const clientIp = req.clientIp;
  console.log(`Visitor's IP address: ${clientIp}`);
  
  // Zapisz adres IP klienta do pliku
  fs.appendFile('ip_logs.txt', `${clientIp}\n`, (err) => {
    if (err) {
      console.error('Błąd podczas zapisywania adresu IP do pliku:', err);
    }
  });
  
  res.send(`Your IP address is ${clientIp}`);
});

app.listen(3000, () => {
  console.log('Serwer nasłuchuje na porcie 3000');
});
