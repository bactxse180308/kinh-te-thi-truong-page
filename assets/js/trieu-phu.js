/* ═══════════════════════════════════════════════════════
   KTTT XHCN — trieu-phu.js
   Game «Ai là triệu phú» · 15 câu · thang tiền chuẩn VN
   Trợ giúp: 50:50 + Gọi điện người thân
   Câu hỏi bám sát Giáo trình Kinh tế chính trị Mác – Lênin · Chương 5
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ---------- Ngân hàng câu hỏi (correct = chỉ số đáp án đúng trong options) ---------- */
  var BANK = [
    /* ===== DỄ ===== */
    { muc: 'de', correct: 0,
      q: 'Kinh tế thị trường định hướng XHCN vận hành chủ yếu theo cái gì?',
      options: ['Theo các quy luật của thị trường', 'Theo mệnh lệnh hành chính của Nhà nước', 'Theo kế hoạch pháp lệnh tập trung', 'Theo quyết định của doanh nghiệp lớn'] },
    { muc: 'de', correct: 0,
      q: 'Định hướng XHCN hướng tới xây dựng một xã hội có hệ giá trị nào?',
      options: ['Dân giàu, nước mạnh, dân chủ, công bằng, văn minh', 'Tự do, bình đẳng, bác ái', 'Công nghiệp hóa, hiện đại hóa, hội nhập', 'Độc lập, tự do, hạnh phúc'] },
    { muc: 'de', correct: 0,
      q: 'Công cuộc Đổi mới ở Việt Nam bắt đầu từ năm nào?',
      options: ['Năm 1986', 'Năm 1975', 'Năm 1991', 'Năm 2001'] },
    { muc: 'de', correct: 0,
      q: 'Mô hình KTTT định hướng XHCN ở Việt Nam có mấy đặc trưng cơ bản?',
      options: ['5 đặc trưng', '3 đặc trưng', '4 đặc trưng', '6 đặc trưng'] },
    { muc: 'de', correct: 0,
      q: 'Thành phần kinh tế nào giữ vai trò chủ đạo trong nền kinh tế?',
      options: ['Kinh tế nhà nước', 'Kinh tế tư nhân', 'Kinh tế tập thể', 'Kinh tế có vốn đầu tư nước ngoài'] },
    { muc: 'de', correct: 0,
      q: 'Việt Nam chính thức trở thành thành viên WTO vào năm nào?',
      options: ['Năm 2007', 'Năm 2005', 'Năm 2006', 'Năm 2010'] },
    { muc: 'de', correct: 0,
      q: 'Theo bài học, khu vực kinh tế tư nhân đóng góp khoảng bao nhiêu % GDP?',
      options: ['Khoảng 50%', 'Khoảng 30%', 'Khoảng 70%', 'Khoảng 90%'] },
    { muc: 'de', correct: 0,
      q: 'Chương 5 nghiên cứu mô hình kinh tế nào của Việt Nam?',
      options: ['Kinh tế thị trường định hướng XHCN', 'Kinh tế kế hoạch hóa tập trung', 'Kinh tế thị trường tự do', 'Kinh tế tự cấp tự túc'] },
    { muc: 'de', correct: 0,
      q: 'Công cụ nào giúp Nhà nước «giảm chấn» khi giá xăng dầu thế giới biến động?',
      options: ['Quỹ bình ổn giá xăng dầu', 'Quỹ dự trữ ngoại hối', 'Quỹ bảo hiểm xã hội', 'Quỹ đầu tư phát triển'] },
    { muc: 'de', correct: 0,
      q: 'Nhà nước điều tiết nền kinh tế dưới sự lãnh đạo của tổ chức nào?',
      options: ['Đảng Cộng sản Việt Nam', 'Quốc hội', 'Chính phủ', 'Mặt trận Tổ quốc Việt Nam'] },

    /* ===== VỪA ===== */
    { muc: 'vua', correct: 0,
      q: 'Đại hội nào khẳng định KTTT định hướng XHCN là mô hình kinh tế tổng quát?',
      options: ['Đại hội IX', 'Đại hội VI', 'Đại hội XI', 'Đại hội VIII'] },
    { muc: 'vua', correct: 0,
      q: 'Phát triển KTTT định hướng XHCN ở Việt Nam xuất phát từ mấy lý do khách quan?',
      options: ['3 lý do', '2 lý do', '4 lý do', '5 lý do'] },
    { muc: 'vua', correct: 0,
      q: 'Nội dung hoàn thiện thể chế KTTT định hướng XHCN gồm mấy nhóm chính?',
      options: ['4 nhóm', '2 nhóm', '3 nhóm', '6 nhóm'] },
    { muc: 'vua', correct: 0,
      q: 'Đại hội XI (2011) khẳng định nền kinh tế nước ta là nền kinh tế hàng hóa thế nào?',
      options: ['Nhiều thành phần', 'Chỉ một thành phần duy nhất', 'Chỉ có kinh tế nhà nước', 'Chỉ có kinh tế tư nhân'] },
    { muc: 'vua', correct: 0,
      q: 'Trong mô hình, kinh tế tư nhân được xác định là gì?',
      options: ['Một động lực quan trọng', 'Thành phần giữ vai trò chủ đạo', 'Thành phần bị hạn chế phát triển', 'Thành phần không được thừa nhận'] },
    { muc: 'vua', correct: 0,
      q: 'Về mục tiêu, KTTT định hướng XHCN hướng tới điều gì?',
      options: ['Phát triển lực lượng sản xuất, nâng cao đời sống nhân dân', 'Tối đa hóa lợi nhuận cho tư nhân', 'Chỉ tăng trưởng GDP bằng mọi giá', 'Bảo vệ lợi ích nhóm doanh nghiệp'] },
    { muc: 'vua', correct: 0,
      q: 'Vì sao nói kinh tế thị trường có tính ưu việt?',
      options: ['Là phương thức phân bổ nguồn lực hiệu quả', 'Vì luôn bảo đảm công bằng tuyệt đối', 'Vì xóa bỏ mọi cạnh tranh', 'Vì Nhà nước bao cấp toàn bộ'] },
    { muc: 'vua', correct: 0,
      q: 'Đặc trưng thứ năm gắn tăng trưởng kinh tế với điều gì?',
      options: ['Tiến bộ và công bằng xã hội', 'Tối đa hóa lợi nhuận', 'Thu hẹp phúc lợi xã hội', 'Giảm chi cho giáo dục, y tế'] },
    { muc: 'vua', correct: 0,
      q: 'Đại hội XIII (2021) tiếp tục khẳng định KTTT định hướng XHCN là gì?',
      options: ['Mô hình kinh tế tổng quát của thời kỳ quá độ', 'Một giải pháp tình thế ngắn hạn', 'Nền kinh tế kế hoạch hóa', 'Mô hình chỉ áp dụng cho nông nghiệp'] },
    { muc: 'vua', correct: 0,
      q: 'Yếu tố nào KHÔNG thuộc cơ chế vận hành theo quy luật thị trường?',
      options: ['Phân phối bình quân, chia đều', 'Quan hệ cung – cầu', 'Giá cả thị trường', 'Cạnh tranh'] },

    /* ===== KHÓ ===== */
    { muc: 'kho', correct: 0,
      q: 'Nội dung nào KHÔNG phải lý do khách quan phát triển KTTT định hướng XHCN?',
      options: ['Do yêu cầu của các tổ chức kinh tế quốc tế', 'Phù hợp xu hướng phát triển khách quan', 'Tính ưu việt của kinh tế thị trường', 'Phù hợp nguyện vọng của nhân dân'] },
    { muc: 'kho', correct: 0,
      q: 'Quan niệm mới của Đại hội XII (2016) về nền kinh tế là gì?',
      options: ['Vận hành đầy đủ, đồng bộ theo quy luật thị trường', 'Khép kín, tự cấp tự túc', 'Do thị trường hoàn toàn quyết định', 'Chỉ gồm doanh nghiệp nhà nước'] },
    { muc: 'kho', correct: 0,
      q: '«Thể chế» được hiểu là gì?',
      options: ['Quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành', 'Hệ thống các doanh nghiệp', 'Chính sách tiền tệ của ngân hàng trung ương', 'Bộ máy hành chính của Chính phủ'] },
    { muc: 'kho', correct: 0,
      q: 'Chủ thể quản lý nền KTTT định hướng XHCN là gì?',
      options: ['Nhà nước pháp quyền XHCN của dân, do dân, vì dân', 'Các tập đoàn kinh tế lớn', 'Thị trường tự điều tiết hoàn toàn', 'Các tổ chức kinh tế quốc tế'] },
    { muc: 'kho', correct: 0,
      q: 'Hình thức phân phối nào phản ánh rõ định hướng XHCN?',
      options: ['Phân phối theo lao động, hiệu quả và phúc lợi', 'Phân phối bình quân, chia đều', 'Phân phối chỉ theo vốn góp', 'Phân phối chỉ theo giá cả thị trường'] },
    { muc: 'kho', correct: 0,
      q: 'Có mấy lý do phải hoàn thiện thể chế KTTT định hướng XHCN?',
      options: ['3 lý do', '2 lý do', '4 lý do', '5 lý do'] },
    { muc: 'kho', correct: 0,
      q: 'Chủ thể xây dựng và hoàn thiện hệ thống thể chế kinh tế chính thức là ai?',
      options: ['Nhà nước', 'Doanh nghiệp tư nhân', 'Thị trường', 'Các hội nghề nghiệp'] },
    { muc: 'kho', correct: 0,
      q: 'Đâu là một trong các loại thị trường cơ bản cần phát triển đồng bộ?',
      options: ['Thị trường hàng hóa sức lao động', 'Thị trường chợ đen', 'Thị trường hàng cấm', 'Thị trường độc quyền nhóm'] }
  ];

  /* ---------- Thang tiền (chuẩn VN) · milestone = mốc bảo hiểm ---------- */
  var LADDER = [
    { amount: 200000 },   { amount: 400000 },   { amount: 600000 },   { amount: 1000000 },
    { amount: 2000000, milestone: true },
    { amount: 3000000 },  { amount: 6000000 },  { amount: 10000000 }, { amount: 14000000 },
    { amount: 22000000, milestone: true },
    { amount: 30000000 }, { amount: 40000000 }, { amount: 60000000 }, { amount: 85000000 },
    { amount: 150000000, milestone: true }
  ];
  var PER_GAME = 15;
  var LETTERS = ['A', 'B', 'C', 'D'];

  /* ---------- DOM ---------- */
  var elStart   = document.getElementById('alt-start');
  var elGame    = document.getElementById('alt-game');
  var elLadder  = document.getElementById('alt-ladder');
  var elQnum    = document.getElementById('alt-qnum');
  var elQtext   = document.getElementById('alt-qtext');
  var elOpts    = document.getElementById('alt-options');
  var elLock    = document.getElementById('alt-lock');
  var elWalk    = document.getElementById('alt-walk');
  var elFifty   = document.getElementById('alt-fifty');
  var elPhone   = document.getElementById('alt-phone');
  var elLive    = document.getElementById('alt-live');
  var elResult  = document.getElementById('alt-result');
  var elModal   = document.getElementById('alt-modal');
  var elModalBody = document.getElementById('alt-modal-body');
  var btnStart  = document.getElementById('alt-btn-start');
  if (!elStart || !elGame) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';

  /* ---------- Trạng thái ---------- */
  var order = [];          // 15 câu đã chọn cho lượt chơi
  var idx = 0;             // chỉ số câu hiện tại (0..14)
  var selected = -1;       // đáp án đang chọn (index trong options đã xáo)
  var locked = false;      // đã chốt chưa
  var removed = [];        // các đáp án bị 50:50 ẩn
  var life = { fifty: true, phone: true };
  var guaranteed = 0;      // tiền bảo hiểm đã đạt

  /* ---------- Tiện ích ---------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(bank, muc, n) { return shuffle(bank.filter(function (x) { return x.muc === muc; })).slice(0, n); }
  function money(v) { return v.toLocaleString('vi-VN') + ' đ'; }

  // Chuẩn bị 1 câu: xáo vị trí A–D, tính lại chỉ số đáp án đúng
  function prepare(item) {
    var map = shuffle([0, 1, 2, 3]);
    var opts = map.map(function (i) { return item.options[i]; });
    return { q: item.q, options: opts, correct: map.indexOf(item.correct) };
  }

  /* ---------- Bắt đầu ---------- */
  function startGame() {
    var chosen = pick(BANK, 'de', 5).concat(pick(BANK, 'vua', 5)).concat(pick(BANK, 'kho', 5));
    order = chosen.map(prepare);
    idx = 0; guaranteed = 0;
    life = { fifty: true, phone: true };
    elFifty.disabled = false; elFifty.classList.remove('used');
    elPhone.disabled = false; elPhone.classList.remove('used');
    elStart.hidden = true; elResult.hidden = true; elResult.innerHTML = '';
    elGame.hidden = false;
    buildLadder();
    renderQuestion();
    if (!reduceMotion && hasGsap) gsap.from(elGame, { autoAlpha: 0, y: 16, duration: .5, ease: 'power2.out' });
  }

  /* ---------- Thang tiền ---------- */
  function buildLadder() {
    elLadder.innerHTML = '';
    for (var i = LADDER.length - 1; i >= 0; i--) {
      var r = document.createElement('div');
      r.className = 'ladder-rung' + (LADDER[i].milestone ? ' milestone' : '');
      r.dataset.i = i;
      r.innerHTML = '<span class="rn">' + (i + 1) + '</span><span class="rm">' + money(LADDER[i].amount) + '</span>';
      elLadder.appendChild(r);
    }
  }
  function markLadder() {
    var rungs = elLadder.querySelectorAll('.ladder-rung');
    rungs.forEach(function (r) {
      var i = +r.dataset.i;
      r.classList.toggle('current', i === idx);
      r.classList.toggle('passed', i < idx);
    });
  }

  /* ---------- Hiện câu hỏi ---------- */
  function renderQuestion() {
    var item = order[idx];
    selected = -1; locked = false; removed = [];
    elLock.disabled = true;
    elQnum.textContent = 'Câu ' + (idx + 1) + ' · ' + money(LADDER[idx].amount);
    elQtext.textContent = item.q;
    markLadder();

    elOpts.innerHTML = '';
    item.options.forEach(function (text, oi) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'alt-opt';
      b.dataset.oi = oi;
      b.innerHTML = '<span class="lt" aria-hidden="true">' + LETTERS[oi] + '</span><span class="tx">' + text + '</span>';
      b.addEventListener('click', function () { selectOption(oi, b); });
      elOpts.appendChild(b);
    });
    say('Câu ' + (idx + 1) + '. ' + item.q);
    if (!reduceMotion && hasGsap) gsap.from('.alt-opt', { autoAlpha: 0, duration: .3, stagger: .05, ease: 'power2.out', clearProps: 'opacity,visibility,transform' });
  }

  function selectOption(oi, btn) {
    if (locked || removed.indexOf(oi) !== -1) return;
    selected = oi;
    elOpts.querySelectorAll('.alt-opt').forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    elLock.disabled = false;
    if (!reduceMotion && hasGsap) gsap.fromTo(btn, { scale: .98 }, { scale: 1, duration: .25, ease: 'back.out(2.5)' });
  }

  /* ---------- Chốt đáp án ---------- */
  function lockAnswer() {
    if (selected < 0 || locked) return;
    locked = true;
    elLock.disabled = true;
    var item = order[idx];
    var btns = elOpts.querySelectorAll('.alt-opt');
    btns.forEach(function (b) { b.disabled = true; });
    var chosenBtn = btns[selected];
    chosenBtn.classList.remove('selected');
    chosenBtn.classList.add('locked');
    say('Đã chốt đáp án ' + LETTERS[selected] + '. Chờ kết quả…');

    var delay = reduceMotion ? 200 : 1500;
    if (!reduceMotion && hasGsap) gsap.fromTo(chosenBtn, { scale: 1 }, { scale: 1.02, duration: .5, repeat: 1, yoyo: true, ease: 'sine.inOut' });

    setTimeout(function () {
      var right = selected === item.correct;
      btns[item.correct].classList.remove('locked');
      btns[item.correct].classList.add('correct');
      if (!right) chosenBtn.classList.add('wrong');

      if (right) {
        say('Chính xác!');
        if (LADDER[idx].milestone) guaranteed = LADDER[idx].amount;
        if (idx === PER_GAME - 1) { setTimeout(function () { endGame('win'); }, reduceMotion ? 0 : 900); }
        else { setTimeout(function () { idx++; renderQuestion(); }, reduceMotion ? 0 : 1100); }
      } else {
        say('Rất tiếc, đáp án đúng là ' + LETTERS[item.correct] + '.');
        if (!reduceMotion && hasGsap) gsap.fromTo(elGame, { x: 0 }, { x: 8, duration: .07, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' });
        setTimeout(function () { endGame('lose'); }, reduceMotion ? 0 : 1200);
      }
    }, delay);
  }

  /* ---------- Dừng cuộc chơi ---------- */
  function walkAway() {
    if (locked) return;
    endGame('walk');
  }

  /* ---------- Trợ giúp 50:50 ---------- */
  function useFifty() {
    if (!life.fifty || locked) return;
    life.fifty = false;
    elFifty.disabled = true; elFifty.classList.add('used');
    var item = order[idx];
    var wrongs = [];
    for (var i = 0; i < 4; i++) if (i !== item.correct) wrongs.push(i);
    wrongs = shuffle(wrongs);
    removed = [wrongs[0], wrongs[1]]; // giữ đáp án đúng + 1 đáp án sai
    var btns = elOpts.querySelectorAll('.alt-opt');
    removed.forEach(function (oi) {
      btns[oi].classList.add('dimmed');
      btns[oi].disabled = true;
      if (oi === selected) { selected = -1; elLock.disabled = true; btns[oi].classList.remove('selected'); }
    });
    say('Đã dùng 50:50. Còn lại hai đáp án.');
  }

  /* ---------- Trợ giúp Gọi điện người thân ---------- */
  function usePhone() {
    if (!life.phone || locked) return;
    life.phone = false;
    elPhone.disabled = true; elPhone.classList.add('used');
    var item = order[idx];
    // Người thân đúng ~80%; nếu sai thì chọn 1 đáp án khác (không nằm trong nhóm đã bị 50:50 ẩn nếu có)
    var suggest, confident;
    if (Math.random() < 0.8) { suggest = item.correct; confident = Math.random() < 0.55; }
    else {
      var pool = [];
      for (var i = 0; i < 4; i++) if (i !== item.correct && removed.indexOf(i) === -1) pool.push(i);
      suggest = pool.length ? shuffle(pool)[0] : item.correct;
      confident = false;
    }
    var L = LETTERS[suggest];
    var line = confident
      ? 'Câu này mình khá chắc — chọn đáp án <b>' + L + '</b> đi!'
      : 'Mình nghĩ khả năng cao là đáp án <b>' + L + '</b>, nhưng bạn cân nhắc thêm nhé.';
    openModal(
      '<div class="phone-head"><span class="phone-ic" aria-hidden="true">📞</span><b>Gọi điện người thân</b></div>' +
      '<p class="phone-line">' + line + '</p>' +
      '<p class="phone-sub">« ' + stripTags(item.options[suggest]) + ' »</p>'
    );
    say('Người thân gợi ý đáp án ' + L + '.');
  }
  function stripTags(s) { return s.replace(/<[^>]*>/g, ''); }

  /* ---------- Modal ---------- */
  function openModal(html) {
    elModalBody.innerHTML = html;
    elModal.hidden = false;
    if (!reduceMotion && hasGsap) gsap.from('.alt-modal-card', { autoAlpha: 0, y: 20, scale: .96, duration: .35, ease: 'power3.out' });
    var closeBtn = elModal.querySelector('.alt-modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() { elModal.hidden = true; }

  /* ---------- Kết thúc ---------- */
  function endGame(kind) {
    var won, verdict, sub, cls;
    if (kind === 'win') {
      won = LADDER[PER_GAME - 1].amount;
      verdict = 'Xuất sắc — Nhà triệu phú!'; cls = 'win';
      sub = 'Bạn đã trả lời đúng cả 15 câu và chinh phục ' + money(won) + '. Kiến thức Chương 5 quá vững!';
      if (!reduceMotion) burst(120);
    } else if (kind === 'walk') {
      won = idx === 0 ? 0 : LADDER[idx - 1].amount;
      verdict = 'Bạn đã dừng cuộc chơi'; cls = 'walk';
      sub = 'Dừng ở câu ' + (idx + 1) + ', bạn mang về ' + money(won) + '. Quyết định an toàn!';
    } else { // lose
      won = guaranteed;
      verdict = 'Rất tiếc, chưa đúng!'; cls = 'lose';
      sub = 'Bạn dừng ở câu ' + (idx + 1) + '. Nhờ mốc bảo hiểm, bạn mang về ' + money(won) + '.';
    }
    elGame.hidden = true;
    elResult.hidden = false;
    elResult.innerHTML =
      '<div class="alt-endcard ' + cls + '" role="status">' +
        '<span class="end-seal" aria-hidden="true">' + (kind === 'win' ? '★' : (kind === 'walk' ? '✓' : '!')) + '</span>' +
        '<h2>' + verdict + '</h2>' +
        '<p class="end-money">' + money(won) + '</p>' +
        '<p class="end-sub">' + sub + '</p>' +
        '<div class="end-cta">' +
          '<button class="btn btn-gold" id="alt-again">Chơi lại</button>' +
          '<a class="btn btn-ghost" href="tong-hop.html">Ôn lại tổng hợp</a>' +
        '</div>' +
      '</div>';
    document.getElementById('alt-again').addEventListener('click', startGame);
    say('Kết thúc. ' + verdict + ' Bạn mang về ' + money(won) + '.');
    if (!reduceMotion && hasGsap) gsap.from('.alt-endcard', { autoAlpha: 0, y: 28, scale: .96, duration: .55, ease: 'power3.out' });
    elResult.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  function say(msg) { if (elLive) elLive.textContent = msg; }

  /* ---------- Gắn sự kiện ---------- */
  btnStart.addEventListener('click', startGame);
  elLock.addEventListener('click', lockAnswer);
  elWalk.addEventListener('click', walkAway);
  elFifty.addEventListener('click', useFifty);
  elPhone.addEventListener('click', usePhone);
  elModal.addEventListener('click', function (e) {
    if (e.target === elModal || e.target.classList.contains('alt-modal-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !elModal.hidden) closeModal(); });

  /* ---------- Pháo giấy đỏ–vàng (dùng lại từ quiz.js) ---------- */
  var canvas = document.getElementById('confetti');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var bits = [], rafId = null;
  function sizeCanvas() { if (!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);
  function burst(n) {
    if (!ctx || reduceMotion) return;
    var colors = ['#D6452E', '#E3B84C', '#F2D488', '#A61B1B', '#F5EBD8'];
    for (var i = 0; i < n; i++) {
      bits.push({
        x: canvas.width / 2, y: canvas.height * 0.34,
        vx: (Math.random() - .5) * 14, vy: (Math.random() - 1.05) * 12,
        g: .32, s: Math.random() * 6 + 3, r: Math.random() * Math.PI,
        vr: (Math.random() - .5) * .3, c: colors[(Math.random() * colors.length) | 0], life: 0
      });
    }
    if (!rafId) tick();
  }
  function tick() {
    rafId = requestAnimationFrame(tick);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits = bits.filter(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.life / 110);
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .62); ctx.restore();
      return p.life < 110 && p.y < canvas.height + 30;
    });
    if (!bits.length) { cancelAnimationFrame(rafId); rafId = null; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
})();
