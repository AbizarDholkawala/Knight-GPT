document.addEventListener("DOMContentLoaded", () => {
  // Load saved API key if it exists
  chrome.storage.sync.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      const apiInput = document.getElementById("api-key");
      apiInput.value = result.geminiApiKey;
    }
  });

  // Toggle API key visibility
  const toggleBtn = document.getElementById("toggle-visibility");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const apiInput = document.getElementById("api-key");
      const isPassword = apiInput.getAttribute("type") === "password";
      apiInput.setAttribute("type", isPassword ? "text" : "password");
      toggleBtn.textContent = isPassword ? "Hide" : "Show";
      toggleBtn.setAttribute("aria-label", isPassword ? "Hide API key" : "Show API key");
      toggleBtn.setAttribute("title", isPassword ? "Hide API key" : "Show API key");
    });
  }

  // Save API key when button is clicked
  document.getElementById("save-button").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value.trim();

    if (apiKey) {
      chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
        const successMessage = document.getElementById("success-message");
        successMessage.style.display = "block";

        // Close the tab after a short delay to show the success message
        setTimeout(() => {
          window.close();
          // For cases where window.close() doesn't work (like when opened programmatically)
          chrome.tabs.getCurrent((tab) => {
            if (tab) {
              chrome.tabs.remove(tab.id);
            }
          });
        }, 1000);
      });
    }
  });
});