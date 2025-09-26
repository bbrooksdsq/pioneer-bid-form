document.getElementById('bidForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button');
    const messageDiv = document.getElementById('message');
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Gather form data
    const bidData = {
        installerEmail: document.getElementById('installerEmail').value,
        installerName: document.getElementById('installerName').value,
        installerId: document.getElementById('installerId').value,
        opportunityId: document.getElementById('opportunityId').value,
        bidAmount: parseFloat(document.getElementById('bidAmount').value),
        availability: document.getElementById('availability').value,
        estimatedHours: parseInt(document.getElementById('estimatedHours').value),
        notes: document.getElementById('notes').value
    };
    
    try {
        const response = await fetch('https://n8n.dsqtechnology.com/webhook/pioneer-bid-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bidData)
        });
        
        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = 'Bid submitted successfully! You will receive a confirmation email.';
            e.target.reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Error submitting bid. Please try again or contact support.';
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Bid';
    }
});
