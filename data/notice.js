const notices = [
  {title: "2025 호두까기인형 공연 안내", date:"2025-10-01", content:"2025년 호두까기인형 갈라 공연이 예정되어있습니다. 많은 관심 부탁드립니다."},
  {title: "후원회원 모집 안내", date:"2025-09-25", content:"화성시티발레단과 함께 할 후원회원 모집 중입니다. 자세한 내용은 홈페이지를 확인해주세요."},
  {title: "발레 관련 굿즈 판매 안내", date:"2025-09-15", content:"이번 2025 호두까기 인형 갈라 공연에서 굿즈를 제작해 판매하기로 결정됐습니다.\n굿즈는 네이버스토어 케이발레틱에서 구매 가능하며 공연 당일 부스에서도 구매 가능합니다. 많은 관심 부탁드립니다."},
  {title: "공지 4", date:"2025-09-14", content:"내용 4"},
  {title: "공지 5", date:"2025-09-13", content:"내용 5"},
  {title: "공지 6", date:"2025-09-12", content:"내용 6"},
  {title: "공지 7", date:"2025-09-11", content:"내용 7"},
  {title: "공지 8", date:"2025-09-10", content:"내용 8"},
  {title: "공지 9", date:"2025-09-09", content:"내용 9"},
  {title: "공지 10", date:"2025-09-08", content:"내용 10"},
  {title: "공지 11", date:"2025-09-07", content:"내용 11"},
  {title: "공지 12", date:"2025-09-06", content:"내용 12"}
];

const noticesPerPage = 10;
let currentPage = 1;

function renderNotices() {
  const list = document.querySelector(".notice-list");
  list.innerHTML = "";

  const start = (currentPage - 1) * noticesPerPage;
  const end = start + noticesPerPage;
  const pageNotices = notices.slice(start, end);

  pageNotices.forEach((notice, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <details>
        <summary>
          <span class="number">${start + index + 1}</span>
          <span class="title">${notice.title}</span>
          <span class="date">${notice.date}</span>
        </summary>
        <p>${notice.content.replace(/\n/g, "<br>")}</p>
      </details>
    `;
    list.appendChild(li);
  });

  // 페이지 정보
  let pageInfo = document.getElementById("pageInfo");
  if (!pageInfo) {
    pageInfo = document.createElement("span");
    pageInfo.id = "pageInfo";
    document.querySelector(".pagination").insertBefore(pageInfo, document.querySelector("#nextBtn"));
  }
  pageInfo.textContent = `${currentPage} / ${Math.ceil(notices.length / noticesPerPage)}`;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if(currentPage > 1) currentPage--;
  renderNotices();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if(currentPage < Math.ceil(notices.length / noticesPerPage)) currentPage++;
  renderNotices();
});

renderNotices();
