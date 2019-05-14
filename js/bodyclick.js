
jQuery(document).ready(function($) {
  var a_idx = 0;
  $("body").click(function(e) {
      var a = new Array("young-Hao", "and", "Lazy-Hua", "16计应2", "前端开发", "爱国", "敬业", "诚信", "友善");
      var $i = $("<span />").text(a[a_idx]);
      a_idx = (a_idx + 1) % a.length;
      var x = e.pageX,
          y = e.pageY;
      $i.css({
          "z-index": 99999999999999999999999999 ,
          "top": y - 20,
          "left": x,
          "position": "absolute",
          "font-weight": "bold",
          "color":"yellow"
          // "color": "#ff6651"
      });
      $("body").append($i);
      $i.animate({
              "top": y - 180,
              "opacity": 0
          },
          1500,
          function() {
              $i.remove();
          });
  });
})