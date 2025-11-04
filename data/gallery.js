const modal = document.getElementById("galleryModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal .close");
const galleryItems = document.querySelectorAll(".gallery-item img");

galleryItems.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if(e.target === modal) {
    modal.style.display = "none";
  }
});
