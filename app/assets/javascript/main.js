// Basic file
$(document).ready(function() {
  // Navbar ====================================================================
  $(".dropdown-button").dropdown();

  // Chat ======================================================================
  // height
  function heightChatSidebar() {
    height = $(window).height() - $('#nav').height() - $('#footer').height() - 20;
    $('.chat-sidebar-left').height(height);
    $('.chat-sidebar-right').height(height);
    $('.chat-sidebar-content').height(height);
    $('#chat').height(height-95);
  }

  $(window).resize(function(){
    heightChatSidebar();
  });

  // modal createRoom
  $('.modal-createchatroom').leanModal();

  // Start Script
  heightChatSidebar();
});
