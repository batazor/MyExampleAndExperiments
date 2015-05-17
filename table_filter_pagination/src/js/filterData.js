function filter(search, data) {
  var newData = [];
  var search = search.toLowerCase().split(" ");

  for (var i=0; i<data.length; i++) {

    var str = '';
    for(var key in data[i]) {
      str += data[i][key] + " ";
    }

    var flags = 0;
    for (var j=0; j<search.length; j++) {
		  if (str.toLowerCase().indexOf(search[j])>=0)
        flags = 1;
		  else {
        flags = 0;
				break;
		  }
	  }
    if (flags) {
      newData.push(data[i]);
    }

  }

  return newData;
}
