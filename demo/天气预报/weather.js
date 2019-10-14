$(document).ready(function(){
	getIp();
});

function getIp(){
	$.ajax({
		//该url可以从服务器获取我们需要的ip
		url: 'https://bird.ioliu.cn/ip',
		type: 'get',
		//dataType一定要设置为jsonp，因为浏览器有同源策略的限制
		//同源即：协议、域名、端口都要相同
		//如果不相同，则Ajax无法获取服务器返回的结果
		//如果想要获取不同源的数据，可以将dataType设置为jsonp，就可以解决跨域的问题
		dataType: 'jsonp',
		//从url返回一个成功回调函数success，该函数会携带返回结果，将结果以data传入回调函数
		success:function(data){	
			//通过返回结果data获取我们当前位置的ip地址
			var cityip = data.data.ip;
			$("#city").text(cityip);
			//获取到当前位置的ip地址后，将ip地址赋值给cityip
			//调用我们的动态获取天气的函数dynamicGetWeather，将cityip以参数的形式传入
			getWeather(cityip);
			getOtherdayWeather(cityip);
		}
	});
}
var msgToday = [];
function getWeather(cityip){
	$.getJSON('https://free-api.heweather.net/s6/weather/now?location='+cityip+"&key=8d04d175b4f143b4b431fa5b44b97039",function(json){
		console.log(json);
		var weather = json.HeWeather6[0].now;
		console.log(weather);
		$("#tmp").html(weather.tmp+" &#8451");
		$("#city").text(json.HeWeather6[0].basic.location);
		$("#cond_txt").html(weather.cond_txt);
		$("#pic").html("<img src=\"images/"+weather.cond_code+".png\"/>");
		/*$("#wind_dir").html(weather.wind_dir);
		$("#wind_sc").html(weather.wind_sc+" 级");
		$("#hum").html(weather.hum);
		$("#vis").html(weather.vis);*/
		//msgToday.push(weather.tmp+" ℃");
		//msgToday.push(weather.cond_txt);
		msgToday.push(weather.wind_dir);
		msgToday.push(weather.wind_sc+" 级");
		msgToday.push(weather.hum);
		msgToday.push(weather.vis+" 公里");
	});
}
var otherday=new Array();
function getOtherdayWeather(cityip){
	$.getJSON('https://free-api.heweather.net/s6/weather/forecast?location='+cityip+"&key=8d04d175b4f143b4b431fa5b44b97039",function(json){
		console.log(json);
		var weather = json.HeWeather6[0].daily_forecast;
		console.log(weather);
		for(var i=0;i<3;i++){
			var obj = new Object();
			obj.src="images/"+weather[i].cond_code_d+".png";
			obj.deg=weather[i].tmp_min+"℃—"+weather[i].tmp_max+"℃";
			obj.date=weather[i].date;
			otherday.push(obj);
			console.log(otherday[i].src+otherday[i].deg+otherday[i].date);
		}
	});
	console.log("otherday:  "+otherday);
	var otherdayweather = new Vue({
		el:"#otherday",
		data:{
			otherday
		}
	})
}

var today = new Vue({
	el: "#Today",
	data:{
		msgToday,
		title:["风向：","风力：","湿度：","能见度："]
	}
})
