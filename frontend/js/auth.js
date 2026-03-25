const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

function saveToken(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
}

async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao fazer login");
  }

  return data;
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    loginMessage.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const data = await login(email, password);

      const token = data.token || data.data?.token;

      if (!token) {
        throw new Error("Token não retornado pela API.");
      }

      saveToken(token);
      window.location.href = "./dashboard.html";
    } catch (error) {
      loginMessage.textContent = error.message;
    }
  });
}
