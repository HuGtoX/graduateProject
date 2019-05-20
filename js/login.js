(function(window){
  
  // var $loginPage =  //登录页面
  function login(){
   //0.1 注销
   $(".logout").on("click",function(){
    sessionStorage.token = '';
    window.location.reload();
  })

	$("#login a").on('click',function(){
		$(".login").css("display","flex");
    $("body").addClass("bodyStyle");
    console.log("ddddd");
  })
  
  $(".loginMode").on('click',function(){
    $(".registerform").removeClass("show")
    $(".loginform").addClass("show")
  })

  $(".registerMode").on('click',function(){
    $(".loginform").removeClass("show")
    $(".registerform").addClass("show")
  })

	$(".close").on('click',function(){
		$(".login").css("display","none");
		$("body").removeClass("bodyStyle");
  })
  
  //点击注册按钮触发事件
  $('.register_btn').on('click',function(){
      let username = $('.registerform input[name="username"]').val();
      let password = $('.registerform input[name="password"]').val();
      let name = $('.registerform input[name="name"]').val();
      if(username == ''){
        alert('请输入账号')
      }
      else if(password == ''){
        alert('请输入密码')
      }
      else if(name == ''){
        alert('not allow empty')
      }
      else{
        $.ajax({
          type:'POST',
          url:'http://119.23.240.101:3200/users/register',
          dataType:'json',
          data:{
            user:username,
            password:password,
            name:name
          }
          ,
          success:function(data){
            console.log(data);
            alert("注册成功");
            $('.registerform input[name="username"]').val("");
            $('.registerform input[name="password"]').val("");
            $('.registerform input[name="name"]').val("");
          },
          error:function(e){
            alert(e.responseJSON.msg);
            $('.registerform input[name="username"]').val("");
            $('.registerform input[name="password"]').val("");
            $('.registerform input[name="name"]').val("");
          }
        })
      }
      
  })

  // 点击触发登录事件
  $('.login_btn').on('click',function(){
    let username = $('.loginform input[name="username"]').val();
    let password = $('.loginform input[name="password"]').val();

    if(username == ''){
      alert('请输入账号')
    }
    else if(password == ''){
      alert('请输入密码')
    }

    else{
      $.ajax({
        type:'POST',
        url:'http://119.23.240.101:3200/users/login',
        dataType:'json',
        data:{
          user:username,
          password:password,
        }
        ,
        success:function(data){
          console.log(data);
          sessionStorage.token = data.data.token
          window.location.reload()
        },
        error:function(e){
          alert('密码或账号错误');
          console.log(e)
          window.location.reload()
        }
      })
    }
   
})

}
window.login = login;
})(window)