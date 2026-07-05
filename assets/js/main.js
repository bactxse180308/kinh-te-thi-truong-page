/* ═══════════════════════════════════════════════════════
   KTTT XHCN — main.js
   Progressive enhancement: không có JS/GSAP thì nội dung
   vẫn hiển thị đầy đủ; JS chỉ thêm chuyển động.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- Thanh tiến độ đọc ---------- */
  var bar = document.getElementById('doc-tiendo');
  if (bar) {
    var ticking = false;
    var updateBar = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  /* ---------- Mục lục (overlay) ---------- */
  var NAV = [
    { href: 'index.html',     label: 'Trang chủ',            desc: 'Hero «hai dòng chảy» và lộ trình học.',                    group: 'home' },
    { href: 'khai-niem.html', num: '1', pos: 'Bài 1/8', label: 'Khái niệm',            desc: 'Định nghĩa trọng tâm và hai trụ cột của mô hình.',        group: 'bai' },
    { href: 'nhan-thuc.html', num: '2', pos: 'Bài 2/8', label: 'Quá trình nhận thức',  desc: 'Timeline 6 mốc: từ Đổi mới 1986 đến Đại hội XIII.',       group: 'bai' },
    { href: 'tat-yeu.html',   num: '3', pos: 'Bài 3/8', label: 'Tính tất yếu',         desc: 'Ba lý do khách quan — kèm ví dụ đời sống.',               group: 'bai' },
    { href: 'dac-trung.html', num: '4', pos: 'Bài 4/8', label: 'Năm đặc trưng',        desc: 'Trọng tâm chương + bảng so sánh tương tác.',              group: 'bai' },
    { href: 'the-che.html',   num: '5', pos: 'Bài 5/8', label: 'Thể chế & hoàn thiện', desc: 'Ba tầng khái niệm, 3 lý do, 4 nhóm nội dung.',            group: 'bai' },
    { href: 'vi-du.html',     num: '6', pos: 'Bài 6/8', label: 'Ví dụ thực tế',        desc: 'WTO 2007, kinh tế tư nhân, quỹ bình ổn xăng dầu…',        group: 'bai' },
    { href: 'tong-hop.html',  pos: 'Bài 7/8', label: 'Tổng hợp kiến thức',   desc: 'Một câu nhớ nhanh + bộ số vàng 3·5·3·4.',                  group: 'on' },
    { href: 'quiz.html',      pos: 'Bài 8/8', label: 'Quiz 10 câu',          desc: 'Chấm ngay, giải thích từng đáp án, có bảng điểm.',        group: 'on' },
    { href: 'chatbot.html',   label: 'Trợ giảng hỏi đáp',    desc: 'Hỏi trong phạm vi bài học — chạy ngay trên trình duyệt.',  group: 'on' }
  ];
  var pathName = (location.pathname.split('/').pop() || 'index.html');
  var currentItem = null;
  NAV.forEach(function (it) { if (it.href === pathName) currentItem = it; });

  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.hidden = false;
    if (currentItem && currentItem.pos) {
      var posEl = document.createElement('span');
      posEl.className = 'menu-pos';
      posEl.textContent = '· ' + currentItem.pos;
      menuBtn.appendChild(posEl);
    }

    var starSVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:1rem;height:1rem"><path d="M12 2l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 15.7 6.4 19l1.4-6.2L3 8.5l6.4-.6z"/></svg>';
    function card(it) {
      var cur = it.href === pathName ? ' aria-current="page"' : '';
      var badge = it.num
        ? '<span class="seal sm" aria-hidden="true">' + it.num + '</span>'
        : '<span class="seal sm" aria-hidden="true" style="background:linear-gradient(150deg,#8A6420,#B98A2F)">' + (it.group === 'home' ? starSVG : '✦') + '</span>';
      return '<a class="ml-card" href="' + it.href + '"' + cur + '>' + badge +
        '<span><h3>' + it.label + '</h3><p>' + it.desc + '</p></span></a>';
    }

    var root = document.createElement('div');
    root.className = 'ml-root';
    root.innerHTML =
      '<div class="ml-backdrop" data-close></div>' +
      '<div class="ml-panel" role="dialog" aria-modal="true" aria-label="Mục lục bài học">' +
        '<div class="ml-inner">' +
          '<div class="ml-head">' +
            '<div><h2 class="ml-title"><small>Kinh tế thị trường định hướng XHCN</small>Mục lục</h2>' +
            (currentItem ? '<p class="ml-pos">Bạn đang xem: <b>' + (currentItem.pos ? currentItem.pos + ' — ' : '') + currentItem.label + '</b></p>' : '') +
            '</div>' +
            '<button type="button" class="ml-close" data-close aria-label="Đóng mục lục">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
            '</button>' +
          '</div>' +
          '<p class="ml-label">Bài học theo giáo trình</p>' +
          '<div class="ml-grid">' + NAV.filter(function (i) { return i.group === 'bai'; }).map(card).join('') + '</div>' +
          '<p class="ml-label">Ôn tập & hỗ trợ</p>' +
          '<div class="ml-grid">' + NAV.filter(function (i) { return i.group !== 'bai'; }).map(card).join('') + '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    var panel = root.querySelector('.ml-panel');
    var lastFocus = null;
    var reduceMM = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Trạng thái mở/đóng đổi ĐỒNG BỘ (fade bằng CSS transition) —
       animation chỉ trang trí, không bao giờ chặn thao tác. */
    function openMenu() {
      lastFocus = document.activeElement;
      root.classList.add('open');
      document.body.classList.add('ml-lock');
      menuBtn.setAttribute('aria-expanded', 'true');
      if (typeof gsap !== 'undefined' && !reduceMM.matches) {
        var items = root.querySelectorAll('.ml-card, .ml-label, .ml-head');
        gsap.killTweensOf(items);
        gsap.from(items, {
          autoAlpha: 0, y: 16, duration: 0.5, ease: 'power3.out',
          stagger: 0.04, delay: 0.06, clearProps: 'all', overwrite: true
        });
      }
      (root.querySelector('.ml-card[aria-current="page"]') || root.querySelector('.ml-close')).focus();
    }
    function closeMenu() {
      menuBtn.setAttribute('aria-expanded', 'false');
      root.classList.remove('open');
      document.body.classList.remove('ml-lock');
      if (lastFocus) lastFocus.focus();
    }

    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', openMenu);
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeMenu();
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key !== 'Tab') return;
      var items = panel.querySelectorAll('a[href], button');
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- Accordion (aria-expanded + grid rows CSS) ---------- */
  document.querySelectorAll('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- Bảng so sánh: chế độ soi khác biệt ---------- */
  var cmpBtn = document.getElementById('btn-soi-khac-biet');
  if (cmpBtn) {
    cmpBtn.addEventListener('click', function () {
      var wrap = document.getElementById(cmpBtn.getAttribute('aria-controls'));
      var on = wrap.classList.toggle('compare-focus');
      cmpBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      cmpBtn.querySelector('span').textContent = on
        ? 'Xem đầy đủ hai cột'
        : 'Soi điểm khác biệt của mô hình Việt Nam';
    });
  }

  /* ---------- GSAP ---------- */
  if (typeof gsap === 'undefined') return;          // CDN lỗi → trang tĩnh vẫn ổn
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  var mm = gsap.matchMedia();

  mm.add({
    motionOK: '(prefers-reduced-motion: no-preference)',
    reduce:   '(prefers-reduced-motion: reduce)'
  }, function (ctx) {
    var motionOK = ctx.conditions.motionOK;

    /* ----- Số liệu đếm (mọi chế độ đều ra đúng giá trị cuối) ----- */
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var render = function (v) {
        el.textContent = v.toLocaleString('vi-VN', {
          minimumFractionDigits: dec, maximumFractionDigits: dec
        });
      };
      if (!motionOK || typeof ScrollTrigger === 'undefined') { render(end); return; }
      var obj = { v: 0 };
      render(0);
      gsap.to(obj, {
        v: end, duration: 1.6, ease: 'power2.out',
        onUpdate: function () { render(obj.v); },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });

    if (!motionOK || typeof ScrollTrigger === 'undefined') return; // reduce: dừng ở đây

    /* ----- Reveal khi cuộn (batch, stagger nhẹ) ----- */
    var reveals = gsap.utils.toArray('.reveal');
    if (reveals.length) {
      gsap.set(reveals, { autoAlpha: 0, y: 26 });
      ScrollTrigger.batch(reveals, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, {
            autoAlpha: 1, y: 0, duration: 0.8,
            ease: 'power3.out', stagger: 0.09, overwrite: true
          });
        }
      });
    }

    /* ----- Trục timeline vẽ theo cuộn (trang Nhận thức) ----- */
    var spine = document.querySelector('.tl-spine');
    if (spine) {
      gsap.from(spine, {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.tl',
          start: 'top 78%',
          end: 'bottom 62%',
          scrub: 0.6
        }
      });
      gsap.utils.toArray('.tl-node').forEach(function (node) {
        gsap.from(node, {
          scale: 0.4, autoAlpha: 0, duration: 0.55, ease: 'back.out(2.2)',
          scrollTrigger: { trigger: node, start: 'top 84%', once: true }
        });
      });
    }

    /* ----- Hàng bảng so sánh hiện dần ----- */
    var cmpRows = gsap.utils.toArray('table.compare tbody tr');
    if (cmpRows.length) {
      gsap.set(cmpRows, { autoAlpha: 0, x: -18 });
      ScrollTrigger.batch(cmpRows, {
        start: 'top 90%', once: true,
        onEnter: function (batch) {
          gsap.to(batch, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, overwrite: true });
        }
      });
    }

    ScrollTrigger.refresh();
  });

  /* ---------- Hero trang chủ (nếu có) ---------- */
  var heroArt = document.getElementById('hero-hop-luu');
  if (heroArt) {
    mm.add('(prefers-reduced-motion: no-preference)', function () {
      var draw = heroArt.querySelectorAll('.draw');
      draw.forEach(function (p) {
        var len = p.getTotalLength ? p.getTotalLength() : 600;
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      });
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero .kicker',   { autoAlpha: 0, y: 18, duration: 0.6 }, 0.05)
        .from('.hero h1',        { autoAlpha: 0, y: 34, duration: 0.9 }, 0.15)
        .from('.hero .sub',      { autoAlpha: 0, y: 24, duration: 0.7 }, 0.4)
        .from('.hero-cta .btn',  { autoAlpha: 0, y: 18, duration: 0.55, stagger: 0.09 }, 0.55)
        .to(draw, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut', stagger: 0.18 }, 0.35)
        .from('#hero-hop-luu .node', { scale: 0, transformOrigin: 'center', duration: 0.6, ease: 'back.out(2)', stagger: 0.12 }, 1.15)
        .from('.hero-visual figcaption', { autoAlpha: 0, duration: 0.6 }, 1.5);
    });
  }
})();
