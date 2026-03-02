// Get all input elements
const companyNameInput = document.getElementById('companyName');
const numberInput = document.getElementById('numberInput');
const dateInput = document.getElementById('dateInput');
const outputDiv = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const themeToggle = document.getElementById('themeToggle');

// Dark mode functionality
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Initialize theme on page load
initTheme();

// Function to remove all dashes from the number input
function removeDashes(str) {
    return str.replace(/-/g, '');
}

// Function to format date from YYYY-MM-DD to MMDDYYYY
function formatDate(dateStr) {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}${day}${year}`;
}

// Function to update the output
function updateOutput() {
    const companyName = companyNameInput.value.trim();
    const number = removeDashes(numberInput.value.trim());
    const formattedDate = formatDate(dateInput.value);
    
    // Build the output string
    const output = `${companyName}_${number}_${formattedDate}`;
    
    outputDiv.textContent = output;
}

// Add event listeners to all inputs
companyNameInput.addEventListener('input', updateOutput);
numberInput.addEventListener('input', updateOutput);
dateInput.addEventListener('change', updateOutput);

// Copy to clipboard functionality
copyBtn.addEventListener('click', async () => {
    const textToCopy = outputDiv.textContent;
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Visual feedback
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = 'Copy to Clipboard';
            copyBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    }
});

// Initialize with empty output
updateOutput();