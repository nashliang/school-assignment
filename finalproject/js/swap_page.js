
function swap_page(target){
	$.ajax({
	    url : "pages/"+target+".html",
	    success : function(result){
	        //alert(result);
	        $("#content").html(""); //clear
			var content=result;
			$("#content").html(content);
	    }
	});

}
