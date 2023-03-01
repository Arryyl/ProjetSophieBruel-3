//declaration
const categories = "http://localhost:5678/api/categories";
const works = "http://localhost:5678/api/works";

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
getCategories(url);
