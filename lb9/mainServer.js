const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const turtleService = require('./services/turtleService');
const pizzaRouter=require('./routes/pizzaRouter')
const weaponRouter=require('./routes/weaponRouter')
const turtleRouter=require('./routes/turtleRouter')
const multer = require('multer');
const upload = multer({ dest: 'images/' })
app.use('/images/', express.static('images'));


app.use('/api',turtleRouter );
app.use('/api',weaponRouter );
app.use('/api',pizzaRouter );


app.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: '404'});
  }
});
app.get('/upload', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'upload.html'));
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: '404'});
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  let turtleId = req.body.turtleId;
  let turtle = await turtleService.getTurtleById(turtleId);
  if (!turtle) {
    return res.status(404).send('Turtle не найден');
  }
  let imagePath = path.join('images', `turtle_${turtleId}.jpg`);

  fs.rename(req.file.path, imagePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Save error');
    }

    turtle.image =imagePath;
    turtle.save();
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});