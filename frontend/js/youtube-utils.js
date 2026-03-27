/* Editado: centraliza a conversão e validação de URLs do YouTube para o cadastro, edição e exibição do vídeo do imóvel. */
(function attachPropertyVideoUtils() {
  const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
  const YOUTUBE_HOSTS = new Set([
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtu.be",
    "www.youtu.be",
  ]);

  function normalizeVideoUrl(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function isValidVideoId(videoId) {
    return YOUTUBE_ID_PATTERN.test(videoId || "");
  }

  function extractVideoId(videoUrl) {
    const normalizedUrl = normalizeVideoUrl(videoUrl);

    if (!normalizedUrl) {
      return "";
    }

    try {
      const parsedUrl = new URL(normalizedUrl);
      const hostname = parsedUrl.hostname.toLowerCase();

      if (!YOUTUBE_HOSTS.has(hostname)) {
        return "";
      }

      if (hostname.includes("youtu.be")) {
        const shortId = parsedUrl.pathname.split("/").filter(Boolean)[0] || "";
        return isValidVideoId(shortId) ? shortId : "";
      }

      if (parsedUrl.pathname === "/watch") {
        const watchId = parsedUrl.searchParams.get("v") || "";
        return isValidVideoId(watchId) ? watchId : "";
      }

      const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
      const candidateId = pathSegments[1] || "";

      if (
        ["embed", "shorts", "live"].includes(pathSegments[0]) &&
        isValidVideoId(candidateId)
      ) {
        return candidateId;
      }

      return "";
    } catch (error) {
      return "";
    }
  }

  function getYouTubeEmbedUrl(videoUrl) {
    const videoId = extractVideoId(videoUrl);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  }

  function isValidYouTubeUrl(videoUrl) {
    return Boolean(getYouTubeEmbedUrl(videoUrl));
  }

  window.propertyVideoUtils = {
    normalizeVideoUrl,
    getYouTubeEmbedUrl,
    isValidYouTubeUrl,
  };
})();
