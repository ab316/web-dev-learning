import {FC} from 'react';
import {IIngredient} from 'interfaces/menu';

const Ingredient: FC<IIngredient> = ({name, amount, measurement}) => {
  return (
    <li>
      {amount} {measurement} {name}
    </li>
  );
};

export default Ingredient;
