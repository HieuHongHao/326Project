import { autoScroll } from './chat.js';

export const canvas = {
  init: async () => {
    /*Chat is initiated by being at the bottom*/
    autoScroll();

    const drawingBoard = document.getElementById("canvas")
    const colorPicker = document.getElementById("color-picker-input")

    let brushColor = colorPicker.value
    let textSize = 5
    let toolMode = "brush" // Or eraser
    let isPaint = false;
    let lastLine;

    // var width = 950;
    const width = drawingBoard.getBoundingClientRect().width
    const height = window.innerHeight;

    // first we need Konva core things: stage and layer
    const stage = new Konva.Stage({
      container: 'canvas-pad',
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);


    stage.on('mousedown touchstart', function(e) {
      isPaint = true;
      var pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: brushColor,
        strokeWidth: Math.min(25, textSize),
        globalCompositeOperation:
          toolMode === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        lineJoin: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on('mouseup touchend', function() {
      isPaint = false;
    });

    // and core function - drawing
    stage.on('mousemove touchmove', function(e) {
      if (!isPaint) {
        return;
      }
      // prevent scrolling on touch devices
      e.evt.preventDefault();

      const pos = stage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });

    colorPicker.addEventListener('change', function() {
      brushColor = colorPicker.value
    })

    document.getElementById("tool-eraser").addEventListener('click', function() {
      toolMode = "eraser"
    })
    document.getElementById("tool-paintbrush").addEventListener('click', function() {
      toolMode = "brush"
    })
    document.getElementById("color-picker").addEventListener('click', function() {
      toolMode = "brush"
    })
    document.getElementById("tool-increase-size").addEventListener('click', function() {
      if (textSize < 40) {
        textSize += 1;
      }
    })
    document.getElementById("tool-decrease-size").addEventListener('click', function() {
      if (textSize > 1) {
        textSize -= 1;
      }
    })

    $("#color-picker-input").change(function() {
      $("#tool-paintbrush").css('color', $(this).val());
    });

    $("#color-picker").click(function() {
      $("#color-picker-input").click();
    });

  }
}
