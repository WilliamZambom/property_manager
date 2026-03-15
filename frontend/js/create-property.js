const form = document.getElementById("create-property-form");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");

function getToken() {
  return localStorage.getItem("token");
}

function protectPage() {
  const token = getToken();

  if (!token) {
    window.location.href = "./login.html";
    return null;
  }

  return token;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = protectPage();
  if (!token) return;

  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
  successMessage.textContent = "";
  errorMessage.textContent = "";

  try {
    const formData = new FormData(form);

    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao cadastrar imóvel.");
    }

    successMessage.textContent = "Imóvel cadastrado com sucesso.";
    successMessage.classList.remove("hidden");

    form.reset();
    document.getElementById("state").value = "ES";

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 1200);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
});

protectPage();
