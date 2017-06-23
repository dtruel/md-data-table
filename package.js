Package.describe({
//   git: 'https://github.com/CollectionFS/Meteor-http-methods.git',
  name: 'turbobuilt:md-data-table',
  version: '0.0.1',
  summary: 'Adds alertifyjs.org'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

//   api.use(['webapp', 'underscore', 'ejson'], 'server');

//   api.use('http', { weak: true });

//   api.export && api.export('HTTP');

//   api.export && api.export('_methodHTTP', { testOnly: true });

  api.addFiles('dist/md-data-table.css', 'client');
  api.addFiles('dist/md-data-table.js', 'client');
  // api.addFiles('http.methods.server.api.js', 'server');

});

Package.onTest(function (api) {
  // api.use('cfs:http-methods', ['server']);
  // api.use('test-helpers', 'server');
  // api.use(['tinytest', 'underscore', 'ejson', 'ordered-dict',
  //          'random', 'deps']);

  // api.addFiles('http.methods.tests.js', 'server');
});
