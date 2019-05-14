$(function(){
  isLogin();
	$(".list-box").mCustomScrollbar();
	$(".list").append($("<li>\n" +
							"<span class=\"num\"></span>\n" +
							"<span class=\"songName\"></span>\n" +
							"<span>-</span>\n" +
							"<span class=\"singer\"></span>\n" +
						"</li>"));
	$(".play").click(function(){
		$(this).toggleClass("stop");
		$(".music")[0].play();
	})
	$(".more").click(function(){
		$(".playlist").slideToggle("slow");
	})
	getPlayerlist();
	function getPlayerlist(){
		$.ajax({
			url:"../resoure/musiclist.json",
			dataType:"json",
			success:function(data){
				var $ulList = $(".playlist .list");
				$.each(data,function(index,ele){
					var $item = createMusicItem(index,ele);
					$ulList.append($item);
				})
			},
			error:function(e){
				console.log(e);
			}
		});
	}
	function createMusicItem(index,music){
		var $item = $("<li>\n" +
							"<span class=\"num\">"+ index +"</span>\n" +
							"<span class=\"songName\">"+ music.name +"</span>\n" +
							"<span>-</span>\n" +
							"<span class=\"singer\">"+ music.singer +"</span>\n" +
						"</li>");
		return $item;
	}
})