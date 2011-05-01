// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create RSS news feed tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    // icon:'KS_nav_views.png',
    title:'Latest News',
    window:win1
});

//
// create a tableview for the RSS feed
//
var newsFeed = Ti.UI.createTableView({
    backgroundColor:'#fff'
});

win1.add(newsFeed);

//
// create "about" tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'About',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'About',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'About Us...',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
