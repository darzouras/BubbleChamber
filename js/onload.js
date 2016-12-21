// FIXME drawings does not match with cursor when using scrolling
// FIXME write a canvas object that is inserted into the page, allow the height and width to be set (with some max limits).
// FIXME write a button that wipes the entire canvas by deleting the active canvas object and creating a new one.

var currentColor = "#666666";
var currentSize = 5;
var currentOpacity = 1;
var currentShape = "round";

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

window.onload = function() {


    /***************************************************************
    DRAWING MECHANICS
    ***************************************************************/
    var canvas=document.getElementById('canvas');
    var context = document.getElementById('canvas').getContext("2d");
    var clickColor = new Array();
    var clickSize = new Array();
    var clickOpacity = new Array();
    var clickShape = new Array();

    // Mouse down event
    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    // Mouse move event
    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    // Mouse up event
    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    // Mouse leave event
    $('#canvas').mouseleave(function(e) {
        paint = false;
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

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
        // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // clears the canvas

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

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
      var dataURL = canvas.toDataURL('image/png');
      button.href = dataURL;
    });
}
