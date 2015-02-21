$(document).ready(function() {
  var socket = io.connect('http://localhost:3000');

  socket.on('news', function(data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

  // chatRoom ====================================================================
  // create chatRoom
  $('#createchatroom_btn').on('click', function() {
    socket.emit('createchatroom', { name: $('#chatRoomName').val() });
    $('#createchatroom').closeModal();
  });

  // new chatRoom
  socket.on('newChatRoom', function(data) {
    $('#collectionChatRoom').append('
      <a class="collection-item" href="#!">
        <i class="mdi-communication-messenger left"></i>
          ' + data.name + '
        <i class="mdi-action-exit-to-app small right"></i>
      </a>
    ');
  });
});
