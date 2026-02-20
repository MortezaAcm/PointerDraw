window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const resetBtn = document.querySelector("#reset");
  const showInput = document.querySelector("#show_input");
  const rangeValue = document.querySelector("#range_value");
  const rangeInput = document.querySelector("#range_input");
  const colorPickerInputs = document.querySelectorAll(".color_picker_input");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = "#eee";

  let isPainting = false;
  let color = "red";
  let width = rangeInput.value;

  ctx.lineCap = "round";

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
  window.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", draw);
  window.addEventListener("touchstart", startPainting);
  window.addEventListener("touchend", stopPainting);
  window.addEventListener("touchmove", draw);
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  showInput.addEventListener("click", () => showInput.parentElement.classList.toggle("hidden"));
  resetBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  rangeInput.addEventListener("input", () => {
    rangeValue.innerHTML = `${rangeInput.value}px`;
    width = rangeInput.value;
  });
  for (const colorPickerInput of colorPickerInputs) {
    colorPickerInput.addEventListener("click", () => {
      if (colorPickerInput.checked) {
        color = colorPickerInput.value;
      }
    });
  }
});
