import {FC} from 'react';
import {IRecipe} from 'interfaces/menu';
import Instructions from './Instructions';
import IngredientsList from './IngredientsList';
import StarRating from './StarRating';

const Recipe: FC<IRecipe> = ({name, ingredients, steps}) => {
  return (
    <section id="baked-salmon">
      <h1>{name}</h1>
      <IngredientsList ingredients={ingredients} />
      <Instructions title="Cooking Instructions" steps={steps} />
      <StarRating />
    </section>
  );
};

export default Recipe;
