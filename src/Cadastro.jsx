import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';

function Cadastro() {
  const [ nome, setNome ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const [ telefone, setTelefone ] = useState( "" );
  const [ senha, setSenha ] = useState( "" );
  const [ cpf, setCpf ] = useState( "" );
  const [ cadastro, setCadastro ] = useState( false );
  const [ erro, setErro ] = useState( false );

  function Cadastrar( evento ) {
    evento.preventDefault();
    fetch( process.env.REACT_APP_BACKEND + "users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nome: nome,
                email: email,
                cpf: cpf,
                telefone: telefone,
                senha: senha
            }
        )
    } )
    .then( (resposta) => resposta.json() )
    .then( ( json ) => {

        if( json.cpf ) {
            setCadastro( true );
            setErro( false );
        } else {
            setErro( true );
            setCadastro( false );
        }

    } )
    .catch( ( erro ) => { setErro( true ) } )

  }

  useEffect( () => {

    setNome( "" );
    setEmail( "" );
    setCpf( "" );
    setTelefone( "" );
    setSenha( "" );
    //setCadastro( false );

  }, [ cadastro ] );

  return (
    <Container  component="section" maxWidth="xs">
         <Box sx={{ 
            mt: 20,
            backgroundColor: "#A3D5FF",
            padding:"50px",
            borderRadius:"10px",
            display: "flex",
            flexDirection:"column",
            alignItems:"center"
            }}>
                <Typography component="h1" variant='h4'>Cadastrar</Typography>

                { erro && ( <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Desculpe tente novamente</Alert> ) }
                { cadastro && ( <Alert severity="success" sx={{ mt: 2, mb: 2}}>obrigado por se cadastrar</Alert>) }

                <Box component="form" onSubmit={Cadastrar}>
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
                    type="email" 
                    label="Email" 
                    variant="filled" 
                    margin="normal" 
                    value={email}
                    onChange={ (e) => setEmail( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="text" 
                    label="Telefone" 
                    variant="filled" 
                    margin="normal" 
                    value={telefone}
                    onChange={ (e) => setTelefone( e.target.value) }
                    fullWidth
                    required
                />
                <TextField 
                    type="password" 
                    label="Senha" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={senha}
                    onChange={ (e) => setSenha( e.target.value) }
                    required
                 />
                 <TextField 
                    type="text" 
                    label="Cpf" 
                    variant="filled"
                    margin="normal" 
                    fullWidth
                    value={cpf}
                    onChange={ (e) => setCpf( e.target.value) }
                    required
                 />
                  <Button type="submit"  variant="contained" fullWidth sx={ {mt: 2, mb: 2 }}>Cadastrar</Button>
                </Box>
            </Box>
    </Container>
  )
}

export default Cadastro;