$(document).ready(function() {
	$(function() {
		bindEvent();
		initModel();
	});
	function bindEvent() {
        $('#stockAccountBtn').bind('click',stockAccountShowEvent);
        $('#tradeActivityBtn').bind('click',tradeActivityShowEvent);
        $('#addStockAccNumBtn').bind('click',addStockAccNumShow);
        $('#finalSleepAccNumBtn').bind('click',finalSleepAccNumShow);
        $('#shiborBtn').bind('click',shiborShowEvent);
        $('#lrpBtn').bind('click',lrpShowEvent);
        $('#dollarIndexBtn').bind('click',dollarIndexShowEvent);
        $('#marginBtn').bind('click',marginShowEvent);
	}
    
    function  initModel(){
    	tradeActivityShowEvent();
    }
    
    function commenSelect(btnId){
    	$('.list-group-item').removeClass('active');
		$('#'+btnId).attr('class','list-group-item active');
    }
    
    function  commonInitTitle(title){
       $('#messageTitle').empty().html(title);
    }
    
    function  addStockAccNumShow(){
       stockAccountShowEvent();
    }
    
    function  finalSleepAccNumShow(){
       sleepStockAccountShow();
    }
    
    function  commonHideEvent(){
       $('#btnContainer').hide();
    }
    
	
	function  stockAccountShowEvent(){
	    $('#btnContainer').show();
	    commonInitTitle('新增股票账户户数统计表');
		commenSelect('stockAccountBtn');
		var url = $.serviceAddress()+'datacenter/stockaccount';
		var map = $.commonAsyncService(url,'POST',{start:0,limit:20});
        $('#showModal').empty();
        $('#showModal').highcharts({
        title: {text: '新增股票账户户数统计表', x: -20},
        subtitle: {text: '财汇.NET提供',x:-20},
        xAxis: {categories:map.data.currentdate},
        yAxis: {title: {text: '账户统计数值'},
                plotLines: [{value: 0,width: 1,color:'#808080'}]},
        tooltip: {valueSuffix: '户'},
        legend: {layout:'vertical',align:'right',verticalAlign:'top', x:0, y:80,floating:true,borderWidth:1},
        series: [{
            name: '新增股票账户数(户)上海',
            data:map.data.addshaccnum
        }, {
            name: '新增股票账户数(户)深圳',
            data:map.data.addszaccnum
        }, {
            name: '合计增加股票账户数(户)',
            data:map.data.addaccnum
        }]
       });
	}
	
	
	function  sleepStockAccountShow(){
		var url = $.serviceAddress()+'datacenter/stockaccount';
	    var map = $.commonAsyncService(url,'POST',{start:0,limit:20});
        $('#showModal').empty();
        commonInitTitle('期末休眠账户数统计表');
	    $('#showModal').highcharts({
        title: {text: '期末休眠账户数统计表', x: -20},
        subtitle: {text: '财汇.NET提供',x:-20},
        xAxis: {categories:map.data.currentdate},
        yAxis: {title: {text: '账户统计数值(万户)'},
                plotLines: [{value: 0,width: 1,color:'#808080'}]},
        tooltip: {valueSuffix: '万户'},
        legend: {layout:'vertical',align:'right',verticalAlign:'top', x:0, y:80,floating:true,borderWidth:1},
        series: [{
            name: '期末休眠账户数(万户)上海',
            data:map.data.finalshsleepnum
        }, {
            name: '期末休眠账户数(万户)深圳',
            data:map.data.finalszsleepnum
        }]
       });
	}
	
	function  tradeActivityShowEvent(){
		commenSelect('tradeActivityBtn');
		commonInitTitle('股市交易活跃度');
		commonHideEvent();
		var url = $.serviceAddress()+'datacenter/tradeactivity';
		var map = $.commonAsyncService(url, 'POST',{start:0,limit:25}); 
			 $('#showModal').empty();
			 $('#showModal').highcharts(
				{chart:{ type: 'areaspline' },
				 title:{ text:'股市交易活跃度'},
				 subtitle: {text: '财汇.NET提供',x:-20},
				 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
				 xAxis: { categories:map.data.currentdate, 
				 plotBands: [{
				 color: 'rgba(68, 170, 213, .2)' }] },
				 yAxis: { title: { text:'交易活跃度数值'} },
				 tooltip: { shared: true, valueSuffix:''}, 
				 credits: { enabled: false },
				 plotOptions: { areaspline: { fillOpacity: 0.5 } },
				 series: [{ name: '股市交易活跃度', data:map.data.currentvalue}] 
		 });
	}

    function  shiborShowEvent(){
    	var url = $.serviceAddress()+'datacenter/shibor';
	    var map = $.commonAsyncService(url,'POST',{start:0,limit:20});
        $('#showModal').empty();
        commenSelect('shiborBtn');
        commonInitTitle('银行隔夜拆借利率');
        commonHideEvent();
	    $('#showModal').highcharts({
        title: {text: '银行隔夜拆借利率统计', x: -20},
        subtitle: {text: '财汇.NET提供',x:-20},
        xAxis: {categories:map.data.currenttime},
        yAxis: {title: {text: '银行隔夜拆借利率统计数值(%)'},
                plotLines: [{value: 0,width: 1,color:'#808080'}]},
        tooltip: {valueSuffix: '%'},
        legend: {layout:'vertical',align:'right',verticalAlign:'top', x:0, y:80,floating:true,borderWidth:1},
        series: [{
            name: '隔夜拆借利率',
            data:map.data.shiboron
        },{
            name: '一周拆借利率',
            data:map.data.shibor1w
        },{
            name: '两周拆借利率',
            data:map.data.shibor2w
        },{
            name: '一个月拆借利率',
            data:map.data.shibor1m
        },{
            name: '三个月拆借利率',
            data:map.data.shibor3m
        },{
            name: '六个月拆借利率',
            data:map.data.shibor6m
        },{
            name: '九个月拆借利率',
            data:map.data.shibor9m
        },{
            name: '一年拆借利率',
            data:map.data.shibor1y
        }]
       });
    } 
    
    function  lrpShowEvent(){
    	commenSelect('lrpBtn');
		commonInitTitle('最新贷款基础利率');
		commonHideEvent();
		var url = $.serviceAddress()+'datacenter/lrp';
		var map = $.commonAsyncService(url, 'POST',{start:0,limit:25}); 
			 $('#showModal').empty();
			 $('#showModal').highcharts(
				{chart:{ type: 'areaspline' },
				 title:{ text:'最新贷款基础利率'},
				 subtitle: {text: '财汇.NET提供',x:-20},
				 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
				 xAxis: { categories:map.data.currenttime, 
				 plotBands: [{
				 color: 'rgba(68, 170, 213, .2)' }] },
				 yAxis: { title: { text:'基础利率值(%)'} },
				 tooltip: { shared: true, valueSuffix:''}, 
				 credits: { enabled: false },
				 plotOptions: { areaspline: { fillOpacity: 0.5 } },
				 series: [{ name: '基础利率值(%)', data:map.data.lrp1y}] 
		 });
    }
    
    //美元指数.
    function dollarIndexShowEvent(){
    	commenSelect('dollarIndexBtn');
		commonInitTitle('美元指数');
		commonHideEvent();
		var url = $.serviceAddress()+'datacenter/dollarindex';
		var map = $.commonAsyncService(url, 'POST',{start:0,limit:25}); 
			 $('#showModal').empty();
			 $('#showModal').highcharts(
				{chart:{ type: 'areaspline' },
				 title:{ text:'美元指数'},
				 subtitle: {text: '财汇.NET提供',x:-20},
				 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
				 xAxis: { categories:map.data.opentime, 
				 plotBands: [{
				 color: 'rgba(68, 170, 213, .2)' }] },
				 yAxis: { title: { text:'美元指数值'} },
				 tooltip: { shared: true, valueSuffix:''}, 
				 credits: { enabled: false },
				 plotOptions: { areaspline: { fillOpacity: 0.5 } },
				 series: [{ name: '美元指数值', data:map.data.newstockprice}] 
		 });
    }
    
    //融资融券交易量
    function  marginShowEvent(){
    	var url = $.serviceAddress()+'datacenter/margintrade';
	    var map = $.commonAsyncService(url,'POST',{start:0,limit:30});
	    debugger;
        $('#showModal').empty();
        commenSelect('marginBtn');
        commonInitTitle('融资融券交易量');
        commonHideEvent();
	    $('#showModal').highcharts({
        title: {text: '融资融券交易量统计', x: -20},
        subtitle: {text: '财汇.NET提供',x:-20},
        xAxis: {categories:map.data.jyrq},
        yAxis: {title: {text: '融资融券交易日期'},
                plotLines: [{value: 0,width: 1,color:'#808080'}]},
        tooltip: {valueSuffix: '%'},
        legend: {layout:'vertical',align:'right',verticalAlign:'top', x:0, y:80,floating:true,borderWidth:1},
        series: [{
            name: '融资余额',
            data:map.data.rzye
        },{
            name: '融券余额',
            data:map.data.rqye
        },{
            name: '融资融券余额',
            data:map.data.rzrqye
        }]
       });
    }
}); 