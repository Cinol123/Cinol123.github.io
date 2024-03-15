const requestIp = require('request-ip'); 
 
app.use(requestIp.mw()); 
 
app.get('/', function(req, res) { 
  const clientIp = req.clientIp; 
  console.log(`Visitor's IP address: ${clientIp}`); 
  res.send(`Your IP address is ${clientIp}`); 
}); 
