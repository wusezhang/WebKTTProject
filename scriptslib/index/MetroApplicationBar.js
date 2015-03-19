$(document).ready(function() {

    $(function() {
        initModel();
        bindEvent();
        bindCss();
    });
    function initModel() {
        $(".appbar").applicationBar();
        $("#showBox").hide();
    }

    function bindEvent() {
        $(".etc").bind("click", openInformationContext);
        $("#zckxBtn").bind("click",showZCKXEvent);
        $("#hqxxBtn").bind("click",showHQXXEvent);
        $("#jjzbBtn").bind("click",showJJZBEvent);
    }

    function bindCss(){
        $("#showBox").css("text-align","left");
    }  

    //环球信息展示. 
    function showHQXXEvent(){
       $("#showZCKX").hide(); 
       $("#showSSPM").hide();
       $("#sspmli").removeClass("active");
       $("#zckxli").removeClass("active");
       $("#jjzbli").removeClass("active");
       $("#hqxxli").attr("class","active");
        
    } 
     
    //经济指标展示.
    function showJJZBEvent(){
       $("#showZCKX").hide(); 
       $("#showSSPM").hide();
       $("#sspmli").removeClass("active");
       $("#zckxli").removeClass("active");
       $("#hqxxli").removeClass("active");
       $("#jjzbli").attr("class","active");
    }
    
    //早财快讯展示
    function showZCKXEvent(){
       $("#showZCKX").show(); 
       $("#showSSPM").hide();
       $("#sspmli").removeClass("active");
       $("#hqxxli").removeClass("active");
       $("#jjzbli").removeClass("active");
       $("#zckxli").attr("class","active");
    }
    

    //信息框按钮点击时
    function openInformationContext() {
        if($("#arrowUpButton").attr("src") == "imagelib/iconresource/hardware/2x_web/ic_keyboard_arrow_up_grey600_18dp.png") {
            $("#arrowUpButton").attr("src", "imagelib/iconresource/hardware/2x_web/ic_keyboard_arrow_down_grey600_18dp.png");
            $("#mooningdiv,#usddiv,#sspmdiv,#jjzbdiv").hide();
            $("#showBox").show();
            $('#financeSummaryBtn').click();
        } else if($("#arrowUpButton").attr("src") == "imagelib/iconresource/hardware/2x_web/ic_keyboard_arrow_down_grey600_18dp.png") {
            $("#arrowUpButton").attr("src", "imagelib/iconresource/hardware/2x_web/ic_keyboard_arrow_up_grey600_18dp.png");
            $("#mooningdiv,#usddiv,#sspmdiv,#jjzbdiv").show();
            $("#showBox").hide();
        }
    }

});
