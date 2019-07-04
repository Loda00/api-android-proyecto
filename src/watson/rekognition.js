const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const { writeFile } = require('fs');
const { VERSION, KEY } = process.env

const visualRecognition = new VisualRecognitionV3({
  version: VERSION,
  iam_apikey: KEY
});

async function visualRekognition(img) {

  const images_file = fs.createReadStream(img);
  const classifier_ids = ["DefaultCustomModel_56609857"];
  const threshold = 0.8;

  const params = {
    images_file: images_file,
    classifier_ids: classifier_ids,
    threshold: threshold
  };

  let result;

  try {
    result = await visualRecognition.classify(params)
    fs.writeFile('./error/err.txt', JSON.stringify(result), e => {
      console.log('created')
    })
  } catch (error) {
    console.log(error);
  }
  return result
}


module.exports = {
  visualRekognition
}
