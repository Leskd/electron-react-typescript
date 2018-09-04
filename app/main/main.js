import { app, Menu } from 'electron';
import path from 'path';
import MainWindow from './windows/mainWindow';
import { mainMenu } from './menu';
import TrayCreator from './tray';

const isDev = process.env.NODE_ENV === 'development';

class Electron {
  mainWindowInstance = null;

  init() {
    this.initApp();
  }

  initApp() {
    app.on('ready', async () => {
      this.createMainWindow();
      this.mainWindowInstance.loadURL('http://localhost:3000/');
      Menu.setApplicationMenu(mainMenu);
      console.log(__dirname, process.env.NODE_ENV)
      const appIconPath = path.join(__dirname, '../../assest/electron.png');
      const tray = new TrayCreator(appIconPath);
      tray.initTray();
      if (isDev) {
        this.mainWindowInstance.openDevTools();
        await this.installExtensions();
      }
    });
    app.on('window-all-closed', () => {
      app.quit();
    });
  }

  createMainWindow() {
    this.mainWindowInstance = new MainWindow();
    this.mainWindowInstance.show();
  }

  installExtensions = async () => {
    // const { default: installer } = require('electron-devtools-installer');
    // const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    // const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    // for (const name of extensions) {
    //   try {
    //     await installer.default(installer[name], forceDownload);
    //   } catch (e) {}
    // }
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(e => {});
  }
}

new Electron().init();
