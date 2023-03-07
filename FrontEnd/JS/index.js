const categories = "http://localhost:5678/api/categories";
const works = "http://localhost:5678/api/works";

// Récupération des catégories
async function getCategories() {
  try {
    const result = await fetch(categories);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
    } else {
      console.log("Error !");
    }
  } catch (error) {
    console.log(error);
  }
}
getCategories();

// Récupération des oeuvres
async function getWorks() {
  try {
    const result = await fetch(works);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
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

document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.querySelector("#portfolio .gallery");
  const allBtn = document.querySelector(".btn-tous");
  const objetsBtn = document.querySelector(".btn-objets");
  const appartementsBtn = document.querySelector(".btn-appartements");
  const hotelsrestaurantsBtn = document.querySelector(".btn-hotelsrestaurants");

  function loadGallery() {
    galleryContainer.innerHTML = "";
    createGallery();
  }

  function filterGallery(category) {
    console.log("Filtering gallery with category:", category);
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
      console.log("Filtering gallery with category: all");
      filterGallery("all");
    });
  }

  if (objetsBtn) {
    objetsBtn.addEventListener("click", function () {
      console.log("Filtering gallery with category: objets");
      filterGallery("objets");
    });
  }

  if (appartementsBtn) {
    appartementsBtn.addEventListener("click", function () {
      console.log("Filtering gallery with category: appartements");
      filterGallery("appartements");
    });
  }

  if (hotelsrestaurantsBtn) {
    hotelsrestaurantsBtn.addEventListener("click", function () {
      console.log("Filtering gallery with category: hotels-restaurants");
      filterGallery("hotels-restaurants");
    });
  }

  loadGallery();
});
