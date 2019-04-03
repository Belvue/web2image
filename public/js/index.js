function sendData() {
    fetch('/web2img', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            html: document.getElementById('html').value,
            css: document.getElementById('css').value
        })
    }).then(function (response) {
        return response.json();
    }).then((data) => {
        document.getElementById('preview').setAttribute('src', data);
        var label = makeid();
        var download = document.getElementById('download');
        var downloadwebp = document.getElementById('download_webp');
        download.setAttribute('onclick', `downloadFile("${data}", "${label}")`);
        download.classList.remove('hide');
        downloadwebp.classList.remove('hide');
    });
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 14; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/* Download File */

function downloadFile(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
    return false;
}

function downloadWEBP() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var src = canvas.toDataURL("image/webp", 1);
        downloadFile(src, makeid());
    };
    img.src = document.getElementById('preview').getAttribute('src');
}

document.getElementById('twitter_tgt').setAttribute('href', "https://twitter.com/home?status=Convert%20HTML%20&%20CSS&20into%20images!%20" + location.href);