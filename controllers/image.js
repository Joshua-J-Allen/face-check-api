const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '48c7a14443c4431ca5dad2fe820cdde9'
});


const handleApiCall = (req, res) => {
  const { input } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}


const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('Unable To Receive Entries.'))
}

module.exports = {
  handleImage,
  handleApiCall
}
