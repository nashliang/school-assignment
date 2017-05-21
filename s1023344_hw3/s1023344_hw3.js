Array.prototype.swap=function(first, second){
   var temp = this[first];
   this[first] = this[second];
   this[second] = temp;
   // array element交換
};

Array.prototype.max=function(first, second){
	var max = this[0];
	var t=0;
	for(var i=1;i<this.length;i++){
		if(this[i]>max){
			max = this[i];
			t = i;   
		} 
	}
	return t;  //回傳那列第幾個值最大((直行橫列
}

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
	for(var k=0;k<m;k++){
			var C = Otable[k].max();// 那一列哪個最大，0開始	
			if(C!=k){
				for(var j=0;j<m;j++){
					Otable[j].swap(C,k);  //搬運整行((直行橫列
				}
			}		
	};
	//開始輸出表格
	//上面第一列
	var out = "<table><tr>";
	out += "<td>"+"&nbsp&nbsp"+"</td>";
	for(var i=1;i<=m;i++)
	{
		out += "<td>"+ i +"</td>";
	};
	out += "</tr></table>";
	//下面其他列	
	for(var i=0;i<m;i++)
	{
		out += "<table><tr><td>"+(i+1)+"</td>";
		for(var k=0;k<=(m-1);k++)
		{
			out += "<td>"+Otable[i][k]+"</td>";
		};	
		out+= "</tr></table>";		
	};

	document.getElementById('out').innerHTML=out;
};


