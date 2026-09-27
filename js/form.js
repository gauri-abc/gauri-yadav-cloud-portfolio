// Invoke URL only, for example https://abc123.execute-api.ap-south-1.amazonaws.com
const API_URL = "YOUR_API_GATEWAY_URL";

const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitLabel = submitButton.textContent;
  let hideTimer;

  const showMessage = (text) => {
    window.clearTimeout(hideTimer);
    responseMessage.textContent = text;
    responseMessage.classList.add("open");
    hideTimer = window.setTimeout(() => {
      responseMessage.classList.remove("open");
    }, 5000);
  };

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      showMessage("Please fill in your name, email, and message.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    showMessage("Sending...");

    try {
      const response = await fetch(`${API_URL.replace(/\/+$/, "")}/api/contact`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.status === 200 || response.status === 201 || response.status === 202) {
        showMessage("Message sent successfully!");
        contactForm.reset();
        return;
      }

      showMessage("Unable to send your message. Please try again.");
    } catch (error) {
      showMessage("Unable to send your message. Please try again.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = submitLabel;
    }
  });
};

export default form;
