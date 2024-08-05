document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const transformButton = document.getElementById("transformButton");
  let transformed = false;

  transformButton.addEventListener("click", () => {
    items.forEach((item) => {
      item.style.transform = transformed
        ? "translateX(0)"
        : "translateX(1500px)";
    });
    transformed = !transformed;
  });
});
