const propertiesContainer = document.getElementById("properties-container");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function createPropertyCard(property) {
  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[0].url
      : "./assets/placeholder.jpg";

  return `
    <article class="property-card">
      <img src="${imageUrl}" alt="${property.title}" class="property-image" />
      <div class="property-content">
        <h2>${property.title}</h2>
        <p class="price">${formatPrice(property.price)}</p>
        <p>${property.neighborhood || ""} - ${property.city || ""}</p>
        <a href="./property.html?id=${property._id}" class="details-button">Ver detalhes</a>
      </div>
    </article>
  `;
}

async function loadProperties() {
  try {
    const properties = await apiRequest("/properties/public");

    loading.classList.add("hidden");

    if (!properties || properties.length === 0) {
      propertiesContainer.innerHTML =
        "<p>Nenhum imóvel disponível no momento.</p>";
      return;
    }

    propertiesContainer.innerHTML = properties.map(createPropertyCard).join("");
  } catch (error) {
    loading.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = error.message;
  }
}

loadProperties();
