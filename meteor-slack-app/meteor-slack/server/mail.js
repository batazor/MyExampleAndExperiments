Meteor.startup(function() {
  smtp = {
    username: 'batazor111@gmail.com',
    password: 'uAreNxd21N_6TV8smYYWGw',
    server: 'smtp.mandrillapp.com',
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' +
    encodeURIComponent(smtp.password) + '@' +
    encodeURIComponent(smtp.server) + ':' +
    smtp.port;
});
