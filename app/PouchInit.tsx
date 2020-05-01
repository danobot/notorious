import PouchDB from 'pouchdb';
import pouchdbDebug from 'pouchdb-debug';
import pouchdbQuickSearch from 'pouchdb-quick-search';
import pouchdbAuthentication from 'pouchdb-authentication';

import { v4 as uuid } from 'uuid';
import {
  SYNC_ON_CHANGE,
  SYNC_ON_PAUSED,
  SYNC_ON_ACTIVE,
  SYNC_ON_DENIED,
  SYNC_ON_COMPLETE,
  SYNC_ON_ERROR,
  SYNC_FIRST_TIME_SYNC_ERROR,
  SYNC_FIRST_TIME_SYNC_SUCCESS,
  SYNC_REMOTE_TEMPORARILY_UNAVAILABLE,
  SYNC_START
} from './containers/HomePage/actions';
import config from './utils/config';

const syncOpts = { live: true, retry: true };

// PouchDB.plugin(pouchdbDebug)
PouchDB.plugin(pouchdbQuickSearch);
PouchDB.plugin(pouchdbAuthentication);

// PouchDB.debug.enable('*');

export const notesDB = new PouchDB('data/notes');

//  const configDB = new PouchDB('data/config');

// notesDB.destroy().then((info) => {console.log(info);}).catch(((err) => {console.log(err);}))
export const uploadImageAttachment = (note, fileName, type, file) => {
  // TODO will the local noresDB Replciate binary attachemnts to the server?

  console.log('uploadImageAttachment file', file);
  return notesDB.putAttachment(
    note._id,
    fileName,
    note._rev,
    new Blob(['I am plain text!'], { type: 'text/plain ' }),
    type
  );
};

function select(state) {
  return state.settings.close;
}

export default class PouchInit {
  replication: any;

  sync: any;

  remoteNotesDb: any;

  notesDb: any;

  store: any;

  currentValue: string;

  remotePeek: any;

  constructor(store) {
    this.store = store;
    console.log(store);
    this.currentValue = false;
    this.notesDb = notesDB;

    store.subscribe(() => this.handleChange());
    // log.transports.file.level = 'debug';
    // PouchDB.logger = log;
    this.notesDb.info().then(info => {
      console.log('notesDB', info);
    }).catch(e=> {
        console.log("notesDb.info(). catch ", e)
    });
    let db = '';
    if (config.url) {
      db = `${config.scheme}://${config.username}:${config.password}@${config.url}/notes`;
      this.remoteNotesDb = new PouchDB(db, { skip_setup: true });

      this.connectToRemote();
    } else {
      console.log('FIrst time set up');
    }
  }

  connectToRemote() {
    console.log('Attempting to connect to remote..');
    this.store.dispatch({ type: SYNC_START });

    this.remoteNotesDb
      .info()
      .then(i => {
        // The database exists.
        // replciate to local and begin sync
        console.log('remoteDB info', i);
        if (i.error === 'not_found') {
          console.log('Remote database does not exist an will be created');

          // create and replicate LOCAL -> REMOTE and begin sync
          const db = `${config.scheme}://${config.username}:${config.password}@${config.url}/notes`;
          this.remoteNotesDb = new PouchDB(db);
          this.remoteNotesDb
            .info()
            .then(info => {
              console.log('created remoteNotesDb', info);
              this.replicateSync(this.remoteNotesDb, this.notesDb);
              this.remoteNotesDb
                .login(config.username, config.password)
                .then(function(data) {
                  console.log('logged in', data);
                });
            })
            .catch(e => {
              console.log('Database could not be created', e);
            });
        } else {
          console.log('Remote database exists', i);
          this.remoteNotesDb
            .login(config.username, config.password)
            .then(function(data) {
              console.log('logged in', data);
            });
          this.replicateSync(this.notesDb, this.remoteNotesDb);
        }
      })
      .catch(e => {
        // No database found and it was not created.
        console.log(e);
        if (e.type === 'invalid-json' || e.code === "ECONNREFUSED") {
          // alert("Remote database is not accessible.")
          this.store.dispatch({ type: SYNC_REMOTE_TEMPORARILY_UNAVAILABLE });
          setTimeout(() => this.connectToRemote(), 10000);
        } else {
          alert(
            'No database found and it was not created. Report console output.'
          );
        }
        // this.close()
      });
  }

  handleChange() {
    const previousValue = this.currentValue;
    this.currentValue = select(this.store.getState());

    if (previousValue !== this.currentValue) {
      console.log(
        'Some deep nested property changed from',
        previousValue,
        'to',
        this.currentValue
      );
      this.cancel();
    }
  }

  cancel() {
    console.log('closing replication', this.replication);
    if (this.replication && !this.replication.cancelled) {
      console.log('Cancelling replication');
      this.replication.cancel();
    }
    console.log('closing sync', this.sync);
    if (this.sync && !this.sync.cancelled) {
      console.log('Cancelling sync');
      this.sync.cancel();
    }
    // console.log("closing remotePeek database", this.remotePeek)
    // if (this.remotePeek && !this.remotePeek._closed) {
    //   console.log("Closing remotePeek")
    //   this.remotePeek.close()
    // }
    console.log('closing remoteNotesDb', this.remoteNotesDb);
    if (this.remoteNotesDb && !this.remoteNotesDb._closed) {
      console.log('Closing remoteNotesDb databse');
      this.remoteNotesDb.close();
    }
    console.log('closing notesDb', this.notesDb);
    if (!this.notesDb._closed) {
      console.log('Closing notesDb databse');
      this.notesDb.close();
    }
  }

  replicateSync(a, b) {
    this.replication = a.replicate
      .from(b) // one-time replicateion on start up
      .on('complete', info => {
        console.log('First-time sync completed: ', info);
        this.store.dispatch({ type: SYNC_FIRST_TIME_SYNC_SUCCESS });
        // then two-way, continuous, retriable sync
        this.sync = a
          .sync(b, syncOpts)
          .on('change', info => {
            this.store.dispatch({ type: SYNC_ON_CHANGE, ...info });
            // store.dispatch({type: "SYNC_CHANGE", info})
            console.log('remoteNotesDb sync:     handle change', info);
          })
          .on('paused', err => {
            this.store.dispatch({ type: SYNC_ON_PAUSED, ...err });
            console.log(
              'remoteNotesDb sync:     replication paused (e.g. replication up to date, user went offline)',
              err
            );
          })
          .on('active', () => {
            this.store.dispatch({ type: SYNC_ON_ACTIVE });
            console.log(
              'notesDB replicate sync:     resumed (e.g. new changes replicating, user went back online)'
            );
          })
          .on('denied', err => {
            this.store.dispatch({ type: SYNC_ON_DENIED, ...err });
            console.log(
              ' notesDB sync:     a document failed to replicate (e.g. due to permissions)',
              err
            );
          })
          .on('complete', info => {
            this.store.dispatch({ type: SYNC_ON_COMPLETE, ...info });
            console.log('notesDB sync:     handle complete', info);
          })
          .on('error', err => {
            this.store.dispatch({ type: SYNC_ON_ERROR, error: err });
            console.log('notesDB sync:     handle error', err);
          });
      })
      .on('error', e => {
        this.store.dispatch({ type: SYNC_FIRST_TIME_SYNC_ERROR, error: e });

        console.log('First-time sync failed: ', e);
      });
  }
}
