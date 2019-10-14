	$(document).ready(function(){
		getQuote();	//调用随机名言函数，使一开始就能出现随机名言
		var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
		changeColor(colors);
		//点击事件
		$("#newQuote").click(function(){
			$(".quote").css("opacity",0);
			$(".author").css("opacity",0);
			getQuote();
			changeColor(colors);
		});

		var quote = "",author = "";
		function getQuote(){
			//使用“一言”API获取随机名言
			$.getJSON("https://v1.hitokoto.cn/?encode=json",function(json){
				quote = json["hitokoto"];
				author = json["from"];
				if(quote == ""){
					quote="文字还没来。";
					author="无名";
				}
				$(".quote").text("\""+quote);
				$(".author").text("--"+author);
				$(".quote").animate({
					opacity:1
				},1000);
				$(".author").animate({
					opacity:1
				},1000);
				console.log(json);
			});
		}
		function changeColor(colors){
			var num = Math.floor(Math.random()*10);
			$("body").css("background",colors[num]);
			$(".quote").css("color",colors[num]);
			$(".author").css("color",colors[num]);
			$(".btn").css("background",colors[num]);
			console.log(colors[num]);
		}
		//分享到微博，需要注册开放平台keys
		$("#weibo").click(function(){
			window.location.href="https://weibo.com/u/3602849253/home?wvr=5";
		});
		$("#qq").click(function(){
			var words=$(".quote").text();
			var url="https://codepen.io/hezag/pen/ZGxOLX";
			console.log(words);
			var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
		     _shareUrl += 'url=' + encodeURIComponent(url);   //参数url设置分享的内容链接|默认当前页location
		     _shareUrl += '&showcount=' + 0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
		     _shareUrl += '&desc=' + encodeURIComponent(words);    //参数desc设置分享的描述，可选参数
		     _shareUrl += '&summary=' + encodeURIComponent(words);    //参数summary设置分享摘要，可选参数
		     _shareUrl += '&title=' + encodeURIComponent("名言");    //参数title设置分享标题，可选参数
		     _shareUrl += '&site=' + encodeURIComponent('');   //参数site设置分享来源，可选参数
		     _shareUrl += '&pics=' + encodeURIComponent();   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
		     window.open(_shareUrl,'_blank');
		});
	});