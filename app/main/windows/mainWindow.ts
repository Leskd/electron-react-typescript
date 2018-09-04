import { BrowserWindow } from 'electron';

export default class MainWindow {
  mainWindow: BrowserWindow;
  constructor() {
    this.createMainWindow();
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 800,
      show: false
    });
  }

  loadURL(url: string) {
    this.mainWindow.loadURL(url);
    // this.mainWindow.webContents.openDevTools();
  }

  openDevTools() {
    this.mainWindow.webContents.openDevTools();
  }

  show() {
    this.mainWindow.show();
  }
}
