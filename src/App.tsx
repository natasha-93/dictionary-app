import React, { useEffect, useState } from "react";
import Definition from "./Definition";

const { REACT_APP_API_KEY } = process.env;

function App() {
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
    <div>
      <h2>Dictionary</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWord(inputWord);
          setInputWord("");
        }}
      >
        <input
          value={inputWord}
          placeholder="Enter a word or phrase.."
          onChange={(e) => {
            setInputWord(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
      <ol>
        {definitions.map((definition, index) => {
          return <Definition key={index} definition={definition} />;
        })}
      </ol>
    </div>
  );
}

export default App;
