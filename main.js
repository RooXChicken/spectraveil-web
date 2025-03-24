var cursorPos = [0, 0];
const scriptingInput = document.getElementById("scripting");

const keystrokesLabel = document.getElementById("keystrokesLabel");
const scriptingLabel = document.getElementById("scriptingLabel");

const runButton = document.getElementById("runButton");
const stopButton = document.getElementById("stopButton");

const dropdowns = [
    document.getElementById("fileMenu"),
    document.getElementById("editMenu")
];

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

    document.addEventListener("mousemove", (_event) => {
        cursorPos[0] = _event.clientX;
        cursorPos[1] = _event.clientY;
    });

    window.onmouseup = (_event) => {
        hideAllDropdowns(-1);
    };

    hideAllDropdowns(-1);
}

function selectMenu(_index) {
    if(_index != 1 && selectedMenu == 1) {
        storeScript();
    }

    switch(_index) {
        case 0:
            scriptingInput.disabled = true;
            scriptingInput.value = keystrokes;
            document.title = "spectraveil - Keystrokes";
        break;

        case 1:
            scriptingInput.disabled = false;
            scriptingInput.value = script;
            document.title = "spectraveil - Scripting";
        break;
    }

    selectedMenu = _index;
}

function hideAllDropdowns(_ignore) {
    for(let i = 0; i < dropdowns.length; i++) {
        if(i == _ignore) {
            return;
        }

        dropdowns[i].disabled = true;
        dropdowns[i].style.display = "none";
    }
}

function storeScript() {
    script = scriptingInput.value + "";
    localStorage.setItem("script", script);

    scriptChange();
    hideAllDropdowns();
}

function loadScript() {
    let _store = localStorage.getItem("script");
    if(_store == null) {
        return "// write scripts here";
    }
    else {
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
        document.title = "spectraveil - Scripting*";
    }
    else {
        scriptingLabel.innerText = "Scripting";
        document.title = "spectraveil - Scripting";
    }
}

function toggleDropdown(_index) {
    dropdowns[_index].style.left = cursorPos[0] + "px";
    dropdowns[_index].style.top = cursorPos[1] + "px";

    let _disabled = dropdowns[_index].disabled;

    if(_disabled) {
        dropdowns[_index].style.display = "flex";
        dropdowns[_index].disabled = false;
    }
    else {
        dropdowns[_index].style.display = "none";
        dropdowns[_index].disabled = true;
    }
}

async function openFile() {
    let _picker = document.createElement('input');
    _picker.type = 'file';
    
    _picker.onchange = (_event) => {
        let _reader = new FileReader();
        _reader.readAsText(_event.target.files[0], 'UTF-8');
        
        _reader.onload = (_event) => {
            script = _event.target.result;
            selectMenu(1);
            scriptChange();
        }
      
    };
    
    _picker.click();
}