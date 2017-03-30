var tpl = '{{each lst as value}}\
    <li class="buy-items">\
        <div class="pic"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank"><img gome-src="{{value.iurl}}" src="//img.gomein.net.cn/images/grey.gif"></a></div>\
        <div class="price">¥<span>{{value.price}}</span></div>\
        <div class="name"><a class="bigD_item" track="{{value.maima_param}}" href="{{value.purl}}" target="_blank">{{value.pn}}</a></div>\
    </li>\
{{/each}}'

function getData(domId){
    $.get(
        dspData.url.bigdata_url,
        {
            boxid: "box45",
            area: pageData.regionId,
            cid: $.cookie("__clickidc"),
            imagesize: 160,
            c1id:window.dsp_gome_c1id,
            c3id:window.dsp_gome_c3id,
            brid: window.dsp_gome_brid,
            search: window.searchkey,
            shopid: "80009736"
        },
        function(data){
            if (data.lst && data.lst.length > 0) {
                var listTpl = templateSimple.compile(tpl)(data);
                var _length = data.lst.length;
                $(domId).append('<dl class="nSearch-bottom-advertisement" id="nSearch-bottomHotSale"><dt class="hd"><span id="bottomHotSale-refresh" class="bottom-advertisement-refresh" curp="0">换一组</span>热销推荐</dt><dd class="bd"><ul class="bottom-advertisement-lists clearfix" id="bottomHotSale">'+listTpl+'</ul></dd></dl>');
                if(_length<=6){$("#bottomHotSale-refresh").hide()}
                var totlnum = (_length %6 ==0)?(parseInt(_length /6,10)-1):parseInt(_length /6,10);
                var _i = 0;
                $("#bottomHotSale").find(".item").each(function(){
                    if($(this).index()<6){
                        $(this).addClass("cShow");
                    }
                    $(this).addClass("item"+parseInt($(this).index()/6,10))
                })
                $("#bottomHotSale-refresh").bind("click",function(){
                    $("#bottomHotSale").find(".item").removeClass("cShow");
                    if(_i++ == totlnum || _i==3){
                        _i=0;
                    }
                    $("#bottomHotSale").find(".item"+_i).addClass("cShow")
                })
            }
        },
        "jsonp"
    );
}
module.exports = {
    getData:getData
}
