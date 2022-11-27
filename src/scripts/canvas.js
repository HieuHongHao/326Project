import { autoScroll } from './chat.js';
// import '../scripts/MathJax-master/es5/tex-mml-chtml.js?config=TeX-AMS-MML_HTMLorMML';
// import "../node_modules/mathjax/es5/tex-chtml.js"



export const canvas = {
  init: async () => {
    /*Chat is initiated by being at the bottom*/
    document.body.style = "overflow-y: hidden";
    autoScroll(); // autoscroll chat to be at bottom

    // const socket = io("/");
    const socket = io("http://localhost:9000");
    
    const canvasID = new URLSearchParams(window.location.search).get('') //get canvas ID
    // const userId = localStorage.getItem("loggedIn");

    const colorPicker = document.getElementById("color-picker-input")
    // const drawingContainer = document.getElementById("canvas")
    
    
   /*Canvas stuff*/
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext('2d');

    const current = {
      brushColor: colorPicker.value,
      brushSize: 5
    };
    let drawing = false; // If someone is drawing/erasing on the canvas

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    //Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    socket.on('drawing', onDrawingEvent);

    function drawLine(x0, y0, x1, y1, color, size, tool, room, emit) {
      if(room !== canvasID){
        return;
      }
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = size;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.globalCompositeOperation = tool;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
        size: size,
        gco: tool,
        roomId: canvasID
      });
    }

    function onMouseDown(e) {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    }

    function onMouseUp(e) {
      if (!drawing) { return; }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.brushColor, current.brushSize, current.globalCompositeOperation, canvasID, true);
    }

    function onMouseMove(e) {
      if (!drawing) { return; }
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.brushColor, current.brushSize, current.globalCompositeOperation, canvasID, true);
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    }

    // limit the number of events per second
    function throttle(callback, delay) {
      var previousCall = new Date().getTime();
      return function() {
        var time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    }

    function onDrawingEvent(data) {
      var w = canvas.width;
      var h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.size, data.gco, data.roomId);
    }

    /*Resizing the canvas*/
    window.addEventListener('resize', onResize, false);
    onResize();
    renderMathInElement(document.body);

    colorPicker.addEventListener('change', function() {
      current.brushColor = colorPicker.value
      context.strokeStyle = current.brushColor
      context.globalCompositeOperation = 'source-over'
    })

    document.getElementById("tool-eraser").addEventListener('click', function() {
      // toolMode = "eraser"
      context.globalCompositeOperation = 'destination-out';
      current.globalCompositeOperation = 'destination-out';
    })
    document.getElementById("tool-paintbrush").addEventListener('click', function() {
      context.strokeStyle = current.brushColor
      context.globalCompositeOperation = 'source-over'
      current.globalCompositeOperation = 'source-over';
    })
    document.getElementById("color-picker").addEventListener('click', function() {
      // toolMode = "brush"
      context.strokeStyle = current.brushColor
      context.globalCompositeOperation = 'source-over'
      current.globalCompositeOperation = 'source-over';
    })
    document.getElementById("tool-increase-size").addEventListener('click', function() {
      if (current.brushSize < 120) {
        current.brushSize += 5;
      }
    })
    document.getElementById("tool-decrease-size").addEventListener('click', function() {
      if (current.brushSize > 1) {
        current.brushSize -= 5;
      }
      context.lineWidth = current.brushSize;
    })

    $("#color-picker-input").change(function() {
      $("#tool-paintbrush").css('color', $(this).val());
    });

    $("#color-picker").click(function() {
      $("#color-picker-input").click();
    });

    document.getElementById("hide-chat").addEventListener('click', function() {
      document.getElementById("chat").classList.toggle("hide");
      document.getElementById("open-chat").style.display = "block";

    })

    document.getElementById("open-chat").addEventListener('click', function() {
      document.getElementById("chat").classList.toggle("hide");
      document.getElementById("open-chat").style.display = "hide";
      autoScroll();
    })



    function onResize() {
      // canvas.width = drawingContainer.getBoundingClientRect().width;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // canvas.height = drawingContainer.getBoundingClientRect().height;
    }
  }
}
