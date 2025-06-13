const container = document.querySelector("#parts-container");
const modal = document.querySelector("#part-modal");
const closeBtn = document.querySelector("#close-modal");

const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalPrice = document.querySelector("#modal-price");
const modalDescription = document.querySelector("#modal-description");

async function loadParts() {
  try {
    const response = await fetch("data/parts.json");
    const parts = await response.json();

    parts.forEach(part => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${part.name}</h3>
        <p><strong>Category:</strong> ${part.type}</p>
        <p><strong>Price:</strong> $${part.price}</p>
        <button class="info-btn" aria-label="More info about ${part.name}">More Info</button>
      `;

      card.querySelector(".info-btn").addEventListener("click", () => {
        modalTitle.textContent = part.name;
        modalCategory.textContent = `Category: ${part.type}`;
        modalPrice.textContent = `Price: $${part.price}`;
        modalDescription.textContent = part.description;
        modal.showModal();
      });

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = "<p>Failed to load component data.</p>";
    console.error("Fetch error:", error);
  }
}

closeBtn.addEventListener("click", () => {
  modal.close();
});

loadParts();
