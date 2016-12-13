var currentColor = "#666666";
var currentSize = 5;

// onclick function for color pickers
function colorPick(colorCode) {
    currentColor = colorCode;
}

window.onload = function() {


    /***************************************************************
    DRAWING MECHANICS
    ***************************************************************/
    var context = document.getElementById('canvas').getContext("2d");
    var clickColor = new Array();

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
    }

    function redraw() {
        // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // clears the canvas

        // FIXME allow these to be changed!!!
        context.lineJoin = "round";
        context.lineWidth = currentSize;

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
        }
    }
}
