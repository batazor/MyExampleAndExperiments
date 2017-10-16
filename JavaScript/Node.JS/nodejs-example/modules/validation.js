function string(str, l) {
  str = str ? str : '';
  
  return str.length <= l ? true : false;
}

function imageHW(file, h, w) {
  // TODO: create validation image
  return true;
}

function arrayString(str, l) {
  str = str ? str : '';

  var strArr = str.split(',');
  var flag = true;

  strArr.forEach(function(e, i) {
    if (e.length > l) {
      flag = false;
      return flag;
    }
  });

  return flag;
}

module.exports = {
  string: string,
  image: imageHW,
  arrayString: arrayString
};
