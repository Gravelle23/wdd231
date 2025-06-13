document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("fname") || "N/A";
  const email = params.get("email") || "N/A";
  const interest = params.get("interest") || "N/A";
  const comments = params.get("comments") || "N/A";

  document.getElementById("display-name").textContent = name;
  document.getElementById("display-email").textContent = email;
  document.getElementById("display-interest").textContent = interest;
  document.getElementById("display-comments").textContent = comments;
});
