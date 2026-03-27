/* Editado: renderiza o card de vídeo do imóvel apenas quando houver link válido do YouTube e converte a URL para embed responsivo. */
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const propertyDetails = document.getElementById("property-details");

const mainImage = document.getElementById("main-image");
const thumbnailList = document.getElementById("thumbnail-list");

const propertyTitle = document.getElementById("property-title");
const propertyPrice = document.getElementById("property-price");
const propertyLocation = document.getElementById("property-location");
const propertyAddress = document.getElementById("property-address");
const propertyDescription = document.getElementById("property-description");
const propertyVideoCard = document.getElementById("property-video-card");
const propertyVideoIframe = document.getElementById("property-video-iframe");

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getPropertyIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderImages(images) {
  const propertyImages =
    images && images.length > 0
      ? images
      : [{ url: "./assets/placeholder.jpg" }];

  mainImage.src = propertyImages[0].url;
  thumbnailList.innerHTML = "";

  propertyImages.forEach((image) => {
    const thumb = document.createElement("img");
    thumb.src = image.url;
    thumb.alt = "Miniatura do imóvel";

    thumb.addEventListener("click", () => {
      mainImage.src = image.url;
    });

    thumbnailList.appendChild(thumb);
  });
}

function renderPropertyVideo(videoUrl) {
  const embedUrl = window.propertyVideoUtils?.getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    propertyVideoIframe.src = "";
    propertyVideoCard.classList.add("hidden");
    return;
  }

  propertyVideoIframe.src = embedUrl;
  propertyVideoCard.classList.remove("hidden");
}

function renderProperty(property) {
  propertyTitle.textContent = property.title || "Imóvel";
  propertyPrice.textContent = formatPrice(property.price || 0);
  propertyLocation.textContent = `${property.neighborhood || ""} - ${property.city || ""}/${property.state || ""}`;
  propertyAddress.textContent = property.address
    ? `Endereço: ${property.address}`
    : "Endereço não informado";
  propertyDescription.textContent =
    property.description || "Sem descrição disponível.";

  renderImages(property.images);
  renderPropertyVideo(property.videoUrl);

  loading.classList.add("hidden");
  propertyDetails.classList.remove("hidden");
}

async function loadProperty() {
  const id = getPropertyIdFromUrl();

  if (!id) {
    loading.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "ID do imóvel não informado na URL.";
    return;
  }

  try {
    const property = await apiRequest(`/properties/public/${id}`);
    renderProperty(property);
  } catch (error) {
    loading.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = error.message || "Erro ao carregar imóvel.";
  }
}

loadProperty();
