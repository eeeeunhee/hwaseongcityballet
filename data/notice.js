document.addEventListener("DOMContentLoaded", () => {
  const noticeListEl = document.querySelector(".notice-list");
  const noticeDetailEl = document.querySelector("#noticeDetail");
  const pageTitle = document.querySelector(".notice-heading"); // ✅ 수정: 실제 h2 클래스 이름에 맞춤

  const notices = [
    {
      id: 1,
      title: "[공연안내] 화성시티발레단 호두까기인형 갈라 공연",
      content: `
        크리스마스의 마법이 무대 위에서 펼쳐집니다.<br><br>
        화성시티발레단이 선사하는 연말의 특별한 선물, 
        <strong>호두까기인형 갈라 2025</strong>가 여러분을 찾아갑니다.<br>
        공연일시 : 2025년 12월 27일(토) 오후 5시
                  2025년 12월 28일(일) 오후 4시 / 오후 7시<br>
        공연장소 : 동탄복합문화센터 반석아트홀<br>
        관람등급 : 48개월 이상 관람 가능<br>
        공연시간 : 약 90분 (인터미션 없음)<br><br><br>

        <strong>티켓 예매 안내</strong><br>
        좌석별 가격 : R석 - 60,000원 / S석 - 40,000원 / A석 - 30,000원<br>
        예매처 : 인터파크 티켓<br><br>

        이번 겨울, 가족과 함께 특별한 추억을 만들어보세요.<br><br>
        아이들에게는 동화 속 세계로의 초대를,<br>
        어른들에게는 어린 시절의 설렘을 선물하는 호두까기인형 갈라 2025.<br>
        차이콥스키의 명곡과 화성시티발레단의 아름다운 춤이 만들어내는 
        겨울밤의 마법을 놓치지 마세요.<br><br>
        지금 바로 인터파크에서 예매하세요!
      `,
      image: "images/2025_40.jpg",
    },
    {
      id: 2,
      title: "발레단 신입 단원 모집 공고",
      content: `
        화성시티발레단에서는 2026 시즌을 함께할 신입 단원을 모집합니다.<br><br>
        🗓 지원 기간: 2025년 11월 1일 ~ 11월 15일<br>
        📍 오디션 장소: 화성시티발레단 스튜디오<br><br>
        자세한 사항은 이메일 문의 바랍니다. <br>
        (hsc_ballet@naver.com)
      `,
      image: "images/notice2.jpg",
    },
    {
      id: 3,
      title: "12월 공연 일정 변경 안내",
      content: `
        기존 예정이던 12월 17일 공연이 내부 일정으로 인해 
        12월 18일로 변경되었습니다.<br><br>
        예매자분들께는 개별 연락드릴 예정이며, 
        일정에 착오 없으시길 바랍니다.
      `,
      image: "images/notice3.jpg",
    },
  ];

  // 공지 목록 출력
  function renderNotices() {
    noticeListEl.innerHTML = "";
    notices.forEach((notice) => {
      const item = document.createElement("li");
      item.classList.add("notice-item");
      item.innerHTML = `<span>${notice.title}</span>`;
      item.addEventListener("click", () => showNoticeDetail(notice));
      noticeListEl.appendChild(item);
    });
  }

  // 상세 보기 표시
  function showNoticeDetail(notice) {
    // 공지사항 제목(h2) 숨기기
    if (pageTitle) pageTitle.style.display = "none";

    // 목록 숨기고 상세 내용 표시
    noticeListEl.style.display = "none";
    noticeDetailEl.style.display = "block";
    noticeDetailEl.innerHTML = `
      <div class="detail-inner">
        <button class="back-btn">← 목록으로</button>
        <h2 class="detail-title">${notice.title}</h2>
        <div class="notice-image-wrapper">
          <img src="${notice.image}" alt="${notice.title}" class="detail-image">
        </div>
        <div class="detail-content">${notice.content}</div>
      </div>
    `;

    // 뒤로가기 버튼 기능
    const backBtn = noticeDetailEl.querySelector(".back-btn");
    backBtn.addEventListener("click", goBackToList);
  }

  // 목록으로 돌아가기
  function goBackToList() {
    noticeDetailEl.style.display = "none";
    noticeListEl.style.display = "block";
    if (pageTitle) pageTitle.style.display = "block";
  }

  // 초기화
  renderNotices();
});
