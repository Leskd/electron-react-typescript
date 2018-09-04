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
    const { default: installer, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

    installer([REACT_DEVELOPER_TOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  }
}

new Electron().init();
