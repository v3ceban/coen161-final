function myTimeSelector() {
  const timeStartSlider = document.getElementById("start");
  const timeEndSlider = document.getElementById("end");

  timeStartSlider.addEventListener("input", () => {
    console.log(timeStartSlider.value);
  });
  timeEndSlider.addEventListener("input", () => {
    console.log(timeEndSlider.value);
  });
}

myTimeSelector();
