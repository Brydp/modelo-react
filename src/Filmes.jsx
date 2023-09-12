import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

function Filmes() {
  const [ nome, setNome ] = useState( "" );
  const [ titulo, setTitulo ] = useState( "" );
  const [ descricao, setDescricao ] = useState( "" );
  const [ ano, setAno ] = useState( "" );
  const [ duracao, setDuracao ] = useState( "" );
  const [ categoria, setCategoria ] = useState( "" );
  const [ imagem, setImagem ] = useState( "" );
  const [ filmes, setFilmes ] = useState( "" );
  const [ erro, setErro] = useState( "" );
  
  function Filmes( evento ) {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "filmes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nome: nome,
                titulo: titulo,
                descricao: descricao,
                ano: ano,
                duracao: duracao,
                categoria: categoria,
                imagem: imagem
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json._id ) {
            setFilmes( true );
            setErro( false );
        } else {
            setErro( true );
            setFilmes( false );
        }

    } )
    .catch( ( erro ) => { setErro( true ) } )

  }
  return (
    <Container component="section" maxWidth="xs">
       <Box sx={{ 
            mt: 20,
            backgroundColor: "#A3D5FF",
            padding:"50px",
            borderRadius:"10px",
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
            }}>
                  <Typography component="h1" variant='h4'>Cadastrar o Filme</Typography>
                  { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2}}>Filme já cadastrado. Tente novamente por favor!</Alert>) }
                  { Filmes && ( <Alert severity="success" sx={{ mt: 2, mb: 2}}>obrigado por se cadastrar</Alert>) }

                  <Box component="form" onSubmit={Filmes}>
                  <TextField 
                    type="text" 
                    label="Nome" 
                    variant="filled" 
                    margin="normal" 
                    value={nome}
                    onChange={ (e) => setNome( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="Titulo" 
                    variant="filled" 
                    margin="normal" 
                    value={titulo}
                    onChange={ (e) => setTitulo( e.target.value) }
                    fullWidth
                    required
                />
                 <TextField 
                    type="text" 
                    label="Descricao" 
                    variant="filled" 
                    margin="normal" 
                    value={descricao}
                    onChange={ (e) => setDescricao( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="Ano" 
                    variant="filled" 
                    margin="normal" 
                    value={ano}
                    onChange={ (e) => setAno( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="Duracao" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={duracao}
                    onChange={ (e) => setDuracao( e.target.value) }
                    required
                 />
                 <TextField 
                    type="text" 
                    label="Categoria" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={categoria}
                    onChange={ (e) => setCategoria( e.target.value) }
                    required
                 />
                  <TextField 
                    type="img" 
                    label="Imagem" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={imagem}
                    onChange={ (e) => setImagem( e.target.value) }
                    required
                 />
                  <Button type="submit"  variant="contained" fullWidth sx={ {mt: 2, mb: 2 }}>Cadastrar o Filme</Button>
                </Box>
        </Box>
    </Container>
  )
}

export default Filmes