function pagination(currentPage, countElementPage, dataTable) {

  // Render Table
  var start = (currentPage - 1) * countElementPage;
  var end = start + countElementPage;

  buildTable(dataTable, 'content', start, end);

  // Render Pagination
  var fragment = document.createDocumentFragment();
  var element = document.getElementById('pagination');

  // Clear Pagination
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  var pageCount = Math.ceil((dataTable.length - 1) / countElementPage);

  var ul = document.createElement("ul");
  ul.className = "pagination";

  for (var i=1; i<=pageCount; i++) {
    var li = document.createElement("li");
    li.innerHTML = i;
    li.className = (i === currentPage) ? "active" : "waves-effect";
    li.setAttribute('data-page', i);
    ul.appendChild(li);
  }

  fragment.appendChild(ul);
  element.appendChild(fragment);
}
