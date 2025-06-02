document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last updated: ${document.lastModified}`;
  }

  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
});
