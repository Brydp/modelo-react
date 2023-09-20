import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Filme from "./components/Roupa";
import MenuResponsivo from "./components/MenuResponsivo";
import Roupa from "./components/Roupa";

function App() {

  const [ roupas, setRoupas ] = useState();
  const [ erro, setErro ] = useState();

  useEffect( () => {

    const usuario = localStorage.getItem( "usuario" );

    fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario , {
      headers: {
          'Content-Type': 'application/json'
      },
  } )
  .then( (resposta) => resposta.json() )
  .then( ( json ) => { setRoupas( json ) } )
  .catch( ( erro ) => { setErro( true ) } )
  }, [])

function Excluir( evento, id ) {
  evento.preventDefault();
  fetch( process.env.REACT_APP_BACKEND + "produtos", {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(
         {
           id: id,
           usuario: localStorage.getItem( "usuario" )
         }
       )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {
        const novaLista = roupas.filter( (roupas ) => roupas._id !== id );
        setRoupas( novaLista );
    })
    .catch( ( error ) => { setErro( true ) } )
}

  return (
    <>
    <MenuResponsivo />
      <h1></h1>
      <Container sx={{
        display: "flex" ,
        flexFlow: "row" ,
        flexWrap: "wrap" ,
        gap: "2rem"
      }}>
      { roupas && ( 
          roupas.map( (roupas, index ) => ( 
              <Roupa 
                  imagem={roupas.imagem}
                  titulo={roupas.titulo}
                  descricao={roupas.descricao}
                  categoria={roupas.categoria}
                  ano={roupas.ano}
                  duracao={roupas.duracao}
                  excluir={ (e) => Excluir( e, roupas._id ) }
                  id={ roupas._id} 
              />
          ) )
      ) }
      </Container>
    </>
  );
}

export default App;
