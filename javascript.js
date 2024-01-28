document.addEventListener('DOMContentLoaded', function() {
    // Get form and button elements
    var form = document.getElementById('form');
    var button = document.getElementById('submit-Btn');

  
    // Get display elements
    var yearsDisplay = document.querySelector('.display.years');
    var monthsDisplay = document.querySelector('.display.months');
    var daysDisplay = document.querySelector('.display.days');

    // Get error message elements
    var errorDay = document.querySelector('.error-text.one');
    var errorMonth = document.querySelector('.error-text.two');
    var errorYear = document.querySelector('.error-text.three');

    // Add click event listener to the button
    button.addEventListener('click', function() {
        if (form.checkValidity()) {
            calculation();
        }else {
            errorMsgs();
        }

    })
      // Check if any field is empty
      function errorMsgs() {
        var inputs = form.querySelectorAll('.form-element');
        inputs.forEach(function (input, index) {
            var label = input.previousElementSibling; // Assuming labels are immediately preceding the input elements
    
            if (index === 0) {
                if (input.value === '') {
                    errorDay.textContent = 'This field is required';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else if (!input.checkValidity()) {
                    errorDay.textContent = 'Must be a valid day';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else {
                    errorDay.textContent = '';
                    input.classList.remove('error');
                    label.classList.remove('error-label');
                }
            } else if (index === 1) {
                if (input.value === '') {
                    errorMonth.textContent = 'This field is required';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else if (!input.checkValidity()) {
                    errorMonth.textContent = 'Must be a valid month';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else {
                    errorMonth.textContent = ' ';
                    input.classList.remove('error');
                    label.classList.remove('error-label');
                }
            } else if (index === 2) {
                if (input.value === '') {
                    errorYear.textContent = 'This field is required';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else if (!input.checkValidity() || parseInt(input.value, 10) >= new Date().getFullYear()) {
                    errorYear.textContent = 'Must be a past year';
                    input.classList.add('error');
                    label.classList.add('error-label');
                } else {
                    errorYear.textContent = '';
                    input.classList.remove('error');
                    label.classList.remove('error-label');
                }
            }
        });
    }
    
    
    function calculation() {
        // Get user input values
        const userDay = parseInt(document.getElementById('day').value, 10);
        const userMonth = parseInt(document.getElementById('month').value, 10);
        const userYear = parseInt(document.getElementById('year').value, 10);
    
        // Validate user input to create a valid Date object
        const userDate = new Date(userYear, userMonth - 1, userDay);
    
        // Get current date
        const currentDate = new Date();
    
        // Check if the input date is valid
        if (
            userDate.getDate() !== userDay ||
            userDate.getMonth() + 1 !== userMonth ||
            userDate.getFullYear() !== userYear
        ) {
            // Display error message and set error-related classes
            errorDay.textContent = 'Must be a valid date';
            errorMonth.textContent = '';
            errorYear.textContent = '';
    
            var inputs = form.querySelectorAll('.form-element');
            inputs.forEach(function (input) {
                input.classList.add('error');
            });
    
            var labels = form.querySelectorAll('.form-label');
            labels.forEach(function (label) {
                label.classList.add('error-label');
            });
    
            // Exit the function since the input date is invalid
            return;
        }
    
        // Check if the year is in the past
        if (userYear >= currentDate.getFullYear()) {
            // Display error message and set error-related classes
            errorDay.textContent = '';
            errorMonth.textContent = '';
            errorYear.textContent = 'Must be a past year';
    
            var inputs = form.querySelectorAll('.form-element');
            inputs.forEach(function (input) {
                input.classList.add('error');
            });
    
            var labels = form.querySelectorAll('.form-label');
            labels.forEach(function (label) {
                label.classList.add('error-label');
            });
    
            // Exit the function since the year is not in the past
            return;
        }
    
        // Calculate the difference in milliseconds
        const timeDiff = currentDate - userDate;
    
        // Calculate years, months, and days
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    
        // Display the calculated values
        yearsDisplay.textContent = years;
        monthsDisplay.textContent = months;
        daysDisplay.textContent = days;
    
        // Remove error-related classes
        var inputs = form.querySelectorAll('.form-element');
        inputs.forEach(function (input) {
            input.classList.remove('error');
        });
    
        var labels = form.querySelectorAll('.form-label');
        labels.forEach(function (label) {
            label.classList.remove('error-label');
        });
    
        // Reset error text content
        errorDay.textContent = '';
        errorMonth.textContent = '';
        errorYear.textContent = '';
    }
    
    
});

