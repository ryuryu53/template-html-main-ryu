
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  
  //ドロワーメニュー
  $(".js-hamburger, .js-sp-nav").click(function () {  // .js-sp-navを追加しXマーク以外がクリックされてもドロワーメニューがfadeOutするようにした
    if($(".js-hamburger").hasClass('is-active')) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-hamburger").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
    }
  });

});
