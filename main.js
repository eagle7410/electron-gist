const {app, BrowserWindow, Menu} = require('electron');
let win;

function createWindow () {
	// Создаёт окно браузера.
	win = new BrowserWindow({icon: `${__dirname}/ico.png`,width: 800, height: 600});
	// и загрузит index.html приложение.
	win.loadFile('index.html');

	// Open the DevTools.
	// win.webContents.openDevTools()

	// Возникает, когда окно будет закрыто.
	win.on('closed', () => {
		// Разбирает объект окна, обычно вы можете хранить окна
		// в массиве, если ваше приложение поддерживает несколько окон в это время,
		// тогда вы должны удалить соответствующий элемент.
		win = null
	})
	// Create the Application's main menu
	const template = [
		{
			label: "Application",
			submenu: [
				{ label: "Quit", accelerator: "Command+Q", click: () => app.quit() },
				{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
				{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
				{ type: "separator" },
				{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
				{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
				{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
				{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
			]
		}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Этот метод будет вызываться, когда Electron закончит
// инициализацию и готова к созданию окон браузера.
// Некоторые интерфейсы API могут использоваться только после возникновения этого события.
app.on('ready', createWindow)

// Выйти, когда все окна будут закрыты.
app.on('window-all-closed', () => {
	// На macOS это обычно для приложений и их строки меню
	// оставаться активным до тех пор, пока пользователь не выйдет явно с помощью Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// На MacOS это общее для того чтобы создать окно в приложении, когда значок
	// dock нажали и нет других открытых окон.
	if (win === null) {
		createWindow()
	}
})
