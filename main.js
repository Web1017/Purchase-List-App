
// use npm run package-win (to package the app )
const electron = require('electron');
const url = require('url');
const path = require('path');


const { app, BrowserWindow, Menu, ipcMain} = electron;

// Setting the Environment - Change to "Development" to have dev tools as well
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// Listen for app for it to be ready

app.on('ready', function(){

    //Create a new Window
    mainWindow = new BrowserWindow({width:800, height:700});

    // Load the Html into the Window
    //passes file into loadUrl
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    })); 

    // Exiting app when closed

    mainWindow.on('closed', function(){
        app.quit();
    });
    
    // Building a Menu from the Template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Inserting the Menu

    Menu.setApplicationMenu(mainMenu);
});

// Handle create add Window

function createAddWindow(){

     //Create a new Window
     addWindow = new BrowserWindow({width:300, height:200, title: 'Add Purchase List Items'});
     
         // Load the Html into the Window
         //passes file into loadUrl
         addWindow.loadURL(url.format({
             pathname: path.join(__dirname, 'addWindow.html'),
             protocol: 'file:',
             slashes: true
         })); 

         //Garbage Collection Handle
         addWindow.on('close', function(){

            addWindow = null;
         });
}

//Catch item: add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


//Menu Template

const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];


// If using Mac - Adding an Empty Object to the Menu

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}


//Adding Developer Tools if not in production 

if(process.env.NODE_ENV !== 'production'){

    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
          },
          {
              role: 'reload'
          }
        ]
    });

}