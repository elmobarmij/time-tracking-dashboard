const time = document.querySelectorAll(".time");
const smallBox = document.querySelectorAll(".small-box .time");
const timeTitle = document.querySelectorAll(".time-title");
const catTitle = document.querySelectorAll(".cat");
const buttons = document.querySelectorAll("button");
const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");

const createMarkup = function (data, timeline) {
  time.forEach((t) => {
    t.innerHTML = "";
    let html = `
      <h2 class="time-title">${
        data[t.dataset.time]["timeframes"][timeline]["current"]
      }hrs</h2>
          <p class="time-desc">Last Week - ${
            data[t.dataset.time]["timeframes"][timeline]["previous"]
          }hrs</p>
            `;
    t.insertAdjacentHTML("beforeend", html);
  });
};

const changeData = function (btn, timeline) {
  btn.onclick = async function () {
    const res = await fetch("/data.json");
    const data = await res.json();
    createMarkup(data, timeline);
    removeActiveStatus();
  };
};

changeData(dailyBtn, "daily");
changeData(weeklyBtn, "weekly");
changeData(monthlyBtn, "monthly");

weeklyBtn.classList.add("active");
weeklyBtn.click();

const removeActiveStatus = function () {
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      buttons.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
};
