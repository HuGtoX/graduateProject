$(function(){
  const host = 'http://127.0.0.1:3100';
  const wyyHost = 'http://127.0.0.1:3000';
  

  console.log(sessionStorage.token)
  //0.检测是否登录
  // changeLi();
  isLogin(getUserInfo);
  // function isLogin(){

  //   $.ajax({
  //     type:'POST',
  //     url:host + '/users',
  //     data:{
  //       authorization:sessionStorage.token
  //     },
    
  //     success:function(data){
  //        $(".username").text(data.data.username);
  //        //改变登录状态
  //        changeLogin(data);
  //        //获取用户信息
  //        getUserInfo(data.data.id)
  //     },
  //     error:function(e){
  //       console.log(e);
  //     }
  //   })
    
  // }
  
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


  // function changeLi(){
  //   let pathname = document.location.pathname;
  //   switch(pathname){
  //     case '/index.html': $(".nav_li").eq(0).addClass("active"); break;
  //     case '/userInfo.html':$(".nav_li").eq(1).addClass("active"); break;  
  //     default: console.log("rr");
  //   }
  // }
  
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