document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("firstName").textContent = params.get("fname") || "N/A";
  document.getElementById("lastName").textContent = params.get("lname") || "N/A";
  document.getElementById("email").textContent = params.get("email") || "N/A";
  document.getElementById("phone").textContent = params.get("phone") || "N/A";
  document.getElementById("orgName").textContent = params.get("orgname") || "N/A";
  document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last updated: ${document.lastModified}`;
  }
});
