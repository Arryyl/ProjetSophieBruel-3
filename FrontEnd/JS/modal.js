import { getWorks } from "./index.js";

let travauxModal = [];

let token = sessionStorage.getItem("token");

async function getWorksModal() {
  // Appel de l'API pour récupérer les travaux modal
  const reponse = await fetch(`http://localhost:5678/api/works/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  if (reponse.ok === true && token) {
    // Réponse de l'API
    travauxModal = await reponse.json();
    //console.log(travauxModal);

    genererElementsModal(travauxModal);
  } else {
    throw new Error(`Impossible d'accéder au serveur !`);
  }
}

await getWorksModal();

let categoriesOptionModal = [];
// Appel de l'API catégorie
async function getCategoryOptionModal() {
  const reponse = await fetch(`http://localhost:5678/api/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (reponse.ok === true && token) {
    // Réponse de l'API (catégories) au format JSON
    categoriesOptionModal = await reponse.json();
    //console.log(categoriesOptionModal);

    genererOption();
  } else {
    throw new Error("Impossible d'accéder au serveur !");
  }
}

getCategoryOptionModal();

// Récupération de la balise <select>
const selectGroupe = document.querySelector("#categoriePictures");

async function genererOption() {
  for (let categorieId of categoriesOptionModal) {
    //console.log(categorieId.id);

    // Création des balise <option>
    let option = document.createElement("option");
    option.innerText = categorieId.name;

    option.setAttribute("value", categorieId.id);
    option.setAttribute("class", "groupeOption");

    selectGroupe.append(option);
  }
}

// HEADER AVEC BANNIERE EDITEUR
function changeIndexHtml() {
  // Récupération de la balise header
  const headerIndex = document.querySelector("header");
  headerIndex.setAttribute("id", "headerEdition");
  headerIndex.style.margin = "0";

  // Création d'une div pour la bannière en mode editeur
  const banniereDiv = document.createElement("div");
  banniereDiv.setAttribute("id", "bloc-mode-editeur");

  // Récupération du titre et du menu de nav
  const titreIndex = document.querySelector("h1");
  const navIndex = document.querySelector("header nav");

  // Création d'une div blocHeader
  const blocHeader = document.createElement("div");
  blocHeader.setAttribute("id", "bloc-header");

  // Ajout des enfants (titre et menu nav) au blocHeader
  blocHeader.append(titreIndex);
  blocHeader.append(navIndex);

  // Ajout des enfants (div : blocHeader et bannière) au header
  headerIndex.append(blocHeader);
  headerIndex.append(banniereDiv);

  // Placement de la bannière avant le blocHeader
  banniereDiv.after(blocHeader);

  // Ajout de l'icone, paragraphe et bouton
  banniereDiv.innerHTML =
    `<i class="fa-regular fa-pen-to-square"></i>` +
    `<p>Mode édition</p>` +
    `<button type="submit" id="publierChangements">publier les changements</button>`;

  // //  Récupération id login pour faire le retour index
  let logout = document.querySelector(".login");
  logout.innerHTML = "logout";
  logout.setAttribute("href", "index.html");
  logout.addEventListener("click", logoutIndex);

  // Fonction pour retrouner sur la page index
  function logoutIndex(e) {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  }
}
changeIndexHtml();

// BOUTON MODIFIER
function creationBoutonModifier() {
  // BOUTON MODIFIER INTRODUCTION
  let btnModifier;
  // Récupération de la balise figure pour ajouter btn modifier
  const figureIntroIndex = document.querySelector("#introduction figure");
  figureIntroIndex.setAttribute("id", "figureIntro");

  // Création du bouton modifier
  btnModifier = document.createElement("a");
  btnModifier.setAttribute("class", "btnModifierEditer");
  btnModifier.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;

  // Ajout du bouton au parent
  figureIntroIndex.append(btnModifier);

  // BOUTON MODIFIER MES PROJETS H2
  // Récupération de la section avec id portfolio et du titre h2
  const portfolio = document.querySelector("#portfolio");
  const titleProjets = document.querySelector("#portfolio h2");

  // Création d'une div pour ajouter le titre et un btn modifier
  const divH2 = document.createElement("div");
  divH2.setAttribute("id", "bloc-h2");

  // Récupération des filtres pour display none en mode édition
  const filters = document.querySelector(".filtres");
  filters.style.display = "none";

  // Ajout du h2 à la div (divH2)
  divH2.append(titleProjets);

  // Ajout de la divH2 à la section portfolio
  portfolio.append(divH2);

  // Passer la divH2 avant les filtres
  filters.before(divH2);

  // Création du bouton modifier
  btnModifier = document.createElement("a");
  btnModifier.setAttribute("class", "btnModifierEditer");
  btnModifier.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>modifier`;

  // Ajout du bouton à la divH2
  divH2.append(btnModifier);
}
creationBoutonModifier();

async function genererElementsModal(travauxModal) {
  for (let i = 0; i < travauxModal.length; i++) {
    // Création d'une balise dédiée au éléments  du tableau
    const cardElement = document.createElement("figure");
    cardElement.setAttribute("class", "figureModal");
    // cardElement.id = travauxModal[i].id
    // console.log(cardElement)

    cardElement.setAttribute("id", travauxModal[i].id);

    // let iconCorbeille = `<button id="btnFigure" class="fa-solid fa-trash-can iconFigure"></i></button>`;
    // let iconCorbeille = `<button class="fa-solid fa-trash-can iconPoubelle  btnPoubelle"></i></button>`;
    // cardElement.innerHTML = iconCorbeille;

    let btnIconPoubelle = document.createElement("button");
    btnIconPoubelle.setAttribute(
      "class",
      "fa-solid fa-trash-can iconPoubelle  btnPoubelle"
    );
    // btnIconPoubelle.setAttribute("id", travauxModal[i].id)

    btnIconPoubelle.id = travauxModal[i].id;
    btnIconPoubelle.style.display = "block";
    cardElement.append(btnIconPoubelle);

    let btnIconFlecheEdit = document.createElement("button");
    btnIconFlecheEdit.setAttribute(
      "class",
      "fa-solid fa-up-down-left-right iconFlecheEdit"
    );

    cardElement.append(btnIconFlecheEdit);

    // Création de l'élément img
    const imageElement = document.createElement("img");
    imageElement.src = travauxModal[i].imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = "editer";

    // On rattache les balise img et figcation à la balise figure
    cardElement.appendChild(imageElement);
    cardElement.appendChild(figcaptionElement);

    // On rattache la balise figure à son parent .gallery
    document.querySelector(".modal-wrapperTravaux").appendChild(cardElement);

    btnIconPoubelle.addEventListener("click", deleted);
  }
}

//Bouton poubelle
async function deleted(event) {
  event.preventDefault();

  const id = event.target.id;

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (response.ok) {
    document.querySelector(".modal-wrapperTravaux").innerHTML = "";
    getWorksModal();
    // genererElementsModal()
    document.querySelector(".gallery").innerHTML = "";

    getWorks();
  } else {
    throw new Error("Impossible");
  }
}

// ********** Fonction ouvrir/fermer modal **********

let modal = null;

// Fonction pour ouvrir la modale
const openModal = function (e) {
  e.preventDefault();
  // On stock la modale dans la const target
  const target = document.querySelector(".modal");

  // On retire le display: "none"
  target.style.display = null;

  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");

  modal = target;

  // On ajoute un event à la modal qui a pour fonction "closeModal"
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-btn-close").addEventListener("click", closeModal);

  /* On ajoute un event à la modal pour stop la propagation quand on 
        clique sur la modal pour que la fenêtre (modal) ne se ferme pas
        */
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// Fonction pour fermer la modale
function closeModal(e) {
  if (modal === null) return;
  e.preventDefault();

  // On remet le display sur "none", car on veut la faire disparaître
  modal.style.display = "none";

  // On remet l'attribut aria-hidden sur "true"
  modal.setAttribute("aria-hidden", "true");

  // On retire l'attribut aria-modal pour le remettre sur "false"
  modal.removeAttribute("aria-modal");

  // On retire l'event closeModal
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-btn-close").removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);

  // Quand on ferme la modale, on remet le display à null pour "galerie photo" et à "none" pour "ajouter photo"
  modal.querySelector(".modal-wrapper").style.display = null;
  modal.querySelector(".modal-wrapper-add-pictures").style.display = "none";

  modal = null;

  // On reset le formulaire si on ferme la modale
  document.querySelector("#formAddTravaux").reset();

  // On retire l'ajout de l'image si on ferme la modale
  const figureImageFile = document.getElementById("figureImageFile");
  if (figureImageFile) {
    figureImageFile.remove();
  }

  // On remet le display à "none" pour la div de confirmation "travail ajouté" si on quitte la modale
  const confirmAddWorks = document.querySelector("#confirmAddWorks");
  if (confirmAddWorks) {
    confirmAddWorks.style.display = "none";
  }

  const messageErreur = document.querySelector(".messageErreur");
  if (messageErreur) {
    messageErreur.style.display = "none";
  }
}

// ********** ///

// Récupération de la div pour ajouter les travaux
const addPictures = document.querySelector(
  '.modal-wrapper input[type="submit"]'
);
addPictures.addEventListener("click", newModal);

// Fonction pour ouvrir la div "Ajouter photo"
function newModal(e) {
  e.preventDefault();

  modal.querySelector(".modal-wrapper").style.display = "none";
  modal.querySelector(".modal-wrapper-add-pictures").style.display = null;
  // modal1.style.display = "none"
  // newModal2.style.display = null
  modal.addEventListener("click", closeModal);
  modal
    .querySelector(".js-btn-close-pictures")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop-pictures")
    .addEventListener("click", stopPropagation);
}

// Récupération de la flèche pour faire un retour
document.querySelector(".arrow-left").addEventListener("click", retour);

// Fonction pour revenir à la gestion de la galerie photo
function retour(e) {
  e.preventDefault();
  modal.querySelector(".modal-wrapper").style.display = null;
  modal.querySelector(".modal-wrapper-add-pictures").style.display = "none";

  // On reset le formulaire d'ajout de travaux quand on fait un retour
  document.querySelector("#formAddTravaux").reset();

  // On remove l'image de prévisualisation si elle existe
  const figureImageFile = document.getElementById("figureImageFile");
  if (figureImageFile) {
    figureImageFile.remove();
  }

  // On display none la div de confirmation de travaux ajouté si on fait un retour
  document.querySelector("#confirmAddWorks").style.display = "none";
}

// Fonction pour stoper la propagation par défaut
const stopPropagation = function (e) {
  e.stopPropagation();
};

// On récupère nos boutons "modifier" puis on y ajoute un event
document.querySelectorAll(".btnModifierEditer").forEach((a) => {
  a.addEventListener("click", openModal);
});

//  On ajoute un event "keydown" pour permettre de quitter la modal avec la touche "Echap"
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// };

// ********** Ajout travaux **********

// Fonction qui vérifie la validiter de l'input
const title = document.querySelector("#titrePictures");

// On ajoute un listener "invalid"
title.addEventListener("invalid", function (event) {
  event.target.setCustomValidity("");

  if (!event.target.validity.valid) {
    // Si le champ est vide on modifie le message
    if (event.target.value.length == 0) {
      event.target.setCustomValidity("Veuillez ajouter un titre");
    }
  }
});

// Récupération de la div pour afficher le message si l'envoie des travaux a réussi

const confirmAddWorks = document.querySelector("#confirmAddWorks");
// Récupération de la balise pour mettre un message d'erreur
let myErrorForm = document.querySelector(".messageErreur");

function ajoutTravaux() {
  const formAjoutTravaux = document.querySelector("#formAddTravaux");
  const btnValider = document.querySelector("#btnValider");

  // Ajout d'un événement input aux champs titre et image
  const titreInput = document.querySelector("#titrePictures");
  titreInput.addEventListener("input", function () {
    checkInputsValidity();
  });
  const imageInput = document.querySelector("#addPictures");
  imageInput.addEventListener("input", function () {
    checkInputsValidity();
  });

  // Ajout d'un événement change pour détecter la suppression de la photo
  imageInput.addEventListener("change", function () {
    if (!imageInput.files || !imageInput.files[0]) {
      // La photo a été supprimée
      checkInputsValidity();
    }
  });

  // Fonction pour vérifier la validité des champs
  function checkInputsValidity() {
    let titreValide = titreInput.value.trim() !== "";
    let imageValide = imageInput.files && imageInput.files.length > 0;
    btnValider.disabled = !(titreValide && imageValide);
  }

  // On ajoute un Listener submit
  formAjoutTravaux.addEventListener("submit", async function (e) {
    e.preventDefault();

    let title = document.querySelector("#titrePictures").value;
    let image = document.querySelector("#addPictures").files[0];
    let category = document.querySelector("#categoriePictures").value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("category", category);

    const response = await fetch(`http://localhost:5678/api/works/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    });

    if (response.ok) {
      document.querySelector("#formAddTravaux").reset();
      modal.removeEventListener("click", closeModal);
      modal
        .querySelector(".js-btn-close-pictures")
        .removeEventListener("click", closeModal);
      modal
        .querySelector(".js-modal-stop-pictures")
        .removeEventListener("click", stopPropagation);
      confirmAddWorks.style.display = null;
      document.querySelector(".modal-wrapperTravaux").innerHTML = "";
      getWorksModal();
      document.querySelector(".gallery").innerHTML = "";
      getWorks();
      myErrorForm = document.querySelector(".messageErreur");
      myErrorForm.style.display = "none";
      btnValider.disabled = true;
    } else {
      myErrorForm = document.querySelector(".messageErreur");
      myErrorForm.style.display = "block";
      myErrorForm.innerText =
        "Erreur dans le formulaire, veuillez ajouter une image";
      throw new Error(`Une erreur est survenue`);
    }
  });

  // Ajout d'un Listener pour désactiver le bouton si le formulaire est fermé sans être validé
  document
    .querySelector(".js-btn-close-pictures")
    .addEventListener("click", function () {
      btnValider.disabled = true;
    });

  // Appel de la fonction pour vérifier la validité des champs au chargement de la page
  checkInputsValidity();
}

ajoutTravaux();

// On récupère notre btn de confirmation
const btnConfirmAddWorks = document.querySelector("#btnConfirmAddWorks");

// On ajoute un listener
btnConfirmAddWorks.addEventListener("click", (e) => {
  e.preventDefault();
  // On remove l'image si le formulaire est envoyé
  document.getElementById("figureImageFile").remove();
  // On remet le listener pour close modal
  modal.addEventListener("click", closeModal);

  modal
    .querySelector(".js-btn-close-pictures")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop-pictures")
    .addEventListener("click", stopPropagation);

  // On retire ensuite le message de validation
  confirmAddWorks.style.display = "none";
});

// *********************************************************

// Prévisualisation de l'image

// Récupération de l'input pour ajouter des travaux
const fileUploadInput = document.querySelector("#addPictures");

fileUploadInput.addEventListener("change", previewFile);

// fonction pour prévilualiser l'image
function previewFile(e) {
  e.preventDefault();
  // Regex
  const file_extendion_regex = /\.(jpe?g|png|gif)$/i;

  let imgFiles = fileUploadInput.files;

  // Pour ne pas exécuter le code si files.length = 0 ou regex incorecte
  if (
    fileUploadInput.files.length === 0 ||
    !file_extendion_regex.test(imgFiles[0].name)
  ) {
    return;
  }

  // stocker le fichier
  const file = imgFiles[0];

  const file_reader = new FileReader();

  // Lire le fichier avec readAdDataURL
  file_reader.readAsDataURL(file);

  file_reader.addEventListener("load", function (event) {
    displayImage(event, file);
    event.preventDefault();
  });
}

function displayImage(event, file) {
  event.preventDefault();
  event.stopPropagation();

  // Récupération du de la div pour ajouter l'image
  const blocImage = document.querySelector("#bloc-add-pictures");

  // Création d'une div pour accueillir l'image
  const figureImageFile = document.createElement("figure");
  figureImageFile.setAttribute("id", "figureImageFile");

  // Création d'une image
  const imageElement = document.createElement("img");

  // On récupère le resultat de l'image
  imageElement.src = event.target.result;
  imageElement.setAttribute("id", "imgFileInput");

  // On créer un bouton pour pouvoir supprimer l'image
  const delete_button_element = document.createElement("button");
  delete_button_element.setAttribute(
    "class",
    "fa-solid fa-trash-can image_delete_button"
  );

  // On ajoute l'élément image et le bouton à la div qui accueil l'image
  figureImageFile.append(imageElement);
  figureImageFile.append(delete_button_element);

  // On ajoute la duvImage au parent bloc-add-pictures
  blocImage.append(figureImageFile);

  // Fonction qui supprime l'image au click
  delete_button_element.addEventListener("click", (event) => {
    fileUploadInput.value = "";

    // Récupération du parent (figureImageFile)
    event.target.parentElement.remove();
  });
}

const userImage = document.querySelector("#addPictures");
userImage.addEventListener("input", function (e) {
  e.preventDefault();

  const fileList = userImage.files;
});
