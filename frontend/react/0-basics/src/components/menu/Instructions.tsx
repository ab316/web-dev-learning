import {FC} from 'react';

const Instructions: FC<{title: string; steps: string[]}> = ({title, steps}) => {
  return (
    <section className="instructions">
      <h2>{title}</h2>
      {steps.map((step, i) => (
        <p key={i}>{step}</p>
      ))}
    </section>
  );
};

export default Instructions;
