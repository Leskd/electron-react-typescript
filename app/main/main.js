import { app } from 'electron';
import MainWindow from './windows/mainWindow';

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
