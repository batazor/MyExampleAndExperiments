# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
  $("#new_link").on("ajax:success", (e, data, status, xhr) ->
    $("#your_link").text('')
    $("#your_link").append xhr.responseText
  ).on "ajax:error", (e, xhr, status, error) ->
    $("#your_link").append "ERROR"
