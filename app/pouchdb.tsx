
import config from './utils/config';
import PouchDB from 'pouchdb'
const syncOpts = { live: true, retry: true };

export const notesDB = new PouchDB('data/notes')
const remoteNotesDb = new PouchDB(`${config.db}notes`)

notesDB.sync(remoteNotesDb, syncOpts)

// .on('change', function (info) {
//   console.log('handle change')
// }).on('paused', function (err) {
//   console.log('replication paused (e.g. replication up to date, user went offline)')
// }).on('active', function () {
//   console.log('replicate resumed (e.g. new changes replicating, user went back online)')
// }).on('denied', function (err) {
//   console.log('a document failed to replicate (e.g. due to permissions)')
// }).on('complete', function (info) {
//   console.log('handle complete')
// }).on('error', function (err) {
//   console.log('handle error')
// });


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
