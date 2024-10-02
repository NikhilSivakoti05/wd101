
        // Get form and table body elements
        const formElement = document.getElementById('userForm');
        const entriesTableBody = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];

        // Function to calculate the user's age based on the date of birth input
        function calculateUserAge(dob) {
            const today = new Date(); // Get today's date
            const birthDate = new Date(dob); // Convert DOB to date object
            let age = today.getFullYear() - birthDate.getFullYear(); // Calculate year difference
            const monthDiff = today.getMonth() - birthDate.getMonth(); // Calculate month difference
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--; // Adjust if birth month or day hasn't occurred yet this year
            }
            return age; // Return calculated age
        }

        // Function to add a new entry to the table
        function addRowToTable(name, email, password, dob, termsAccepted) {
            const newRow = entriesTableBody.insertRow(); // Create a new row in the table
            newRow.insertCell(0).innerText = name; // Insert name in the first column
            newRow.insertCell(1).innerText = email; // Insert email in the second column
            newRow.insertCell(2).innerText = password; // Insert password in the third column
            newRow.insertCell(3).innerText = dob; // Insert date of birth in the fourth column
            newRow.insertCell(4).innerText = termsAccepted ? 'true' : 'false'; // Insert 'true' or 'false' based on checkbox status
        }

        // Load saved entries from localStorage when the page is reloaded
        function loadEntriesFromStorage() {
            const storedKeys = Object.keys(localStorage); // Get all keys from localStorage
            if (storedKeys.length === 0) {
                return; // If localStorage is empty, don't load any entries
            }
            for (const key of storedKeys) {
                const entryData = JSON.parse(localStorage.getItem(key)); // Parse stored entry data
                if (entryData) {
                    
                    addRowToTable(entryData.name, entryData.email, entryData.password, entryData.dob, entryData.terms);
                }
            }
        }

        // Event listener for form submission
        formElement.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission behavior (page refresh)

            // Get values from form fields
            const userName = document.getElementById('username').value;
            const userEmail = document.getElementById('useremail').value;
            const userPassword = document.getElementById('userpassword').value;
            const userDob = document.getElementById('userdob').value;
            const termsAccepted = document.getElementById('termsCheckbox').checked; // Check if terms are accepted

            const userAge = calculateUserAge(userDob); 

            // Validate age to be between 18 and 55
            if (userAge < 18 || userAge > 55) {
                alert('Age must be between 18 and 55 years.');
                return; 
            }

            // Save form data to localStorage with email as key
            const userData = { name: userName, email: userEmail, password: userPassword, dob: userDob, terms: termsAccepted };
            localStorage.setItem(userEmail, JSON.stringify(userData));

           
            addRowToTable(userName, userEmail, userPassword, userDob, termsAccepted);

            // Reset the form after submission
            formElement.reset();
        });

        // Load stored data from localStorage when the page is loaded
        window.addEventListener('load', loadEntriesFromStorage);
    
