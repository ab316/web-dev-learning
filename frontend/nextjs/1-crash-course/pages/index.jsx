import ArticleList from "../components/ArticleList";

export default function Home({ articles }) {
  return (
    <div>
      <title>NextJs</title>
      <ArticleList articles={articles} />
    </div>
  );
}

// Uses data from jsonplaceholder.com
// export const getStaticProps = async () => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts?_limit=6`
//   );
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

// Uses data from own API
export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3000/api/articles`);
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};
