import { Tray, Menu } from 'electron';

const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
]);

export default class TrayCreator {
  trayInstance = null;
  constructor(iconPath) {
    this.initTray(iconPath)
  }

  initTray(iconPath) {
    this.trayInstance = new Tray(iconPath);
    this.setContextMenu(contextMenu);
  }

  setContextMenu(menu) {
    this.trayInstance.setContextMenu(menu);
  }
};
