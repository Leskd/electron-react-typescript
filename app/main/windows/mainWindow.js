import { BrowserWindow } from 'electron';

export default class MainWindow {
	mainWindow = null;
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

	loadURL(url) {
		this.mainWindow.loadURL(url);
	}

	openDevTools() {
		this.mainWindow.webContents.openDevTools();
	}

	show() {
		this.mainWindow.show();
	}
}
