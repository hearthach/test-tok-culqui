import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("*************************************************************");
  console.log(`Servidor encendido de "Tokenización" en http://localhost:${port}`);
  console.log("*************************************************************");
});