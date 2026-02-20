window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const resetBtn = document.querySelector("#reset");
  const showInput = document.querySelector("#show_input");
  const rangeValue = document.querySelector("#range_value");
  const rangeInput = document.querySelector("#range_input");
  const colorPickerInputs = document.querySelectorAll(".color_picker_input");
  let isPainting = false;
  let color = "red";
  let width = rangeInput.value;

  canvas.style.backgroundColor = "#eee";
  ctx.lineCap = "round";

  const onResizeHandler = () => {
    const { offsetWidth, offsetHeight } = document.documentElement;
    canvas.width = offsetWidth;
    canvas.height = offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const startPainting = (event) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = `${width}`;
    isPainting = true;
    ctx.beginPath();
    draw(event);
  };
  const stopPainting = () => {
    isPainting = false;
    ctx.closePath();
  };
  const draw = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
    requestAnimationFrame(() => {
      const drawing = (x, y) => {
        if (isPainting) {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      };

      if (event.clientX) {
        const { clientX, clientY } = event;
        drawing(clientX, clientY);
      } else if (event.changedTouches.length) {
        const { clientX, clientY } = event.changedTouches[0];
        drawing(clientX, clientY);
      }
    });
  };

  onResizeHandler();
  window.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", draw);
  window.addEventListener("touchstart", startPainting);
  window.addEventListener("touchend", stopPainting);
  window.addEventListener("touchmove", draw);
  window.addEventListener("resize", onResizeHandler);
  showInput.addEventListener("click", () => showInput.parentElement.classList.toggle("hidden"));
  resetBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  rangeInput.addEventListener("input", () => {
    width = rangeInput.value;
    rangeValue.innerHTML = `${width}px`;
  });
  for (const colorPickerInput of colorPickerInputs) {
    colorPickerInput.addEventListener("click", () => {
      if (colorPickerInput.checked) {
        color = colorPickerInput.value;
      }
    });
  }
});
