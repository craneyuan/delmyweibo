// ==UserScript==
// @name         新浪微博一键清空
// @namespace    https://crane-yuan.github.io
// @version      0.1
// @description  清空最近3年内发过的所有微博
// @author       crane-yuan
// @include      http://weibo.com/p/*
// @grant        none
// ==/UserScript==
//'use strict';

var s = document.createElement("script");
s.setAttribute("src","https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js");
s.onload = function(){
    // 删除从现在到3年前的所有微博   
    var beforeYear = 3;
    var date = new Date().toLocaleDateString().split('/');    
    var year = Number(date[0]);
    var month = Number(date[1]);    
    
    for(var i = 1; i > -beforeYear; i--,year -= 1){        
        for(var j = 1; j > -12 && month > 0; j--,month -= 1){            
            if(month > 9){
                date = ''+year+''+month;
            }else{                
                date = ''+year+'0'+month;
            }
            setTimeout(function(){                
                // http://weibo.com/p/uid/home?is_all=1&stat_date=201609#feedtop
                var url = window.location +'home?is_all=1&stat_date='+date+'#feedtop';
                window.location.href=url;
                for(var k=0;k<100;k++){
                    setTimeout(function(){
                        $('a[action-type="fl_menu"]')[0].click();
                        $('a[title="删除此条微博"]')[0].click();
                        $('a[action-type="ok"]')[0].click();
                    },1000*k);
                }
             },(i+beforeYear)*(j+12)*1000);
        }
    }
   
};
document.head.appendChild(s);
