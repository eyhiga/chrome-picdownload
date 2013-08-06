function handleSelectedArea(info, tab) {
    var url = getURL(info);
    var filename = url.substring(url.lastIndexOf('/')+1);

    if (chrome.downloads) {
        chrome.downloads.download({ url: url, 
                filename: filename, saveAs: true });
    } else {
        var newTab = chrome.tabs.create({
                "openerTabId" 	:	tab.id,
                "url" 			: 	url,
                "active"		: 	false
                });
    }
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
