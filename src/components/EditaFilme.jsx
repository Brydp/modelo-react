import {  Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function EditaFilme() {

    const { id } = useParams();

    console.log( id );

    const [ titulo, setTitulo ] = useState( "" );
    const [ descricao, setDescricao ] = useState( "" );
    const [ ano, setAno ] = useState( "" );
    const [ duracao, setDuracao ] = useState( "" );
    const [ categoria, setCategoria ] = useState( "" );
    const [ imagem, setImagem ] = useState( "" );
    const [ editar, setEditar ] = useState( false );
    const [ erro, setErro ] = useState( false );

    useEffect( () => { 
        fetch( process.env.REACT_APP_BACKEND + "filmes/" + id , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( (resposta) => resposta.json() )
        .then( ( json ) => {
        if( !json.status ) {
            setTitulo( json.titulo );
            setDescricao( json.descricao);
            setAno( json.ano);
            setDuracao( json.duracao);
            setCategoria( json.categoria);
            setImagem( json.imagem);
        } else {
            setErro( "Filme não encontrado" );
        }
    })
        .catch( ( erro ) => { setErro( true ) } )
    }, [] );

    function Editar( evento ) {
        evento.preventDefault();

        fetch( process.env.REACT_APP_BACKEND + "filmes", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id: id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    imagem: imagem,
                    categoria: categoria
                }
            )
        } )
        .then( (resposta) => resposta.json() )
        .then( ( json ) => {
    
            if( json._id ) {
                setEditar( true );
                setErro( false );
            } else {
                setErro( "Não foi possível editar filme " );
                setEditar( false );
            }
    
        } )
        .catch(( erro ) => { setErro( true ) })
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
                
                <Typography component="h1" variant='h4'>Editar</Typography>


                { erro && ( <Alert severity="warning">{erro}</Alert>)}
                { editar && ( <Alert severity="success">Filme editado com sucesso</Alert>)}


                <Box component="form" onSubmit={Editar}>
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
                    type="descricao" 
                    label="descricao" 
                    variant="filled" 
                    margin="normal" 
                    value={descricao}
                    onChange={ (e) => setDescricao( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="ano" 
                    variant="filled" 
                    margin="normal" 
                    value={ano}
                    onChange={ (e) => setAno( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="duracao" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={duracao}
                    onChange={ (e) => setDuracao( e.target.value) }
                    required
                 />
                 <TextField 
                    type="text" 
                    label="categoria" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={categoria}
                    onChange={ (e) => setCategoria( e.target.value) }
                    required
                 />
                  <TextField 
                    type="text" 
                    label="imagem" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={imagem}
                    onChange={ (e) => setImagem( e.target.value) }
                    required
                 />
                 <Button type="submit"  variant="contained" fullWidth sx={ {mt: 2, mb: 2 }}>Editar</Button>
                </Box>

                
        </Box>
    </Container>
  )
}

export default EditaFilme;