const apiKey = 'api key';

async function findRecipes() {
  const ingredient = document.getElementById('ingredientInput').value;
  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=3&apiKey=${apiKey}`);
  const recipes = await response.json();
  //const cuisine = document.getElementById('cuisineSelect').value;537df46f238149e0be317a721e40a9cb
//const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${ingredient}&cuisine=${cuisine}&number=3&apiKey=${apiKey}`);

  
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  for (let recipe of recipes) {
    const detailsRes = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`);
    const details = await detailsRes.json();

    const recipeHTML = `
      <div class="recipe">
        <h2>${details.title}</h2>
        <img src="${details.image}" alt="${details.title}">
        <p><strong>Ingredients:</strong> ${details.extendedIngredients.map(i => i.original).join(', ')}</p>
        <p><strong>Instructions:</strong> ${details.instructions || 'No instructions provided.'}</p>
      </div>
    `;
    resultsDiv.innerHTML += recipeHTML;
  }
}
