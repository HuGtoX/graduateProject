$(function(){
  // 0.自定义滚动条
	$(".content_list").mCustomScrollbar();

	var $audio = $("#aud");
	var player = new Player($audio);
	var progress;
	var voiceProgress;
	var lyric;
  var songlistID = sessionStorage.songlistID;
  
  const host = 'http://119.23.240.101:3200';
  const wyyHost = 'http://119.23.240.101:3000';

  var userID;
  //检测是否登录
  isLogin(initList);
 

	// 1.加载歌曲列表
	getPlayerList(); 
	function getPlayerList(){
		$.ajax({
			url:wyyHost + "/playlist/detail?id=" + songlistID,
			dataType:"json",
			success:function(data){
				data = data.playlist.tracks;
        player.musicList = data;
        
				// 1.1遍历获取到的数据，创建每一条音乐
				var $musicList = $(".content_list ul");
				$.each(data,function(index,ele){
					var $item = musicObj.createMusicItem(index,ele);
					$musicList.append($item);
					musicObj.getMusicUrl(ele);
				});
				initMusicInfo(data[0]);
				initMusicLyric(data[0]);
			},
			error:function(e){
				console.log(e);
			}
		});
	}
  //1.1初始化用户创建的歌单列表
  function initList(data){
    userID = data.data.id;
    $.ajax({
      type:"GET",
      url:host + "/api/list/search?userID=" + userID ,
      dataType:'json',
      success:function(data){
       
        let $addList_ul = $(".addList_ul");
        $.each(data.data,function(index,ele){
          var $item = creatMusicList(index,ele);
          $addList_ul.append($item);
        })
        // initAddMusic();
      },
      error:function(e){
        console.log(e);
      }
    })
    
  }
  //2.0初始化歌单列表事件监听
  function initAddMusic(){
    $(".addList_ul").delegate(".add")
  }
  
	//2.初始化歌曲信息
	function initMusicInfo(music){
		var $musicImage = $(".song_info_pic img");
		var $musicName = $(".song_info_name a");
		var $musicSinger = $(".song_info_singer a");
		var $musicAblum = $(".song_info_ablum a");
		var $musicProgressName = $(".music_progress_name");
		var $musicProgressTime = $(".music_progress_time");
    var $musicBg = $(".mask_bg img");
   

		let time = player.formatDate2(music.dt);

		$musicImage.attr("src",music.al.picUrl);
		$musicName.text(music.name);
		$musicSinger.text(music.ar[0].name);
		$musicAblum.text(music.al.name);
		$musicProgressName.text(music.name + "/" + music.ar[0].name);
		$musicProgressTime.text("00:00/" + time);
		$musicBg.attr("src", music.al.picUrl)
	}

	//3.初始化歌词信息
	function initMusicLyric(music){
		let linkUrl = wyyHost + "/lyric?id=" + music.id;
	
		lyric = new Lyric(linkUrl);
		var $lyricContainer = $(".song_lyric");
		$lyricContainer.html("");
		
		lyric.loadLyric(function(){
			//创建歌词列表
			$.each(lyric.lyrics,function(index,ele){
				var $item = $("<li>"+ ele +"</li>")
				$lyricContainer.append($item);
			});
		})
	}

	initProgress();
	//3.初始化进度条
	function initProgress(){
		var $progressBar = $(".music_progress_bar");
		var $progressLine = $(".music_progress_line");
		var $progressDot = $(".music_progress_dot");
		progress = Progress($progressBar,$progressLine,$progressDot);
		progress.progressClick(function(value){
			player.musicSeekTo(value);
		});
		progress.progressMove(function(value){
			player.musicSeekTo(value);
		});

		var $voiceBar = $(".music_voice_bar");
		var $voiceLine = $(".music_voice_line");
		var $voiceDot = $(".music_voice_dot");
		voiceProgress = Progress($voiceBar,$voiceLine,$voiceDot);
		voiceProgress.progressClick(function(value){
      player.musicVoiceSeekTo(value);
      window.volume = value;
		});
		voiceProgress.progressMove(function(value){
      player.musicVoiceSeekTo(value);
      window.volume = value;
		});
  }
  
  //3.1 歌单列表
  function addList(music){
    
    $(".newList").on('click',function(){  //新建歌单点击事件
      $(".addlist").css({
        display:"block"
      })
    })
    $(".addList_ul").delegate(".add","click",function(){   //自有歌单点击事件
        let $item = $(this).parent(".addLi");
        let listID = $item.get(0).music.id;
        $.ajax({
          type:'GET',
          dataType:'json',
          url:host + "/api/list/addsong?listID=" + listID + "&songID=" + music.id,
          success:function(data){
            console.log(data);
          },
          error:function(e){
            console.log(e);
          }
        })
    })
    $(".addlist .request").on('click',function(){ //新建歌单确定按钮点击事件
      let name = $(".listname").val();
      let img = music.al.picUrl;
      let id = userID;
      $.ajax({
        url:host + "/api/list/create",
        type:"POST",
        data:{
          listname:name,
          userID:id,
          imgUrl:img
        },
        success:function(data){
          window.location.reload(); //歌单创建成功后刷新页面
        },
        error:function(err){
          alert(err.responseJSON.message);
        }
      }) 
    })
    $(".addlist .cancel").on('click',function(){  //歌单创建取消按钮点击事件
      $(".addlist").css({
        display:"none"
      })
    })
  }
	// 4.初始化事件监听
	initEvents();
	function initEvents(){

		//底部播放按钮
		var $musicPlay = $(".music_play").eq(0);

		// 1.监听歌曲的移入移出事件
		$(".content_list").delegate(".list_music","mouseenter",function(){
			// 显示子菜单
			$(this).find(".list_menu").stop().fadeIn(100);
			$(this).find(".list_time a").stop().fadeIn(100);
			// 隐藏时长
			$(this).find(".list_time span").stop().fadeOut(100);
		});

		$(".content_list").delegate(".list_music","mouseleave",function(){
			//隐藏子菜单
			$(this).find(".list_menu").stop().fadeOut(100);
			$(this).find(".list_time a").stop().fadeOut(100);
			//显示时长
			$(this).find(".list_time span").stop().fadeIn(100);
		});
		
		// 2.监听复选框的点击事件
		$(".content_list").delegate(".list_check","click",function(){
			$(this).toggleClass("list_checked");
		})
    
    //2.1添加歌曲到歌单
    $(".content_list").delegate(".musicAdd","click",function(event){
      event.stopPropagation();
      let $item = $(this).parents(".list_music");
      let x =$(this).offset().left + 18;
      let y =$(this).offset().top + 18;
      $(".addList").css({
        display:"block",
        left:x,
        top:y
      })
      addList($item.get(0).music);
    })


		// 3.添加子菜单播放按钮的监听
		$(".content_list").delegate(".list_menu_play","click",function(){
			var $item = $(this).parents(".list_music");
			// 3.1切换播放的图标
			$(this).toggleClass("list_menu_play2");
			// 3.2复原其他的播放图标
			$item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
			// 3.3同步底部播放按钮
			if($(this).attr("class").indexOf("list_menu_play2") != -1){
				// 当前子菜单的播放按钮是播放状态
				$musicPlay.addClass("music_play2");
				// 复原其他序号状态
				$item.siblings().find(".list_number").removeClass("list_number2");
				// 切换序号状态
				$item.find(".list_number").addClass("list_number2");
				//复原其他文字颜色
				$item.siblings().find("div").css("color","rgba(255,255,255,0.5)");
				//让文字高亮
				$item.find("div").css("color","#fff");
			}else{
				// 当前子菜单的播放按钮不是播放状态
				$musicPlay.removeClass("music_play2");
				// 恢复序号状态
				$item.find(".list_number").removeClass("list_number2");
				//复原文字颜色
				$item.find("div").css("color","rgba(255,255,255,0.5)");
			}


			// 3.5播放音乐
			
			player.playMusic($item.get(0).index,$item.get(0).music);

			//切换歌曲信息
			initMusicInfo($item.get(0).music);
			//切换歌词信息
			initMusicLyric($item.get(0).music);
		});
		// 4.监听底部控制区域播放按钮的点击
		$musicPlay.click(function(){
			//判断有没有播放过音乐
			
			if(player.currentIndex == -1){
				//没有播放过音乐
				$(".list_music").eq(0).find(".list_menu_play").trigger("click");
			}else{
				//已经播放过音乐
				$(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
			}
		});
		// 5.监听底部控制区域上一首按钮的点击
		$(".music_pre").click(function(){
			$(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
		});
		// 6.监听底部控制区域下一首按钮的点击
		$(".music_next").click(function(){
			$(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
		});

		// 7.监听删除按钮的点击
		$(".content_list").delegate(".list_menu_del","click",function(){
			//找到被点击的按钮
			var $item = $(this).parents(".list_music");

			//判断当前删除的是否是正在播放的
			if($item.get(0).index == player.currentIndex){
				$(".music_next").trigger("click");
			}
			$item.remove();
			player.changeMusic($item.get(0).index);

			//重新排序
			$(".list_music").each(function(index,ele){
				ele.index = index;
				$(ele).find(".list_number").text(index + 1);
			})	
		});

		//8.监听播放的进度
		player.musicTimeUpdate(function(currentTime,duration,timeStr){
			//同步时间
			$(".music_progress_time").text(timeStr);
			//同步进度条
			//计算播放比例
			var value = currentTime / duration * 100;
			progress.setProgress(value);

			//实现歌词同步
			var index = lyric.currentTime(currentTime);
			var $item = $(".song_lyric li").eq(index);
			
			//当前歌词高亮
			$item.addClass("cur");
			$item.siblings().removeClass("cur");

			if(index <=2) return;
			$(".song_lyric").css({
				marginTop:(-index + 2)*30
			});
		});
    
    //8.1监听歌曲播放完毕
    player.musicEnded(function(mode){
      
			// 3.2复原其他的播放图标
      $(".list_menu_play").removeClass("list_menu_play2");

			// 复原其他序号状态
      $(".list_number").removeClass("list_number2");
				// 切换序号状态

			//复原其他文字颜色
			$(".list_music").find("div").css("color","rgba(255,255,255,0.5)");

      if(mode == "loop"){
        //$(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
        // $(".music_next").trigger('click');
        // $(".music_pre").trigger('click');
        $(".music_play").trigger('click');
      }
      else if(mode == "order"){
        $(".music_next").trigger('click');
      }
      else{
        player.currentIndex = Math.round(Math.random()*(player.musicList.length - 1));
        $(".music_next").trigger('click');
      }
      
    })
		//9.监听声音按钮的点击
		$(".music_voice_icon").click(function(){
			$(this).toggleClass("music_voice_icon2");
			if($(this).attr("class").indexOf("music_voice_icon2") != -1){
				//变为没声音
				player.musicVoiceSeekTo(0);
			}else{
				player.musicVoiceSeekTo(volume);
			}  	 	
    });
    
    //9.1监听播放模式
    $(".mode_change").on('click',function(){
      let count = 0;
      if($(this).hasClass("music_mode")){
        $(this).removeClass("music_mode").addClass("music_mode2");
        player.playMode = "order";
      }
      else if($(this).hasClass("music_mode2")){
        $(this).removeClass("music_mode2").addClass("music_mode3");
        player.playMode = "other";
      }else{
        $(this).removeClass("music_mode3").addClass("music_mode");
        player.playMode = "loop";
      }
      
    })
  }
  //定义一个方法创建一条歌单
  function creatMusicList(index,list){
    let $item = $("<li class=\"addLi\"><a href=\"#\" class=\"add\">" + list.listname + "</a></li>");
    $item.get(0).index = index;
		$item.get(0).music = list;
		return $item;
  }

	$(document).click(function(){
    $(".addList").css({
      display:"none",
    })
  })

})