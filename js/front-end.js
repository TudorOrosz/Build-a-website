// Code for email sending
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); //here I can also try to add an action to show that the form was succesfully submitted, something like the check logo that we have in Qualtrics

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData.entries());  // This line converts the form data into an object
    console.log(formObject);  // Log to check the object
    const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Important for JSON
        body: JSON.stringify(formObject),
    });

    if (response.ok) {
        alert("Message sent successfully!");
        //console.log("front-end works")
    } else {
        alert("Error sending message.");
        // console.log("front-end doesn't work")
    }
});

// Test to see if data is received to back-end
// document.getElementById("contactForm").addEventListener("submit", async function(event) {
//     event.preventDefault();  // Prevent default form behavior
    
//     console.log("Form submitted!");  // Log when the form is submitted
    
//     const formData = new FormData(this);
//     console.log("Form data being sent:", [...formData.entries()]); // Log the form data

//     const response = await fetch("http://localhost:3000/test", {
//         method: "POST",
//         body: formData,
//     });

//     if (response.ok) {
//         const responseText = await response.text();
//         alert(responseText);
//         console.log("Frontend response: ", responseText);
//     } else {
//         alert("Error sending message.");
//         console.log("Error:", response.statusText);
//     }
// });

// Simple Tests
// document.getElementById("contactForm").addEventListener("submit", async function(event) {
//     event.preventDefault();
//     console.log("it works");
// })

// document.getElementById("contactForm").addEventListener("click", function() {
//     console.log("Form clicked!");
// });
