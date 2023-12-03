// Here i a using a Map to store the original description of each article.
const originalDescriptions = new Map();

const updateDescriptions = (wordCount) => {
  document
    .querySelectorAll(".new-articles .articles .article-description")
    .forEach((desc, index) => {
      const originalDescription = originalDescriptions.get(index);
      desc.textContent = `${originalDescription
        .split(" ")
        .slice(0, wordCount)
        .join(" ")}...`;
    });
};

const updateImageSource = () => {
  document.getElementById("main-image").src =
    window.innerWidth >= 968
      ? "/assets/images/image-web-3-desktop.jpg"
      : "/assets/images/image-web-3-mobile.jpg";
};

// I usually use another file for API calls. Since its a small project, I'm keeping it here.
fetch("https://6380ce5a786e112fe1ba951e.mockapi.io/Articles")
  .then((response) => response.json())
  .then((data) => {
    const articlesDiv = document.querySelector(".new-articles .articles");
    articlesDiv.innerHTML = "";
    data.slice(0, 3).forEach((article, index) => {
      originalDescriptions.set(index, article.description);
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";
      articleDiv.innerHTML = `<a class="article-heading" href="${
        article.url
      }">${article.title}</a>
        <p class="article-description">${article.description
          .split(" ")
          .slice(0, window.innerWidth > 1920 ? 20 : 10)
          .join(" ")}...</p>`;
      articlesDiv.appendChild(articleDiv);
    });
  })
  .catch((error) => console.error("Error fetching articles:", error));

//   Depending on the screen size, I'm showing a different number of words in the description.
window.addEventListener("load", () => {
  updateImageSource();
  updateDescriptions(window.innerWidth > 1920 ? 20 : 10);
});

window.addEventListener("resize", () => {
  updateImageSource();
  updateDescriptions(window.innerWidth > 1920 ? 20 : 10);
});

// Hamburger to X
document.addEventListener("DOMContentLoaded", function () {
  var navIcon = document.querySelector(".nav-icon");
  var mobileMenu = document.querySelector(".mobile_menu");

  navIcon.addEventListener("click", function () {
    this.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("dark-overlay");
  });
});
