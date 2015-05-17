$(document).ready(function(){

  // Save table data
  var dataTable;
  // Pagination Default
  var currentPage = 1;
  var countElementPage;
  var countElementAll;

  // Open modal box. Select data
  $('#open-select-data').on('click', function() {
    $('#select-data').openModal();
  });

  // Select count data
  $('#select-data .count-data').on('click', function() {
    var nCount = $(this).data('count');
    dataTable = randomData(nCount);
    pagination(1, 10, dataTable);
    buildTable(dataTable, 'content', 0, 10);

    $('#select-data').closeModal();
    $('table').removeClass('hidden');
    $('#filter').prop("disabled", false);
  });

  // Enter my count data
  $('#countdata').on('input', function() {
    var data = $(this).val();

    if (Number.isInteger(data * 1) && (data * 1) > 0) {
      $("#my-count-btn").removeClass("disabled");
      $("#my-count-btn").attr('data-count', data);

      // Error Message
      $('#select-data label').attr('for', 'countdata')
        .text('Или укажите своё значение')
        .removeClass('error');
    } else {
      $("#my-count-btn").addClass("disabled");

      // Error Message
      $('#select-data label').attr('for', 'countdata')
        .text('Используйте цифры')
        .addClass('error');
    }
  });

  // Click my count data
  $('#select-data').on('click', '#my-count-btn', function() {
    var nCount = $(this).attr('data-count');
    dataTable = randomData(nCount);
    pagination(1, 10, dataTable);

    $('#select-data').closeModal();
    $('table').removeClass('hidden');
    $('#filter').prop("disabled", false);
  });

  // Pagination
  $('#pagination').on('click', 'li', function() {
    currentPage = $(this).data('page');
    pagination(currentPage, 10, dataTable);
  });

  // Filter
  $('#filter').on('input', function() {
    var search = $(this).val();
    var newDataTable = filter(search, dataTable);
    pagination(1, 10, newDataTable);
  });

  // Sort
  $('#header th').on('click', function() {
    switch ($(this).data('field')) {
      case 'id':
        if ($(this).data('sort')) {
          dataTable.sort(function(a, b) {
            return a.id - b.id;
          });
          $(this).data('sort', 0);
        } else {
          dataTable.sort(function(a, b) {
            return b.id - a.id;
          });
          $(this).data('sort', 1);
        }

        break;
      case 'name':
        if ($(this).data('sort')) {
          dataTable.sort(function(a, b) {
            return a.name > b.name ? -1 : 1;
          });
          $(this).data('sort', 0);
        } else {
          dataTable.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
          });
          $(this).data('sort', 1);
        }

        break;
      case 'price':
        if ($(this).data('sort')) {
          dataTable.sort(function(a, b) {
            return a.price - b.price;
          });
          $(this).data('sort', 0);
        } else {
          dataTable.sort(function(a, b) {
            return b.price - a.price;
          });
          $(this).data('sort', 1);
        }

        break;
      case 'quantity':
        if ($(this).data('sort')) {
          dataTable.sort(function(a, b) {
            return a.quantity - b.quantity;
          });
          $(this).data('sort', 0);
        } else {
          dataTable.sort(function(a, b) {
            return b.quantity - a.quantity;
          });
          $(this).data('sort', 1);
        }

        break;
    }

    pagination(currentPage, 10, dataTable);
  });

});
