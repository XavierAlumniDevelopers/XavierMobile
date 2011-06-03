function strip_tags (str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski

    // fixed Titanium warning by: Kosso

    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'

	var url = 'http://developer.appcelerator.com/blog/feed';
//var url = 'http://pipes.yahoo.com/pipes/pipe.run?_id=1dd14b3cfa6df4e718b7dee82118c78a&_render=rss';

    var key = '', allowed = false;
    var matches = [];
    var allowed_array = [];
    var allowed_tag = '';
    var i = 0;
    var k = '';
    var html = '';

    var replacer = function (search, replace, str) {
        return str.split(search).join(replace);
    };

    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);
    }

    str += '';

    // Match tags
    matches = str.match(/(<\/?[\S][^>]*>)/gi);

    // Go through all HTML tags
    for (key in matches) {
	
		if(key){
	
			// Save HTML tag
			html = matches[key].toString();
	
			// Is tag not in allowed list? Remove from str!
			allowed = false;
	
			// Go through all allowed tags
			for (k in allowed_array) {
	
				if(k){
		
					// Init
					allowed_tag = allowed_array[k];
					i = -1;
		
					if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
					if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
					if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}
		
					// Determine
					if (i == 0) {
						allowed = true;
						break;
					}
				
				}
			}
	
			if (!allowed) {
				str = replacer(html, "", str); // Custom replace. No regexing
			}

        }
    }

    return str;
}

var win = Titanium.UI.createWindow({
	title:"Window",
	backgroundImage:"bkg3.png"
});

var tabGroup = Ti.UI.createTabGroup();

var mainTabWindow = Titanium.UI.createWindow({
	title:"Xavier Mobile",
	navBarHidden:true
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

var w4Window = Ti.UI.createWindow({
	backgroundImage:'bkg3.png',
	title:'Xavier Mobile'
   	// backButtonTitle:'Back',
   	// navBarHidden:true
});

var w4PreviewWindow = Ti.UI.createWindow({
	backgroundImage:'bkg3.png',
   	backButtonTitle:'Back',
   	title:"Preview",
   	navBarHidden:false
});

var w4WebViewWindow = Ti.UI.createWindow({
	backgroundImage:'bkg3.png',
   	backButtonTitle:'Back',
   	navBarHidden:false
});

var w4WindowTab = Ti.UI.createTab({
	title:"News",
	icon:'news.png',
	window: w4Window
});

tabGroup.addTab(w4WindowTab);

/* 
 * OLD RSS BASED ON http://query7.com/titanium-mobile-android-development-first-application
 */

/*
// create table view
var rssData = [];
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
*/
/*
 * END OLD RSS
 */

/*
 * NEW RSS based on KitchenSink
 */

var refreshButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
	//title:"Refresh",
	//width:340,
	//height:50,
	//top:320
});
refreshButton.addEventListener('click',function()
{
	// reload feed
	loadRSSFeed(url);	
});
//w4Window.add(refreshButton)

var data;

function displayItems(itemList){

	for (var c=0;c < itemList.length;c++){
		
		var title = null;
		var postUrl = null;
		// var postContent = null;
		// var postImage = null;
		if(itemList.item(c).getElementsByTagName("content:encoded") != null){
			// Item title
			title = itemList.item(c).getElementsByTagName("title").item(0).text;
			// Item description
			desc = itemList.item(c).getElementsByTagName("description").item(0).text;
			descTagLess = strip_tags(desc);
			// alert(desc);
			// Get Post Elemets
			
			/*if(itemList.item(c).getElementsByTagName("content:encoded") != null){
				postContent = itemList.item(c).getElementsByTagName("content:encoded").item(0);
				Ti.API.info("postContent = " + postContent);
				// alert(postContent);
				if(postContent.getElementsByTagName("img") != null){
					postImage = postContent.getElementsByTagName("img").getAttribute("src").text;
					Ti.API.info("Post Image url = " + postImage[0]);
				}
			}*/
			/*if(postContent != null ){
				alert(postContent);
			}*/
			// Item images
			
			// Item URL
			postUrl = itemList.item(c).getElementsByTagName('link').item(0).text;

			// Create a table row for this item
			var row = Titanium.UI.createTableViewRow({
				// title: title,
				height:90,
				postName: title,
				postUrl: postUrl,
				desc: descTagLess
			});
			
			var rowTitle = Ti.UI.createLabel({
				color:'#000',
				text:title,
				font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				textAlign:'left',
				height:50,
				top:8,
				left:10,
				width:'90%',
				postName: title,
				postUrl: postUrl,
				desc: descTagLess
			});
			row.add(rowTitle);
			var rowDesc = Ti.UI.createLabel({
				color:'#999',
				text:descTagLess,
				font:{fontSize:12,fontFamily:'Helvetica Neue'},
				textAlign:'left',
				height:15,
				top:60,
				left:10,
				width:'95%',
				postName: title,
				postUrl: postUrl,
				desc: descTagLess
			});
			row.add(rowDesc);
			
			// Affixes row header
			/*if(c == 0)
			{
				row.header = 'Xavier Website Feed';
			}*/

			row.addEventListener('click', function (e){
				
				nav.open(w4PreviewWindow,{animated:true});
				
				// w4PreviewWindow.title = e.source.postName;
				w4WebViewWindow.title = e.source.postName;
				w4PreviewWindowTitleTextContainer = Titanium.UI.createView({
					backgroundColor:'#fff',
   					borderColor:'#ddd',
   					borderWidth:1,
   					borderRadius:10,
   					width:"90%",
    				height:"25%",
    				top:30
				});
				w4PreviewWindowTitleText = Titanium.UI.createLabel({
					color:'#333',
					text:e.source.postName,
					font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
					textAlign:'center',
					width:'75%',
					height:'80%'
				});
				w4PreviewWindowTextContainer = Titanium.UI.createView({
					backgroundColor:'#fff',
   					borderColor:'#ddd',
   					borderWidth:1,
   					borderRadius:10,
   					width:"90%",
    				height:"40%",
    				top:150
				});
				w4PreviewWindowText = Titanium.UI.createLabel({
					color:'#999',
					text:e.source.desc,
					font:{fontSize:14,fontFamily:'Helvetica Neue'},
					textAlign:'left',
					width:'75%',
					height:'90%'
				});
					
				w4PreviewWindowTextContainer.add(w4PreviewWindowText);
				w4PreviewWindow.add(w4PreviewWindowTextContainer);
				w4PreviewWindowTitleTextContainer.add(w4PreviewWindowTitleText);
				w4PreviewWindow.add(w4PreviewWindowTitleTextContainer);
					
				var goToWebViewBtn = Titanium.UI.createButton({
					title:"Continue reading...",
					borderColor:'#ddd',
					borderWidth:1,
   					borderRadius:10,
					width:'90%',
					height:50,
					top:330
				});
					
				w4PreviewWindow.add(goToWebViewBtn);
				
				var w4WebView = Ti.UI.createWebView({
	 			   url:e.source.postUrl
				});
			
				w4WebViewWindow.add(w4WebView);
									
				goToWebViewBtn.addEventListener("click", function(e){
					nav.open(w4WebViewWindow,{animated:true});
				});
				
			});
			
			// Add the row to the data
			data[c] = row;
		}
	}
	
	// create the table
	feedTableView = Titanium.UI.createTableView({
		data:data,
		top:0,
		//height:320,
		backgroundImage:"bkg3.png"
	});
	
	// Add the tableView to the current window
	w4Window.add(feedTableView);
}

function loadRSSFeed(url){

	data = [];
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET',url);
	xhr.onload = function()
	{
		
		try
		{
		// Now parse the feed XML 
		var xml = this.responseXML;
		
		var itemList = xml.documentElement.getElementsByTagName("item");
		
		// Now add the items to a tableView
		displayItems(itemList);
		
		//refreshButton.title = 'Refresh'
		}
		catch(E)
		{
			// NOT WORKING
			//refreshButton.title = 'Problem connecting!';
			alert(E);
		}

	};
	
	//refreshButton.title = 'Loading...';
	xhr.send();	
	
}

//Initial loading of the RSS
loadRSSFeed(url);

/*
 * END NEW RSS
 */

/*var aboutButton = Ti.UI.createButton({
	title: "About"
});*/

w4Window.setRightNavButton(refreshButton);
//w4Window.add(searchBar);
win.add(nav);
win.open();

/*
 * ABOUT XS WINDOW
 */
/*
var aboutXSWindow = Ti.UI.createWindow({
	title:"About XS",
	// navBarHidden:true
});

var aboutXSWindowTab = Ti.UI.createTab({
	title:"XS",
	icon:'i-icon.png',
	// navBarHidden:true,
	window:aboutXSWindow
});

tabGroup.addTab(aboutXSWindowTab);

var dummyXSAboutLabel = Ti.UI.createLabel({
	color:'#999',
	text:'Insert "About XS" here.',
	font:{fontSize:14,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

aboutXSWindow.add(dummyXSAboutLabel);
*/
/*
 * END ABOUT WINDOW
 */

/*
 * ABOUT WINDOW
 */

var aboutWindow = Titanium.UI.createWindow({
    title:"About",
    // navBarHidden:true
});

var aboutWindowTab = Ti.UI.createTab({
	title:"About",
	icon:'source-code-icon.png',
	// navBarHidden:true,
	window:aboutWindow
});

tabGroup.addTab(aboutWindowTab);

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
    top:50,
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
	backButtonTitle:'Back',
	navBarHidden:false
});


developer1Label.addEventListener('click', function(e) {

	nav.open(xadWindow,{animated:true});
	var xadWebView = Ti.UI.createWebView({
	    url:'http://developers.xaverians.com/'
	});

	xadWindow.add(xadWebView);

});

devLogo.addEventListener('click', function(e) {

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

/*aboutButton.addEventListener('click', function(e) {
	nav.open(aboutWindow,{animated:true});
});*/

/*
 * ABOUT WINDOW END
 */

/*mainWindow.addEventListener('click', function(e) {
	searchBar.blur();
});*/

tabGroup.open();
