document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const transformButton = document.getElementById("transformButton");
  const movement = function () {
    transformButton.addEventListener("click", () => {
      items.forEach((item) => {
        item.style.width = "30vw";
        item.style.height = "30vh";
        item.style.borderRaduis = "50%";
      });
    });
  };
  setTimeout(movement(), 2000);
});
