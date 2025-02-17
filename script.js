document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (name && email) {
        message.style.color = "green";
        message.textContent = `Thank you, ${name}! Your email (${email}) has been received.`;
    } else {
        message.style.color = "red";
        message.textContent = "Please fill in all fields.";
    }
});
