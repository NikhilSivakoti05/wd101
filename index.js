// Wait for the DOM to fully load before executing the function
document.addEventListener("DOMContentLoaded", function () {
    // Get the registration form element
    const registrationForm = document.getElementById("registrationForm");
    // Get the table body element where entries will be displayed
    const entriesTableBody = document.getElementById("entriesTableBody");
    // Get the element for displaying date of birth errors
    const dateOfBirthError = document.getElementById("dobError");

    // Function to calculate the age from the date of birth
    function calculateAge(dateOfBirth) {
        // Create a Date object from the date of birth input
        const dobDate = new Date(dateOfBirth);
        // Get the current date
        const today = new Date();
        // Calculate initial age
        let age = today.getFullYear() - dobDate.getFullYear();
        // Calculate the difference in months
        const ageMonthDifference = today.getMonth() - dobDate.getMonth();

        // Adjust age if the current month is before the birth month, or if it's the same month but the current day is earlier
        if (ageMonthDifference < 0 || (ageMonthDifference === 0 && today.getDate() < dobDate.getDate())) {
            age--; // Decrease age by 1 if necessary
        }
        return age; // Return the calculated age
    }

    // Function to validate the date of birth
    function validateDateOfBirth(dateOfBirth) {
        const age = calculateAge(dateOfBirth); // Get the age from the date of birth
        // Return true if age is between 18 and 55 (inclusive), false otherwise
        return age >= 18 && age <= 55;
    }

    // Function to load entries from localStorage
    function loadEntries() {
        // Get the entries from localStorage or set to an empty array if none exist
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        // Iterate through each entry to create a new row in the table
        entries.forEach(entry => {
            const newRow = document.createElement("tr"); // Create a new table row
            // Set the inner HTML of the new row with entry details
            newRow.innerHTML = `
                <td>${entry.name}</td>
                <td>${entry.email}</td>
                <td>${entry.password}</td>
                <td>${entry.dob}</td>
                <td>${entry.terms ? 'true' : 'false'}</td>
            `;
            entriesTableBody.appendChild(newRow); // Append the new row to the table body
        });
    }

    // Function to save an entry to localStorage
    function saveEntry(entry) {
        // Get the existing entries from localStorage or set to an empty array if none exist
        const entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry); // Add the new entry to the existing entries
        localStorage.setItem("entries", JSON.stringify(entries)); // Save the updated entries back to localStorage
    }

    // Add event listener to handle form submission
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        // Get form values from input fields
        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;
        const userPassword = document.getElementById("password").value;
        const userDOB = document.getElementById("dob").value;
        const userTerms = document.getElementById("terms").checked;

        // Validate the date of birth; if invalid, show error message and stop submission
        if (!validateDateOfBirth(userDOB)) {
            dateOfBirthError.classList.remove("hidden"); // Show the error message
            return; // Stop form submission if the age is not valid
        } else {
            dateOfBirthError.classList.add("hidden"); // Hide the error message if valid
        }

        // Create a new row for the entry
        const newRow = document.createElement("tr");
        // Set the inner HTML of the new row with user input details
        newRow.innerHTML = `
            <td>${userName}</td>
            <td>${userEmail}</td>
            <td>${userPassword}</td>
            <td>${userDOB}</td>
            <td>${userTerms ? 'true' : 'false'}</td>
        `;
        entriesTableBody.appendChild(newRow); // Append the new row to the table body

        // Save the new entry to localStorage
        saveEntry({ name: userName, email: userEmail, password: userPassword, dob: userDOB, terms: userTerms });

        // Reset the form fields after submission
        registrationForm.reset();
    });

    // Load existing entries when the page loads
    loadEntries();
});
