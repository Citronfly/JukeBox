let button
let input

// function replaceMessage(search, replacement){
//   input.value() = input.value(split(search).join(replacement));
// }

function setup(){
  const socket = io();

  socket.on('hello', (m) =>{
    console.log(m)
  })

  // replaceMessage(" ", "%20");

  input = select("#input")
  button = select("#button")
  button.mousePressed(()=>{
    console.log(input.value())
    socket.emit('queueSong',input.value())
    
    input.value("")
  })
}
