/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import styles from "./ReposList.module.css";

// eslint-disable-next-line react/prop-types
const ReposList = ({ nomeUsuario }) => {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [usuarioInexistente, setUsuarioInexistente] = useState(false); // Definindo o estado inicial para usuarioInexistente

  useEffect(() => {
    setEstaCarregando(true);
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Usuário inexistente"); // Lançar um erro se a resposta não for ok
        }
      })
      .then((resJson) => {
        setTimeout(() => {
          setEstaCarregando(false);
          setRepos(resJson);
          setUsuarioInexistente(false); // Resetar o estado de usuarioInexistente se a requisição for bem-sucedida
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setEstaCarregando(false);
        setUsuarioInexistente(true); // Definir usuarioInexistente como true se ocorrer um erro
      });
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h1>Carregando...</h1>
      ) : usuarioInexistente ? (
        <h1 className={`${styles.errorMessage} errorMessage`}>Usuário Inexistente !!! <br/> Digite novamente !!!</h1>
      ) : (
        <ul className={styles.list}>
          {repos.map(({ id, name, language, html_url }) => (
            <li className={styles.listItem} key={id}>
              <div className={styles.itemName}>
                <b>Nome:</b>
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    textFit: "contain",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {name}
                </span>
              </div>

              <div className={styles.itemLanguage}>
                <b>Linguagem:</b>
                {language}
              </div>
              <a className={styles.itemLink} target="_blank" href={html_url}>
                Visite no GitHub
              </a>
            </li>
          ))}
        </ul>
      )}
      <footer className={styles.rodape}>
        <p>
          &copy; 2024 Desenvolvido por Deive Silva.
          <br /> Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default ReposList;
