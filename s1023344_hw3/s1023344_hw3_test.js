Array.prototype.swap=function(first, second){
   var temp = this[first];
   this[first] = this[second];
   this[second] = temp;
   // array element交換
};

function compareNumbers(a, b) { // <0:ab ; 0:same ; >0:ba  
  return b - a; 
};

function progress(){
	var txt = document.form.txt.value;
	var line = txt.split("\n"); // 每一行內容
	var line_num = line.length; // 共有幾行

	var seq = new Array();
	var Otable = new Array(9);

	for(var i=0;i<9;i++){
		Otable[i] = new Array(9);//9*9 array
		Otable[i] = [0,0,0,0,0,0,0,0,0];
	};
	var m=0;
	for (var i = 0; i<line_num; i++)
	{
	    seq[i] = line[i].split(" "); //seq[i][0]: 實際類別, seq[i][1] : 預測類別
		
		// YOUR CODE START
			//矩陣從00開始故須減一
		var A = seq[i][0]-1;
		var P = seq[i][1]-1
		Otable[A][P]++;//吃進來甚麼就在那格+1(初步轉換矩陣)
		
		if(seq[i][0] > m)m=seq[i][0];

		// YOUR CODE END
	};

	//開始轉換		
	for(var k=0;k<9;k++){
			Otable[k].sort(compareNumbers);// 大到小排列			
	};
	for(var g=1;g<9;g++){
			Otable[g].swap(0,g);//把最大的換到正確的位置
	};
	//轉換結束
	// YOUR CODE START

	var out=document.getElementById('out'); // 結果存在變數out, 用table顯示	
	out.innerHTML="<table style='background-color:#FF0000'><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></table>"; // 顯示結果
	document.body.appendChild(out);//先加入第一列
	//再加入其他列
	var cc=document.getElementById('out'); 
	for(var i=0;i<9;i++){
		cc.innerHTML+="<table><tr><td style='background-color:#FF0000'>"+(i+1)+"</td><td>"+Otable[i][0]+"</td><td>"+Otable[i][1]+"</td><td>"+Otable[i][2]+"</td><td>"+Otable[i][3]+"</td><td>"+Otable[i][4]+"</td><td>"+Otable[i][5]+"</td><td>"+Otable[i][6]+"</td><td>"+Otable[i][7]+"</td><td>"+Otable[i][8]+"</td></tr></table>";
		document.body.appendChild(cc);
	}		
	// YOUR CODE END
	
};