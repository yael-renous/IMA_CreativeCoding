// ui.js

let saveButton, resetButton, joinButton, captureButton;

function createSaveButton() {
    saveButton = createButton('Save Composition');
    saveButton.position(10, 10);
    saveButton.style('font-size', '16px');
    saveButton.mousePressed(saveComposition);
}

function createResetButton() {
    resetButton = createButton('Reset Composition');
    resetButton.position(10, 60);
    resetButton.style('font-size', '16px');
    resetButton.mousePressed(resetComposition);
}

function createJoinButton() {
    joinButton = createButton('Enter Composition!');
    joinButton.position(10, 110);
    joinButton.style('font-size', '16px');
    joinButton.mousePressed(joinComposition);
}

function createCaptureButton() {
    captureButton = createButton('Capture');
    captureButton.position(10, 160);
    captureButton.style('font-size', '16px');
    captureButton.mousePressed(capturedImage);
}


function saveComposition() {
    const compositionName = prompt('Enter a name for your composition:');
    if (compositionName) {
        saveCanvas(compositionName, 'png');
    }
}

function resetComposition() {
    window.location.reload();
}

function hideMainButtons(){
    resetButton.hide();
    saveButton.hide();
    joinButton.hide();
}

function showMainButtons(){
    resetButton.show();
    saveButton.show();
    joinButton.hide();
    captureButton.hide();
}


