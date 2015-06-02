$(document).ready(function(){
	$(function(){
		bindEvent();
		initModal();
	});
	
	function  bindEvent(){
		$('#financeNewsBtnDown').bind('click',financeNewsDownEvent);
		$('#financeNewsBtnUp').bind('click',financeNewsUpEvent);
	}
	
	function  initModal(){
		//初始化贵金属板块评论.
		initFinanceDataSource();
	}
	
	/**
	 * 当日财经评论向下点击按钮事件.
	 */
	function  financeNewsDownEvent(){
	    currentCount = 0 ;
    	if((Number($('#stockFinanceCount').val())+10)>Number($('#stockFinanceTotalCount').val())){
    		currentCount = Number($('#stockFinanceCount').val());
    	}else{
    		currentCount = Number($('#stockFinanceCount').val())+10;
    	}
    	$('#stockFinanceCount').val(currentCount);
    	initFinanceDataSource();
	}
	
	/**
	 * 当日财经评论向上点击按钮事件.
	 */
	function  financeNewsUpEvent(){
	    currentData = 0;
    	if((Number($('#stockFinanceCount').val())-10)>0){
    		currentData = Number($('#stockFinanceCount').val())-10;
    	}
    	$('#stockFinanceCount').val(currentData);
    	initFinanceDataSource();
	}
	
	/**
	 *初始化相应的贵金属板块数据源. 
	 */
	function  initFinanceDataSource(){
		startNum = Number($('#stockFinanceCount').val())+0;
		var url = $.serviceAddress()+'comments/dailyfinance';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
               $('#stockFinanceTotalCount').val(map.data.count);
                initFinanceNewsModal(map.data.data);
	        }); 
	}
	
	/**
	 * 初始化相应的贵金属板块数据模板.
	 */
	function  initFinanceNewsModal(data){
		$('#financeNewsModal').empty();
		var insertTable = '';
	    $.each(data,function(i,obj){
	      if(i%2==0){
	      	insertTable = insertTable +'<tr><td class="tablerowwidth"><div class="media">'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span> '
			+obj.title+'</a>'
			+'<span class="label label-success pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td>';
	      }else{
	      	insertTable = insertTable +'<td class="tablerowwidth"><div class="media">'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span> '
			+obj.title+'</a>'
			+'<span class="label label-success pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td></tr>';
	      }
	    });
	    $('#financeNewsModal').append(insertTable);
	}
	
});