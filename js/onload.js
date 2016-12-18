// FIXME drawings does not match with cursor when using scrolling

var currentColor = "#666666";
var currentSize = 5;

// onclick function for color pickers
function colorPick(colorCode) {
    currentColor = colorCode;
}

// onclick function for size pickers
function sizepick(size) {
  currentSize = size;
}

window.onload = function() {


    /***************************************************************
    DRAWING MECHANICS
    ***************************************************************/
    var canvas=document.getElementById('canvas');
    var context = document.getElementById('canvas').getContext("2d");
    var clickColor = new Array();
    var clickSize = new Array();

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
    }

    function redraw() {
        // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // clears the canvas

        // FIXME allow these to be changed!!!
        context.lineJoin = "round";

        for (var i=0; i < clickX.length; i++) {
            context.beginPath();
            if(clickDrag[i] && i) {
                context.moveTo(clickX[i-1], clickY[i-1]);
            } else {
                context.moveTo(clickX[i], clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
            context.lineWidth = clickSize[i];
        }
    }

    var button = document.getElementById('btn-download');
    button.addEventListener('click', function (e) {
      var dataURL = canvas.toDataURL('image/png');
      button.href = dataURL;
    });
}
