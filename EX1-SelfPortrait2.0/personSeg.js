let bodySegmentation;
let video;
let segmentation;

let options = {
  maskType: "person",
};

function setupBodySegmentation(inputVideo) {
  video = inputVideo;
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
  bodySegmentation.detectStart(video, gotResults);
}

function gotResults(result) {
  segmentation = result;
}

function captureImage() {
  let segmentedImg = get(0, 0, width, height);
  if (segmentedImg) {
    segmentedImg.loadPixels();
    for (let i = 0; i < segmentedImg.pixels.length; i += 4) {
      if (segmentedImg.pixels[i] === 0 && segmentedImg.pixels[i + 1] === 0 && segmentedImg.pixels[i + 2] === 0) {
        segmentedImg.pixels[i + 3] = 0;
      }
    }
    segmentedImg.updatePixels();
  }
  return segmentedImg;
}

const personSeg = {
  setupBodySegmentation,
  captureImage,
};
