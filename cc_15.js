// Task 4 
// Select the riskDashboard container
const riskDashboard = document.getElementById("riskDashboard");
console.log("Risk Dashboard Loaded");

// Function to add a new risk item
function addRiskItem(riskName, riskLevel, department) {
    // Create a new div element for the risk card
    const riskCard = document.createElement("div");
    riskCard.classList.add("riskCard");

    // Apply different background colors based on risk level
    switch (riskLevel) {
        case "Low":
            riskCard.style.backgroundColor = "lightgreen";
            break;
        case "Medium":
            riskCard.style.backgroundColor = "yellow";
            break;
        case "High":
            riskCard.style.backgroundColor = "lightcoral";
            break;
    }

    // Set inner HTML to display risk details
    riskCard.innerHTML = `
        <strong>Risk Name:</strong> ${riskName} <br>
        <strong>Risk Level:</strong> ${riskLevel} <br>
        <strong>Department:</strong> ${department} <br>
    `;

    // Create a "Resolve" button
    const resolveButton = document.createElement("button");
    resolveButton.textContent = "Resolve";
    resolveButton.classList.add("resolveButton");

    // Add event listener to remove the risk card when clicked
    resolveButton.addEventListener("click", function () {
        riskCard.remove();
    });

    // Append button to the risk card
    riskCard.appendChild(resolveButton);

    // Append the new risk card to the dashboard
    riskDashboard.appendChild(riskCard);
}

// Event listener for the form submission
document.getElementById("riskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get input values
    const riskName = document.getElementById("riskName").value.trim();
    const riskLevel = document.getElementById("riskLevel").value;
    const department = document.getElementById("department").value.trim();

    // Validate input before adding the risk
    if (riskName && riskLevel && department) {
        addRiskItem(riskName, riskLevel, department);
        
        // Clear input fields after adding risk
        document.getElementById("riskForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});

// Test Cases
addRiskItem("Cybersecurity Threat", "High", "IT");
addRiskItem("HR Compliance Issue", "Low", "Human Resources");
