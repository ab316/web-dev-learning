import {FC} from 'react';
import {IRecipe} from 'interfaces/menu';
import Recipe from 'components/menu/Recipe';

interface Props {
  recipes: IRecipe[];
}

const Menu: FC<Props> = ({recipes}) => {
  return (
    <article style={{border: '1px solid #000', padding: '20px', marginBottom: '20px'}}>
      <header>
        <h1>Delicious Recipes</h1>
      </header>

      <div className="recipes">
        {recipes.map((recipe, i) => (
          <Recipe key={i} {...recipe} />
        ))}
      </div>
    </article>
  );
};

export default Menu;
