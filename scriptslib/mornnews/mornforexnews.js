$(document).ready(function(){
	$(function(){
		bindEvent();
		initModal();
	});
	
	function  bindEvent(){
	    $('#forexNewsBtnDown').bind('click',forexNewsDownEvent);
	    $('#forexNewsBtnUp').bind('click',forexNewsUpEvent);
	}
	
	function  initModal(){
		 //初始化外汇新闻.
		initForexDataSource();
	}
	
	
	function  initForexDataSource(){
		startNum = Number($('#forexNewsCount').val())+0;
		var url = $.serviceAddress()+'morningnews/forexmorningnews';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
            	$('#forexNewsTotalCount').val(map.data.count);
                initForexNewsModal(map.data.data);
	       }); 
	}
	
	
	

	function  forexNewsDownEvent(){
		currentCount = 0 ;
    	if((Number($('#forexNewsCount').val())+8)>Number($('#forexNewsTotalCount').val())){
    		currentCount = Number($('#forexNewsCount').val());
    	}else{
    		currentCount = Number($('#forexNewsCount').val())+8;
    	}
    	$('#forexNewsCount').val(currentCount);
    	initForexDataSource();
	}
	
	function  forexNewsUpEvent(){
		currentData = 0;
    	if((Number($('#forexNewsCount').val())-8)>0){
    		currentData = Number($('#forexNewsCount').val())-8;
    	}
    	$('#forexNewsCount').val(currentData);
    	initForexDataSource();
	}
	
	function initForexNewsModal(data){
		$('#forexNewsModal').empty();
		var insertTable = '';
		$.each(data,function(i,obj){
		  if(i%2==0){
		  	insertTable = insertTable +'<tr><td><div class="media">'
	        +'<a class="pull-left" href="'+obj.linkUrl+'">'
            +'<img class="media-object maxImageSize img-thumbnail" src='+obj.imageUrl+' alt="'+obj.title+'"></a>'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span>  '
			+obj.title+'</a>'
			+'<span class="label label-info pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td>';
		  }else{
		  	insertTable =insertTable + '<td><div class="media">'
	        +'<a class="pull-left" href="'+obj.linkUrl+'">'
            +'<img class="media-object maxImageSize img-thumbnail" src='+obj.imageUrl+' alt="'+obj.title+'"></a>'
			+'<div class="media-body">'
			+'<h5 class="media-heading"><a href="'+obj.linkUrl
			+'" class="text-info" target="view_window"><span class="glyphicon glyphicon-globe"></span>  '
			+obj.title+'</a>'
			+'<span class="label label-info pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td></tr>';
		  }
	    });
	    $('#forexNewsModal').append(insertTable);
	}
	
});
