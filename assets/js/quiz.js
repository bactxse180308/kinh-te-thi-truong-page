/* ═══════════════════════════════════════════════════════
   KTTT XHCN — quiz.js
   10 câu bám sát giáo trình · chấm ngay · giải thích
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var QUIZ = [
    { q: 'Kinh tế thị trường định hướng XHCN ở Việt Nam là nền kinh tế như thế nào?', correct: 1, options: [
      'Nền kinh tế kế hoạch hóa tập trung có yếu tố thị trường',
      'Nền kinh tế vận hành theo các quy luật của thị trường, hướng tới xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo',
      'Nền kinh tế thị trường tự do, Nhà nước không can thiệp',
      'Nền kinh tế chỉ gồm kinh tế nhà nước và kinh tế tập thể'
    ], explain: 'Đây là định nghĩa trong giáo trình: vận hành theo quy luật thị trường + định hướng XHCN + Nhà nước điều tiết dưới sự lãnh đạo của Đảng.' },

    { q: 'Đại hội nào của Đảng khẳng định kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát của thời kỳ quá độ lên CNXH ở nước ta?', correct: 2, options: [
      'Đại hội VI', 'Đại hội VIII', 'Đại hội IX', 'Đại hội XI'
    ], explain: 'Đại hội IX khẳng định điều này; Đại hội XIII tiếp tục khẳng định lại.' },

    { q: 'Phát triển kinh tế thị trường định hướng XHCN ở Việt Nam là tất yếu xuất phát từ mấy lý do cơ bản?', correct: 1, options: [
      '2 lý do', '3 lý do', '4 lý do', '5 lý do'
    ], explain: '3 lý do: phù hợp xu hướng phát triển khách quan; tính ưu việt của kinh tế thị trường; phù hợp nguyện vọng của nhân dân.' },

    { q: 'Nội dung nào KHÔNG thuộc các lý do về tính tất yếu khách quan?', correct: 3, options: [
      'Phù hợp với xu hướng phát triển khách quan của Việt Nam',
      'Tính ưu việt của kinh tế thị trường trong thúc đẩy phát triển',
      'Phù hợp với nguyện vọng của nhân dân',
      'Do yêu cầu của các tổ chức kinh tế quốc tế'
    ], explain: 'Ba lý do trong giáo trình đều là lý do khách quan — gắn với xu thế của thời đại và điều kiện phát triển của Việt Nam, không phải do yêu cầu từ bên ngoài.' },

    { q: 'Trong nền kinh tế thị trường định hướng XHCN, thành phần kinh tế nào giữ vai trò chủ đạo?', correct: 0, options: [
      'Kinh tế nhà nước', 'Kinh tế tư nhân', 'Kinh tế tập thể', 'Kinh tế có vốn đầu tư nước ngoài'
    ], explain: 'Kinh tế nhà nước giữ vai trò chủ đạo; kinh tế tư nhân là một động lực quan trọng.' },

    { q: 'Hình thức phân phối nào phản ánh định hướng XHCN của nền kinh tế thị trường?', correct: 2, options: [
      'Phân phối theo giá cả thị trường',
      'Phân phối bình quân, chia đều của cải',
      'Phân phối theo lao động và hiệu quả kinh tế, phân phối theo phúc lợi',
      'Phân phối theo mức đóng góp vốn'
    ], explain: 'Giáo trình nêu rõ: phân phối theo lao động và hiệu quả kinh tế, phân phối theo phúc lợi là những hình thức phản ánh định hướng XHCN.' },

    { q: '«Thể chế» được hiểu là gì?', correct: 1, options: [
      'Hệ thống các doanh nghiệp trong nền kinh tế',
      'Những quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành nhằm điều chỉnh các hoạt động của con người trong một chế độ xã hội',
      'Các chính sách tiền tệ của ngân hàng trung ương',
      'Bộ máy hành chính của Chính phủ'
    ], explain: 'Đây là định nghĩa thể chế trong giáo trình.' },

    { q: 'Có mấy lý do phải hoàn thiện thể chế kinh tế thị trường định hướng XHCN?', correct: 1, options: [
      '2 lý do',
      '3 lý do: chưa đồng bộ, chưa đầy đủ, kém hiệu lực – hiệu quả',
      '4 lý do',
      '5 lý do'
    ], explain: 'Ba lý do: thể chế còn chưa đồng bộ; hệ thống thể chế chưa đầy đủ; hệ thống thể chế còn kém hiệu lực, hiệu quả, thiếu các yếu tố và các loại thị trường.' },

    { q: 'Đại hội XII của Đảng đưa ra quan niệm mới nào về nền kinh tế thị trường định hướng XHCN?', correct: 0, options: [
      'Nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của kinh tế thị trường, đồng thời bảo đảm định hướng XHCN',
      'Nền kinh tế khép kín, tự cấp tự túc',
      'Nền kinh tế do thị trường hoàn toàn quyết định',
      'Nền kinh tế chỉ gồm doanh nghiệp nhà nước'
    ], explain: 'Đại hội XII: vận hành đầy đủ, đồng bộ theo quy luật kinh tế thị trường, bảo đảm định hướng XHCN, là nền kinh tế thị trường hiện đại và hội nhập quốc tế.' },

    { q: 'Nội dung hoàn thiện thể chế kinh tế thị trường định hướng XHCN gồm mấy nhóm chính?', correct: 2, options: [
      '2 nhóm', '3 nhóm', '4 nhóm', '6 nhóm'
    ], explain: '4 nhóm: (1) sở hữu, thành phần kinh tế, doanh nghiệp; (2) các yếu tố và các loại thị trường; (3) gắn tăng trưởng với bền vững, công bằng xã hội, hội nhập; (4) nâng cao năng lực lãnh đạo của Đảng và hệ thống chính trị.' }
  ];

  var LETTERS = ['A', 'B', 'C', 'D'];
  var list = document.getElementById('quiz-list');
  if (!list) return;

  var bar = document.getElementById('quiz-bar');
  var elScore = document.getElementById('quiz-score');
  var elTotal = document.getElementById('quiz-total');
  var elAnswered = document.getElementById('quiz-answered');
  var elFill = document.getElementById('quiz-fill');
  var elProgress = document.getElementById('quiz-progress');
  var elResult = document.getElementById('quiz-result');
  var live = document.getElementById('quiz-live');

  var score = 0, answered = 0;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  bar.hidden = false;
  elTotal.textContent = QUIZ.length;
  elProgress.setAttribute('aria-valuemax', QUIZ.length);

  /* ---------- Dựng câu hỏi ---------- */
  QUIZ.forEach(function (item, qi) {
    var card = document.createElement('article');
    card.className = 'quiz-card reveal';
    card.setAttribute('aria-labelledby', 'q' + qi);

    var head = document.createElement('div');
    head.className = 'quiz-q';
    head.innerHTML = '<span class="seal sm" aria-hidden="true">' + (qi + 1) + '</span>' +
      '<h3 id="q' + qi + '"><span class="visually-hidden">Câu ' + (qi + 1) + ': </span>' + item.q + '</h3>';
    card.appendChild(head);

    var opts = document.createElement('div');
    opts.className = 'quiz-opts';
    opts.setAttribute('role', 'group');
    opts.setAttribute('aria-labelledby', 'q' + qi);

    item.options.forEach(function (text, oi) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'quiz-opt';
      b.innerHTML = '<span class="l" aria-hidden="true">' + LETTERS[oi] + '.</span><span>' + text + '</span><span class="mark" aria-hidden="true"></span>';
      b.addEventListener('click', function () { answer(card, item, qi, oi, b); });
      opts.appendChild(b);
    });
    card.appendChild(opts);
    list.appendChild(card);
  });

  /* ---------- Trả lời ---------- */
  function answer(card, item, qi, oi, btn) {
    if (card.dataset.done) return;
    card.dataset.done = '1';
    answered++;

    var right = oi === item.correct;
    if (right) score++;

    var buttons = card.querySelectorAll('.quiz-opt');
    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (i === item.correct) {
        b.classList.add('correct');
        b.querySelector('.mark').textContent = '✓';
      } else if (i === oi) {
        b.classList.add('wrong');
        b.querySelector('.mark').textContent = '✗';
      } else {
        b.classList.add('dim');
      }
    });

    var fb = document.createElement('div');
    fb.className = 'quiz-explain' + (right ? ' good' : '');
    fb.innerHTML = '<b>' + (right ? 'Chính xác!' : 'Chưa đúng — đáp án là ' + LETTERS[item.correct] + '.') + '</b> ' + item.explain;
    card.appendChild(fb);

    live.textContent = 'Câu ' + (qi + 1) + ': ' + (right ? 'chính xác.' : 'chưa đúng, đáp án là ' + LETTERS[item.correct] + '.') +
      ' Điểm hiện tại ' + score + ' trên ' + QUIZ.length + '.';

    if (!reduceMotion && typeof gsap !== 'undefined') {
      if (right) {
        gsap.fromTo(btn, { scale: .97 }, { scale: 1, duration: .35, ease: 'back.out(3)' });
        burst(18);
      } else {
        gsap.fromTo(card, { x: 0 }, { x: 9, duration: .07, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' });
      }
      gsap.from(fb, { autoAlpha: 0, y: 10, duration: .4, ease: 'power2.out' });
    }

    updateBar();
    if (answered === QUIZ.length) setTimeout(showResult, reduceMotion ? 0 : 450);
  }

  function updateBar() {
    elScore.textContent = score;
    elAnswered.textContent = answered + '/' + QUIZ.length + ' câu';
    elFill.style.width = (answered / QUIZ.length * 100) + '%';
    elProgress.setAttribute('aria-valuenow', answered);
  }

  /* ---------- Kết quả ---------- */
  function showResult() {
    var total = QUIZ.length;
    var pct = Math.round(score / total * 100);
    var verdict, sub;
    if (score >= 9)      { verdict = 'Xuất sắc!';   sub = 'Bạn nắm rất chắc bài học — sẵn sàng cho bài thi.'; }
    else if (score >= 7) { verdict = 'Tốt!';        sub = 'Xem lại vài phần chưa chắc rồi làm lại nhé.'; }
    else if (score >= 5) { verdict = 'Đạt.';        sub = 'Nên ôn lại trang Tổng hợp và thử lại một lượt.'; }
    else                 { verdict = 'Chưa đạt.';   sub = 'Hãy đọc lại các bài học rồi quay lại — bạn làm được!'; }

    var best = 0;
    try {
      best = parseInt(localStorage.getItem('kttt-quiz-best') || '0', 10);
      if (score > best) { best = score; localStorage.setItem('kttt-quiz-best', String(best)); }
    } catch (e) { best = score; }

    var C = 2 * Math.PI * 54;
    elResult.innerHTML =
      '<div class="quiz-result" role="status">' +
        '<div class="ring" aria-hidden="true">' +
          '<svg viewBox="0 0 120 120">' +
            '<circle cx="60" cy="60" r="54" fill="none" stroke="rgba(245,235,216,.12)" stroke-width="9"/>' +
            '<circle id="ring-arc" cx="60" cy="60" r="54" fill="none" stroke="url(#ringGrad)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/>' +
            '<defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">' +
              '<stop offset="0" stop-color="#D6452E"/><stop offset="1" stop-color="#E3B84C"/>' +
            '</linearGradient></defs>' +
          '</svg>' +
          '<span class="val" id="ring-val">0/' + total + '</span>' +
        '</div>' +
        '<h2>' + verdict + '</h2>' +
        '<p>Bạn đúng <strong>' + score + '/' + total + '</strong> câu (' + pct + '%). ' + sub + '</p>' +
        '<p style="font-size:.85rem;opacity:.8">Điểm cao nhất của bạn trên máy này: <strong>' + best + '/' + total + '</strong></p>' +
        '<div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap;margin-top:1.3rem">' +
          '<button class="btn btn-red" id="btn-retry">Làm lại từ đầu</button>' +
          '<a class="btn btn-ghost" href="tong-hop.html">Ôn lại tổng hợp</a>' +
        '</div>' +
      '</div>';

    document.getElementById('btn-retry').addEventListener('click', reset);
    live.textContent = 'Hoàn thành. ' + verdict + ' Bạn đúng ' + score + ' trên ' + total + ' câu.';

    var arc = document.getElementById('ring-arc');
    var val = document.getElementById('ring-val');
    var target = C * (1 - score / total);
    if (!reduceMotion && typeof gsap !== 'undefined') {
      gsap.from('.quiz-result', { autoAlpha: 0, y: 30, scale: .96, duration: .6, ease: 'power3.out' });
      gsap.to(arc, { strokeDashoffset: target, duration: 1.3, ease: 'power2.inOut', delay: .25 });
      var obj = { v: 0 };
      gsap.to(obj, {
        v: score, duration: 1.3, delay: .25, ease: 'power2.inOut',
        onUpdate: function () { val.textContent = Math.round(obj.v) + '/' + total; }
      });
      if (score >= 7) burst(90);
    } else {
      arc.style.strokeDashoffset = target;
      val.textContent = score + '/' + total;
    }
    elResult.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  function reset() {
    score = 0; answered = 0;
    elResult.innerHTML = '';
    document.querySelectorAll('.quiz-card').forEach(function (card) {
      delete card.dataset.done;
      var fb = card.querySelector('.quiz-explain');
      if (fb) fb.remove();
      card.querySelectorAll('.quiz-opt').forEach(function (b) {
        b.disabled = false;
        b.classList.remove('correct', 'wrong', 'dim');
        b.querySelector('.mark').textContent = '';
      });
    });
    updateBar();
    live.textContent = 'Đã đặt lại bài quiz.';
    var first = document.querySelector('.quiz-card');
    if (first) first.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- Pháo giấy đỏ–vàng ---------- */
  var canvas = document.getElementById('confetti');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var bits = [], rafId = null;

  function sizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);

  function burst(n) {
    if (!ctx || reduceMotion) return;
    var colors = ['#D6452E', '#E3B84C', '#F2D488', '#A61B1B', '#F5EBD8'];
    for (var i = 0; i < n; i++) {
      bits.push({
        x: canvas.width / 2, y: canvas.height * 0.38,
        vx: (Math.random() - .5) * 14, vy: (Math.random() - 1.05) * 12,
        g: .32, s: Math.random() * 6 + 3, r: Math.random() * Math.PI,
        vr: (Math.random() - .5) * .3,
        c: colors[(Math.random() * colors.length) | 0], life: 0
      });
    }
    if (!rafId) tick();
  }

  function tick() {
    rafId = requestAnimationFrame(tick);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits = bits.filter(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life++;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, 1 - p.life / 110);
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .62);
      ctx.restore();
      return p.life < 110 && p.y < canvas.height + 30;
    });
    if (!bits.length) { cancelAnimationFrame(rafId); rafId = null; ctx.clearRect(0, 0, canvas.width, canvas.height); }
  }
})();
