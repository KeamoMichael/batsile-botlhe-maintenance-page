// Contact Form Modal Functionality
const modal = document.getElementById('contactModal');
const btn = document.getElementById('contactBtn');
const span = document.getElementsByClassName('close')[0];
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Open modal
btn.onclick = function() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
span.onclick = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';

    try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            form.reset();

            // Close modal after 2 seconds
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                formStatus.textContent = '';
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.textContent = 'Oops! Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
