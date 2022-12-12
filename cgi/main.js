function onChangeRange()
{
	rangeToText();
	sendAngles();
}

function rangeToText()
{
	var j = 0; //シミュレータの配列に角度を入れるためのカウンタ
	for (i=1;i<=6;i++){
		if(i==4)
			continue;

		angle = document.getElementById("J" + i).value;
		angles[j] = angle;
		j++;
		document.getElementById("J" + i + "value").value = angle;
	}
}

function sendAngles()
{
	if(window.location.href.substr(0,4) == "file")
		return;

	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState != 4 || httpReq.status != 200)
			return;

		org = document.getElementById("angles_log").innerHTML;
		document.getElementById("angles_log").innerHTML = httpReq.responseText + "<br />" + org; 
	}
	var url = "/angles.py?angles="
	var j = 0; //シミュレータの配列に角度を入れるためのカウンタ
	for (i=1;i<=6;i++){
		if(i==4)
			continue;
		if(j<=3)
			url += angles[j] + ',';
		if(j==4)
		url += angles[j];
		j++;
	}
	httpReq.open("GET",url,true);
	httpReq.send(null);
}

function numToSlide(obj)
{
	target = obj.id.replace(/value/,"");
	document.getElementById(target).value = obj.value;
	sendAngles();
}

function readAd(){
	if(window.location.href.substr(0,4) == "file")
		return;

	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState != 4 || httpReq.status != 200)
			return;

		vs = httpReq.responseText.split(" ");
		document.getElementById("ch0_value").innerHTML = vs[0];
		document.getElementById("ch1_value").innerHTML = vs[1];
		readAd();
	}
	var url = "/ad.py? + Math.random()"
	httpReq.open("GET",url,true);
	httpReq.send(null);
}

function ev(val)
{
	if(window.location.href.substr(0,4) == "file")
		return;

	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState != 4 || httpReq.status != 200)
			return;

	}
	url = "/ev.py?onoff=" + val;
	httpReq.open("GET",url,true);
	httpReq.send(null);
}

function ev2(val)
{
	if(window.location.href.substr(0,4) == "file")
		return;

	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState != 4 || httpReq.status != 200)
			return;

	}
	url = "/ev2.py?onoff=" + val;
	httpReq.open("GET",url,true);
	httpReq.send(null);
}

function run()
{
	seq = document.getElementById("sequence").value;
	lns = seq.split("\n");

	t = 0;
	for(i=0;i<lns.length;i++){
		as = lns[i].split(",");
		if(as.length < 6)
			continue;

		setTimeout( function(a) { oneStep(a); }, t , as );
		t += parseInt(as[5]);
	}
}

function oneStep(as)
{
	for(k=0;k<5;k++){
		angles[k] = as[k];
	}

	j=0;
	for(k=1;k<=6;k++){
		if(k==4)
			continue;

		document.getElementById("J" + k + "value").value = angles[j++];
	}
	sendAngles();
	(as[6] == "ON")?ev(1):ev(0);
	(as[7] == "ON")?ev2(1):ev2(0);	
}

function init()
{
	readAd();
	drawRobot();
}

/*
function runCode()
{
	document.getElementById("angles_log").innerHTML = "";
	var httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function(){
		if(httpReq.readyState != 4 || httpReq.status != 200)
			return;

		document.getElementById("angles_log").innerHTML += httpReq.responseText;
	}
	httpReq.open("GET","/run.bash",true);
	httpReq.send(null);
}

function stopCode()
{
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET","/stop.bash",false);
	httpReq.send(null);
	document.getElementById("angles_log").innerHTML = "";
}
*/
