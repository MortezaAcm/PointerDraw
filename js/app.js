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

  ctx.strokeStyle = "red";
  ctx.lineWidth = rangeInput.value;
  ctx.lineCap = "round";

  const startPainting = (event) => {
    isPainting = true;
    draw(event);
  };
  const stopPainting = () => {
    isPainting = false;
    ctx.beginPath();
  };
  const draw = (event) => {
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
  };
  window.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  window.addEventListener("mousemove", draw);
  window.addEventListener("touchstart", startPainting);
  window.addEventListener("touchend", startPainting);
  window.addEventListener("touchmove", draw);
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  showInput.addEventListener("click", () => showInput.parentElement.classList.toggle("hidden"));
  resetBtn.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  rangeInput.addEventListener("input", () => {
    rangeValue.innerHTML = `${rangeInput.value}px`;
    ctx.lineWidth = rangeInput.value;
  });
  for (const colorPickerInput of colorPickerInputs) {
    colorPickerInput.addEventListener("click", () => {
      if (colorPickerInput.checked) {
        ctx.strokeStyle = colorPickerInput.value;
      }
    });
  }
});
