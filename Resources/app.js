var win = Titanium.UI.createWindow({
	title:"Window",
	backgroundImage:"bkg3.png"
});

var tabGroup = Ti.UI.createTabGroup();

var mainTabWindow = Titanium.UI.createWindow({
	title:"Xavier Mobile"
});

mainTabWindow.add(tabGroup)

var nav = Titanium.UI.iPhone.createNavigationGroup({
   window: mainTabWindow
});

// TO DO => SEARCH

/*var searchBar = Ti.UI.createSearchBar({
	height: 40,
	top: 0
});

var searchWin = Ti.UI.createWindow({});

searchBar.addEventListener('return', function(e) {
	searchWin.title = "Searching for: " + searchBar.value;
	
	nav.open(searchWin);
});*/

/* 
 * RSS BASED ON http://query7.com/titanium-mobile-android-development-first-application
 */

var rssData = [];

var w4Window = Ti.UI.createWindow({
	backgroundImage:'bkg3.png',
   	// backButtonTitle:'Back',
   	navBarHidden:true
});

var w4WebViewWindow = Ti.UI.createWindow({
	backgroundImage:'bkg3.png',
   	backButtonTitle:'Back',
   	// navBarHidden:true
});

var w4WindowTab = Ti.UI.createTab({
	title:"News",
	window: w4Window
});

tabGroup.addTab(w4WindowTab);

// create table view
var w4RSS = Titanium.UI.createTableView({
	data:rssData,
	backgroundImage:'bkg3.png'
});

w4Window.add(w4RSS);

var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function()
{

	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName('item');
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;

		var urls = new Array();
		var row = new Array();
				
		for(var c=0; c<items.length;c++)
		{
			urls[c] = items.item(c).getElementsByTagName('link').item(0).text;

			var postName = items.item(c).getElementsByTagName('title').item(0).text;
			var postUrl = items.item(c).getElementsByTagName('link').item(0).text;

			row[c] = Titanium.UI.createTableViewRow({
				title: postName,
				postName: postName,
				postUrl: postUrl
			});

			if(c == 0)
			{
				row[c].header = 'Xavier Website Feed';
			}

			row[c].addEventListener('click', function (e){
				
				nav.open(w4WebViewWindow,{animated:true});
					w4WebViewWindow.title = e.source.postName;
					var w4WebView = Ti.UI.createWebView({
	 				   url:e.source.postUrl
					});

				w4WebViewWindow.add(w4WebView);
				
			});

			w4RSS.appendRow(row[c]);
			
		}

	}
	catch(E)
	{
		alert("An error has occured\n\nPlease send an Email to xad@xaverians.com with the error below:\n \n" + E);
	}

};

xhr.open('GET', 'http://developer.appcelerator.com/blog/feed');
xhr.send();

/*
 * TO DO: ADD A REFRESH OPTION
 */

/*
 * End RSS code
 */

var aboutButton = Ti.UI.createButton({
	title: "About"
});

mainTabWindow.setRightNavButton(aboutButton);
//w4Window.add(searchBar);
win.add(nav);
win.open();

/*
 * ABOUT XS WINDOW
 */

var aboutWindow = Ti.UI.createWindow({
	title:"About XS",
	navBarHidden:true
});

var aboutWindowTab = Ti.UI.createTab({
	title:"XS",
	navBarHidden:true,
	window:aboutWindow
});

tabGroup.addTab(aboutWindowTab);

var dummyAboutLabel = Ti.UI.createLabel({
	color:'#999',
	text:'Insert "About XS" here.',
	font:{fontSize:14,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

aboutWindow.add(dummyAboutLabel);

/*
 * END ABOUT WINDOW
 */

/*
 * ABOUT WINDOW
 */

var aboutWindow = Titanium.UI.createWindow({
    title:"About"
});

var aboutView = Ti.UI.createView({
    backgroundColor:'#fff',
    borderColor:'#ddd',
    borderWidth:1,
    borderRadius:10,
    width:"90%",
    height:"80%"
});

var devLogo = Ti.UI.createImageView({
    image:'xsdev-logo.png',
    top:55,
    width:100,
    height:100
});

var developersLabel = Ti.UI.createLabel({
	color:'#999',
	text:'Developed by:',
	font:{fontSize:18,fontFamily:'Helvetica Neue',fontStyle:'bold'},
	textAlign:'center',
	width:'auto',
    top: 50
});

var developer1Label = Ti.UI.createLabel({
	color:'#999',
	text:'Xavier Alumni Developers\nhttp://developers.xaverians.com/',
	font:{fontSize:14,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
    top: 120
});

var xadWindow = Ti.UI.createWindow({
	title:"XavierAlumniDevelopers",
	backgroundImage:'bkg3.png',
	backButtonTitle:'Back'
});


developer1Label.addEventListener('click', function(e) {

	nav.open(xadWindow,{animated:true});
	var xadWebView = Ti.UI.createWebView({
	    url:'http://developers.xaverians.com/'
	});

	xadWindow.add(xadWebView);

});

aboutView.add(devLogo);
aboutView.add(developersLabel);
aboutView.add(developer1Label);
aboutWindow.add(aboutView);

aboutButton.addEventListener('click', function(e) {
	nav.open(aboutWindow,{animated:true});
});

/*
 * ABOUT WINDOW END
 */

/*mainWindow.addEventListener('click', function(e) {
	searchBar.blur();
});*/

tabGroup.open();
