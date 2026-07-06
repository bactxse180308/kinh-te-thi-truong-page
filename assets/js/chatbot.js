/* ═══════════════════════════════════════════════════════
   KTTT XHCN — chatbot.js
   Trợ giảng chạy 100% trên trình duyệt (không cần API):
   so khớp từ khóa tiếng Việt (bỏ dấu) trên kho tri thức
   biên soạn từ nội dung Chương 5.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var log = document.getElementById('chat-log');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var suggestBox = document.getElementById('chat-suggest');
  if (!log || !form) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Chuẩn hóa tiếng Việt ---------- */
  function norm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  /* ---------- Kho tri thức (mỗi mục: keys = cụm khóa đã bỏ dấu) ---------- */
  var KB = [
    { keys: ['khai niem', 'dinh nghia', 'la gi', 'kttt dinh huong', 'kinh te thi truong dinh huong xhcn la'],
      a: 'Theo giáo trình, kinh tế thị trường định hướng XHCN là nền kinh tế vận hành theo các quy luật của thị trường, đồng thời góp phần hướng tới từng bước xác lập một xã hội mà ở đó dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo.\n\nHai vế cần nhớ:\n• Vận hành theo quy luật thị trường (cung – cầu, giá cả, cạnh tranh)\n• Định hướng XHCN: mục tiêu dân giàu, nước mạnh… + Nhà nước điều tiết, Đảng lãnh đạo.\n\nXem chi tiết ở Bài 1 — Khái niệm.' },

    { keys: ['quy luat thi truong', 'cung cau', 'gia ca', 'canh tranh', 'phan bo nguon luc'],
      a: 'Vận hành theo quy luật thị trường nghĩa là nền kinh tế chịu sự chi phối của:\n• Cung – cầu: quyết định giá cả và lượng hàng hóa\n• Giá cả: hình thành trên thị trường, là tín hiệu điều tiết sản xuất và tiêu dùng\n• Cạnh tranh: thúc đẩy tiến bộ kỹ thuật, nâng năng suất, chất lượng, hạ giá thành\n• Thị trường là phương thức phân bổ nguồn lực hiệu quả mà loài người đã đạt được — so với các mô hình kinh tế phi thị trường.' },

    { keys: ['dinh huong xhcn nghia', 'dinh huong xa hoi chu nghia', 'dan giau nuoc manh'],
      a: 'Định hướng XHCN thể hiện ở chỗ nền kinh tế hướng tới từng bước xác lập xã hội dân giàu, nước mạnh, dân chủ, công bằng, văn minh; có sự điều tiết của Nhà nước dưới sự lãnh đạo của Đảng Cộng sản Việt Nam — đảng cầm quyền do lịch sử khách quan quy định.' },

    { keys: ['mo hinh kinh te tong quat', 'tong quat', 'thoi ky qua do'],
      a: 'Đại hội IX khẳng định: kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát của thời kỳ quá độ lên chủ nghĩa xã hội ở nước ta. Đại hội XIII tiếp tục khẳng định lại điều này.' },

    { keys: ['1986', 'doi moi', 'bat dau doi moi'],
      a: 'Năm 1986, Việt Nam bắt đầu công cuộc Đổi mới. Khi đó Đảng ta quan niệm kinh tế hàng hóa có những mặt tích cực cần vận dụng cho xây dựng chủ nghĩa xã hội.\n\nTrong quá trình Đổi mới, từ tổng kết thực tiễn và nghiên cứu lý luận, Đảng nhận thức rõ hơn: kinh tế hàng hóa, kinh tế thị trường là phương thức, điều kiện tất yếu để xây dựng CNXH. Xem timeline đầy đủ ở Bài 2.' },

    { keys: ['dai hoi ix', 'dai hoi 9'],
      a: 'Đại hội IX khẳng định: kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát của thời kỳ quá độ lên chủ nghĩa xã hội ở nước ta. Đây là mốc rất hay ra thi!' },

    { keys: ['dai hoi xi', 'dai hoi 11'],
      a: 'Đại hội XI khẳng định: nền kinh tế thị trường định hướng XHCN ở nước ta là nền kinh tế hàng hóa nhiều thành phần, vận hành theo cơ chế thị trường, có sự quản lý của Nhà nước, dưới sự lãnh đạo của Đảng Cộng sản.' },

    { keys: ['dai hoi xii', 'dai hoi 12', 'quan niem moi'],
      a: 'Đại hội XII đưa ra quan niệm mới: nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của kinh tế thị trường, đồng thời bảo đảm định hướng XHCN phù hợp với từng giai đoạn phát triển; là nền kinh tế thị trường hiện đại và hội nhập quốc tế, có sự quản lý của Nhà nước pháp quyền XHCN, do Đảng Cộng sản Việt Nam lãnh đạo, nhằm mục tiêu «dân giàu, nước mạnh, dân chủ, công bằng, văn minh».' },

    { keys: ['dai hoi xiii', 'dai hoi 13'],
      a: 'Đại hội XIII tiếp tục khẳng định: kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát của nước ta trong thời kỳ quá độ lên chủ nghĩa xã hội.' },

    { keys: ['tat yeu', 'vi sao phat trien', 'ly do phat trien', '3 ly do', 'ba ly do'],
      a: 'Phát triển kinh tế thị trường định hướng XHCN ở Việt Nam là tất yếu, xuất phát từ 3 lý do cơ bản:\n• 1. Phù hợp với xu hướng phát triển khách quan (sản xuất hàng hóa phát triển cao thì KTTT hình thành khách quan)\n• 2. Tính ưu việt của kinh tế thị trường (phân bổ nguồn lực hiệu quả, thúc đẩy lực lượng sản xuất, năng suất, công nghệ)\n• 3. Phù hợp nguyện vọng của nhân dân: dân giàu, nước mạnh, dân chủ, công bằng, văn minh.\n\nLưu ý bẫy thi: «do yêu cầu của tổ chức quốc tế» KHÔNG phải một lý do.' },

    { keys: ['uu viet', 'uu the cua kinh te thi truong'],
      a: 'Tính ưu việt của kinh tế thị trường (lý do tất yếu số 2): là phương thức phân bổ nguồn lực hiệu quả mà loài người đã đạt được — so với các mô hình kinh tế phi thị trường; là động lực thúc đẩy lực lượng sản xuất phát triển nhanh, kích thích tiến bộ kỹ thuật – công nghệ, nâng cao năng suất lao động, chất lượng sản phẩm và hạ giá thành.\n\nVí dụ đời sống: doanh nghiệp cạnh tranh khiến chất lượng tốt hơn, giá hợp lý hơn.' },

    { keys: ['dac trung', '5 dac trung', 'nam dac trung'],
      a: 'Mô hình có 5 đặc trưng:\n• 1. Về mục tiêu\n• 2. Về quan hệ sở hữu và thành phần kinh tế\n• 3. Về quan hệ quản lý nền kinh tế\n• 4. Về quan hệ phân phối\n• 5. Gắn tăng trưởng kinh tế với công bằng xã hội\n\nMẹo nhớ: «Mục tiêu – Sở hữu – Quản lý – Phân phối – Công bằng». Chi tiết từng đặc trưng ở Bài 4.' },

    { keys: ['muc tieu'],
      a: 'Đặc trưng về mục tiêu: hướng tới phát triển lực lượng sản xuất, xây dựng cơ sở vật chất – kỹ thuật của CNXH; nâng cao đời sống nhân dân, thực hiện dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Đây là khác biệt căn bản với kinh tế thị trường tư bản chủ nghĩa.' },

    { keys: ['kinh te nha nuoc', 'chu dao', 'vai tro chu dao'],
      a: 'Trong nền kinh tế thị trường định hướng XHCN, kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là một động lực quan trọng. Các thành phần kinh tế bình đẳng, hợp tác, cạnh tranh cùng phát triển theo pháp luật.\n\nVí dụ: doanh nghiệp nhà nước chỉ đầu tư vào những ngành then chốt — vừa chi phối được nền kinh tế, vừa bảo đảm an ninh, quốc phòng và lợi ích công cộng.' },

    { keys: ['kinh te tu nhan', 'tu nhan', 'dong luc quan trong'],
      a: 'Kinh tế tư nhân là một động lực quan trọng của nền kinh tế. Số liệu minh họa (Cổng thông tin Chính phủ): hơn 940 nghìn doanh nghiệp, hơn 5 triệu hộ kinh doanh, đóng góp khoảng 50% GDP và sử dụng khoảng 82% lao động.\n\nLưu ý: giữ vai trò chủ đạo vẫn là kinh tế nhà nước.' },

    { keys: ['so huu', 'thanh phan kinh te'],
      a: 'Đặc trưng về sở hữu và thành phần kinh tế: nền kinh tế có nhiều hình thức sở hữu, nhiều thành phần kinh tế; trong đó kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là một động lực quan trọng; các chủ thể bình đẳng, hợp tác, cạnh tranh cùng phát triển theo pháp luật.' },

    { keys: ['quan ly', 'nha nuoc phap quyen', 'ai quan ly'],
      a: 'Đặc trưng về quản lý: Nhà nước quản lý là Nhà nước pháp quyền XHCN của nhân dân, do nhân dân, vì nhân dân, dưới sự lãnh đạo của Đảng Cộng sản, chịu sự làm chủ và giám sát của nhân dân.\n\nCông cụ quản lý: pháp luật, chiến lược, kế hoạch, quy hoạch, cơ chế, chính sách và các công cụ kinh tế.' },

    { keys: ['phan phoi', 'phan phoi theo lao dong', 'phuc loi'],
      a: 'Đặc trưng về phân phối: thực hiện nhiều hình thức phân phối (cả đầu vào và đầu ra). Trong đó, phân phối theo lao động và hiệu quả kinh tế, phân phối theo phúc lợi là những hình thức phản ánh định hướng XHCN.\n\nVí dụ: lương theo kết quả lao động + hưởng an sinh xã hội, BHYT, giáo dục công.' },

    { keys: ['cong bang xa hoi', 'tang truong gan voi cong bang', 'tien bo va cong bang'],
      a: 'Đặc trưng thứ 5: gắn tăng trưởng kinh tế với công bằng xã hội — phát triển kinh tế đi đôi với phát triển văn hóa – xã hội; thực hiện tiến bộ và công bằng xã hội ngay trong từng chính sách, chiến lược, quy hoạch, kế hoạch và từng giai đoạn.\n\nKhông «hy sinh» tiến bộ và công bằng xã hội để chạy theo tăng trưởng đơn thuần; cũng không cào bằng.' },

    { keys: ['so sanh', 'khac gi', 'khac nhau', 'kttt noi chung', 'tu ban chu nghia'],
      a: 'So với kinh tế thị trường nói chung, mô hình Việt Nam khác ở 4 điểm:\n• Cơ chế: vẫn theo quy luật thị trường NHƯNG có định hướng XHCN\n• Mục tiêu: tăng trưởng gắn với dân giàu, nước mạnh, dân chủ, công bằng, văn minh\n• Nhà nước: Nhà nước pháp quyền XHCN quản lý, dưới sự lãnh đạo của Đảng\n• Phân phối: nhấn mạnh phân phối theo lao động, hiệu quả kinh tế và phúc lợi\n\nXem bảng so sánh tương tác ở Bài 4.' },

    { keys: ['the che kinh te thi truong', 'the che kttt'],
      a: 'Thể chế kinh tế thị trường định hướng XHCN là hệ thống đường lối, chủ trương chiến lược, hệ thống luật pháp, chính sách xác lập cơ chế vận hành, điều chỉnh chức năng, hoạt động, mục tiêu, phương thức hoạt động, các quan hệ lợi ích của các tổ chức, các chủ thể kinh tế — nhằm hướng tới xác lập đồng bộ các yếu tố thị trường, các loại thị trường hiện đại, góp phần thúc đẩy dân giàu, nước mạnh, dân chủ, công bằng, văn minh.' },

    { keys: ['the che kinh te la gi'],
      a: 'Thể chế kinh tế là hệ thống quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành nhằm điều chỉnh hành vi của các chủ thể kinh tế, các hành vi sản xuất kinh doanh và các quan hệ kinh tế.' },

    { keys: ['the che la gi', 'the che'],
      a: 'Thể chế là những quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành nhằm điều chỉnh các hoạt động của con người trong một chế độ xã hội.\n\nBa tầng cần phân biệt: Thể chế → Thể chế kinh tế → Thể chế kinh tế thị trường định hướng XHCN (xem «bậc thang» ở Bài 5).' },

    { keys: ['vi sao hoan thien', 'ly do hoan thien', 'tai sao phai hoan thien'],
      a: 'Phải hoàn thiện thể chế vì 3 lý do:\n• 1. Thể chế còn chưa đồng bộ — mới hình thành và phát triển, cần hoàn thiện để phát huy mặt tích cực, khắc phục khuyết tật thị trường\n• 2. Hệ thống thể chế chưa đầy đủ — thể chế là sản phẩm của Nhà nước, phải phục vụ lợi ích nhân dân\n• 3. Còn kém hiệu lực, hiệu quả — các yếu tố và các loại thị trường mới ở trình độ sơ khai.' },

    { keys: ['noi dung hoan thien', '4 nhom', 'bon nhom', 'may nhom'],
      a: 'Nội dung hoàn thiện thể chế gồm 4 nhóm:\n• 1. Về sở hữu, phát triển các thành phần kinh tế, các loại hình doanh nghiệp\n• 2. Phát triển đồng bộ các yếu tố thị trường và các loại thị trường\n• 3. Gắn tăng trưởng với phát triển bền vững, tiến bộ, công bằng xã hội và hội nhập quốc tế\n• 4. Nâng cao năng lực lãnh đạo của Đảng và hệ thống chính trị\n\nChi tiết từng nhóm ở Bài 5.' },

    { keys: ['quyen tai san', 'dat dai', 'so huu tri tue'],
      a: 'Thuộc nhóm hoàn thiện thể chế số 1 (về sở hữu): thể chế hóa đầy đủ quyền tài sản (sở hữu, sử dụng, định đoạt, hưởng lợi); hoàn thiện pháp luật về đất đai, tài nguyên, tài sản công; sở hữu trí tuệ khuyến khích sáng tạo; một chế độ pháp lý kinh doanh chung cho mọi doanh nghiệp; tạo thuận lợi cho kinh tế tư nhân và thu hút FDI có chuyển giao công nghệ.' },

    { keys: ['cac loai thi truong', 'thi truong von', 'thi truong lao dong', 'thi truong cong nghe', 'yeu to thi truong'],
      a: 'Nhóm hoàn thiện thể chế số 2: phát triển đồng bộ các yếu tố thị trường (hàng hóa, giá cả, cạnh tranh, cung – cầu…) và vận hành thông suốt các loại thị trường cơ bản như:\n• Thị trường hàng hóa – dịch vụ\n• Thị trường vốn\n• Thị trường công nghệ\n• Thị trường hàng hóa sức lao động…\n(giáo trình liệt kê mở, không chốt đúng 4 loại)\n\nVí dụ đời sống: mua bán hàng hóa, vay vốn ngân hàng, tuyển dụng lao động, chuyển giao công nghệ.' },

    { keys: ['hoi nhap', 'wto', 'cam ket quoc te'],
      a: 'Việt Nam là thành viên WTO từ ngày 11/01/2007 — minh họa cho hội nhập kinh tế quốc tế.\n\nVề thể chế (nhóm 3): rà soát, bổ sung pháp luật đáp ứng các cam kết quốc tế; đa phương hóa, đa dạng hóa hợp tác, không lệ thuộc một số ít thị trường; nâng cao năng lực cạnh tranh quốc gia.' },

    { keys: ['quy binh on', 'xang dau', 'dieu tiet'],
      a: 'Quỹ bình ổn giá xăng dầu là ví dụ về vai trò điều tiết của Nhà nước: giúp «giảm chấn» khi giá xăng dầu thế giới biến động mạnh — thị trường vẫn vận hành, nhưng Nhà nước can thiệp để ổn định đời sống.' },

    { keys: ['an sinh', 'giao duc', 'y te', 'ho tro thu nhap thap'],
      a: 'Chính sách giáo dục, y tế, an sinh xã hội, hỗ trợ nhóm thu nhập thấp là minh họa cho đặc trưng «tăng trưởng gắn với công bằng xã hội»: đầu tư cho các vấn đề xã hội được coi là đầu tư cho sự phát triển bền vững.' },

    { keys: ['vi du', 'minh hoa', 'thuc te'],
      a: 'Bài 6 có 5 ví dụ minh họa:\n• Gia nhập WTO ngày 11/01/2007 (hội nhập)\n• Kinh tế tư nhân: >940 nghìn DN, >5 triệu hộ, ~50% GDP, ~82% lao động\n• Quỹ bình ổn giá xăng dầu (Nhà nước điều tiết)\n• Bốn loại thị trường trong đời sống\n• Chính sách an sinh, giáo dục, y tế (công bằng xã hội)\n\nLưu ý: ví dụ chỉ để minh họa, không thuộc phạm vi quiz.' },

    { keys: ['on thi', 'hoc gi', 'nho gi', 'meo nho', 'tong hop'],
      a: 'Công thức ôn nhanh: thuộc 1 câu định nghĩa + 4 con số vàng 3·5·3·4:\n• 3 lý do tất yếu\n• 5 đặc trưng\n• 3 lý do hoàn thiện thể chế\n• 4 nhóm nội dung hoàn thiện\n+ 3 mốc Đại hội: IX (mô hình tổng quát), XII (quan niệm mới), XIII (khẳng định lại).\n\nTất cả nằm gọn ở trang Tổng hợp — sau đó làm Quiz 10 câu nhé!' },

    { keys: ['quiz', 'trac nghiem', 'kiem tra'],
      a: 'Trang Quiz có 10 câu bám sát giáo trình, chấm điểm ngay và giải thích từng đáp án. Mẹo: ôn trang Tổng hợp (1 định nghĩa + bộ số 3·5·3·4 + 3 mốc Đại hội) trước khi làm để đạt 9–10 điểm!' }
  ];

  /* ---------- Ý định đặc biệt ---------- */
  var GREET = ['chao', 'hello', 'hi ', 'xin chao', 'alo'];
  var THANKS = ['cam on', 'thank', 'tks'];
  var WHO = ['ban la ai', 'may la ai', 'ai day', 'gioi thieu ban'];

  var OFF_TOPIC =
    'Xin lỗi, câu này nằm ngoài phạm vi bài học Chương 5 nên mình không trả lời để tránh sai lệch. 🙏\n\nBạn có thể hỏi mình về:\n• Khái niệm, định nghĩa của mô hình\n• Các mốc Đại hội (IX, XI, XII, XIII)\n• 3 lý do tất yếu · 5 đặc trưng\n• Thể chế và 4 nhóm nội dung hoàn thiện\n• Các ví dụ minh họa (WTO, kinh tế tư nhân…)';

  /* ---------- Ý định chào hỏi — đáp cục bộ, không tốn lượt gọi AI ---------- */
  function specialIntent(raw) {
    var q = norm(raw);
    if (!q) return null;

    var isGreet = GREET.some(function (k) { return q === k.trim() || q.indexOf(k) === 0; });
    if (isGreet && q.split(' ').length <= 4) {
      return 'Chào bạn! 👋 Mình là trợ giảng Chương 5 — «Kinh tế thị trường định hướng XHCN ở Việt Nam».\nBạn muốn hỏi về khái niệm, tính tất yếu, đặc trưng hay thể chế? Có thể bấm các câu gợi ý bên dưới nhé.';
    }
    if (THANKS.some(function (k) { return q.indexOf(k) >= 0; })) {
      return 'Rất vui được giúp bạn! Chúc bạn ôn tập tốt — thử sức với Quiz 10 câu để kiểm tra nhé. 🌟';
    }
    if (WHO.some(function (k) { return q.indexOf(k) >= 0; })) {
      return 'Mình là trợ giảng AI của website, được huấn luyện để chỉ trả lời trong phạm vi bài học Chương 5 — Kinh tế chính trị Mác – Lênin. Khi không có kết nối, mình tự chuyển sang chế độ ngoại tuyến với bộ kiến thức có sẵn.';
    }
    return null;
  }

  /* ---------- Tìm câu trả lời cục bộ (dự phòng khi AI không gọi được) ---------- */
  function localAnswer(raw) {
    var q = norm(raw);
    var best = null, bestScore = 0;
    KB.forEach(function (entry) {
      var s = 0;
      entry.keys.forEach(function (key) {
        if (q.indexOf(key) >= 0) {
          s += key.split(' ').length * 2;          // cụm dài = trúng đậm
        } else {
          var words = key.split(' ');
          if (words.length > 1) {
            var hit = words.filter(function (w) { return w.length > 2 && q.indexOf(w) >= 0; }).length;
            if (hit >= 2) s += hit;                 // trúng phần lớn cụm
          }
        }
      });
      if (s > bestScore) { bestScore = s; best = entry; }
    });

    return bestScore >= 2 ? best.a : OFF_TOPIC;
  }

  /* ---------- Giao diện hội thoại ---------- */
  function addMsg(text, who) {
    var div = document.createElement('div');
    div.className = 'msg ' + who;
    var label = document.createElement('span');
    label.className = 'visually-hidden';
    label.textContent = who === 'user' ? 'Bạn: ' : 'Trợ giảng: ';
    div.appendChild(label);
    div.appendChild(document.createTextNode(text));
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    if (!reduceMotion && typeof gsap !== 'undefined') {
      gsap.from(div, { autoAlpha: 0, y: 12, duration: .35, ease: 'power2.out' });
    }
    return div;
  }

  /* ---------- Trợ giảng AI (/api/chat, Gemini) — dự phòng bằng KB cục bộ ----------
     AI được "huấn luyện" phía server: system instruction chứa toàn bộ nội dung
     bài học và chỉ được phép trả lời trong phạm vi đó. Khi API lỗi / mở file
     trực tiếp / mất mạng → tự lùi về so khớp từ khóa cục bộ, chat không bao giờ chết. */
  var API_URL = '/api/chat';
  var apiUsable = location.protocol === 'http:' || location.protocol === 'https:';
  var apiDownUntil = 0;                     // sau một lần lỗi, tạm ngưng gọi API 2 phút
  var history = [];                         // {role:'user'|'model', text} — ngữ cảnh cho AI
  var modeEl = document.getElementById('chat-mode');

  function setMode(text) { if (modeEl) modeEl.textContent = text; }

  function callAPI(question) {
    return new Promise(function (resolve) {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (ctrl) ctrl.abort();
        resolve(null);
      }, 12000);
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: history.slice(-6) }),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function (d) {
        clearTimeout(timer);
        resolve(d && typeof d.reply === 'string' && d.reply.trim() ? d.reply.trim() : null);
      }).catch(function () {
        clearTimeout(timer);
        resolve(null);
      });
    });
  }

  var busy = false;
  function reply(question) {
    if (busy) return;
    busy = true;

    var typing = document.createElement('div');
    typing.className = 'msg bot';
    typing.setAttribute('aria-hidden', 'true');
    typing.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>';
    log.appendChild(typing);
    log.scrollTop = log.scrollHeight;

    function finish(answer, viaAPI) {
      typing.remove();
      addMsg(answer, 'bot');
      history.push({ role: 'user', text: question }, { role: 'model', text: answer });
      if (history.length > 12) history = history.slice(-12);
      setMode(viaAPI
        ? 'Trợ giảng AI · chỉ trả lời trong phạm vi bài học'
        : 'Chế độ ngoại tuyến · chỉ trả lời trong phạm vi bài học');
      busy = false;
    }

    var special = specialIntent(question);
    if (special) {
      setTimeout(function () { finish(special, false); }, reduceMotion ? 60 : 500);
      return;
    }

    var useAPI = apiUsable && Date.now() > apiDownUntil;
    (useAPI ? callAPI(question) : Promise.resolve(null)).then(function (aiReply) {
      if (aiReply) { finish(aiReply, true); return; }
      if (useAPI) apiDownUntil = Date.now() + 30000;
      var answer = localAnswer(question);
      var delay = useAPI ? 0 : (reduceMotion ? 60 : Math.min(320 + answer.length * 0.8, 900));
      setTimeout(function () { finish(answer, false); }, delay);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    addMsg(text, 'user');
    input.value = '';
    reply(text);
  });

  /* ---------- Gợi ý ---------- */
  var SUGGESTS = [
    'Khái niệm của mô hình là gì?',
    'Vì sao kinh tế nhà nước giữ vai trò chủ đạo?',
    '3 lý do tất yếu là gì?',
    'Đại hội XII nói gì về mô hình này?',
    'Thể chế kinh tế là gì?',
    'Mô hình khác gì kinh tế thị trường nói chung?'
  ];
  SUGGESTS.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = s;
    b.addEventListener('click', function () {
      if (busy) return;
      addMsg(s, 'user');
      reply(s);
    });
    suggestBox.appendChild(b);
  });

  /* ---------- Lời chào mở đầu ---------- */
  addMsg('Chào bạn! Mình là trợ giảng cho bài «Kinh tế thị trường định hướng XHCN ở Việt Nam». Bạn muốn hỏi gì về khái niệm, tính tất yếu, đặc trưng hay hoàn thiện thể chế? Bấm câu gợi ý bên dưới hoặc tự gõ nhé.', 'bot');
})();
