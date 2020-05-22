//グローバル関数定義
var canvas;
var ctx;
var phaseMenu = 0;
var phaseGame = 1;
var phaseStory = 2;
var phaseDeath = 3;
var phaseClear = 4;
var phase = phaseMenu;
const deathCount = 10;
const clearCount = 9;
var payCount=0;
var newGame=0;
var stage=0;
var pricePaid=0;
var pricePay=0;
var overMoney=0;
var countTime=0;
var currentTime=0;
var leftTime=360;
denom = [5000,1000,500,100,50,10,5,1];
curChar=["U","M","D","C","L","X","V","I"];
curNom=[0,0,0,0,0,0,0,0];
curNomLost=[0,0,0,0,0,0,0,0];
overflow=[0,0,0,0,0,0,0,0];
tooPaid=[0,0,0,0,0,0,0,0];

stage1 = new Image();
stage1.src = "stage1.png";
stage2 = new Image();
stage2.src = "stage2.png";
stage3 = new Image();
stage3.src = "stage3.png";
deck= new Image();
deck.src = "deck.png";



//時限イベント,1/24s=0.042sに一回発動

setInterval(countup, 42);

//メイン関数
onload = function(){
	canvas = document.getElementById('id_canvas');
	ctx = canvas.getContext('2d');
	ctx.strokeStyle="#000000";
	ctx.rect(0,0,600,441);
	ctx.lineWidth=1;
	ctx.stroke();
	if(phase===phaseMenu){
	drawMenu();
	}
	canvas.addEventListener('click',clickfunc,false);
}
//クリックされたとき動く関数
function clickfunc(event){
	var rect = event.target.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	var dif=0;
	switch(phase){
	case phaseMenu:
		drawMenu();
		for(var i=0;i<8;i++){//財布の中身初期化
			curNom[i]=0;
		}
		overMoney=0;//ミス回数初期化
		if(430<x&&x<530&&350<y&&y<370){
			phase = phaseGame;
			leftTime = 360; //leftTime初期化
			payCount=0; //payCount初期化
			drawGame();
		}
		if(430<x&&x<530&&380<y&&y<400&&stage>0){
			phase = phaseStory;
			drawStory();
		}
		break;
	case phaseGame:
		//貨幣ボタンを押したとき
		for(var i=0; i<4; i++){
			for(var j=0; j<2; j++){
				if((50+120*i)<x&&x<(150+120*i)&&(300+80*j)<y&&y<(330+80*j)){
					if(curNom[i*2+j]>0){
						curNom[i*2+j]--;
						curNomLost[i*2+j]++;
						pricePaid += denom[i*2+j];
					}else if(curNom[i*2+j]===0&&curNomLost[i*2+j]>0){
						curNom[i*2+j] = curNomLost[i*2+j];
						curNomLost[i*2+j]=0;
						pricePaid -= denom[i*2+j]*curNom[i*2+j];
					}
				}				
			}
		}
		//札束ボタンを押したとき
		if(50<x&&x<270&&180<y&&y<290){
			if(pricePaid<10000){
				pricePaid += 10000;
			}else{
				pricePaid -= 10000;
			}
		}
		//払うボタンを押したとき
		if(530<x&&x<580&&300<y&&y<410){
			if(pricePaid<pricePay){
				window.alert("ERROR: PAYMENT_NOT_ENOUGH");
			}
			else{
				dif= pricePaid-pricePay;
				for(var i=0;i<8;i++){
					curNom[i] += Math.floor(dif/denom[i]);
					if(curNomLost[i]>0&&Math.floor(dif/denom[i])>0){
						overMoney += Math.floor(dif/denom[i]);
						tooPaid[i]++;
					}
					dif = dif-(Math.floor(dif/denom[i]))*denom[i];
					if(i%2===0){
						if(curNom[i]>1){
							overMoney += curNom[i]-1;
							curNom[i] = 1;
							overflow[i]++;
						}
					}else{
						if(curNom[i]>4){
							overMoney += curNom[i]-4;
							curNom[i] = 4;
							overflow[i]++;
						}
					}
					curNomLost[i] = 0; //curNomLostの初期化
				}
				pricePaid = 0;
				newGame=0;
				payCount++;
				if(overMoney > deathCount){
					phase = phaseDeath;
				}else if(payCount>clearCount&&stage===2){
					phase = phaseClear;
				}else if(payCount>clearCount){
					phase = phaseMenu;
					stage++;
				}
				switch(stage){//タイムボーナス加算
				case 0:
					leftTime += 90;
					break;
				case 1:
					leftTime += 80;
					break;
				case 2:
					leftTime += 180;
					break;
				}
				if(leftTime>360){ //leftTimeは360を超えない
					leftTime=360;
				}
			}
		}
		drawGame();
		break;
	case phaseStory:
		drawStory();
		if(430<x&&x<530&&350<y&&y<370){
			phase = phaseMenu;
			drawMenu();
		}
		break;
	case phaseDeath:
		drawDeath();
		leftTime=1350;
		if(430<x&&x<530&&350<y&&y<370){
			phase = phaseMenu;
			drawMenu();
		}
		break;
	case phaseClear:
		drawClear();
	}

}

function refresh(){
	fillRect(0,0,600,441,"#ffffff");
	strokeRect(0,0,600,441);
	return 0;
}

function drawMenu(){
	refresh();
	drawPicture();
	writeText("smart shopping",120,100,50);
	//loadpicture("man_s1.png");
	fillRect(430,350,100,20);
	writeText("Start",460,365,20,"#ffffff");
	if(stage>0){
		fillRect(430,380,100,20);
		writeText("Story",460,395,20,"#ffffff");
	}
	return 0;
}

function drawStory(){
	refresh();
	writeText("Under construction",150,100,50);
	fillRect(430,350,100,20);
	writeText("Return",460,365,20,"#ffffff");
	return 0;
}

function drawClear(){
	refresh();
	writeText("Congratulations!",150,100,50);
	return 0;
}

function drawDeath(){
	refresh();
	fillRect(0,0,600,441);
	writeText("Game over.",300,350,50,"white");
	return 0;
}

function drawGame(){
	refresh();
	if(newGame === 0){
		switch(stage){
		case 0:
			pricePay=randomNum(999,10);
			break;
		case 1:
			pricePay=randomNum(5000,1000);
			break;
		case 2:
			pricePay=randomNum(9999,3000);
			break;
		}
		if(phase===phaseMenu||phase===phaseClear){
			writeText("Cleared!",300,250,50,"red");
		}
		currentTime=countTime;//タイマの初期化
		newGame=1;
	}
	drawPicture();
	strokeRect(50,180,220,110);//10K箱
	ctx.drawImage(deck,100,200,120,60);
	strokeRect(530,300,50,110);//Pay箱
	writeText("Pay",540,360);
	writeText("10000:Infinite",150,280);
	writeText("Price",20,20);
	writeText(pricePay,20,40);
	writeText("Money",100,20);
	writeText(pricePaid, 100,40);
	writeText("Failure",180,20);
	if(overMoney>deathCount){
		writeText(overMoney,180,70,50,"red");
	}else{
		writeText(overMoney,180,40);
	}
	writeText("Success",260,20);
	writeText(payCount,260,40);
	writeText("Stage",340,20);
	writeText(stage,340,40);
	for(var i=0; i<4; i++){
		for(var j=0; j<2; j++){
			writeText(denom[i*2+j],50+120*i,350+80*j);
			strokeRect(50+120*i,300+80*j,100,30);
			if(overflow[i*2+j]!==0&&tooPaid[i*2+j]!==0){
				fillRect(50+120*i,300+80*j,100,30,"purple");
			}else if(overflow[i*2+j]!==0){
				fillRect(50+120*i,300+80*j,100,30,"red");
			}else if(tooPaid[i*2+j]!==0){
				fillRect(50+120*i,300+80*j,100,30,"blue");
			}else{
				fillRect(50+120*i,300+80*j,100,30,"white");
			}
			overflow[i*2+j] = 0;
			tooPaid[i*2+j] = 0;
			for(var k=0;k<curNom[i*2+j];k++){
				writeText(curChar[i*2+j],65+120*i+k*20,320+80*j);
			}
			for(var l=0;l<curNomLost[i*2+j];l++){
				writeText(curChar[i*2+j],65+120*i+k*20+l*20,320+80*j,px=20,color="#ff0000")
			}
		}
	}
	return 0;
}

function strokeRect(sx,sy,dx,dy,color="black",width=1){
	ctx.beginPath();
	ctx.strokeStyle=color;
	ctx.lineWidth=width;
	ctx.rect(sx,sy,dx,dy);
	ctx.stroke();
	return 0;
}

function fillRect(sx,sy,dx,dy,color="black"){
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.rect(sx,sy,dx,dy);
	ctx.fill();
	return 0;
}

function writeText(str,sx,sy,px=20,color="black"){
	var pa= px+"px 'Times New Roman'";
	ctx.beginPath();
	ctx.fillStyle=color;
	ctx.font=pa;
	ctx.fillText(str,sx,sy);
	return 0;
}

function randomNum(max, min){
	var truth = 1;
	while(truth===1){
			var random= Math.floor(Math.pow(10,Math.floor(Math.log(max)/Math.log(10)+1))*Math.random());
			if(min<random&&random<max){
				break;
			}
	}
	return random;
}

function countup(){
	countTime++;
	switch(phase){
	case phaseGame:
		if(leftTime>0){
			switch(stage){
			case 0:
				if((countTime-currentTime)%4===0){//4 in fact
					leftTime--;
				}
				break;
			case 1:
				if((countTime-currentTime)%2===0){
					leftTime--;
				}
				break;
			case 2:
				if((countTime-currentTime)%1===0){
					leftTime--;
				}
				break;
			}
		}else{
			phase = phaseDeath;
		}
		fillRect(20,90,380,40,"white");//描画領域初期化
		if(leftTime>90){
			fillRect(20,90,leftTime,40,"green");
		}else if (leftTime>0){
			fillRect(20,90,leftTime,40,"red");
		}else{
			writeText("Time's up.",30,100);
		}
		break;
	case phaseDeath:
		leftTime++;
		if(leftTime>1400){
			fillRect(430,350,100,20,"#ffffff");
			writeText("Retry?",460,365,20);
		}
		break;
	}
	return 0;
}

function drawPicture(sx=420,sy=20,dx=180,dy=180) {
	switch(stage){
	case 0:
		ctx.drawImage(stage1,sx,sy,dx,dy);
		break;
	case 1:
		ctx.drawImage(stage2,sx,sy,dx,dy);
		break;
	case 2:
		ctx.drawImage(stage3,sx,sy,dx,dy);
		break;
	}
	return 0;
}

//Written by kigisu(@kigisu_qz), 29th Oct. 2018


