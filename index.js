//SERVER TING 
//kommenter følgende linjer
const axios = require('axios');
const auth = "BQDNiUq2FfSQqxCpmJadzgRURb8lQi2lLTmqtxZYvPHl_U7iBpQeUIY9i3qxIqWtYyVUdfyulpsK76wVeU9roz0tpjw3npeZ0jiMMD-0by1uLp1tKDhA8y41MHVezLk74A_a5Ey1G3FcjqB66j307peI5g";

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.static('public'))


io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('queueSong', (song) => {
    console.log(song)
    let config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/search?q='+song+'&type=track&market=DK&limit=1',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': 'Bearer '+ auth
      }
    };
    
    axios(config)
    .then(function (response) {
      let songUri = response.data.tracks.items[0].uri
      console.log(songUri);
      let qconfig = {
        
        method: 'post',
        
        url: 'https://api.spotify.com/v1/me/player/queue?uri='+songUri,
        
        headers: { 
          
          'Authorization': 'Bearer '+ auth
          
        }
        
      };
      axios(qconfig)
      .then(function (response) {
        
        console.log(response.data);
        
      }).catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
   })
  

})

var ip = require('ip')

console.log(ip.address())

server.listen(4000, () => {
  console.log('client available on on *:4000');
})
function replaceMessage(search, replacement){
  message = message.split(search).join(replacement);
}