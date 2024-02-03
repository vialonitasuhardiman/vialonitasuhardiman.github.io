function calculateSpeed() {
    const startTime = performance.now();

    fetch('https://erp112.is-a-fullstack.dev/5mb.test') // Replace with a URL to a large file for testing
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Convert the response to a blob
        })
        .then(blob => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // Convert to seconds
            const downloadSpeed = (blob.size / duration) / 1e6; // MBps

            resultText.textContent = `Download Speed: ${downloadSpeed.toFixed(2)} Mbps`;
        })
        .catch(error => {
            console.error('Error:', error);
            resultText.textContent = 'Speed test failed.';
        });
}
