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

  // 背景色の後に画像が表示されるエフェクト
  //要素の取得とスピードの設定
  var box = $('.js-colorbox'),
    speed = 700;

  //.js-colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($('.color')),
      image = $(this).find('img');
    var counter = 0;

    image.css('opacity', '0');
    color.css('width', '0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          'width': '100%'
        }, speed, function () {
          image.css('opacity', '1');
          $(this).css({
            'left': '0',
            'right': 'auto'
          });
          $(this).animate({
            'width': '0%'
          }, speed);
        });
        counter = 1;
      }
    });
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

  // ローディングアニメーション
  function runLoadingAnimation() {
    const $loading = $(".js-loading-white");
    const $images = $(".js-loading-images");
    const $imgLeft = $(".js-loading-img-left");
    const $imgRight = $(".js-loading-img-right");
    const $title = $(".js-loading-title");
    // トップページでのみアニメーションを実行
    if ($loading.length === 0) {
      return;
    }
    // ローディングアニメーション開始時にスクロール禁止の処理を実行
    $("html, body").css("overflow", "hidden");
    // ローディングアニメーションの処理を実行
    $loading.delay(1000).queue(function (next) {  // 1秒待機
      $title.fadeIn(1000, function () { // フェードイン（1秒） → 「50);」の下にあるnext(); を呼ぶ
        $images.delay(1000).queue(function(next) {  // 1秒待機して$images.queue(...) を登録
          $(this).addClass("appear"); // `.loading__images` に `appear` クラスを追加
          setTimeout(() => {
            $imgLeft.addClass("loaded"); // `.loading__img-left` に `loaded` クラスを追加
            $imgRight.addClass("loaded"); // `.loading__img-right` に `loaded` クラスを追加
            next(); // `$images.queue()` のキューを進める（setTimeout 完了後に呼ぶ）
          }, 50); // 50ミリ秒遅らせる 👉 初期状態（transform: translateY(100%)）をブラウザに認識させてアニメーションが動くようにする 👉 transitionend イベントが発火！
        });
        next(); // next(); を呼んで $loading.queue() の次の処理へ進める
      });
    });

    $(document).on("transitionend", ".js-loading-img-right", function () {
      $loading.addClass("fadeout");
      $images.delay(1000).fadeOut(1000);
    });

    // ローディングアニメーション終了時にスクロール許可の処理を実行
    setTimeout(function () {
      $("html, body").css("overflow", "auto");
    }, 6000);
  }

  runLoadingAnimation();
});
