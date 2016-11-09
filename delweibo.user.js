// ==UserScript==
// @name         新浪微博一键清空
// @namespace    https://crane-yuan.github.io
// @version      0.3
// @description  清空最近3年内发过的所有微博
// @author       crane-yuan
// @match      http://weibo.com/p/*
// @grant        none
// ==/UserScript==
//'use strict';

var s = document.createElement("script");
s.setAttribute("src", "https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js");
s.onload = function () {
    // 删除从现在到3年前的所有微博   
    var beforeYear = 3;
    // 每个月最大微博数量
    var monthMaxNum = 100;
    var date = new Date().toLocaleDateString().split('/');
    var year = Number(date[0]);
    var month = Number(date[1]);

    // 循环删除最近三年的微博
    for (var i = 0, j = 1; i < beforeYear; j++) {
        if (j > 12) {
            i++;
            j = 1;
            year--;
            continue;
        }
        month = j;
        if (month > 9) {
            date = '' + year + '' + month;
        } else {
            date = '' + year + '0' + month;
        }
        // 定时删除微博
        setTimeout((function (date) {
            return function () {
                // http://weibo.com/p/uid/home?is_all=1&stat_date=201609#feedtop
                var urls = window.location.href.split('?');
                url = urls[0] + '?is_all=1&stat_date=' + date + '#feedtop';
                //console.log(date);
                //console.log(url);
                window.location.href = url;
                //console.log(window.location.href);
                // 删除一个月的微博
                for (var k = 0; k < monthMaxNum; k++) {
                    setTimeout(function () {
                        $('a[action-type="fl_menu"]')[0].click();
                        $('a[title="删除此条微博"]')[0].click();
                        $('a[action-type="ok"]')[0].click();
                    }, 1000 * k);
                }
            }
        })(date), (i*10 + j) * 3000);
    }
}
document.head.appendChild(s);
