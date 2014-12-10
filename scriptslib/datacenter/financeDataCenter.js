$(document).ready(function() {
	
	$(function() {
		bindEvent();
		initModel();
	});
	
	function  bindEvent(){
		$("#goldForexBtn").bind("click", goldForexShowEvent);
		$('#bulkcargotransBtn').bind('click',bulkCargoTransShowEvent);
		$('#socialPowerBtn').bind('click',socialPowerShowEvent);
		$('#pmiBtn').bind('click',pmiShowEvent);
	}
	
	function  initModel(){
		//显示国家黄金外汇储备
		goldForexShowEvent();
	}
	
	function commenSelect(btnId){
    	$('.list-group-item').removeClass('active');
		$('#'+btnId).attr('class','list-group-item active');
    }
	
	function goldForexShowEvent() {
		     commenSelect('goldForexBtn');
		     var url = $.serviceAddress()+'datacenter/forexgold';
		     var map = $.commonAsyncService(url, 'POST',{start:0,limit:20}); 
			 $('#showModal').empty();
			 $('#showModal').highcharts(
				{chart:{ type: 'areaspline' },
				 title:{ text:'国家黄金和外汇储备 '},
				 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
				 xAxis: { categories:map.data.currentdate, 
				 plotBands: [{
				 color: 'rgba(68, 170, 213, .2)' }] },
				 yAxis: { title: { text:'数量单位(千)'} },
				 tooltip: { shared: true, valueSuffix:''}, 
				 credits: { enabled: false },
				 plotOptions: { areaspline: { fillOpacity: 0.5 } },
				 series: [{ name: '国家外汇储备(亿美元)', data:map.data.forexdata},
				          { name: '国家黄金储备(万盎司)', data:map.data.golddata}] 
				});
	}
	
	function bulkCargoTransShowEvent(){
		 commenSelect('bulkcargotransBtn');
		 var url = $.serviceAddress()+'datacenter/bulkcargotrans';
		 var map = $.commonAsyncService(url, 'POST',{start:0,limit:20}); 
		 $('#showModal').empty();
		 $('#showModal').highcharts(
			{chart:{ type: 'areaspline' },
			 title:{ text:'波罗的海干货综合指数 '},
			 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
			 xAxis: { categories:map.data.currenttime, 
			 plotBands: [{
			 color: 'rgba(68, 170, 213, .2)' }] },
			 yAxis: { title: { text:'数量单位(千)'} },
			 tooltip: { shared: true, valueSuffix:''}, 
			 credits: { enabled: false },
			 plotOptions: { areaspline: { fillOpacity: 0.5 } },
			 series: [{ name: '波罗的海干货综合指数', data:map.data.indexvalue}] 
			});
	}
	
	function  socialPowerShowEvent(){
		commenSelect('socialPowerBtn');
		 var url = $.serviceAddress()+'datacenter/socialpower';
		 var map = $.commonAsyncService(url, 'POST',{start:0,limit:20}); 
		 $('#showModal').empty();
		 $('#showModal').highcharts(
			{chart:{ type: 'areaspline' },
			 title:{ text:'全社会用电量统计 '},
			 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
			 xAxis: { categories:map.data.currenttime, 
			 plotBands: [{
			 color: 'rgba(68, 170, 213, .2)' }] },
			 yAxis: { title: { text:'亿千瓦时'} },
			 tooltip: { shared: true, valueSuffix:''}, 
			 credits: { enabled: false },
			 plotOptions: { areaspline: { fillOpacity: 0.5 } },
			 series: [{ name: '全社会用电量统计', data:map.data.socialpower}] 
			});
	}
    
    function  pmiShowEvent(){
    	commenSelect('pmiBtn');
		 var url = $.serviceAddress()+'datacenter/pmi';
		 var map = $.commonAsyncService(url, 'POST',{start:0,limit:20}); 
		 $('#showModal').empty();
		 $('#showModal').highcharts(
			{chart:{ type: 'areaspline' },
			 title:{ text:'汇丰(PMI)指数 '},
			 legend: { layout:'vertical', align:'left',verticalAlign: 'top', x: 150, y: 100, floating:true, borderWidth:1, backgroundColor:'#FFFFFF' },
			 xAxis: { categories:map.data.statistics, 
			 plotBands: [{
			 color: 'rgba(68, 170, 213, .2)' }] },
			 yAxis: { title: { text:'亿千瓦时'} },
			 tooltip: { shared: true, valueSuffix:''}, 
			 credits: { enabled: false },
			 plotOptions: { areaspline: { fillOpacity: 0.5 } },
			 series: [{ name: '中国综合PMI', data:map.data.chinamultiplepmi},
			          { name: '汇丰制造业PMI', data:map.data.hsbcmanufacturingpmi},
			          { name: '汇丰服务业PMI', data:map.data.hsbcservicepmi}] 
			});
    }
});