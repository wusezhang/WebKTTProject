$(document).ready(function(){
	$(function(){
		bindEvent();
		initModal();
	});
	
	function  bindEvent(){
		$('#stockNewsBtnDown').bind('click',stockNewsDownEvent);
		$('#stockNewsBtnUp').bind('click',stockNewsUpEvent);
	}
	
	function  initModal(){
		//初始化相应的股市评论信息
		initStockNewsDataSource();
		
	}
	
	
	function  initStockNewsDataSource(){
		startNum = Number($('#stockNewsCount').val())+0;
		var url = $.serviceAddress()+'comments/dailystock';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
            	$('#stockNewsTotalCount').val(map.data.count);
                initStockNewsModal(map.data.data);
	        }); 
	}
	
	function  initStockNewsModal(data){
		$('#stockNewsModal').empty();
		var insertTable = '';
	    $.each(data,function(i,obj){
	      if(i%2==0){
	      	insertTable = insertTable +'<tr><td class="tablerowwidth"><div class="media">'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span>  '
			+obj.title+'</a>'
			+'<span class="label label-success pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td>';
	      }	else {
	      	insertTable = insertTable +'<td class="tablerowwidth"><div class="media">'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span>  '
			+obj.title+'</a>'
			+'<span class="label label-success pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td></tr>';
	      }
	    });
	    $('#stockNewsModal').append(insertTable);
	}
	
	/**
	 * 想下按钮点击事件.
	 */
	function stockNewsDownEvent(){
		currentCount = 0 ;
    	if((Number($('#stockNewsCount').val())+10)>Number($('#stockNewsTotalCount').val())){
    		currentCount = Number($('#stockNewsCount').val());
    	}else{
    		currentCount = Number($('#stockNewsCount').val())+10;
    	}
    	$('#stockNewsCount').val(currentCount);
    	initStockNewsDataSource();
	}
	
	/**
	 * 向上按钮点击事件.
	 */
	function stockNewsUpEvent(){
		currentData = 0;
    	if((Number($('#stockNewsCount').val())-10)>0){
    		currentData = Number($('#stockNewsCount').val())-10;
    	}
    	$('#stockNewsCount').val(currentData);
    	initStockNewsDataSource();
	}
});