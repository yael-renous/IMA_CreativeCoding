// ui.js

let saveButton, resetButton, joinButton, captureButton;

function createSaveButton() {
    saveButton = createButton('Save');
    saveButton.position(10, 10);
    styleButton(saveButton);
    saveButton.mousePressed(saveComposition);
}

function createResetButton() {
    resetButton = createButton('Reset');
    resetButton.position(10, 60);
    styleButton(resetButton);
    resetButton.mousePressed(resetComposition);
}

function createJoinButton() {
    joinButton = createButton('Join!');
    joinButton.position(10, 110);
    styleButton(joinButton);
    joinButton.mousePressed(joinComposition);
}

function createCaptureButton() {
    captureButton = createButton('Capture');
    captureButton.position(10, 160);
    captureButton.style('width', '150px');
    captureButton.style('height', '80px');
    captureButton.style('padding', '15px');
    captureButton.style('font-size', '26px');
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
function styleButton(button) {
    button.style('background-color', 'rgba(0, 0, 0, 0.8)');
    button.style('color', 'white');
    button.style('border', 'none');
    button.style('border-radius', '50%');
    button.style('padding', '5px');
    button.style('font-size', '16px');
    button.style('box-shadow', '2px 2px 5px rgba(0, 0, 0, 0.5)');
    button.style('text-align', 'center');
    button.style('width', '50px');
    button.style('height', '50px');
    button.mouseOver(() => button.style('background-color', 'rgba(128, 128, 128, 0.8)'));
    button.mouseOut(() => button.style('background-color', 'rgba(0, 0, 0, 0.8)'));
}

function hideMainButtons() {
    resetButton.hide();
    saveButton.hide();
    joinButton.hide();
}

function showMainButtons() {
    resetButton.show();
    saveButton.show();
    joinButton.hide();
    captureButton.hide();
}


