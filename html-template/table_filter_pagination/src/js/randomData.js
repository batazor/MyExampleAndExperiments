// Prototype
function randomData() {
  this.hash = [];
}

// generate Random Integer
randomData.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// generate random Price
randomData.prototype.getRandomPrice = function(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// generate random Name
randomData.prototype.getRandomName = function() {
  var nameArr = [
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

  return nameArr[Math.floor(Math.random() * nameArr.length)];
};

randomData.prototype.new = function(count) {
  this.hash = [];
  
  for (var i = 0; i < count; i++) {
    var randName = this.getRandomName();

    this.hash.push({
      'id':       i,
      'name':     this.getRandomName(),
      'price':    this.getRandomPrice(1, 1000),
      'quantity': this.getRandomInt(0, 20)
    });
  }
};
