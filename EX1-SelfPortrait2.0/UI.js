//UI.js

function createSaveButton() {
    const saveButton = createButton('Save Composition');
    saveButton.position(10, 10);
    saveButton.mousePressed(saveComposition);
  }
  
  function saveComposition() {
    const compositionName = prompt('Enter a name for your composition:');
    if (compositionName) {
      saveCanvas(compositionName, 'png');
    }
  }
  
  function createResetButton() {
    const resetButton = createButton('Reset Composition');
    resetButton.position(10, 40); // Position below the save button
    resetButton.mousePressed(resetComposition);
  }
  
  function resetComposition() {
    window.location.reload();
  }
  