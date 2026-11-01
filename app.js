document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelector(".items");
  const transformButton = document.getElementById("transformButton");

  transformButton.addEventListener("click", () => {
    items.toggleAttribute("data-moved");
  });
});
