// 메인페이지 스크롤 애니메이션
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}


window.addEventListener("scroll", reveal);

// 시작 시 한 번 실행
reveal();

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const perfCards = document.querySelectorAll('.perf-card');
    const searchInput = document.getElementById('perfSearch');

    // 1. 필터링 기능 (버튼 클릭)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 버튼 활성화 스타일 교체
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            perfCards.forEach(card => {
                // 'all'이거나 클래스명에 필터값이 포함되어 있으면 표시
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. 검색 기능 (타이핑)
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        perfCards.forEach(card => {
            const title = card.querySelector('.p-title').innerText.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

/*공연정보 모달*/
function openPerfModal(title, dateTime, place, host, org, support, img, desc, link) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDateTime').innerText = dateTime;
    document.getElementById('modalPlace').innerText = place;
    document.getElementById('modalHost').innerText = host || '-';
    document.getElementById('modalOrg').innerText = org || '-';
    document.getElementById('modalSupport').innerText = support || '-';
    document.getElementById('modalDescription').innerText = desc;
    document.getElementById('modalImg').src = img;
    
    const linkTag = document.getElementById('modalLink');
    if(link && link !== '#') {
        linkTag.href = link;
        linkTag.parentElement.style.display = 'block';
    } else {
        linkTag.parentElement.style.display = 'none';
    }

    document.getElementById('perfModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function closePerfModal() {
    document.getElementById('perfModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 2. 필터 및 검색
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const perfCards = document.querySelectorAll('.perf-card');
    const searchInput = document.getElementById('perfSearch');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');
            perfCards.forEach(card => {
                card.style.display = (val === 'all' || card.classList.contains(val)) ? 'block' : 'none';
            });
        });
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        perfCards.forEach(card => {
            const title = card.querySelector('.p-title').innerText.toLowerCase();
            card.style.display = title.includes(term) ? 'block' : 'none';
        });
    });
});

/* 후원 및 소식 페이지*/
function openTab(evt, tabName) {
    var i, tabpanel, tablinks;
    
    // 모든 탭 패널 숨기기
    tabpanel = document.getElementsByClassName("tab-panel");
    for (i = 0; i < tabpanel.length; i++) {
        tabpanel[i].style.display = "none";
        tabpanel[i].classList.remove("active");
    }

    // 모든 버튼에서 active 클래스 제거
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 클릭한 탭만 보여주고 버튼에 active 추가
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

document.addEventListener('DOMContentLoaded', function() {
    // 공지사항 아코디언 기능
    const AccordionTriggers = document.querySelectorAll('.js-accordion-trigger');

    AccordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // 클릭한 행 바로 다음 행(내용 행)을 찾음
            const contentRow = this.nextElementSibling;
            
            // 만약 내용 행이 이미 열려있다면 닫고, 닫혀있다면 엶
            if (contentRow && contentRow.classList.contains('news-content-row')) {
                contentRow.classList.toggle('active');
                
                // (선택사항) 하나만 열리게 하고 싶다면 아래 주석 해제
                AccordionTriggers.forEach(otherTrigger => {
                     if (otherTrigger !== this) {
                         otherTrigger.nextElementSibling.classList.remove('active');
                     }
                 });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const currentIdxText = document.getElementById('currentIdx');
    const totalIdxText = document.getElementById('totalIdx');
    
    let currentImgArray = []; // 현재 클릭한 공연의 이미지 배열
    let currentIdx = 0; // 현재 보고 있는 이미지 번호

    if (lightbox) {
        // 1. 사진 클릭 시 열기
        document.querySelectorAll('.photo-item').forEach(item => {
            item.addEventListener('click', function() {
                // data-images에 적힌 주소들을 배열로 만듦
                const imagesStr = this.getAttribute('data-images');
                currentImgArray = imagesStr.split(','); 
                currentIdx = 0; // 첫 번째 사진부터 시작
                
                const title = this.querySelector('.photo-title').innerText;
                lightboxCaption.innerText = title;
                
                updateLightbox();
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // 2. 이미지 업데이트 함수
        function updateLightbox() {
            lightboxImg.src = currentImgArray[currentIdx];
            currentIdxText.innerText = currentIdx + 1;
            totalIdxText.innerText = currentImgArray.length;
        }

        // 3. 이전/다음 버튼 이벤트
        document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation(); // 배경 클릭 이벤트 전파 방지
            currentIdx = (currentIdx <= 0) ? currentImgArray.length - 1 : currentIdx - 1;
            updateLightbox();
        });

        document.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            currentIdx = (currentIdx >= currentImgArray.length - 1) ? 0 : currentIdx + 1;
            updateLightbox();
        });

        // 4. 닫기 기능 (배경 클릭 등)
        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        };

        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });

        // 키보드 화살표 지원
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'ArrowLeft') document.querySelector('.lightbox-prev').click();
                if (e.key === 'ArrowRight') document.querySelector('.lightbox-next').click();
                if (e.key === 'Escape') closeLightbox();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. 정확한 요소 찾아오기
    const burgerBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('main-nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.onclick = function() {
            // CSS에 정의된 'active' 클래스를 토글
            navMenu.classList.toggle('active');
            
            // 버튼 아이콘 모양도 바뀌게 되어있다면 버튼에도 active 토글
            this.classList.toggle('active');

            // 메뉴가 열렸을 때(active가 있을 때) 스크롤 제어
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };
    }

    // 2. 메뉴 링크 클릭 시 자동으로 닫기 (이 기능이 없으면 페이지 이동 시 버벅임)
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
        link.onclick = function() {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        };
    });
});