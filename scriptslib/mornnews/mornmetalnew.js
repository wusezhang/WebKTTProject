$(document).ready(function(){
	$(function(){
		bindEvent();
		initModal();
	});
	
	function  bindEvent(){
	    $('#metalNewsBtnDown').bind('click',metalNewsDownEvent);
	    $('#metalNewsBtnUp').bind('click',metalNewsUpEvent);
	}
	
	function  initModal(){
		//初始化贵金属新闻.
		initMetalDataSource();
	}
	
	function  initMetalDataSource(){
		startNum = Number($('#metalNewsCount').val())+0;
		var url = $.serviceAddress()+'morningnews/metalmorningnews';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
            	$('#metalNewsTotalCount').val(map.data.count);
                initMetalNewsModal(map.data.data);
	       }); 
	}
	


	
	function metalNewsDownEvent(){
		currentCount = 0 ;
    	if((Number($('#metalNewsCount').val())+8)>Number($('#metalNewsTotalCount').val())){
    		currentCount = Number($('#metalNewsCount').val());
    	}else{
    		currentCount = Number($('#metalNewsCount').val())+8;
    	}
    	$('#metalNewsCount').val(currentCount);
    	initMetalDataSource();
	}
	
	function metalNewsUpEvent(){
		currentData = 0;
    	if((Number($('#metalNewsCount').val())-8)>0){
    		currentData = Number($('#metalNewsCount').val())-8;
    	}
    	$('#metalNewsCount').val(currentData);
    	initMetalDataSource();
	}
	
	
	function initMetalNewsModal(data){
		$('#metalNewsModal').empty();
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
			+'<span class="label label-warning pull-right">'+obj.pubDate+'</span> </h5>'
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
			+'<span class="label label-warning pull-right">'+obj.pubDate+'</span> </h5>'
			+'<h6 class="text-warning">'+$.trim(obj.descriptContext)+'</h6>'
			+'</div>'
		    +'</div></td></tr>';
		  }
	    });
	    $('#metalNewsModal').append(insertTable);
	}
	
});
