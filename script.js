
const items = [...document.querySelectorAll(".gallery-item")];
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

let visibleItems = [...items];
let currentIndex = 0;

// Filter images by category
filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        items.forEach(item => {
            const matches =
                category === "all" ||
                item.dataset.category === category;

            item.classList.toggle("hidden", !matches);
        });

        visibleItems = items.filter(
            item => !item.classList.contains("hidden")
        );
    });
});

// Open image in lightbox
function openLightbox(index) {
    if (!visibleItems.length) return;

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const img = item.querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = item.querySelector("p").textContent;

    lightbox.classList.add("show");
}

// Click a gallery image
items.forEach(item => {
    item.addEventListener("click", () => {
        openLightbox(visibleItems.indexOf(item));
    });
});

// Next image
document.getElementById("next").addEventListener("click", () => {
    openLightbox(currentIndex + 1);
});

// Previous image
document.getElementById("prev").addEventListener("click", () => {
    openLightbox(currentIndex - 1);
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

document.getElementById("close").addEventListener(
    "click", closeLightbox
);

// Close when clicking the background
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        openLightbox(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
        openLightbox(currentIndex - 1);
    } else if (event.key === "Escape") {
        closeLightbox();
    }
});
