// ==UserScript==
// @name                新浪微博一键清空
// @namespace           https://crane-yuan.github.io
// @version             0.4
// @description         清空您发过的所有微博
// @author              crane-yuan
// @match               http://weibo.com/p/*
// @require             https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js
// @grant               none
// @compatible         firefox 测试通过
// @compatible         chrome 测试通过
// @compatible         opera 未测试
// @compatible         safari 未测试
// ==/UserScript==

window.setInterval(function(){
    $('a[action-type="fl_menu"]')[0].click();
    $('a[title="删除此条微博"]')[0].click();
    $('a[action-type="ok"]')[0].click();
},500)
