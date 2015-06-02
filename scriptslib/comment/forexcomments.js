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
		//初始化相应的外汇评论信息
		initForexNewsDataSource();
	}
	
	function  forexNewsDownEvent(){
		currentCount = 0 ;
    	if((Number($('#forexNewsCount').val())+10)>Number($('#forexNewsTotalCount').val())){
    		currentCount = Number($('#forexNewsCount').val());
    	}else{
    		currentCount = Number($('#forexNewsCount').val())+10;
    	}
    	$('#forexNewsCount').val(currentCount);
    	initForexNewsDataSource();
	}
	
	function  forexNewsUpEvent(){
		currentData = 0;
    	if((Number($('#forexNewsCount').val())-10)>0){
    		currentData = Number($('#forexNewsCount').val())-10;
    	}
    	$('#forexNewsCount').val(currentData);
    	initForexNewsDataSource();
	}
	
	function  initForexNewsDataSource(){
		startNum = Number($('#forexNewsCount').val())+0;
		var url = $.serviceAddress()+'comments/todayforex';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
               $('#forexNewsTotalCount').val(map.data.count);	
		       initForexNewsModal(map.data.data);
	        }); 
	}
	
	function  initForexNewsModal(data){
		$('#forexNewsModal').empty();
	    $.each(data,function(i,obj){
	       $('#forexNewsModal').append('<a href="'+obj.linkUrl+'" class="list-group-item" target="view_window">'
	             +'<h5 class="list-group-item-heading"><span class="glyphicon glyphicon-share-alt"></span> '
	             + obj.title+'<span class="label label-primary pull-right">'+obj.pubDate+'</span> </h5>'
				 +'<h6 class="list-group-item-text text-warning">'
				 +$.trim(obj.descriptContext)
				 +'</h6></a>');
	    });
	}
	
	function substringDescripttion(data,keyId){
		 currentLen = 120;
		 if(data.length>currentLen){
		 	var  object = {des:data,keyId:keyId};
		 	array.push(object);
		 	return  data.substring(0,currentLen)+'...';
		 }else{
		 	return data;
		 }
	}
	
	var  array = [];
});