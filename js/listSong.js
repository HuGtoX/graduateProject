$(function(){
  // 0.自定义滚动条
  isLogin();
  $(".content_list").mCustomScrollbar();
  
  function getMusic(){
    let listID = ((window.location.search).slice(1)).split("=")[1];
    console.log(listID);
    $.ajax({

    })
  }

  //定义一个方法创建一条音乐  
  function createMusicItem(index,music){
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
	}
})
