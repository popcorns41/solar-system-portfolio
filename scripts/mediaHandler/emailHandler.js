export function emailHandler(){
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const button = document.querySelector(".formButton");
    button.disabled = true;
    button.textContent = "Sending...";

    emailjs.sendForm("service_3dr8znx", "template_wpa42ci", this)
      .then(() => {
        alert("Message sent successfully!");
        button.disabled = false;
        button.textContent = "Send Message";
        this.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Message failed to send. Please try again later.");
        button.disabled = false;
        button.textContent = "Send Message";
      });
  });
}