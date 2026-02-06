document.addEventListener("DOMContentLoaded", () => {
  const noticeListEl = document.querySelector(".notice-list");
  const noticeDetailEl = document.querySelector("#noticeDetail");
  const pageTitle = document.querySelector(".notice-heading"); 

  const notices = [
    {
      id: 1,
      title: "[모집] 2026년 단원 오디션 일정",
      content: `
      <strong>당신의 성장이 무대가 되는 곳, 화성시티발레단</strong>
      화성시티발레단은 현재의 실력보다
      무대를 향한 태도와 앞으로의 가능성을 봅니다.<br>

      <strong>화성시티발레단 2026 신입 단원 모집</strong><br>
      화성시티발레단은 발레에 대한 진심과 성장 가능성을 가진 신입 단원을 모집합니다.
      잠재력과 태도, 무대를 향한 의지를 중심으로 선발하며,
      졸업 여부와 관계없이 많은 지원을 기다립니다.<br>

      <strong>오디션 일정</strong>
      일시 : 2026년 3월 21일 (토)
      장소 : 화성시티발레단 연습실 (화성시 동탄공원로1길 27, 2층)<br>

      <strong>진행 방법</strong>
      클래스 오디션 진행
      - Barre & Center
      - Pointe (여자)
      ※ 세부 시간은 추후 개별 공지 예정<br>

      <strong>지원 방법</strong>
      구글폼을 통한 온라인 지원 (2026년 3월 18일 마감)
      서류 검토 후 오디션 대상자 개별 안내 예정

      <a href="https://forms.gle/cK5uozcK6jCAUFVo6"
        class="notice-btn"
        target="_blank" rel="noopener">
        <span>구글폼 지원하기</span>
      </a><br>

      <strong>지원 자격</strong>
      - 발레 전공자 또는 이에 준하는 실력을 갖춘 자
      - 학생 및 졸업생 모두 지원 가능
      - 무대 활동 및 연습에 성실히 참여 가능한 자<br>

      <strong>선발 기준</strong>
      - 기본 테크닉 및 신체 조건
      - 표현력, 음악성, 태도
      - 향후 성장 가능성<br>

      <strong>오디션 준비물</strong>
      - 남자 : 검정색 타이즈, 흰색 티셔츠, 흰색 슈즈, 흰색 양말
      - 여자 : 핑크색 타이즈, 레오타드, 슈즈, 토슈즈<br>

      <strong>신청 절차</strong>
      구글폼 작성 및 제출 → 지원자 이름으로 응시료 입금 →
      입금 확인 후 접수 완료 문자 발송<br>

      <strong>입금 안내</strong>
      응시료 : 20,000원
      예금주 : 화성시티발레단
      계좌번호 : 신한은행 100-032-641039<br>

      <strong>취소 및 환불 안내</strong>
      2026년 3월 18일 18시까지 취소 시 응시료 100% 환불
      이후 취소 시 환불 불가<br>

      <strong>활동 조건</strong>
      연습 일정 및 급여는 개별 협의 예정<br><br>

      자세한 사항은 이메일로 문의 바랍니다.
      `,
      image: "images/화성시티발레단_로고_화이트.png",

    },
    {
      id: 2,
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
      id: 3,
      title: "홈페이지 개설 안내",
      content: `
        안녕하세요. 화성시티발레단입니다.<br>
        저희 단체의 공식 홈페이지가 새롭게 개설되었습니다. 현재 일부 콘텐츠는 준비 및 수정 중에 있으므로, 방문 시 일부 정보가 제한될 수 있는 점 양해 부탁드립니다.<br>
        앞으로 지속적으로 홈페이지를 통해 다양한 소식과 정보를 제공할 예정이오니, 많은 관심과 이용 부탁드립니다.<br><br>
        화성시티발레단
      `,
      image: "images/화성시티발레단_로고_화이트.png",
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
