import PouchDB from 'pouchdb';
import config from './utils/config';
import { store } from '.';

const log = require('electron-log');

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

    notesDB.replicate
      .from(remoteNotesDb) // one-time replicateion on start up
      .on('complete', function(info) {
        console.log('First-time sync completed: ', info);

        // then two-way, continuous, retriable sync
        notesDB
          .sync(remoteNotesDb, opts)
          .on('change', function(info) {
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
      })
      .on('error', e => {
        console.log('First-time sync failed: ', e);
      });


    // remoteNotesDb
    //   .changes()
    //   .on('change', function(info) {
    //     console.log('remoteNotesDb handle change', info);
    //   })
    //   .on('paused', function(err) {
    //     console.log(
    //       'remoteDB replication paused (e.g. replication up to date, user went offline)',
    //       err
    //     );
    //   })
    //   .on('active', function() {
    //     console.log(
    //       'remoteDB replicate resumed (e.g. new changes replicating, user went back online)'
    //     );
    //   })
    //   .on('denied', function(err) {
    //     console.log(
    //       'remoteDB a document failed to replicate (e.g. due to permissions)',
    //       err
    //     );
    //   })
    //   .on('complete', function(info) {
    //     console.log('remoteDB handle complete', info);
    //   })
    //   .on('error', function(err) {
    //     console.log('remoteDB handle error', err);
    //   });

    // notesDB
    //   .changes()
    //   .on('change', function(info) {
    //     console.log('notesDB handle change', info);
    //   })
    //   .on('paused', function(err) {
    //     console.log(
    //       'notesDB replication paused (e.g. replication up to date, user went offline)',
    //       err
    //     );
    //   })
    //   .on('active', function() {
    //     console.log(
    //       'notesDB replicate resumed (e.g. new changes replicating, user went back online)'
    //     );
    //   })
    //   .on('denied', function(err) {
    //     console.log(
    //       'notesDB a document failed to replicate (e.g. due to permissions)',
    //       err
    //     );
    //   })
    //   .on('complete', function(info) {
    //     console.log('notesDB handle complete', info);
    //   })
    //   .on('error', function(err) {
    //     console.log('notesDB handle error', err);
    //   });
  }
}

