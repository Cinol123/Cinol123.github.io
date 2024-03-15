const fs = require('fs');
const requestIp = require('request-ip');
const express = require('express');
const { exec } = require('child_process');

const app = express();

app.use(requestIp.mw());

app.get('/', function(req, res) {
  const clientIp = req.clientIp;
  console.log(`Visitor's IP address: ${clientIp}`);
  
  // Zapisz adres IP klienta do pliku
  fs.appendFile('ip_logs.txt', `${clientIp}\n`, (err) => {
    if (err) {
      console.error('Błąd podczas zapisywania adresu IP do pliku:', err);
    } else {
      // Dodaj zmiany do lokalnego repozytorium i wykonaj commit
      exec('git add ip_logs.txt && git commit -m "Dodano nowy adres IP"', (error, stdout, stderr) => {
        if (error) {
          console.error(`Błąd podczas wykonywania commita: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Błąd podczas wykonywania commita: ${stderr}`);
          return;
        }
        console.log('Pomyślnie wykonano commit zmian do repozytorium.');
        
        // Wyślij zmiany do repozytorium na GitHubie
        exec('git push origin main', (error, stdout, stderr) => {
          if (error) {
            console.error(`Błąd podczas wysyłania zmian na GitHuba: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Błąd podczas wysyłania zmian na GitHuba: ${stderr}`);
            return;
          }
          console.log('Pomyślnie wysłano zmiany na GitHuba.');
        });
      });
    }
  });
  
  res.send(`Your IP address is ${clientIp}`);
});

app.listen(3000, () => {
  console.log('Serwer nasłuchuje na porcie 3000');
});
