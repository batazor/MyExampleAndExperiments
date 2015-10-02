$(document).ready(function() {
  $.get('/users', function(data) {
    console.log(data);
  });

  $('#submi_new_user').on('click', function(e) {
    e.preventDefault();

    var data = {};
    data.name = $('#name').val();
    data.avatar = $('#avatar').val();
    data.address = $('#address').val();
    data.phone = $('#phone').val();
    data.email = $('#email').val();

    $.post('/user', data, function(data) {
      console.log(data);
    });
  });
});
