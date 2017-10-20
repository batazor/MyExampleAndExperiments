$(document).ready(function() {
  var socket = io.connect('http://localhost:3000');

  // chatRoom ====================================================================
  // create chatRoom
  $('#createchatroom_btn').on('click', function() {
    socket.emit('createchatroom', { name: $('#chatRoomName').val() });
    $('#createchatroom').closeModal();
  });

  // new chatRoom
  socket.on('newChatRoom', function(data) {
    $('#collectionChatRoom').append('
      <a data-chatroomid="' + data._id + '" class="collection-item" href="#!">
        <i class="mdi-communication-messenger left"></i>
          ' + data.name + '
        <i class="mdi-action-exit-to-app small right"></i>
      </a>
    ');
    $('#collectionChatRoom').children('[data-chatroomid="' + data._id + '"]').click();
  });

  // select chatRoom
  $('#collectionChatRoom').on('click', 'a', function() {
    $('#writeMessageText').data('chatroomid', $(this).data('chatroomid'));
    socket.emit('viewMessageChatRoom', $(this).data('chatroomid'));
  });

  // Message ChatRoom ==========================================================
  // write new message
  $('#writeMessageBtn').on('click', function() {
    var message = {
      chatRoom: $('#writeMessageText').data('chatroomid'),
      message: $('#writeMessageText').val()
    };
    socket.emit('writeMessage', message);
    $('#writeMessageText').val('');
  });

  // newViewMessage
  socket.on('newViewMessage', function(data) {
    console.log(data);
    $('#chat').append('
      <div class="row">
        <div class="col s2 center">
          <i class="grey lighten-5 mdi-action-account-circle medium"></i>
          <div class="row center"></div>
            <a href="#!">' + data.user.local.email + '</a>
        </div>
        <div class="message col s10">
          <div class="data">
            ' + data.message.created_at +'
          </div>
          <p>' + data.message.message + '</p>
        </div>
      </div>
    ');
  });

  // view message chat room
  socket.on('viewMessageChatRoom', function(data) {
    $('#chat').empty();
    
    console.log(data);
  });
});
