jQuery(function ($) {
  //ドロワーメニュー
  $(".js-hamburger, .js-sp-nav").click(function () {
    if ($(".js-hamburger").hasClass('is-active')) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-hamburger").addClass("is-active");
      $(".js-sp-nav").fadeIn(300);
    }
  });

  // 画面幅のサイズが変わったら
  $(window).on('resize', function () {

    // xマークを三マークにする（.js-hamburgerの要素にクラス名is-activeがあれば削除する）
    $('.js-hamburger').removeClass('is-active');

    // .js-sp-navを閉じる（.js-sp-navが表示されていれば非表示にする）
    $('.js-sp-nav').fadeOut(300);
  });

  // mvスワイパー
  const mv_swiper = new Swiper('.js-mv-swiper', {
    // 以下の項目はグーグルで「swiper オプション」で調べられる
    loop: true,
    effect: 'fade',
    speed: 3000, // スライド（ここではフェイド）が変わるスピード
    allowTouchMove: false, // 3秒(delay: 3000)たつ前にマウスでカチャカチャなぞる(?)ことによって次のスライドへ移るのをさせないようにする（これがないとクリックで自分でスライドできてしまう）
    autoplay: {
      delay: 3000, // 3秒後にスライドが変わっていく
    },
  });

  // campaignスワイパー
  const campaign_swiper = new Swiper('.js-campaign-swiper', {
    slidesPerView: 'auto',
    loop: true,
    speed: 1000,
    spaceBetween: 24,
    // loopedSlides: 4,
    breakpoints: {
      768: {
        spaceBetween: 40
      }
    },
    autoplay: {
      speed: 1000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  // スクロールしながらページトップへ戻るボタン
  let topBtn = $('.js-to-top');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // Contactセクションの右下でボタンが止まる
  $('.js-to-top').hide();
  $(window).on('scroll', function () {
    let documentHeight = $(document).height(); // ドキュメント全体の高さ
    let wHeight = $(window).height(); // ブラウザの表示領域の高さ
    let scrollAmount = $(window).scrollTop(); // スクロールした距離
    let footerHeight = $('.js-footer').innerHeight(); // フッターの高さ(padding含む)
    if (documentHeight - (wHeight + scrollAmount) <= footerHeight) {
      // ページトップへ戻るボタンがフッターの直前に来たら、positionプロパティの値をfixedからabsoluteに変更する
      $('.js-to-top').css({
        position: 'absolute',
        bottom: footerHeight + 16
      });
    } else {
      $('.js-to-top').css({
        position: 'fixed',
        bottom: '16px'
      });
    }
  });
});
