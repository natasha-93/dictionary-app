import React, { useEffect, useState } from "react";
import Definition from "./Definition";
import styles from "./App.module.css";

const { REACT_APP_API_KEY } = process.env;

function App() {
  const [readMore, setReadMore] = useState(false);
  const [word, setWord] = useState<string>();
  const [inputWord, setInputWord] = useState("");
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    if (word == null) return;

    fetch(
      `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
          "x-rapidapi-key": `${REACT_APP_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then(({ entries }) => {
        const definitions = entries[0].lexemes
          .map((lexeme: any) =>
            lexeme.senses.map((sense: any) => sense.definition)
          )
          .flat();
        setDefinitions(definitions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [word]);

  return (
    <div className={styles.container}>
      <h1>Dictionary</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWord(inputWord);
          setInputWord("");
        }}
      >
        <input
          className={styles.searchBar}
          value={inputWord}
          placeholder="Enter a word or phrase.."
          onChange={(e) => {
            setInputWord(e.target.value);
          }}
        />
        <button className={styles.searchButton}>Search</button>
      </form>
      <p style={{ fontStyle: "italic" }}>{word}</p>
      <ol>
        {definitions.slice(0, 4).map((definition, index) => {
          return <Definition key={index} definition={definition} />;
        })}

        {readMore &&
          definitions.slice(5).map((definition, index) => {
            return <Definition key={index} definition={definition} />;
          })}

        {definitions.length > 4 && (
          <button
            className={styles.moreButton}
            onClick={(e) => setReadMore(!readMore)}
          >
            {readMore ? "Read less" : "Read more"}
          </button>
        )}
      </ol>
    </div>
  );
}

export default App;
