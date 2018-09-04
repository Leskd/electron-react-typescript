import { Tray, Menu } from 'electron';

const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
]);

export default class TrayCreator {
  trayInstance: Tray;
  path: string;
  constructor(iconPath: string) {
    this.path = iconPath;
  }

  initTray() {
    this.trayInstance = new Tray(this.path);
    this.setContextMenu(contextMenu);
  }

  setContextMenu(menu: Menu) {
    this.trayInstance.setContextMenu(menu);
  }
}
