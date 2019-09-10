
$(function(){
	var socket = io.connect('http://localhost:3000');
	
	var message = $('#message')
	var username = $('#username')
	var userimage = $('#userimage')
	var send_message = $('#send_message')
	var send_username = $('#send_username')
	var send_userimage = $('#send_userimage')
    var chatroom = $('#chatroom')
    var contacts = $('.contacts');
	
	send_message.click(function() {
		socket.emit('new_message', {message : message.val()})
	});
	
	socket.on('new_message', (data) => {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	//chatroom.append("<p class='message'>" + data.username + ":" + data.message + " </p>")	
	
	// you
	if(username.val() === data.username){ 
		chatroom.append('<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send"> '+ data.message + '<span class="msg_time_send">' + h +':' + m +' '+ data.username +'</span></div><div class="img_cont_msg"><img src="' + data.userimage +' " class="rounded-circle user_img_msg"></div></div>')
	}
	else{
	chatroom.append('<div class="d-flex justify-content-start mb-4"><div class="msg_cotainer_send"> '+ data.message + '<span class="msg_time_send">' + h +':' + m + ' ' + data.username +'</span></div><div class="img_cont_msg"><img src="'+ data.userimage + '" class="rounded-circle user_img_msg"></div></div>')
	}
	
	$("#chatroom").scrollTop($("#chatroom")[0].scrollHeight);
	$('#message').val('');
    });
    
    socket.on('new_user_connected',(data) => {
        console.log(data);
        contacts.append('<li class="active"><div class="d-flex bd-highlight"><div class="img_cont"><img src="'+ data.userimage +'" class="rounded-circle user_img"><span class="online_icon"></span></div><div class="user_info"><span>'+ data.username +'</span><p>'+ data.username +' is online</p></div></div></li>')
    });
	
	send_username.click(function(){
		socket.emit('change_username', {username: username.val()})
	});
	
	send_userimage.click(function(){
		socket.emit('change_userimage', {userimage: userimage.val()})
	});
})