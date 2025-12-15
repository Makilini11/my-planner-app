import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AIRecommendations({ expenses, budgetLimit }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.post('https://your-server.com/ai-suggestions', { expenses, budgetLimit });
        setSuggestions(response.data.suggestions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggestions();
  }, [expenses, budgetLimit]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#444', borderRadius: '10px', marginBottom: '20px', color: 'white' }}>
      <h3>AI Suggestions</h3>
      {suggestions.length === 0 ? <p>No suggestions yet.</p> :
        <ul>{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>}
    </div>
  );
}
