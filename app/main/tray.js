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
    this.path = iconPath;
  }

  initTray() {
    this.trayInstance = new Tray(this.path);
    this.setContextMenu(contextMenu);
  }

  setContextMenu(menu) {
    this.trayInstance.setContextMenu(menu);
  }
}
