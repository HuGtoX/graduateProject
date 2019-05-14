   const host = 'http://127.0.0.1:3100';
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
      });


  function changeLogin(data){
    $("#login").css({
      display:"none"
    })
    $(".nav-box .userInfo").css({
      display:"inline-block"
    })
    // $(".nav-box .userInfo span").text(data.data.username)

   }

   function isLogin(fun){
   
    $.ajax({
      type:'POST',
      url:host + '/users',
      data:{
        authorization:sessionStorage.token
      },
    
      success:function(data){
        changeLogin(data); 
        
        fun(data);
       
      },
      error:function(e){
        console.log(e);
      }
    })
  }

