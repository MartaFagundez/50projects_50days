{
  const nums = document.querySelectorAll(".nums span");
  const counter = document.querySelector(".counter");
  const finalMessage = document.querySelector(".final");
  const replay = document.querySelector("#replay");
  const player = document.getElementById("player");
  const nextToLast = nums.length - 1;

  runAnimation();

  replay.addEventListener("click", () => {
    resetDOM();
    runAnimation();
  });

  function resetDOM() {
    counter.classList.remove("hide");
    finalMessage.classList.remove("show");

    nums.forEach((num) => {
      num.classList.value = "";
    });

    nums[0].classList.add("in");
  }

  function runAnimation() {
    nums.forEach((num, idx) => {
      num.addEventListener("animationend", (e) =>
        handleAnimationEnd(e, num, idx)
      );
    });
  }

  function handleAnimationEnd(e, num, idx) {
    if (e.animationName === "goIn" && idx !== nextToLast) {
      num.classList.remove("in");
      num.classList.add("out");
    } else if (e.animationName === "goOut" && num.nextElementSibling) {
      num.nextElementSibling.classList.add("in");
    } else {
      endAnimation();
    }
  }

  function endAnimation() {
    player.stop();
    counter.classList.add("hide");
    finalMessage.classList.add("show");

    setTimeout(() => {
      player?.classList.remove("hidden");
      player.play();
    }, 75);

    setTimeout(() => {
      player?.classList.add("hidden");
      player.stop();
    }, 2000);
  }
}
