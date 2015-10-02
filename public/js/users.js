$(document).ready(function() {
  $.get('/users', function(data) {
    console.log(data);
  });

  $('#submi_new_user').on('click', function(e) {
    e.preventDefault();

    var data = new FormData(document.getElementById('form'));
    data.append('name', 'rerwrwer');
    data.append('email', 're43242342rwrwer');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/user");
    xhr.send(data);
  });
});
