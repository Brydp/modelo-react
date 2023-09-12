import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"

function Filme(props) {
  return (
   <Card  sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={props.imagem}
                alt={props.titulo}
            />
            <CardContent>
                <Typography variante="h5" component="div">
                    {props.titulo}
                </Typography>
                <Typography variante="body2" color="text.secondary">
                    {props.descricao}
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <span>{props.categoria}</span>
                    </Grid>
                    <Grid item xs={2}>
                    <span>{props.ano}</span>
                    </Grid>
                    <Grid item xs={2}>
                    <span>{props.duracao}</span>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
   </Card>
  )
}

export default Filme