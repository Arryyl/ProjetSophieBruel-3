const categoriesEndpoint = "http://localhost:5678/api/categories";
const worksEndpoint = "http://localhost:5678/api/works";

// Récupération des catégories
async function getCategories() {
  try {
    const result = await fetch(categoriesEndpoint);
    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      console.log("Error !");
    }
  } catch (error) {
    console.log(error);
  }
}

// Récupération des oeuvres
async function getWorks() {
  try {
    const result = await fetch(worksEndpoint);
    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      console.log("Error !");
    }
  } catch (error) {
    console.log(error);
  }
}

// Création des balises HTML pour chaque oeuvre
async function createGallery() {
  const works = await getWorks();

  //boucle
  for (let i = 0; i < works.length; i++) {
    // Création de l'élément figure pour chaque oeuvre
    const figureElement = document.createElement("figure");
    figureElement.setAttribute("data-category-id", works[i].categoryId);

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title;

    // Ajout de l'image et de la légende à l'élément figure
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);

    // Rattachement de l'élément figure à la galerie
    const divGallery = document.querySelector(".gallery");
    divGallery.appendChild(figureElement);
  }
}

createGallery();

//Boutons filtres

document.addEventListener("DOMContentLoaded", async function () {
  const galleryContainer = document.querySelector("#portfolio .gallery");
  const allBtn = document.querySelector(".btn-tous");
  const objetsBtn = document.querySelector(".btn-objets");
  const appartementsBtn = document.querySelector(".btn-appartements");
  const hotelsrestaurantsBtn = document.querySelector(".btn-hotelsrestaurants");

  const categories = await getCategories();

  function loadGallery() {
    galleryContainer.innerHTML = "";
    createGallery();
  }

  function filterGallery(category) {
    const allFigures = document.querySelectorAll(".gallery figure");

    for (let i = 0; i < allFigures.length; i++) {
      const figure = allFigures[i];
      const categoryId = figure.getAttribute("data-category-id");

      if (category === "all") {
        figure.style.display = "block";
      } else if (categoryId === category) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  }

  if (allBtn) {
    allBtn.addEventListener("click", function () {
      filterGallery("all");
    });
  }

  if (objetsBtn) {
    objetsBtn.addEventListener("click", function () {
      filterGallery("1");
    });
  }

  if (appartementsBtn) {
    appartementsBtn.addEventListener("click", function () {
      filterGallery("2");
    });
  }

  if (hotelsrestaurantsBtn) {
    hotelsrestaurantsBtn.addEventListener("click", function () {
      filterGallery("3");
    });
  }

  load;
});
