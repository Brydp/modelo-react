import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { createMuiTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#611d98',
        },
        secondary: {
          main: '#501496',
        },
        warning: {
          main: '#523b29',
        },
        text: {
          primary: 'rgba(143,61,239,0.87)',
          secondary: 'rgba(126,0,255,0.6)',
          disabled: 'rgba(130,66,191,0.38)',
          hint: '#633c92',
        },
        divider: 'rgba(96,49,160,0.92)',
      },

});

function Login() {

  const [ email, setEmail ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ lembrar, setLembrar ] = useState( false );
  const [ login, setLogin ] = useState( false );
  const [ erro, setErro ] = useState( false );
  const navigate = useNavigate();

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
    fetch( "https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: email,
                password: senha
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json.statusCode === 401 ) {
            setErro( false );
        } else {
            setLogin( true );
        }
    } )
    .catch( ( erro ) => { setErro( true ) } )

  }

  return (
    <ThemeProvider theme={theme}>
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
            <Box component="form" onSubmit={Autenticar}>
                <TextField 
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal" 
                value={email}
                onChange={ (e) => setEmail( e.target.value) }
                fullWidth/>
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
    </ThemeProvider>
  )
}

export default Login