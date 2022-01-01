import {FC} from 'react';
import {IIngredient} from 'interfaces/menu';
import Ingredient from './Ingredient';

const IngredientsList: FC<{ingredients: IIngredient[]}> = ({ingredients}) => {
  return (
    <ul className="ingredients">
      {ingredients.map((ingredient, i) => (
        <Ingredient key={i} {...ingredient} />
      ))}
    </ul>
  );
};

export default IngredientsList;
