import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [ email, setEmail ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] = useState( false );
  const [ erro, setErro ] = useState( false );
  const navigate = useNavigate();


    /* Eu realmente não entendi muita coisa dessa parte do codigo, mais creio que daqui 1 ou 2 meses praticando eu consiga.*/
  useEffect( () => {

   if( login ) {
    localStorage.setItem( "usuario" , JSON.stringify( {email: email } ) );
    setEmail( "" );
    setSenha( "" );
    navigate( "/" );
   }

  }, [ login ] );

  function Autenticar( evento )
  {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                senha: senha
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json.user ) {
           setLogin( true );
        } else {
          setErro( false );
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
            }}
            >
            <Typography component="h1" variant="h5">Entrar</Typography>
            { erro && ( <Alert severity="warning">Revise seus dados e tente novamente</Alert>) }
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal" 
                value={email}
                onChange={ (e) => setEmail( e.target.value) }
                fullWidth
                />
                <TextField 
                type="password" 
                label="Senha" 
                variant="filled"
                 margin="normal" 
                 fullWidth
                 value={senha}
                onChange={ (e) => setSenha( e.target.value) }
                 />

                <FormControlLabel
                control={ <Checkbox value={lembrar} nome="lembrar" onChange={ (e) => setLembrar( !lembrar ) } />}
                label="Lembrar-me"
                />
                <Button type="submit"  variant="contained" fullWidth sx={ {mt: 2, mb: 2 }}>Login</Button>
                <Grid container>
                    <Grid item xs>
                        Esqueci a senha
                    </Grid>
                    <Grid item>
                        Cadastrar
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
  )
}

export default Login