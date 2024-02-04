const gallery = document.getElementById("gallery");
const paginationEl = document.getElementById("pagination");
const pageInfo = document.getElementById("pageInfo");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const sourceSelect = document.getElementById("sourceSelect");
const favouriteModal = document.getElementById("favouriteModal");
const favModalContent = document.getElementById("favContent");
const favShowBtn = document.getElementById("favShowBtn");
const favCloseBtn = document.getElementById("favCloseBtn");

let favouriteImages = JSON.parse(localStorage.getItem("favourites")) || [];
let currentPage = 1;
const itemsPerPage = 24;
let totalPages = 0;
let source = "unsplash";
let searchTerm;

const baseApis = {
  unsplash: `https://api.unsplash.com/search/photos?client_id=${apiKeys.unsplash}&query=`,
  pexels: "https://api.pexels.com/v1/search?query=",
  pixabay: `https://pixabay.com/api/?key=${apiKeys.pixabay}&image_type=photo&safesearch=true&q=`
};

async function fetchImages() {
  const encodedSearchTerm = encodeURIComponent(searchTerm);

  let apiUrl = `${baseApis[source]}${encodedSearchTerm}&per_page=${itemsPerPage}&page=${currentPage}`;
  const headers = source === "pexels" ? { "Authorization": apiKeys[source] } : {};
  //  console.log(apiUrl);
  try {
    const response = await fetch(apiUrl, { headers })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    switch (source) {
      case "unsplash":
        images = data.results.map(item => ({ url: item.urls.regular, text: item.alt_description, full: item.urls.full }));
        totalPages = data.total_pages;
        break;

      case "pixabay":
        images = data.hits.map(item => ({ url: item.webformatURL, text: item.tags, full: item.largeImageURL }));
        totalPages = Math.ceil(data.total / itemsPerPage);
        break;

      case "pexels":
        images = data.photos.map(item => ({ url: item.src.original, text: item.alt, full: item.src.large2x }));
        totalPages = Math.ceil(data.total_results / itemsPerPage);
        break;

      default:
        images = [];
        totalPages = 0;
    }
  } catch (error) {
    console.error("Error fetching images:", error);

    return alert(error.message);
  }
};

function displayImages(images, container, isFavImages = false) {
  container.innerHTML = "";

  if (!images.length) {
    container.innerHTML = `<p class="noImgText">No images were found.</p>`;
  }

  images.forEach(item => {
    const imgWrapper = document.createElement("article");
    imgWrapper.className = "wrapper";

    const img = document.createElement("img");
    img.src = item.url;
    img.alt = item.text;
    img.loading = "lazy";

    const controlDiv = document.createElement("div");
    controlDiv.className = "controls";

    const downloadBtn = createButton("📥", () => downloadImage(item.full));
    const shareBtn = createButton("↪️", () => shareImage(item.full));

    controlDiv.append(downloadBtn, shareBtn);

    if (isFavImages) {
      const removeBtn = createButton("Remove", () => removeFavourite(item, imgWrapper));
      controlDiv.append(removeBtn);
    } else {
      const likeBtn = createButton(isFavourited(item.url) ? "♥️" : "♡", () => toggleFavourite(item, likeBtn));
      controlDiv.append(likeBtn);
    }

    imgWrapper.append(img, controlDiv);
    container.appendChild(imgWrapper);
  });
};

const createButton = (label, onClick) => {
  const button = document.createElement("button");
  button.textContent = label;
  if (label === "Remove") {
    button.classList.add("removeBtn")
  }

  if (onClick) button.addEventListener("click", onClick);
  return button;
};

const createPagination = () => {
  paginationEl.innerHTML = "";
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  const buttons = [
    { label: "Current", page: currentPage, isCurrent: true }
    ];

  if (currentPage !== 1) {
    buttons.unshift({ label: "1", page: 1 }, { label: "<", page: currentPage - 1 })
  }

  if (currentPage < totalPages) {
    buttons.push({ label: ">", page: currentPage + 1 }, { label: "Last", page: totalPages })
  }

  buttons.forEach(({ label, page, isCurrent = false }) => {
    const button = createButton(isCurrent ? `(${page})` : label);

    if (!isCurrent) {
      button.addEventListener("click", () => {
        currentPage = page;
        loadImages();
      });
    }

    paginationEl.appendChild(button);
  });
};

async function loadImages() {
  await fetchImages();
  createPagination();
  displayImages(images, gallery);
};

function isFavourited(url) {
  return favouriteImages.some(item => item.url === url);
}

function updateLikeButton(url, likeButton) {
  likeButton.textContent = isFavourited(url) ? "♥️" : "♡";
}

function toggleFavourite(img, button) {
  if (isFavourited(img.url)) {
    const index = favouriteImages.indexOf(img);
    favouriteImages.splice(index, 1);
  } else {
    favouriteImages.push(img);
  }

  updateLikeButton(img.url, button);
  localStorage.setItem("favourites", JSON.stringify(favouriteImages));
}

function removeFavourite(img, wrapper) {
  const index = favouriteImages.indexOf(img);

  if (index !== -1) {
    favouriteImages.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(favouriteImages));
    wrapper.style.display = "none";
  }
}

function shareImage(url) {
  if (navigator.share) {
    navigator.share({
        title: "Check out this image!",
        text: "Found this awesome image",
        url
      })
      .catch((error) => console.error("Error sharing image:", error));
  } else {
    alert("Web Share API is not supported on your device/browser.");
  }
}

function downloadImage(url) {
  window.open(url, "_blank");
}

favShowBtn.addEventListener("click", () => {
  displayImages(favouriteImages, favModalContent, true);
  favouriteModal.showModal();
});

favCloseBtn.addEventListener("click", () => {
  favouriteModal.close();
});

// Initial loading
document.addEventListener("DOMContentLoaded", async () => {

  displayImages(images, gallery);
});

searchBtn.addEventListener("click", () => {
  searchTerm = searchInput.value.trim();
  if (!searchTerm)
    return alert("Please enter a keyword first!")
  loadImages();
});

sourceSelect.addEventListener("change", () => {
  source = sourceSelect.value;
});