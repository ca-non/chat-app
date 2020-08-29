var socket = io.connect('http://127.0.0.1:5000');

window.onload = function(){
    socket.on('connect', function(){
        socket.send('user has connected!');
    });

    socket.on('message', function(msg){
        var x = document.getElementById("messages");
        var node = document.createElement("LI");
        var textNode = document.createTextNode(msg);
        node.appendChild(textNode);
        if (msg == "user has connected!") {
            node.classList.add("connect-code");
            console.log("its here");
        }
        else if (msg == "user has disconnected!") {
            node.classList.add("disconnect-code");
        }
        else {
            node.classList.add("neutral");
        }
        x.appendChild(node);
    });

    var inbox = document.getElementById("input-box");
  
    inbox.addEventListener("keyup", function(event){
        if(event.keyCode == 13) {
            socket.send(inbox.value);
            inbox.value = "";
        }
    });

};

window.onbeforeunload = function() {
    socket.send('user has disconnected!');
};