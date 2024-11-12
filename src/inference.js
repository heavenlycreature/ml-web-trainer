const tf = require('@tensorflow/tfjs-node');

function loadModel() {
    const modelUrl = "file://models/model.json";
    return tf.loadLayersModel(modelUrl);
}

function predict(model, imageBuffer){
    const tensor = tf.node
    .decodeJpeg(imageBuffer)
    .resizeNearestNeighbor([150, 150])
    .expandDims()
    .toFloat();

    return model.predict(tensor).data();
}

module.exports = {loadModel, predict};