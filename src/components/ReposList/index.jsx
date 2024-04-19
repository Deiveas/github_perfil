/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";

import styles from "./ReposList.module.css";

// eslint-disable-next-line react/prop-types
const ReposList = ({ nomeUsuario }) => {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  useEffect(() => {
    setEstaCarregando(true);
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => res.json())
      .then((resJson) => {
        setTimeout(() => {
          setEstaCarregando(false);
          setRepos(resJson);
        }, 3000);
      });
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h1>Carregando...</h1>
      ) : (
        <ul className={styles.list}>
          {/* {repos.map(respositorio =>( */}
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
