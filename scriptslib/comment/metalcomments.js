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
		//初始化贵金属板块评论.
		initMetalNewsDataSource();
	}
	
	
	
	function  metalNewsDownEvent(){
		currentCount = 0 ;
    	if((Number($('#metalNewsCount').val())+10)>Number($('#metalNewsTotalCount').val())){
    		currentCount = Number($('#metalNewsCount').val());
    	}else{
    		currentCount = Number($('#metalNewsCount').val())+10;
    	}
    	$('#metalNewsCount').val(currentCount);
    	initMetalNewsDataSource();
	}
	
	function  metalNewsUpEvent(){
		currentData = 0;
    	if((Number($('#metalNewsCount').val())-10)>0){
    		currentData = Number($('#metalNewsCount').val())-10;
    	}
    	$('#metalNewsCount').val(currentData);
    	initMetalNewsDataSource();
	}
	
	/**
	 *初始化相应的贵金属板块数据源. 
	 */
	function  initMetalNewsDataSource(){
		startNum = Number($('#metalNewsCount').val())+0;
		var url = $.serviceAddress()+'comments/todaymetal';
		$.commonService(url, 'POST',
            {start:startNum,limit:10}, function(map) {
               $('#metalNewsTotalCount').val(map.data.count);
		       initMetalNewsModal(map.data.data);
	        }); 
	}
	
	/**
	 * 初始化相应的贵金属板块数据模板.
	 */
	function  initMetalNewsModal(data){
		$('#metalNewsModal').empty();
	    $.each(data,function(i,obj){
	       $('#metalNewsModal').append('<a href="'+obj.linkUrl+'" class="list-group-item" target="view_window">'
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