import PouchDB from 'pouchdb';
import config from './utils/config';

const log = require('electron-log');

const syncOpts = { live: true, retry: true };
// PouchDB.debug.enable('*');
export const notesDB = new PouchDB('data/notes');

const remoteNotesDb = new PouchDB(`${config.db}/notes`);

export default class PouchInit {
  constructor() {
    log.transports.file.level = 'debug';
    PouchDB.logger = log;

    notesDB.info().then(function(info) {
      console.log('notesDB', info);
    });

    remoteNotesDb.info().then(function(info) {
      console.log('remoteNotesDb', info);
    });

    this.sync = notesDB.sync(remoteNotesDb, syncOpts).on('change', function(info) {
        console.log('remoteNotesDb sync:     handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'remoteNotesDb sync:     replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('remoteNotesDb active', function() {
        console.log(
          'replicate sync:     resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('remoteNotesDb denied', function(err) {
        console.log(
          ' sync:     a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('remoteNotesDb sync:     complete', function(info) {
        console.log('handle complete', info);
      })
      .on('remoteNotesDb sync:     error', function(err) {
        console.log('handle error', err);
      });
    remoteNotesDb
      .changes()
      .on('change', function(info) {
        console.log('remoteNotesDb handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'remoteNotesDb replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('remoteNotesDb active', function() {
        console.log(
          'replicate resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('remoteNotesDb denied', function(err) {
        console.log(
          'a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('remoteNotesDb complete', function(info) {
        console.log('handle complete', info);
      })
      .on('remoteNotesDb error', function(err) {
        console.log('handle error', err);
      });


      notesDB
      .changes()
      .on('change', function(info) {
        console.log('handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('active', function() {
        console.log(
          'replicate resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('denied', function(err) {
        console.log(
          'a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('complete', function(info) {
        console.log('handle complete', info);
      })
      .on('error', function(err) {
        console.log('handle error', err);
      });
  }
}

// Download all data from remote on first start - to be implemented later for better efficiency
// https://pouchdb.com/api.html#sync
// It is also possible to combine “one-way” replication and sync for performance reasons. When your PouchDB application starts up it could perform a one-off, one-way replication to completion and then initiate the two-way, continuous retryable sync:

// var url = 'http://localhost:5984/mydb';
// var opts = { live: true, retry: true };

// // do one way, one-off sync from the server until completion
// db.replicate.from(url).on('complete', function(info) {
//   // then two-way, continuous, retriable sync
//   db.sync(url, opts)
//     .on('change', onSyncChange)
//     .on('paused', onSyncPaused)
//     .on('error', onSyncError);
// }).on('error', onSyncError);
// The above technique results in fewer HTTP requests being used and better performance than just using db.sync on its own.
