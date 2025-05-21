(function () {
  const hour = document.querySelector(".hour");
  const min = document.querySelector(".minute");
  const sec = document.querySelector(".sec");
  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const resetBtn = document.querySelector(".reset");

  let countdownTimer = null;

  startBtn.addEventListener("click", function () {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return;

    function startInterval() {
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";

      countdownTimer = setInterval(function () {
        timer();
      }, 1000);
    }
    startInterval();
  });

  function isTimeZero() {
    return (
      parseInt(hour.value, 10) === 0 &&
      parseInt(min.value, 10) === 0 &&
      parseInt(sec.value, 10) === 0
    );
  }

  function formatSegment(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  function normalizeOverflow() {
    let s = parseInt(sec.value, 10) || 0;
    let m = parseInt(min.value, 10) || 0;
    let h = parseInt(hour.value, 10) || 0;

    if (s > 60) {
      m++;
      s -= 60;
    }
    if (m > 60) {
      h++;
      m -= 60;
    }

    sec.value = String(s);
    min.value = String(Math.min(m, 60));
    hour.value = String(h);
  }

  function clearTime() {
    hour.value = "";
    min.value = "";
    sec.value = "";
  }

  function decrementTime() {
    let s = parseInt(sec.value, 10) || 0;
    let m = parseInt(min.value, 10) || 0;
    let h = parseInt(hour.value, 10) || 0;

    if (s > 0) {
      s--;
    } else if (m > 0) {
      s = 59;
      m--;
    } else if (h > 0) {
      m = 60;
      h--;
    }

    sec.value = formatSegment(s);
    min.value = formatSegment(m);
    hour.value = formatSegment(h);
  }

  function timer() {
    // Formatting the time - START
    normalizeOverflow();
    // Formatting the time - END

    // Updating the Time - START
    if (isTimeZero()) {
      clearTime();
      stopInterval();
      return;
    }
    decrementTime();
  }

  // Stop Interval Logic - START
  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";

    stopBtn.style.display = "none";
    startBtn.style.display = "initial";
    clearInterval(countdownTimer);
  }
  // Stop Interval Logic - END

  // Stop Timer Button - START
  stopBtn.addEventListener("click", function () {
    stopInterval("pause");
  });
  // Stop Timer Button - END

  // Reset Timer Button - START
  resetBtn.addEventListener("click", function () {
    clearTime();
    stopInterval();
  });
  // Reset Timer Button - END
})();
