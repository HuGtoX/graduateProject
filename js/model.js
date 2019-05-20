
   var host = "http://119.23.240.101:3200"
   var wyyHost = "http://119.23.240.101:3000"

  $(".nav-box").load("./model/head.html", function(){
    let pathname = document.location.pathname;
    switch(pathname){
      case '/index.html': $(".nav_li").eq(0).addClass("active"); break;
      case '/userInfo.html':$(".nav_li").eq(1).addClass("active"); break;  
      case '/musicStory.html':$(".nav_li").eq(3).addClass("active"); break;
      default: console.log("rr");
    }
  });
  $(".footer").load("./model/foot.html");
  $(".login").load("./model/login.html",function(){
        window.login(); 
        console.log("kkkk");
  });
  
  //改变登录状态
  function changeLogin(data){
    $("#login").css({
      display:"none"
    })
    $(".nav-box .userInfo").css({
      display:"inline-block"
    })
   }
  //判断是否有用户登录
   function isLogin(fun){
    console.log("test3");
    $.ajax({
      type:'POST',
      url:host + '/users',
      data:{
        authorization:sessionStorage.token
      },
      success:function(data){
        changeLogin(data); 
        //若有回调函数则传回数据并执行
        fun(data);
      },
      error:function(e){
        console.log(e);
      }
    })
  }

  var musicObj = {
    //创建歌曲列表
    createMusicItem:function(index,music,player){
      let time = player.formatDate2(music.dt);
      var $item = $("<li class=\"list_music\">\n"+
          "<div class=\"list_check\"><i></i></div>\n"+
          "<div class=\"list_number\">"+(index+1)+"</div>\n"+
          "<div class=\"list_name\">"+music.name+""+
            "<div class=\"list_menu\">\n"+
              "<a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>	\n"+	
              "<a href=\"javascript:;\" title=\"添加\" class=\"musicAdd\"></a>	\n"+	
              "<a href=\"javascript:;\" title=\"下载\"></a>	\n"+	
              "<a href=\"javascript:;\" title=\"分享\"></a>	\n"+	
            "</div>\n"+
          "</div>\n"+
          "<div class=\"list_singer\">"+music.ar[0].name+"</div>\n"+
          "<div class=\"list_time\">\n"+
            "<span>"+time+"</span>\n"+
            "<a href=\"javascript::\" title=\"删除\" class=\"list_menu_del\"></a>\n"+
          "</div>\n"+
        "</li>");
      $item.get(0).index = index;
      $item.get(0).music = music;
      return $item;
    },
    //初始化事件监听
    initEvents:function(){
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
    });
    },
    //获取音乐播放地址
    getMusicUrl:function(music){
      let linkUrl = wyyHost + "/song/url?id=" + music.id;
      $.ajax({
        url:linkUrl,
        dataType:"json",
        success:function(data){
          var musicUrl = data.data[0].url;
          music.link_url = musicUrl;
        },
        error:function(e){
          console.log(e);
        }
      })
    },


  }