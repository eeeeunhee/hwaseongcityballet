// ================================
// HERO 슬라이드 & 진행바
const slides = document.querySelectorAll('.hero-slide');
const progressItems = document.querySelectorAll('.progress-item');
let currentSlide = 0;
let slideInterval = null;

// CSS 변수에서 duration 가져오기
const slideDuration = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue('--slide-duration')
) * 1000;

// 슬라이드 전환 함수
function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  progressItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  currentSlide = index;
}

// 다음 슬라이드
function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

// 진행바 클릭 이벤트
progressItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    clearInterval(slideInterval);
    goToSlide(index);
    slideInterval = setInterval(nextSlide, slideDuration);
  });
});

// ================================
// HEADER 스크롤 숨김/보임
const header = document.getElementById('siteHeader');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ================================
// 모바일 메뉴 클릭 이벤트
const menuItems = document.querySelectorAll('.menu > li');

menuItems.forEach(item => {
  const submenu = item.querySelector('.submenu');
  if (submenu) {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 720) {
        item.classList.toggle('open');
        e.stopPropagation();
      }
    });
  }
});

// ================================
// 스크롤 시 fade-in (IntersectionObserver)
const scrollElements = document.querySelectorAll('.scroll-fade');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

scrollElements.forEach(el => appearOnScroll.observe(el));

// ================================
// 공연 일정 렌더링 (최근 공연 위로, 상세 페이지 없이 목록으로 이동)
document.addEventListener("DOMContentLoaded", function() {
  const yearSelect = document.getElementById("yearSelect");
  const monthSelect = document.getElementById("monthSelect");
  const grid = document.getElementById("performanceGrid");

  if (!yearSelect || !monthSelect || !grid) return;

  function renderPerformances(year, month) {
    // 문자열을 숫자로 변환
    year = Number(year);
    month = Number(month);

    grid.innerHTML = "";

    // 해당 연월 공연 필터
    const filtered = performances
      .filter(p => {
        const d = new Date(p.date);
        return d.getFullYear() === year && (d.getMonth() + 1) === month;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 순

    if (filtered.length === 0) {
      grid.innerHTML = "<p style='color: var(--muted); text-align:center;'>해당 월에 예정된 공연이 없습니다.</p>";
      return;
    }

    // 카드 생성
    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="performanceList.html">
          <img src="${p.poster}" alt="${p.title} 포스터">
        </a>
        <div class="card-body">
          <h3><a href="performanceList.html" class="title-link">${p.title}</a></h3>
          <div class="info">${p.date} <br> ${p.place}</div>
          <a href="performanceList.html" class="btn">자세히 보기</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // 연도 옵션
  for (let y = 2025; y >= 2016; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // 월 옵션
  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m;
    monthSelect.appendChild(option);
  }

  const today = new Date();
  yearSelect.value = today.getFullYear();
  monthSelect.value = today.getMonth() + 1;

  // 초기 렌더
  renderPerformances(yearSelect.value, monthSelect.value);

  // 연도/월 변경 시
  yearSelect.addEventListener("change", () => renderPerformances(yearSelect.value, monthSelect.value));
  monthSelect.addEventListener("change", () => renderPerformances(yearSelect.value, monthSelect.value));
});

// ================================
// 초기 실행 (슬라이드, 캘린더 등)
window.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0) {
    goToSlide(0);
    slideInterval = setInterval(nextSlide, slideDuration);
  }
  renderCalendar();
});
