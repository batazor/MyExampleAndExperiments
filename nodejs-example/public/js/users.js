$(document).ready(function() {

  // GET ALL User
  $.get('/users', function(data) {
    console.log(data);

    $.get('./public/templates/user.html', function(user_template) {
      $.each(data.data, function(i, e) {
        var html = $(user_template);

        html.find('.user_address').text(e.address);
        html.find('.user_avatar').attr('src', './public/upload/' + e.avatar);
        html.find('.user_avatar').attr('alt', e.name);
        html.find('.user_email').text(e.email);
        html.find('.user_name').text(e.name);
        html.find('.user_phone').text(e.phone);

        html.find('.user_edit').attr('data-id', e.id);
        html.find('.user_delete').attr('data-id', e.id);
        html.attr('data-id', e.id);

        $('#content').append(html);
      });
    });
  });

  // CREATE User
  $('#form').submit(function(e) {
    e.preventDefault();

    if ($('#form').attr('method') != "POST") {
      return;
    }

    var formData = new FormData(e.target);

    var request = new XMLHttpRequest();
    request.open("POST", "/user");
    request.send(formData);
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var data = JSON.parse(request.responseText);
        if (data.status) {
          $.get('./public/templates/user.html', function(user_template) {
            var html = $(user_template);

            html.find('.user_address').text(data.data.address);
            html.find('.user_avatar').attr('src', './public/upload/' + data.data.avatar);
            html.find('.user_avatar').attr('alt', data.data.name);
            html.find('.user_email').text(data.data.email);
            html.find('.user_name').text(data.data.name);
            html.find('.user_phone').text(data.data.phone);

            html.find('.user_edit').attr('data-id', data.data.id);
            html.find('.user_delete').attr('data-id', data.data.id);
            html.attr('data-id', data.data.id);

            $('#content').append(html);
          });
        } else {
          data.code.forEach(function(e, i) {
            $('#form').prepend('<p class="bg-danger">' + e + '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>');
          });
        }
      }
    }

  });

  // EDIT User Form
  $('#content').on('click', '.user_edit', function(e) {
    $('#form').attr('method', 'PUT');
    $('#submi_new_user').text('Update');
    var html = $(e.target).parent().parent();
    var form = $('#form');
    $('#form').find('#uid').val($(e.target).data('id'));
    $('#form').find('#avatar').val($(html).find('.user_avatar').attr('src').split('/upload/')[1]);
    $('#form').find('#name').val($(html).find('.user_name').text());
    $('#form').find('#address').val($(html).find('.user_address').text());
    $('#form').find('#phone').val($(html).find('.user_phone').text());
    $('#form').find('#email').val($(html).find('.user_email').text());
  });

  // EDIT User
  $('#form').submit(function(e) {
    e.preventDefault();

    if ($('#form').attr('method') != "PUT") {
      return;
    }

    var formData = new FormData(e.target);

    var request = new XMLHttpRequest();
    request.open("PUT", "/user");
    request.send(formData);

    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        var data = JSON.parse(request.responseText);
        if (data.status) {
          var html = $('#content .user_template[data-id="' + data.data.id + '"]');

          html.find('.user_address').text(data.data.address);
          html.find('.user_avatar').attr('src', './public/upload/' + data.data.avatar);
          html.find('.user_avatar').attr('alt', data.data.name);
          html.find('.user_email').text(data.data.email);
          html.find('.user_name').text(data.data.name);
          html.find('.user_phone').text(data.data.phone);


        } else {
          data.code.forEach(function(e, i) {
            $('#form').prepend('<p class="bg-danger">' + e + '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></p>');
          });
        }
      }
    }
  });

  // DELETE User
  $('#content').on('click', '.user_delete', function(e) {
    $.ajax({
      url: '/user',
      type: 'DELETE',
      data: JSON.stringify({ id: $(e.target).data('id') }),
      success: function(data) {
        if (data.status) {
          $('#content .user_template[data-id=' + data.id + ']').remove();
        }
      }
    });
  });

  // UI
  $('#form').on('click', '.close', function() {
    $(this).parent().remove()
  });

  $('#form_new_user').on('click', function() {
    $('#form').attr('method', 'POST');
    $('#submi_new_user').text('Go');

    var form = $('#form');
    $('#form').find('#uid').val('');
    $('#form').find('#avatar').val('');
    $('#form').find('#name').val('');
    $('#form').find('#address').val('');
    $('#form').find('#phone').val('');
    $('#form').find('#email').val('');
  });

});
