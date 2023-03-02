const categories = "http://localhost:5678/api/categories";
const works = "http://localhost:5678/api/works";

//declaration categories
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

//Declaration works
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

//Creation de balises
async function createGallery() {
  const works = await getWorks();
  const figure = works[0];

  for (let i = 0; i < works.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = figure.image;

    const descriptionElement = document.createElement("figcaption");
    descriptionElement.innerText = figure.description;

    //rattachement
    const divGallery = document.querySelector(".gallery");

    divGallery.appendChild(imageElement);
    divGallery.appendChild(descriptionElement);
  }
}

createGallery();
