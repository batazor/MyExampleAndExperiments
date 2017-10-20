$(document).ready(function(){

  var slider = $('#slider').slippry({
    auto: false
  });

  $('.s-next').on('click', function() {
    slider.goToNextSlide();
  });

  $('.s-prev').on('click', function() {
    slider.goToPrevSlide();
  });

  $('#project').jScrollPane({
    showArrows: true,
    arrowScrollOnHover: true
  });

});
