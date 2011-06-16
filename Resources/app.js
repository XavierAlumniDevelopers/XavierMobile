// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var data;
var url 				= 'http://xaverians.com/rss';


// create tab group
var tabGroup			= Titanium.UI.createTabGroup({id:'tabGroup1'});



//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({
	title:"Window",
	backgroundImage:"bkg3.png"
});


var mainTabWindow = Titanium.UI.createWindow({
	title:"Xavier Mobile",
	navBarHidden:true
});

mainTabWindow.add(tabGroup);


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
 * ABOUT WINDOW
 */

var aboutWindow = Titanium.UI.createWindow({
    title:"XA::Developers"
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


var developersLabel = Ti.UI.createLabel({
	color:'#999',
	text:'This app is developed for the Xavier community by:',
	font:{fontSize:14,fontFamily:'Helvetica Neue',fontStyle:'bold'},
	width:'auto',
    height: 'auto',
    top: 15,
    textAlign:'center'

});

var developersUrlLabel = Ti.UI.createLabel({
	color:'#999',
	text:'http://developers.xaverians.com/',
	font:{fontSize:14,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto',
	height:'auto',
    bottom: 20
});

var xadWindow = Ti.UI.createWindow({
	title:"XavierAlumniDevelopers",
	backgroundImage:'bkg3.png',
	backButtonTitle:'Back',
	navBarHidden:false
});


developersUrlLabel.addEventListener('click', function(e) {

	nav.open(xadWindow,{animated:true});
	var xadWebView = Ti.UI.createWebView({
	    url:'http://developers.xaverians.com/'
	});
    
	xadWindow.add(xadWebView);
    xadWindow.open({modal:true});
});

var devLogo = Ti.UI.createImageView({
    image:'xsdev-logo.png',
    top:60,
    width:180,
    height:180
});

devLogo.addEventListener('click', function(e) {

	nav.open(xadWindow,{animated:true});
	var xadWebView = Ti.UI.createWebView({
	    url:'http://developers.xaverians.com/'
	});

	xadWebView.title('XA::Developers');
	xadWindow.add(xadWebView);

});

aboutView.add(developersLabel);
aboutView.add(devLogo);
aboutView.add(developersUrlLabel);

aboutWindow.add(aboutView);

/*aboutButton.addEventListener('click', function(e) {
	nav.open(aboutWindow,{animated:true});
});*/

/*
 * ABOUT WINDOW END
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


/*mainWindow.addEventListener('click', function(e) {
	searchBar.blur();
});*/

tabGroup.open();





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



function displayItems(itemList){

	var no_of_rows = itemList.length;
		
	for (var c=0;c < no_of_rows;c++){
		
		var title 					= null;
		var postUrl					= null;
		// var postContent = null;
		var postImage 				= null;
		var postImageUrl 			= '';

		var imageView				= null;
		
		var pubDate					= null;
				
		if(itemList.item(c).getElementsByTagName("title") != null){
			// Item title
			title 					= itemList.item(c).getElementsByTagName("title").item(0).text;
			// Item description
			desc 					= itemList.item(c).getElementsByTagName("description").item(0).text;
			descTagLess 			= strip_tags(desc);
			// Item URL
			postUrl 				= itemList.item(c).getElementsByTagName('link').item(0).text;
			
			// Item images
			var x_start				= desc.indexOf('<img src="');
			var x_end				= desc.indexOf('"/>');


			pubDate					= itemList.item(c).getElementsByTagName("pubDate").item(0).text;
			// Convert String Date to Date Object
			var pubDateObj			= new Date(pubDate).toLocaleDateString();



			//alert(pubDateObj);
			// Check if we found an image!
			if (x_start == -1)
			{
				// no image found!
			}
			else
			{
				postImageUrl 		= desc.substring(x_start+10, x_end);
			}
			

			if (Titanium.Platform.name == 'android') {
				// iphone moved to a single image property - android needs to do the same
				imageView = Titanium.UI.createImageView({
					url:postImageUrl,
					width:70,
					height:70,
					top:0,
					left:0
				});
			
			}
			else
			{
				imageView = Titanium.UI.createImageView({
					image:postImageUrl,
					width:70,
					height:70,
					top:0,
					left:0
				});
				
			}
			


			// Create a table row for this item
			var row 				= Titanium.UI.createTableViewRow({
				// title: title,
				height:70,
				width: 'auto',
				postName: title,
				postUrl: postUrl,
				desc: descTagLess,
				postImage: imageView,
				rightImage: 'rightarrow.png'
			});
			
			var rowTitle 			= Ti.UI.createLabel({
				color:'#003',
				text:title,
				font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
				lineHeight:16,
				height:30,
				top: 5,
				left: 80,
				width:'auto',
				verticalAlign: 'top',
				textAlign: 'justify',
				
				postName: title,
				postUrl: postUrl,
				desc: descTagLess,
				postImage: imageView
/* 				borderWidth: 1, */
			});
			
			var rowDesc 			= Ti.UI.createLabel({
				color:'#555',
				text:pubDateObj,
				font:{fontSize:12,fontFamily:'Helvetica Neue', lineHeight:12},
				textAlign:'justify',
				height:30,
				top:31,
				left: 80,
				width:'auto',
				
				
				postName: title,
				postUrl: postUrl,
				desc: descTagLess,
				postImage: imageView
			});


			// If title has 2 rows, move rowDesc down
			if(title.length >= 30 && postImageUrl != '' || (title.length >= 40 && postImageUrl == ''))
			{
				rowTitle.height = 40;
				rowDesc.top = 41;
			}
			
			
			row.add(rowTitle);
			row.add(rowDesc);

						
			if (postImageUrl == '') 
			{
				// if there's no image, move the title and description
				rowTitle.left	= 10;
				rowTitle.right 	= 10;
				rowTitle.width	= '95%';
				
				if (typeof(rowDesc) == 'object')
				{				
					rowDesc.left 	= 10;
					rowDesc.right 	= 10;
					rowDesc.width 	= '95%';
				}
				
					
			}
			else
			{			
				// Add image view
				row.add(imageView);
			}

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
    				height:"15%",
    				top:30
				});
				w4PreviewWindowTitleText = Titanium.UI.createLabel({
					color:'#333',
					text:e.source.postName,
					font:{fontSize:16,fontFamily:'Helvetica Neue',fontWeight:'bold'},
					textAlign:'left',
					width:'90%',
					height:'80%'
				});



				w4PreviewWindowTitleTextContainer.add(w4PreviewWindowTitleText);
				w4PreviewWindow.add(w4PreviewWindowTitleTextContainer);


				w4PreviewWindowTextContainer = Titanium.UI.createView({
					backgroundColor:'#fff',
   					borderColor:'#ddd',
   					borderWidth:1,
   					borderRadius:10,
   					width:"90%",
    				height:"55%",
    				top:100
				});
				
					w4PreviewWindowText = Titanium.UI.createLabel({
						color:'#444',
						text:e.source.desc,
						font:{fontSize:12,fontFamily:'Helvetica Neue'},
						width:'90%',
						height:"90%"
					});	
					// TODO: add image to preview page
					//w4PreviewWindowTextContainer.add(e.source.imageView);
					w4PreviewWindowTextContainer.add(w4PreviewWindowText);
					w4PreviewWindow.add(w4PreviewWindowTextContainer);
				//}
					


					
				var goToWebViewBtn = Titanium.UI.createButton({
					title:"Continue reading...",
					borderColor:'#ddd',
					borderWidth:1,
   					borderRadius:10,
					width:'90%',
					height:50,
					top:335
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
