import PouchDB from 'pouchdb';
import config from './utils/config';
const log = require('electron-log');
import {store} from '.'
const syncOpts = { live: true, retry: true };
// PouchDB.debug.enable('*');
export const notesDB = new PouchDB('data/notes');
//  const configDB = new PouchDB('data/config');
const remoteNotesDb = new PouchDB(`${config.db}/notes`);

// const remoteConfigDb = new PouchDB(`${config.db}/Config`);

export default class PouchInit {
  sync;
  constructor() {
    log.transports.file.level = 'debug';
    PouchDB.logger = log;

    notesDB.info().then(function(info) {
      console.log('notesDB', info);
    });

    remoteNotesDb.info().then(function(info) {
      console.log('remoteNotesDb', info);
    });
    // configDB.sync(remoteConfigDb, syncOpts).on('change', function(info) {
    //   console.log('remoteConfigDb sync:     handle change', info);
    // })
    this.sync = notesDB.sync(remoteNotesDb, syncOpts).on('change', function(info) {
        console.log('remoteNotesDb sync:     handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'remoteNotesDb sync:     replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('active', function() {
        console.log(
          'notesDB replicate sync:     resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('denied', function(err) {
        console.log(
          ' notesDB sync:     a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('complete', function(info) {
        console.log('notesDB sync:     handle complete', info);
      })
      .on('error', function(err) {
        console.log('notesDB sync:     handle error', err);
      });


    remoteNotesDb
      .changes()
      .on('change', function(info) {
        console.log('remoteNotesDb handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'remoteDB replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('active', function() {
        console.log(
          'remoteDB replicate resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('denied', function(err) {
        console.log(
          'remoteDB a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('complete', function(info) {
        console.log('remoteDB handle complete', info);
      })
      .on('error', function(err) {
        console.log('remoteDB handle error', err);
      });


      notesDB
      .changes()
      .on('change', function(info) {
        console.log('notesDB handle change', info);
      })
      .on('paused', function(err) {
        console.log(
          'notesDB replication paused (e.g. replication up to date, user went offline)',
          err
        );
      })
      .on('active', function() {
        console.log(
          'notesDB replicate resumed (e.g. new changes replicating, user went back online)'
        );
      })
      .on('denied', function(err) {
        console.log(
          'notesDB a document failed to replicate (e.g. due to permissions)',
          err
        );
      })
      .on('complete', function(info) {
        console.log('notesDB handle complete', info);
      })
      .on('error', function(err) {
        console.log('notesDB handle error', err);
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
