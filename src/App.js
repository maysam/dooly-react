import "./App.css";
import fetchSuggestions from "./fetchSuggestions";
import { useEffect, useRef, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  // const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const currentQuery = useRef("");
  useEffect(() => {
    currentQuery.current = query;
  }, [query]);

  useEffect(() => {
    fetchSuggestions(query).then((list) => {
      console.log({ c: currentQuery.current, query });
      if (currentQuery.current === query) {
        setSuggestions(list);
      }
    });
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="countryInputWrapper">
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
          <ul className="suggestionList">
            {!!suggestions.length &&
              suggestions.map((suggestion) => (
                <li className="suggestionItem" key={suggestion}>{suggestion}</li>
              ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
