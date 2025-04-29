async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    const mediaList = data.media; // Chỗ này lấy media ra
    const cuisineList = data.cuisine; // Chỗ này lấy cuisine ra
    console.log(mediaList); // Kiểm tra xem đã lấy được chưa

    renderMedia(mediaList);
    renderCuisine(cuisineList);
  } catch (error) {
    console.error("Error fetching media:", error);
  }
}

function renderMedia(mediaArray) {
  const mediaListContainer = document.getElementById("media-list");
  mediaListContainer.innerHTML = ""; // Clear trước

  mediaArray.forEach((media) => {
    const mediaItem = document.createElement("div");
    mediaItem.classList.add("media-item");
    mediaItem.innerHTML = `
        <div class="media-image">
          <img src="${media.image}" alt="${media.title}">
        </div>
        <div class="media-info">
          <h4>${media.title}</h4>
          <p>${media.description}</p>
          <span>${media.date}</span>
          <div class="see-more-button">
            <a href="#">
                See More <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
      `;
    mediaListContainer.appendChild(mediaItem);
  });
}

function renderCuisine(cuisineArray) {
  const cuisineListContainer = document.getElementById("cuisine-list");
  cuisineListContainer.innerHTML = ""; // Clear trước

  cuisineArray.forEach((cuisine) => {
    const cuisineItem = document.createElement("div");
    cuisineItem.classList.add("cuisine-item");
    cuisineItem.innerHTML = `
          <div class="cuisine-image">
            <img src="${cuisine.image}" alt="${cuisine.title}">
          </div>
          <div class="cuisine-info">
            <h4>${cuisine.title}</h4>
            <p>${cuisine.description}</p>
            <div class="see-more-button">
                <a href="#">
                    See More <i class="fas fa-long-arrow-alt-right"></i>
                </a>
            </div>
          </div>
        `;
    cuisineListContainer.appendChild(cuisineItem);
  });
}

// Khi load trang thì gọi
fetchData();
