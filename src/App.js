import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      id: '789',
      url: 'localhost',
      title: `Novo Projeto ${Date.now()}`,
      techs: [
        'Tech 1',
        'Tech 2'
      ]
    });

    const repository = response.data;
    console.log(repository);

    setRepositories([...repositories, repository]);
  }

  // async function handleAddLikes(id) {
  //   console.log(id);
  //   await api.post(`repositories/${id}/like`, {});
  //   return '';
  // }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`, {});
    console.log(id);
    setRepositories(repositories.filter((repository) => (repository.id !== id )));
    console.log(repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          <ul>
            {repositories.map(repository => <li key={repository.id} >{repository.title}
              {/* <button onClick={() => handleAddLikes(repository.id)}>
                +Likes
          </button> */}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>)}
          </ul>


        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
