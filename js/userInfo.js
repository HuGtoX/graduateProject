$(function(){
  const host = 'http://119.23.240.101:3200';
  const wyyHost = 'http://127.0.0.1:3000';
  

  console.log(sessionStorage.token)
  //0.检测是否登录
  isLogin(getUserInfo);

  
  $(".nav-inner a").on("click",function(){
    let index = $(this).index();
    $(".nav-inner a").removeClass("active");
    $(this).addClass("active");
    $(".section-main").css({
      display:"none"
    })
    $(".section-main").eq(index).css({
      display:"block"
    })

  })

  
  function getUserInfo(data){
    $(".username").text(data.data.user)
    let id = data.data.id;
    $.ajax({
      type:"GET",
      url:host + "/api/list/search?userID=" + id,
      success:function(data){
        console.log(data);
        let $Mylist = $(".myList"); 
        $.each(data.data,function(index,ele){
          let $item = createlist(index,ele);
          $Mylist.append($item);
        });
      },
      error:function(e){
        console.log(e);
      } 
    })
  }

  $(".myList").delegate(".coverMask","click",function(){
    let $item = $(this).parent('.list-box');
    let listID = $item.get(0).music.id;
    console.log(listID);
    window.location.assign('/listSong.html?listID=' + listID)
   
  })

  function createlist(index,music){
    let $item = $("<div class=\"list-box\">\n" +
    "<div class=\"gd-cover coverMask\">" +
        "<img src=\"" + music.imgUrl + "\" class=\"imgCover\">" +
        "<div class=\"mask\">" +
            "<a href=\"javascript:;\" class=\"play\"></a>"+
        "</div>" +
    "</div>" +
    "<div class=\"name\">" + music.listname + "</div>" +
    "<p class=\"num\">" + music.createdAt + "</p>" + 
  "</div>")
  $item.get(0).index = index;
  $item.get(0).music = music;
  return $item;
  }
})