import { AppBar, Box, Container, IconButton, Menu, Toolbar, Typography, MenuItem, Button} from "@mui/material";
import { useState } from "react";


function MenuResponsivo() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar  position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>                   
                  </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>   
                    <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 4, color: 'white', display: 'block', fontSize: '15px' }}>
                          Roupas Cristã
                      </Button>   
                      <Button href="http://localhost:3000/login"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                          Login
                      </Button>
                      <Button href="http://localhost:3000/cadastro"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                          Cadastrar-se
                      </Button>
                      <Button href="http://localhost:3000/Roupas"
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                          Roupa
                      </Button>    
                    </Box>
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default MenuResponsivo;