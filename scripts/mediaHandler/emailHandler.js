export function emailHandler(live=false){
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const button = document.querySelector(".formButton");
    button.disabled = true;
    button.textContent = "Sending...";
    if (live){
         emailjs.sendForm("service_3dr8znx", "template_wpa42ci", this)
        .then(() => {
            showToast("✅ Message sent!");
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
        }else{
            showToast("✅ Fake Message sent!");
            button.textContent = "Sent 🚀";
            setTimeout(()=>{
                document.getElementById("contactForm").reset();
                button.disabled = false;
                button.textContent = "Send Message";
            },3000);

        }
    });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}