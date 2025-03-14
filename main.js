const scriptingInput = document.getElementById("scripting");

const keystrokesLabel = document.getElementById("keystrokesLabel");
const scriptingLabel = document.getElementById("scriptingLabel");

const runButton = document.getElementById("runButton");
const stopButton = document.getElementById("stopButton");

var keystrokes = "WASD{SPACE}THESE{SPACE}ARE{SPACE}KEYSTROKES";
var script = loadScript();
var unsaved = false;

var selectedMenu = 0;

function onLoad() {
    selectMenu(0);

    onkeydown = (_event) => {
        if(_event.ctrlKey && _event.key == "s") {
            _event.preventDefault();
            storeScript();
        }
    };
}

function selectMenu(_index) {
    if(_index != 1 && selectedMenu == 1) {
        storeScript();
    }

    switch(_index) {
        case 0:
            scriptingInput.disabled = true;
            scriptingInput.value = keystrokes;
        break;

        case 1:
            scriptingInput.disabled = false;
            scriptingInput.value = script;
        break;
    }

    selectedMenu = _index;
}

function storeScript() {
    // console.log("Storing " + script);
    script = scriptingInput.value + "";
    localStorage.setItem("script", script);

    scriptChange();
}

function loadScript() {
    let _store = localStorage.getItem("script");
    if(_store == null) {
        // console.log("No value stored :(");
        return "// write scripts here";
    }
    else {
        // console.log("Loading " + _store);
        return _store;
    }
}

function checkUnsaved() {
    let _old = loadScript();
    unsaved = (_old != scriptingInput.value + "");
    return unsaved;
}

function scriptChange() {
    if(checkUnsaved()) {
        scriptingLabel.innerText = "Scripting*";
    }
    else {
        scriptingLabel.innerText = "Scripting";
    }
}