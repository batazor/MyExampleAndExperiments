
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Name list
var NameArr = [
  'Acer',
  'Alcatel',
  'Apple',
  'ASUS',
  'BlackBerry',
  'Fly',
  'Gigabyte',
  'Highscreen',
  'HTC',
  'Huawei',
  'Just5',
  'LG',
  'Meizu',
  'Microsoft',
  'Motorola',
  'Nokia',
  'Philips',
  'RoverPC',
  'Samsung',
  'Sonim',
  'Sony',
  'Xiaomi',
  'Билайн',
  'МегаФон',
  'МТС'
];
var NameArrCount = NameArr.length;

// Generate Rand Data
function randomData(countData) {

  var hash = [];

  for (var i = 0; i<countData; i++) {
    var randName = NameArr[Math.floor(Math.random() * NameArrCount)];

    hash.push({
      'id':       i,
      'name':     randName,
      'price':    getRandomPrice(1, 1000),
      'quantity': getRandomInt(0, 20)
    });
  }

  return hash;
}
