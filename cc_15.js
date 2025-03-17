// Task 6
// Select the riskDashboard container
const riskDashboard = document.getElementById("riskDashboard");
console.log("Risk Dashboard Loaded");

// Function to add a new risk item
function addRiskItem(riskName, riskLevel, department) {
    // Create a new div element for the risk card
    const riskCard = document.createElement("div");
    riskCard.classList.add("riskCard");

    // Apply a data attribute to store the risk level
    riskCard.setAttribute("data-risk-level", riskLevel);

    // Apply different background colors based on risk level
    updateRiskCardStyle(riskCard, riskLevel);

    // Set inner HTML to display risk details
    riskCard.innerHTML = `
        <strong>Risk Name:</strong> ${riskName} <br>
        <strong>Risk Level:</strong> <span class="riskLevel">${riskLevel}</span> <br>
        <strong>Department:</strong> ${department} <br>
    `;

    // Prevent clicks inside the card from affecting the dashboard
    riskCard.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event bubbling
    });

    // Create a "Resolve" button
    const resolveButton = document.createElement("button");
    resolveButton.textContent = "Resolve";
    resolveButton.classList.add("resolveButton");

    // Ensure clicking the "Resolve" button does not trigger dashboard events
    resolveButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Stop bubbling up
        riskCard.remove(); // Remove only the clicked risk card
    });

    // Append button to the risk card
    riskCard.appendChild(resolveButton);

    // Append the new risk card to the dashboard
    riskDashboard.appendChild(riskCard);
}

// Function to update risk card style based on level
function updateRiskCardStyle(card, level) {
    // Remove existing risk level classes
    card.classList.remove("lowRisk", "mediumRisk", "highRisk");

    // Apply new background color
    if (level === "Low") {
        card.classList.add("lowRisk");
    } else if (level === "Medium") {
        card.classList.add("mediumRisk");
    } else if (level === "High") {
        card.classList.add("highRisk");
    }
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

// Function to increase all risk levels
function increaseRiskLevels() {
    const riskCards = document.querySelectorAll(".riskCard");

    riskCards.forEach(card => {
        let currentLevel = card.getAttribute("data-risk-level");
        let newLevel;

        if (currentLevel === "Low") {
            newLevel = "Medium";
        } else if (currentLevel === "Medium") {
            newLevel = "High";
        } else {
            newLevel = "High"; // High remains unchanged
        }

        // Update the data attribute
        card.setAttribute("data-risk-level", newLevel);

        // Update the displayed text
        card.querySelector(".riskLevel").textContent = newLevel;

        // Update the background color
        updateRiskCardStyle(card, newLevel);
    });
}

// Event listener for the "Increase Risk Levels" button
document.getElementById("increaseRiskButton").addEventListener("click", increaseRiskLevels);

// Test Case
addRiskItem("Employee Retention", "Low", "HR");
