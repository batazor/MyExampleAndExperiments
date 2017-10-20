// data - this information is to fill the table
// elementID - specify the element to insert a table

function buildTable(data, elementID, start, end) {

  var fragment = document.createDocumentFragment();

  var element = document.getElementById(elementID);
  // Clear Table
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  for (var i=start; i<end; i++) {
    if (data.hash[i] === undefined) break;

    var tr = document.createElement("tr");

    var tdID       = document.createElement("td");
    var tdName     = document.createElement("td");
    var tdPrice    = document.createElement("td");
    var tdQuantity = document.createElement("td");

    tdID.innerHTML       = data.hash[i].id;
    tdName.innerHTML     = data.hash[i].name;
    tdPrice.innerHTML    = data.hash[i].price;
    tdQuantity.innerHTML = data.hash[i].quantity;

    tr.appendChild(tdID);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdQuantity);
    fragment.appendChild(tr);
  }

  element.appendChild(fragment);

  return true;
}
