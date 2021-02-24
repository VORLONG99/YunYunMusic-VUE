$(function(){   
    setInterval(() => {
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $("#main").height(windowHeight)
    }, 30);
})