function handleSelectedArea(info, tab) {
	var url = getURL(info);
	var selection = document.getSelection();
	var html = selection.toString();
	//alert("selection:|" + selection + "|");
	//var filename = url.substring(url.lastIndexOf('/')+1);
	//if (chrome.downloads) {
	//	chrome.downloads.download({ url: url, filename: filename, saveAs: true });
  	//} else {
	//	var a = document.createElement('a');
	//	a.href = url;
	//	a.download = filename;
	//	chrome.tabs.create( { 'url' : _anchorDownloader( url, filename ), 'active' : false  } ); // gets around the download limit
	//}
	//window.open(url, '_blank');
	
	//alert(tab.id);
	var newTab = chrome.tabs.create({
		"openerTabId" 	:	tab.id,
		"url" 			: 	url,
		"active"		: 	false
	});
	//chrome.downloads.download({ url: url, filename: filename, saveAs: true });
}

function getURL(info) {
	var url = info['srcUrl'];
	url = url.replace("_thumb", "");

	return url;
}

chrome.contextMenus.create({
    "title"		:   "Open image",
    "contexts"	:   ["image"],
    "onclick"	:	handleSelectedArea
});
