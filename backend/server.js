const app = require('./app.js');

// PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
