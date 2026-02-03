const email = "mncedisi.sikhosana@email.com";

const copyEmail = () => {
  navigator.clipboard.writeText(email).then(() => {
    const button = document.getElementById("copyEmail");
    if (button) {
      button.textContent = "Email Copied";
      setTimeout(() => {
        button.textContent = "Copy Email";
      }, 2000);
    }
  });
};

const heroCopy = document.getElementById("copyEmail");
if (heroCopy) {
  heroCopy.addEventListener("click", copyEmail);
}

const emailButton = document.getElementById("emailButton");
if (emailButton) {
  emailButton.addEventListener("click", () => {
    navigator.clipboard.writeText(email).then(() => {
      emailButton.textContent = "Email Copied";
      setTimeout(() => {
        emailButton.textContent = "Copy Email";
      }, 2000);
    });
  });
}

const downloadButton = document.getElementById("downloadResume");
if (downloadButton) {
  downloadButton.addEventListener("click", () => {
    alert("Resume download will be enabled once you add a PDF file to the project.");
  });
}
