const form = () => {
  const contactForm = document.querySelector(".contactForm");
  const responseMessage = document.querySelector(".response");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:gaurieyadav15402@gmail.com?subject=${subject}&body=${body}`;

    responseMessage.classList.add("open");
    responseMessage.textContent = "Your email app should open so you can send the message.";
    window.setTimeout(() => {
      responseMessage.classList.remove("open");
    }, 3000);
    contactForm.reset();
  });
};

export default form;
