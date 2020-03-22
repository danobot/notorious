import { autoUpdater } from "electron-updater"
const log = require("electron-log")

export default class AppUpdater {
  constructor() {
    console.log("AppUpdater Created")
    log.transports.file.level = "debug"
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify();
  }, 1000 * 60 * 15);
    // console.log("autoUpdater",autoUpdater)
  }
}
