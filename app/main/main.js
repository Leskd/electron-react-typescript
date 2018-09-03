import { app, Menu } from 'electron';
import path from 'path';
import MainWindow from './windows/mainWindow';
import { mainMenu } from './menu';
import TrayCreator from './tray';

const isDevMode = process.env.NODE_ENV === 'development';

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
      const appIconPath = path.join(__dirname, '../../assest/electron.png');
      const tray = new TrayCreator(appIconPath);
			if (isDevMode) {
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

	installExtensions() {
		const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
		try {
			installExtension([
				REACT_DEVELOPER_TOOLS,
				REDUX_DEVTOOLS
			]);
		} catch (e) {
			console.log('An error occurred: ', e);
		}
	}
}

new Electron().init();
