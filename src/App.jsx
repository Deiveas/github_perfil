import { useState } from "react";
import Perfil from "./components/Perfil";
//import Formulario from "./components/Formulario";
import ReposList from "./components/ReposList";

function App() {
  //const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const botaoSubmit = (evento) => {
    evento.prevenDefault()
  }

  return (
    <>
    <div onSubmit={botaoSubmit}>
    <input
        type="text"
        onBlur={(e) => setNomeUsuario(e.target.value)}
        placeholder="Digite o nome do perfil"
      />
      <button type="submit">Buscar Perfil</button>
    </div>
      <>

        {nomeUsuario.length > 4 && (
          <>
            <Perfil nomeUsuario={nomeUsuario} />
            <ReposList nomeUsuario={nomeUsuario} />
          </>
        )}

        {/* {formularioEstaVisivel && (
      <Formulario/>
    )}

    <button onClick={() => setFormularioEstaVisivel(!formularioEstaVisivel)} type="button">Toggle form</button> */}
      </>
    </>
  );
}
export default App;
