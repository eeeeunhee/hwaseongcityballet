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
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  progressItems.forEach((item, i) => item.classList.toggle('active', i === index));
  currentSlide = index;
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

// 진행바 클릭
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
  header.style.transform = currentScroll > lastScrollTop ? 'translateY(-100%)' : 'translateY(0)';
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ================================
// 햄버거 메뉴
const menuToggle = document.querySelector('.menu-toggle');
const navLeft = document.querySelector('.nav-left');
const menuItems = document.querySelectorAll('.menu > li'); // ✅ 한 번만 선언

// 햄버거 버튼 클릭 시 메뉴 열기/닫기
menuToggle.addEventListener('click', () => {
  navLeft.classList.toggle('active');
});

// 메뉴 아이템 클릭 시 서브 메뉴 열기/닫기
menuItems.forEach(item => {
  const submenu = item.querySelector('.submenu');
  if (submenu) {
    item.addEventListener('click', e => {
      if (window.innerWidth <= 1024) {
        menuItems.forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
        item.classList.toggle('open');
        e.stopPropagation();
      }
    });
  }
});

// 화면 리사이즈 시 메뉴 닫기
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    navLeft.classList.remove('active');
    menuItems.forEach(i => i.classList.remove('open'));
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
// 초기 실행
window.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0) {
    goToSlide(0);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  renderCalendar();
});


// 공연일정 페이지
const yearSelect = document.getElementById("yearSelect");
const monthSelect = document.getElementById("monthSelect");

// 1. 연도 옵션 넣기
const years = [...new Set(performances.map(p => new Date(p.date).getFullYear()))];
years.sort((a, b) => b - a); // 최신 순
years.forEach(year => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

// 2. 월 옵션 넣기
for (let m = 1; m <= 12; m++) {
  const option = document.createElement("option");
  option.value = m;
  option.textContent = m;
  monthSelect.appendChild(option);
}

// 3. 선택 시 필터링
yearSelect.addEventListener("change", renderGrid);
monthSelect.addEventListener("change", renderGrid);

function renderGrid() {
  const selectedYear = yearSelect.value;
  const selectedMonth = monthSelect.value;

  const filtered = performances.filter(p => {
    const d = new Date(p.date);
    return (!selectedYear || d.getFullYear() == selectedYear) &&
           (!selectedMonth || (d.getMonth() + 1) == selectedMonth);
  });

  const grid = document.getElementById("performanceGrid");
  grid.innerHTML = "";

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.poster}" alt="${p.title}">
      <div class="card-body">
        <h3>${p.title}</h3>
        <p class="info">${p.date} | ${p.place} | ${p.age}</p>
      </div>
    `;

    // ⭐ 추가된 부분: 카드 클릭 → 상세페이지 이동
    card.addEventListener("click", () => {
      location.href = `performanceDetail.html?id=${p.id}`;
    });

    grid.appendChild(card);
  });
}

// 초기 렌더링
renderGrid();
