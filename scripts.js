function _anchorDownloader(url, filename) {
    var timeout = 500;
    return 'javascript:\'' + 
        '<!doctype html>' + 
        '<html>' +
            '<head></head>' +
            '<script>' +
                'function initDownload() {' +
                    'var el = document.getElementById("anchor");' +
                    'el.click();' +
                    'setTimeout(function() { ' + 
                        'window.close(); ' + 
                    '}, ' + timeout + ');' +
                '}' +
            '</script>' +
            '<body onload="initDownload()">' +
                '<a id="anchor" href="' + url + '" ' + 
                    'download="'+ filename + '">' + 
                '</a>' +
            '</body>' +
        '</html>\'';
};

function handleSelectedArea(info, tab) {
    var url = getURL(info);
    var filename = url.substring(url.lastIndexOf('/')+1);

    if (chrome.downloads) {
        chrome.downloads.download({ url: url, 
                filename: filename, saveAs: true });
    } else {
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        chrome.tabs.create( { 
            'url' : _anchorDownloader( url, filename ), 
            'active' : false  } );
        /*
        var newTab = chrome.tabs.create({
                "openerTabId" 	:	tab.id,
                "url" 			: 	url,
                "active"		: 	false
                });
        */
    }
}

function getURL(info) {
    var url = info['srcUrl'];
    url = url.replace("_thumb", "");

    return url;
}

chrome.contextMenus.create({
        "title"		:   "Download image",
        "contexts"	:   ["image"],
        "onclick"	:	handleSelectedArea
        });
