import PouchDB from 'pouchdb';
import config from './utils/config';
import { store } from '.';

const log = require('electron-log');

const syncOpts = { live: true, retry: true };
// PouchDB.debug.enable('*');
export const notesDB = new PouchDB('data/notes');
//  const configDB = new PouchDB('data/config');





export default class PouchInit {
  sync;
  remoteNotesDb;
  notesDB;
  constructor() {
    log.transports.file.level = 'debug';
    PouchDB.logger = log;
    notesDB.info().then(function(info) {
      console.log('notesDB', info);
    });

    const remotePeek = new PouchDB(`${config.db}/notes`, { skip_setup: true });



    remotePeek.info()
  .then((i) => {
      // The database exists.
      // replciate to local and begin sync
    if (i.error === "not_found") {
      console.log("Remote database does not exist an will be created")

      // create and replicate LOCAL -> REMOTE and begin sync
      const remoteNotesDb = new PouchDB(`${config.db}/notes`);
      remoteNotesDb.info().then(function(info) {
        console.log('created remoteNotesDb', info);
        replicateSync(remoteNotesDb, notesDB )
      }).catch(e => {
        console.log("Database could not be created", e);

      })
    } else {
      console.log("Remote database exists", i)

      replicateSync(notesDB, remotePeek)

    }

    })
    .catch(e => {
      // No database found and it was not created.

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

// close = () => {
//   console.log("closing")
//   if (this.remotePeek) {
//     console.log("closing")
//     this.remotePeek.close()
//   }
//   if (this.remoteNotesDb) {
//     console.log("closing")
//     this.remoteNotesDb.close()
//   }
//   if (notesDB) {
//     console.log("closing")
//   notesDB.close()
//   }

// };
const replicateSync = (a, b) => {
  a.replicate
  .from(b) // one-time replicateion on start up
  .on('complete', function(info) {
    console.log('First-time sync completed: ', info);

    // then two-way, continuous, retriable sync
    a
      .sync(b, syncOpts)
      .on('change', function(info) {
        // store.dispatch({type: "SYNC_CHANGE", info})
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
}
