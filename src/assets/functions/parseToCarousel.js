export const parseToCarousel = (recipe, recipeType, i) => ({
  testid: `${i}-recomendation-card`,
  thumb: recipe[`str${recipeType}Thumb`],
  name: recipe[`str${recipeType}`],
  id: recipe[`id${recipeType}`],
  recipeType,
});

export const dummy = '';
