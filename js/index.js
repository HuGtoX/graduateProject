$(function(){

	var play_sm = $(".control-play a").get(0);	//视频控制栏
	var $video = $(".media").eq(0);				// 视频对象
	var video = $(".media").get(0);
	window.m = 0;	//全局属性
	var play_big = $(".play-big")[0];		// 暂停页面
	var play = $(".player")[0];				// 视频页面

	var current_time = $(".current-time")[0]; //span视频播放时间
	var over_time = $(".over-time")[0];		  //span总时间
	var $controls = $(".controls"); //视频控制条

	var player = new Player($video);
  let progress;

  

  console.log(sessionStorage.token)
  //0.检测是否登录
  isLogin();
 

	//1.初始化进度条
	function initMvProgress(){
		var $progressBar = $(".progress");		// 进度条
		var $progressLine = $(".progress-out"); //已播放进度条
		var $progressDot = $(".dot"); //进度条按钮
		

		progress = Progress($progressBar,$progressLine,$progressDot);
		progress.progressClick(function(value){
      
			player.musicSeekTo(value);
		})
		progress.progressMove(function(value){
			player.musicSeekTo(value);
		});

		var $volume_progress = $(".volume-progress");
		var $volume_dot = $(".volumDot");  //音量控制按钮
		var $volumeLine = $(".volume-out");	//当前音量

		var voiceProgress = Progress($volume_progress,$volumeLine,$volume_dot);
		voiceProgress.initVoiceProgress(50);
		voiceProgress.progressClickY(function(value){
			player.musicVoiceSeekTo(value);
		})
		voiceProgress.progressMoveY(function(value){
			player.musicVoiceSeekTo(value);
    });
    
    //3.视频播放时运行
	  player.musicTimeUpdate(function(currentTime,duration,timeStr){
		 	
    current_time.innerHTML = timeStr;

    var value = currentTime / duration * 100;
    progress.setProgress(value);
    })
    let f = true;
    let mv = $(".mv").get(0);
    //4.全屏播放
    $(".full").on('click',function(){
      
      if(f){
        fullScreen(mv);
      }else{
        exitScreen(mv);
      }
      f = !f;
    })
  }
	
	 //2.切换视频页面的图标
	function changeIcon(){  //转换播放器图标
		if(video.paused){
			  play_big.style.display = "block";
			  play_sm.className = "play-sm";
		  }else{
		  	play_big.style.display = "none";
		  	play_sm.className = "pause-sm";
		  }
	}


  function fullScreen(el){  //全屏
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
    };
    return;
  }
  function exitScreen(el){ //退出全屏
    if (document.exitFullscreen) {  
      document.exitFullscreen();  
    }  
    else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    }  
    else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
    else if (document.msExitFullscreen) {  
      document.msExitFullscreen();  
    } 
    if(typeof cfs != "undefined" && cfs) {
      cfs.call(el);
    }
  }

  
 

	//4.当鼠标进入视频界面时显示控制条
	$(".mv").hover(function(){
    var timer = null;
		$(".controls").stop();
    $(".controls").animate({bottom:0},"normal");
	},function(){
    $("body").off('mousemove');
		$(".controls").stop();
		$(".controls").delay(1000).animate({bottom:'-37px'},"slow");
	})
	
	
	//当点击视频播放器外部时，键盘监听失效
	document.onclick = function(){
		window.onkeydown = null;
	}
	//当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。
  $video.on('canplay',function(){
    initMvProgress();
		over_time.innerHTML = player.formatDate2($(".media").get(0).duration*1000);

		play.onclick = function(event){
			player.playMV();
			changeIcon();

			//键盘控制视频属性
			window.onkeydown = function(e){
				var keynum;
				var keychar;
				keynum = window.event ? e.keyCode : e.which;
				keychar = String.fromCharCode(keynum);
				if(keychar==" " || keynum==32){
					player.playMV();
				}
        changeIcon();
			}
			//阻止冒泡
			var event = event || window.event;
			if (event && event.stopPropagation)
			 {
			 	event.stopPropagation();
			 }
			 else
			 {
			 	event.cancelBubble = true;
			 }
		}
		play_sm.onclick = function(){
			player.playMV();
			changeIcon();
		}
  })
		
		
	})



