// FIXME drawings does not match with cursor when using scrolling
// FIXME load a default image that has some information about using the application!
// FIXME write a button that wipes the entire canvas by deleting the active canvas object and creating a new one.

var canvas, context, clickColor, clickSize, clickOpacity, clickShape, clickX, clickY, clickDrag;

// CREATE CANVAS OBJECT
function createCanvas(w, h) {
    var canvasDiv = document.getElementById('canvasDiv');
    var newCanvas = document.createElement('canvas');

    newCanvas.setAttribute("id", "canvas");
    newCanvas.setAttribute("width", w);
    newCanvas.setAttribute("height", h);
    newCanvas.setAttribute("class", "drawing_canvas");

    canvasDiv.appendChild(newCanvas);

    // the following must be initialized for each new canvas:
    // BASE CANVAS
    canvas = newCanvas;
    context = canvas.getContext("2d");

    // These arrays hold all of the changing variables
    clickColor = new Array();
    clickSize = new Array();
    clickOpacity = new Array();
    clickShape = new Array();
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();

    context.clearRect(0, 0, w, h);
}

// and create the starting canvas
createCanvas(470, 620);

var currentColor = "#666666";
var currentSize = 5;
var currentOpacity = 1;
var currentShape = "round";
var fillColor = "#ffffff";

// onclick function for color pickers
function colorPick(colorCode) {
    currentColor = colorCode;
}

// onclick function for size pickers
function sizepick(size) {
  currentSize = size;
}

function opacityPick(opPercent) {
    currentOpacity = opPercent;
}

function shapePick(shape) {
    currentShape = shape;
}

/***************************************************************
SAVING THE CANVAS
***************************************************************/
var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
  var dataURL = canvas.toDataURL('image/png');
  button.href = dataURL;
});

/***************************************************************
CLEARING THE CANVAS
FIXME THE NEW CANVAS IS NOT CORRECTLY INTERACTED WITH
***************************************************************/
var buttonClear = document.getElementById('btn-clear');
buttonClear.addEventListener('click', function(e) {
  document.getElementById('canvasDiv').removeChild(canvas);
  createCanvas(470, 620);
});



// window.onload = function() {

    /***************************************************************
    DRAWING MECHANICS
    ***************************************************************/

    // Mouse down event
    $('#canvas').mousedown(function(e) {
        // the offsetLeft, offsetTop make scrolling problematic. FIXME disable scrolling, or set default sizes based on screen size.
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    var paint;

    // Mouse move event
    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        }
        redraw();
    });

    // Mouse up event
    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(currentColor);
        clickSize.push(currentSize);
        clickOpacity.push(currentOpacity);
        clickShape.push(currentShape);
    }

    function redraw() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i=0; i < clickX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i) {
                context.moveTo(clickX[i-1], clickY[i-1]);
            } else {
                context.moveTo(clickX[i], clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            // FIXME opacity is not quite working! look to http://jsfiddle.net/rnNFB/1/
            context.globalAlpha = clickOpacity[i];
            context.strokeStyle = clickColor[i];
            context.lineJoin = clickShape[i];
            context.lineWidth = clickSize[i];
            context.stroke();
        }
    }

// }
