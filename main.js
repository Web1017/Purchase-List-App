

const electron = require('electron');
const url = require('url');
const path = require('path');


const { app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app for it to be ready

app.on('ready', function(){

    //Create a new Window
    mainWindow = new BrowserWindow({width:800, height:700});

    // Load in the Html into the Window
    //passes file into loadUrl
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    })); 
    
    // Building a Menu from the Template

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Inserting the Menu

    Menu.setApplicationMenu(mainMenu);
});

// Handle create add Window

function createAddWindow(){

     //Create a new Window
     addWindow = new BrowserWindow({width:300, height:200, title: 'Add Purchase List Items'});
     
         // Load in the Html into the Window
         //passes file into loadUrl
         addWindow.loadURL(url.format({
             pathname: path.join(__dirname, 'addWindow.html'),
             protocol: 'file:',
             slashes: true
         })); 

}


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
                label: 'Clear Items'
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