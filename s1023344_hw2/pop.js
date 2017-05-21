
function openNew() {
	//取整個頁面的寬高
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;
    //取可是區的寬高
    var cHeight = document.documentElement.clientHeight;
    var cWidth = document.documentElement.clientWidth;
    //陰影層
    var oMask = document.createElement('div');
    oMask.id = "mask";
    oMask.style.height = sHeight + "px";
    //width用css調
    document.body.appendChild(oMask);
	
    //創建彈出框
    var oLogin = document.createElement("div");
    oLogin.id = "login";
	oLogin.innerHTML = "<form method='post' action='s1023344_HW2.php'><img id='close' src='close.png'><h2>Sign Up</h2><p>Name:<input name = 'name' type = 'text' size = '25' required><p>ID Card:<input name = 'id_card' type = 'text' size = '23' pattern='[A-Z](1|2)[0-9]{8}' placeholder='A#########' required><p>Cell Phone:<input name = 'phone' type = 'text' size = '25' pattern='09[0-9]{8}' placeholder='09########' required><p>Email:<input name = 'email' type = 'text' size = '25' required><p><strong>Age:</strong><label><input name = 'age' type = 'radio' value = '15~20'>15~20</label><label><input name = 'age' type = 'radio' value = '21~30' checked> 21~30</label><label><input name = 'age' type = 'radio' value = '31~40'>31~40</label><label><input name = 'age' type = 'radio' value = '41~50'>41~50</label><label><input name = 'age' type = 'radio' value = '51~'>51~</label><p><strong>How to get this information?</strong> <label><input name = 'ways[]' type = 'checkbox' value = 'network'>Network</label><label><input name = 'ways[]' type = 'checkbox' value = 'tv'>TV</label><label><input name = 'ways[]' type = 'checkbox' value = 'magazine'>Magazine</label><label><input name = 'ways[]' type = 'checkbox' value = 'friend'>Friends</label><p><input type = 'submit' value ='Submit' ><input type = 'reset' value = 'Clear' ></p></form>";  
    document.body.appendChild(oLogin);
	
    //取彈出框寬高：
    var dHeight = oLogin.offsetHeight;
    var dWidth = oLogin.offsetWidth;
    //彈出框在頁面的位置
    oLogin.style.left = (cWidth - dWidth) / 2 + "px";
    oLogin.style.top = (cHeight - dHeight) / 2 + "px";
    //關閉彈出框
    var oClose = document.getElementById("close");//叉叉圖案id
    oClose.onclick = oMask.onclick = function() {  //點旁邊也可關閉
    	document.body.removeChild(oMask);
    	document.body.removeChild(oLogin);
    };
}

window.onload = function() {
	var oBtn = document.getElementById("btnLogin");
	oBtn.onclick = function() {
		openNew();		
	};

};