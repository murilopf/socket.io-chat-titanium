var io = require('ti.socketio');
var socket = io.connect('http://192.168.1.104:3000');
var control_color = false;
var name_user = "";

socket.on('chat message', function(msg){
    var bodyMsg = Ti.UI.createView({ 
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: control_color ? "#FFFFFF" : "#EFEFEF"
    });
    bodyMsg.add(Ti.UI.createLabel({
        text: msg,
        height: Ti.UI.SIZE, width: Ti.UI.FILL,
        left: "16dp", right: "16dp",
        color: "#272727",
        font:{fontSize:"14dp"},
    }));
    $.scrollchat.add(bodyMsg);
    $.scrollchat.scrollToBottom();
    //body = null;
    if(control_color)
        control_color = false;
    else
        control_color = true;
    return false;
});

function sendMessage(e){
    if($.txt_inputUser.getValue().trim() != ""){
        Ti.API.info("TEXT USER > " + JSON.stringify( $.txt_inputUser.getValue()));
        socket.emit('chat message', $.txt_inputUser.getValue());
        $.txt_inputUser.setValue("");
    }else{
        alert("Type something!");
    }
}

$.index.addEventListener('open', function () {
   $.index.activity.actionBar.hide();
});

$.index.add(Alloy.createController('popup', {
    params : {
        index : $.index,
        callback : function(name){
            Ti.API.info('name user > ' + name);
            $.lbl_welcome.setText("Welcome to the chat room " + name + "!");
            socket.emit("new user", name, function(data){
                if(data){
                    Ti.API.info(data);
                    Ti.API.info(JSON.stringify(data));
                }else{
                    Ti.API.info("OPS, ERRO!");
                }
            });
        }
    }
}).getView());

$.index.open();
