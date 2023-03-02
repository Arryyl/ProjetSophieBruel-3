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
    ///const worksElement = document.createElement("div");

    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;

    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title;

    // Rattachement des balises à la galerie
    const divGallery = document.querySelector(".gallery");
    ////divGallery.appendChild(worksElement);
    divGallery.appendChild(imageElement);
    divGallery.appendChild(titleElement);
  }
}

createGallery();

//Boutons filtres
