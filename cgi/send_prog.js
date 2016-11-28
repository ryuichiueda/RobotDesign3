function getLog()
{
        document.getElementById("angles_log").innerHTML = "";
        var httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function(){
                if(httpReq.readyState != 4 || httpReq.status != 200)
                        return;

/*
                old = document.getElementById("angles_log").innerHTML;
		n_old = old.match(/\r/g);
                new = httpReq.responseText;
		n_new = new.match(/\r/g);
*/
                document.getElementById("angles_log").innerHTML = httpReq.responseText;

		var scrollHeight = document.getElementById("angles_log").scrollHeight;
		document.getElementById("angles_log").scrollTop = scrollHeight;
        }
        httpReq.open("GET","/log.bash",true);
        httpReq.send(null);
}

function runCode()
{
	logreload = setInterval(getLog,1000);
        document.getElementById("angles_log").innerHTML = "";
        var httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function(){
                if(httpReq.readyState != 4 || httpReq.status != 200)
                        return;
		clearInterval(logreload);
                document.getElementById("angles_log").innerHTML = httpReq.responseText;
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

