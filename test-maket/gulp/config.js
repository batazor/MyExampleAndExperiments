var path = {
  src:  "./src",
  css:  "./src/css",
  js:   "./src/js",
};

module.exports = {
  browserSync: {
    proxy: "http://localhost:8080/",
    port: 3000,
    files: [
      __dirname + '/../src/build/*.*',
      __dirname + '/../src/template/**'
    ]
  },
  nodemon: {
    script: './src/server.js',
    ignore: [
      __dirname + '/../node_modules',
      __dirname + '/../*.*',
      __dirname + '/../src/build',
      __dirname + '/../src/css',
      __dirname + '/../src/js',
      __dirname + '/../gulp',
    ]
  },
  stylus: {
    watch: path.css + '/*.styl',
    dest: path.css
  },
  css: {
    src: path.css,
    watch: path.css + '/*.css',
    dest: path.src + '/build'
  },
  js: {
    watch: [
      path.js + '/*.js'
    ],
    dest: path.src + '/build'
  }
};
