const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { PORT, DATABASE_URL } = require('./config');

const blogRouter = require('./api/blog/routes');

mongoose.Promise = global.Promise;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

console.log('blogRouter', blogRouter);

app.use('/api/blog', blogRouter);

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  