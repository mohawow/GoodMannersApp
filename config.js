'use strict'

//exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/good-manners-app';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://good-manners-app:a123456@ds119853.mlab.com:19853/good-manners-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/good-manners-app-test'
exports.PORT = process.env.PORT || 8080;
