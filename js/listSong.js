
$(function(){
  $(".content_list").mCustomScrollbar();
  var $audio = $("#aud");
  let player = new Player($audio);  
  // 0.自定义滚动条
  isLogin(getMusic);
  
  //获取歌单中全部歌曲ID
  function getMusic(data){
    let listID = ((window.location.search).slice(1)).split("=")[1];
    $.ajax({
      url:host + '/api/list/searchsong?listID=' + listID,
      success:function(res){
          let song = res.data;
          getWyyMusic(song);
      },
      error:function(e){
        console.log(e);
      }
    })
  }

  //初始化音乐列表
  function getWyyMusic(data){
    let songArr = [];
    $.each(data,function(i,n){
      songArr.push(n.songID);
    })
    let ids = songArr.join();
    console.log(ids);
    $.ajax({
      url:wyyHost + '/song/detail?ids=' + ids,
      success:function(res){
        data = res.songs;
        player.musicList = data;
        // 1.1遍历获取到的数据，创建每一条音乐
        let $musicList = $(".content_list ul");
        $.each(data,function(index,ele){
          let $item = musicObj.createMusicItem(index,ele,player);
          $musicList.append($item);
          musicObj.getMusicUrl(ele); //获取播放地址
        })
      },
      error:function(e){
        console.log(e);
      }
    })
  }

  //初始化事件监听
  initEvents();
  function initEvents(){
    musicObj.initEvents();//初始化事件监听的封装
  }

})
