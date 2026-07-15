/* ═══════════════════════════════════════════════════════════════
   dinh.js — Trò "Dựng đình 5 đặc trưng"
   Kéo–thả (Pointer Events, dùng được cả chuột & cảm ứng) hoặc bấm
   chọn cột rồi bấm vào bệ; hỗ trợ bàn phím. Hoạt họa bằng GSAP nếu
   có; không có GSAP / prefers-reduced-motion thì hiện trạng thái cuối.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.getElementById('dinh');
  if (!root) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var motionOK = typeof gsap !== 'undefined' && !reduceMotion;

  /* ---------- Nội dung 5 đặc trưng (theo Bài 4) ---------- */
  var DATA = [
    { n:1, letter:'M', title:'Mục tiêu', hint:'Khác biệt căn bản',
      sub:'Khác biệt căn bản với KTTT tư bản chủ nghĩa',
      content:'Hướng tới phát triển lực lượng sản xuất, xây dựng cơ sở vật chất – kỹ thuật của CNXH; nâng cao đời sống nhân dân, thực hiện «dân giàu, nước mạnh, dân chủ, công bằng, văn minh».',
      vd:'Dùng cơ chế thị trường để kích thích sản xuất, giải phóng sức sản xuất, thúc đẩy công nghiệp hóa – hiện đại hóa.' },
    { n:2, letter:'S', title:'Sở hữu', hint:'Nhiều thành phần',
      sub:'Nhiều hình thức sở hữu, nhiều thành phần kinh tế',
      content:'Kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là một động lực quan trọng; các chủ thể bình đẳng, hợp tác, cạnh tranh cùng phát triển theo pháp luật.',
      vd:'Doanh nghiệp nhà nước chỉ đầu tư vào ngành then chốt — vừa chi phối nền kinh tế, vừa bảo đảm an ninh, quốc phòng.' },
    { n:3, letter:'Q', title:'Quản lý', hint:'Nhà nước pháp quyền',
      sub:'Nhà nước pháp quyền XHCN · Đảng lãnh đạo · dân giám sát',
      content:'Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân, dưới sự lãnh đạo của Đảng; quản lý bằng pháp luật, chiến lược, kế hoạch, quy hoạch, cơ chế, chính sách.',
      vd:'Nhà nước hỗ trợ các nhóm dân cư thu nhập thấp, gặp rủi ro nhằm giảm phân hóa giàu – nghèo.' },
    { n:4, letter:'P', title:'Phân phối', hint:'Nhiều hình thức',
      sub:'Nhiều hình thức phân phối',
      content:'Nhiều hình thức (cả đầu vào & đầu ra); phân phối theo lao động và hiệu quả kinh tế, theo phúc lợi là những hình thức phản ánh định hướng XHCN.',
      vd:'Trả lương theo kết quả lao động; đồng thời hưởng an sinh, phúc lợi xã hội (BHYT, giáo dục công…).' },
    { n:5, letter:'C', title:'Công bằng', hint:'Gắn tăng trưởng',
      sub:'Tiến bộ & công bằng ngay trong từng chính sách',
      content:'Phát triển kinh tế đi đôi với phát triển văn hóa – xã hội; thực hiện tiến bộ và công bằng xã hội ngay trong từng chính sách, chiến lược, quy hoạch — không «hy sinh» công bằng để chạy theo tăng trưởng đơn thuần.',
      vd:'Đầu tư cho giáo dục, y tế, văn hóa, thể thao được coi là đầu tư cho phát triển bền vững.' }
  ];

  /* ---------- Tham chiếu DOM ---------- */
  var colsEl  = document.getElementById('dinh-cols');
  var trayEl  = document.getElementById('dinh-tray');
  var cardsEl = document.getElementById('dinh-cards');
  var roofEl  = document.getElementById('dinh-roof');
  var doneEl  = document.getElementById('dinh-done');
  var numEl   = document.getElementById('dinh-num');
  var barEl   = document.getElementById('dinh-bar');
  var guideEl = document.getElementById('dinh-guide');
  var resetBtn= document.getElementById('dinh-reset');

  var placed = 0;
  var selected = null;      // .piece đang được chọn
  var suppressClick = false;

  /* ---------- Tiện ích ---------- */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esc(s){ var d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

  /* ---------- Dựng sân khấu ---------- */
  function buildStage() {
    placed = 0; selected = null;
    colsEl.innerHTML = '';
    trayEl.innerHTML = '';
    cardsEl.innerHTML = '';
    doneEl.hidden = true;
    roofEl.classList.remove('laid');
    roofEl.classList.add('raised');
    updateProgress();

    // 5 bệ trống
    for (var i = 0; i < 5; i++) {
      var slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.pos = i;
      var drop = document.createElement('button');
      drop.type = 'button';
      drop.className = 'drop breathe';
      drop.setAttribute('aria-label', 'Bệ cột trống thứ ' + (i + 1) + ' — bấm để đặt cột đang chọn');
      drop.innerHTML = '<span class="ghost-n" aria-hidden="true">' + (i + 1) + '</span><span>Đặt cột</span>';
      drop.addEventListener('click', onDropClick);
      slot.appendChild(drop);
      colsEl.appendChild(slot);
    }

    // 5 cột trong khay (xáo trộn)
    shuffle(DATA).forEach(function (item) {
      var p = document.createElement('button');
      p.type = 'button';
      p.className = 'piece';
      p.dataset.n = item.n;
      p.setAttribute('aria-label', 'Cột ' + item.title + ' — ' + item.sub + '. Bấm để chọn, hoặc kéo vào bệ.');
      p.innerHTML =
        '<span class="pc-seal" aria-hidden="true">' + item.n + '</span>' +
        '<span><span class="pc-title">' + esc(item.title) + '</span>' +
        '<span class="pc-hint">' + esc(item.hint) + '</span></span>';
      p.addEventListener('pointerdown', onPointerDown);
      p.addEventListener('click', onPieceClick);
      trayEl.appendChild(p);
    });
  }

  function itemOf(piece){ return DATA[+piece.dataset.n - 1]; }

  /* ---------- Chọn cột ---------- */
  function selectPiece(piece) {
    if (selected === piece) return;
    if (selected) selected.classList.remove('selected');
    selected = piece;
    piece.classList.add('selected');
    setGuide('Đã chọn «' + itemOf(piece).title + '». Bấm vào một bệ trống để đặt cột.');
  }
  function clearSelect() {
    if (selected) selected.classList.remove('selected');
    selected = null;
  }

  function onPieceClick(e) {
    var piece = e.currentTarget;
    if (suppressClick) { suppressClick = false; return; }   // vừa kéo xong → bỏ qua
    if (selected === piece) { placeInNextEmpty(piece); return; } // bấm lần 2 → tự đặt
    selectPiece(piece);
  }

  function onDropClick(e) {
    var slot = e.currentTarget.closest('.slot');
    if (slot.classList.contains('filled')) return;
    if (selected) { placePiece(selected, slot); }
    else { pulseTray(); setGuide('Hãy bấm chọn một cột ở khay trước, rồi bấm vào bệ.'); }
  }

  function placeInNextEmpty(piece) {
    var slot = colsEl.querySelector('.slot:not(.filled)');
    if (slot) placePiece(piece, slot);
  }

  /* ---------- Đặt cột vào bệ ---------- */
  function placePiece(piece, slot) {
    if (!piece || !slot || slot.classList.contains('filled')) return;
    var item = itemOf(piece);

    slot.classList.add('filled');
    if (selected === piece) clearSelect();
    piece.remove();   // rời khay hẳn để khay có thể "trống"

    var pillar = document.createElement('div');
    pillar.className = 'pillar';
    pillar.innerHTML =
      '<span class="shine" aria-hidden="true"></span>' +
      '<span class="p-seal" aria-hidden="true">' + item.n + '</span>' +
      '<span class="p-title">' + esc(item.title) + '</span>' +
      '<span class="p-letter" aria-hidden="true">' + item.letter + '</span>';
    slot.appendChild(pillar);
    slot.setAttribute('aria-label', 'Cột ' + item.title + ' đã dựng');

    addCard(item);
    placed++;
    updateProgress();
    risePillar(pillar);

    if (placed >= 5) complete();
    else setGuide('Tốt! Còn ' + (5 - placed) + ' cột nữa để lợp mái.');
  }

  function addCard(item) {
    var c = document.createElement('article');
    c.className = 'dc';
    c.innerHTML =
      '<div class="dc-head"><span class="seal sm" aria-hidden="true">' + item.n + '</span>' +
      '<h3>' + esc(item.title) + '<span class="dc-sub">' + esc(item.sub) + '</span></h3></div>' +
      '<p>' + esc(item.content) + '</p>' +
      '<p class="dc-vd"><b>Ví dụ:</b> ' + esc(item.vd) + '</p>';
    cardsEl.appendChild(c);
    if (motionOK) gsap.from(c, { autoAlpha: 0, y: 18, duration: 0.5, ease: 'power2.out' });
  }

  function updateProgress() {
    numEl.textContent = placed;
    barEl.style.width = (placed / 5 * 100) + '%';
  }

  /* ---------- Hoạt họa ---------- */
  function risePillar(pillar) {
    if (!motionOK) return;
    gsap.from(pillar, { scaleY: 0, duration: 0.5, ease: 'back.out(1.4)', transformOrigin: '50% 100%' });
    gsap.from(pillar.querySelectorAll('.p-seal, .p-title, .p-letter'),
      { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.06, delay: 0.18, ease: 'power2.out' });
  }

  function complete() {
    setGuide('Hoàn thành! Ngôi đình 5 đặc trưng đã dựng xong.');
    roofEl.classList.remove('raised');
    roofEl.classList.add('laid');

    doneEl.hidden = false;
    if (motionOK) {
      gsap.from(doneEl, { autoAlpha: 0, y: 22, duration: 0.6, delay: 0.35, ease: 'power2.out' });
      gsap.from(doneEl.querySelector('.done-seal'),
        { scale: 0, rotate: -35, duration: 0.55, delay: 0.5, ease: 'back.out(2)' });
      goldFlakes();
    }
    // đưa bảng hoàn thành vào tầm nhìn
    setTimeout(function () {
      doneEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }, 500);
  }

  function goldFlakes() {
    var N = 28;
    for (var i = 0; i < N; i++) {
      var f = document.createElement('span');
      f.className = 'flake';
      var x = Math.random() * window.innerWidth;
      f.style.left = x + 'px';
      f.style.opacity = (0.5 + Math.random() * 0.5).toString();
      if (Math.random() < 0.5) f.style.borderRadius = '50%';
      document.body.appendChild(f);
      (function (el) {
        gsap.fromTo(el,
          { y: -30, rotation: Math.random() * 180 },
          { y: window.innerHeight + 40, rotation: '+=' + (180 + Math.random() * 360),
            x: (Math.random() - 0.5) * 120,
            duration: 1.8 + Math.random() * 1.8, ease: 'power1.in',
            delay: Math.random() * 0.5,
            onComplete: function () { el.remove(); } });
      })(f);
    }
  }

  function pulseTray() {
    if (!motionOK) return;
    gsap.fromTo(trayEl, { x: -4 }, { x: 4, duration: 0.08, repeat: 3, yoyo: true, clearProps: 'x' });
  }

  function setGuide(msg) {
    if (!guideEl) return;
    guideEl.innerHTML = '<span class="dot" aria-hidden="true"></span>' + esc(msg);
  }

  /* ---------- Kéo–thả bằng Pointer Events ---------- */
  var drag = null;   // {piece, active, offX, offY, startX, startY}

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return;   // chỉ nút trái / chạm
    var piece = e.currentTarget;
    var r = piece.getBoundingClientRect();
    drag = { piece: piece, active: false, w: r.width,
             offX: e.clientX - r.left, offY: e.clientY - r.top,
             startX: e.clientX, startY: e.clientY };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
  }

  function beginDragVisual() {
    drag.active = true;
    var p = drag.piece;
    p.classList.add('dragging');
    p.style.width = drag.w + 'px';
  }

  function onPointerMove(e) {
    if (!drag) return;
    if (!drag.active) {
      if (Math.abs(e.clientX - drag.startX) < 6 && Math.abs(e.clientY - drag.startY) < 6) return;
      beginDragVisual();
    }
    drag.piece.style.left = (e.clientX - drag.offX) + 'px';
    drag.piece.style.top  = (e.clientY - drag.offY) + 'px';
    highlightDrop(e.clientX, e.clientY);
  }

  function onPointerUp(e) {
    window.removeEventListener('pointermove', onPointerMove);
    var d = drag; drag = null;
    if (!d) return;
    clearDropHighlight();
    if (!d.active) return;               // không kéo → để 'click' xử lý chọn
    suppressClick = true;                // vừa kéo → chặn click kế tiếp
    var slot = dropUnder(e.clientX, e.clientY);
    resetPieceStyle(d.piece);
    if (slot) placePiece(d.piece, slot);
  }

  function resetPieceStyle(p) {
    p.classList.remove('dragging');
    p.style.left = p.style.top = p.style.width = '';
  }

  function emptyDrops() {
    return Array.prototype.slice.call(colsEl.querySelectorAll('.slot:not(.filled) .drop'));
  }
  function dropUnder(x, y) {
    var found = null;
    emptyDrops().forEach(function (d) {
      var r = d.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) found = d.closest('.slot');
    });
    return found;
  }
  function highlightDrop(x, y) {
    emptyDrops().forEach(function (d) {
      var r = d.getBoundingClientRect();
      var over = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      d.classList.toggle('over', over);
    });
  }
  function clearDropHighlight() {
    colsEl.querySelectorAll('.drop.over').forEach(function (d) { d.classList.remove('over'); });
  }

  /* ---------- Khởi động ---------- */
  resetBtn.addEventListener('click', function () {
    buildStage();
    setGuide('Đã làm lại — kéo hoặc bấm chọn cột để dựng đình.');
  });

  buildStage();
})();
