function myTimeSelector() {
  const timeStartSlider = document.getElementById("start");
  const timeEndSlider = document.getElementById("end");
  const timeStartValue = document.querySelector("#timeForm input[name='start']");
  const timeEndValue = document.querySelector("#timeForm input[name='end']");

  function decimal2Time(value) {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    if (formattedTime === "24:00") {
      return "00:00";
    } else {
      return formattedTime;
    }
  }

  function time2Decimal(value) {
    const [hours, minutes] = value.split(":");
    return parseFloat(hours) + parseFloat(minutes) / 60;
  }

  timeStartSlider.addEventListener("input", () => {
    if (parseFloat(timeStartSlider.value) >= parseFloat(timeEndSlider.value)) {
      timeEndSlider.value = (parseFloat(timeStartSlider.value) + 0.25).toFixed(2);
    }
    timeEndValue.value = decimal2Time(timeEndSlider.value);
    timeStartValue.value = decimal2Time(timeStartSlider.value);
  });

  timeEndSlider.addEventListener("input", () => {
    if (parseFloat(timeEndSlider.value) <= parseFloat(timeStartSlider.value)) {
      timeStartSlider.value = (parseFloat(timeEndSlider.value) - 0.25).toFixed(2);
    }
    timeStartValue.value = decimal2Time(timeStartSlider.value);
    timeEndValue.value = decimal2Time(timeEndSlider.value);
  });

  timeStartValue.addEventListener("input", () => {
    timeStartSlider.value = time2Decimal(timeStartValue.value).toFixed(2);
    if (parseFloat(timeStartSlider.value) >= parseFloat(timeEndSlider.value)) {
      timeEndSlider.value = (parseFloat(timeStartSlider.value) + 0.25).toFixed(2);
    }
    timeEndValue.value = decimal2Time(timeEndSlider.value);
  });

  timeEndValue.addEventListener("input", () => {
    timeEndSlider.value = time2Decimal(timeEndValue.value).toFixed(2);
    if (parseFloat(timeEndSlider.value) <= parseFloat(timeStartSlider.value)) {
      timeStartSlider.value = (parseFloat(timeEndSlider.value) - 0.25).toFixed(2);
    }
    timeStartValue.value = decimal2Time(timeStartSlider.value);
  });
}

myTimeSelector();
