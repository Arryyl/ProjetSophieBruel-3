const Categories = "http://localhost:5678/api/categories";
const Works = "http://localhost:5678/api/works";

//declaration categories
async function getCategories() {
  try {
    const result = await fetch(Categories);
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
    const result = await fetch(Works);
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

  const imageElement = document.createElement("img");
  imageElement.src = figure.image;

  const descriptionElement = document.createElement("figcaption");
  descriptionElement.innerText = figure.description;

  //rattachement
  const divGallery = document.querySelector(".gallery");

  divGallery.appendChild(imageElement);
  divGallery.appendChild(descriptionElement);
}

createGallery();
