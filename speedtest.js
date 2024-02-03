document.addEventListener('DOMContentLoaded', function() {
    const resultText = document.getElementById('result');

    function calculateSpeed() {
        const fileSize = 5.24 * 1024 * 1024; // 5MB file size in bytes
        const startTime = performance.now();

        fetch('https://erp112.is-a-fullstack.dev/5mb.test') // Replace with a URL to a large file for testing
            .then(response => {
                const endTime = performance.now();
                const duration = (endTime - startTime) / 1000; // Convert to seconds
                const downloadSpeed = (fileSize / duration) / 1e6; // MBps

                resultText.textContent = `Download Speed: ${downloadSpeed.toFixed(2)} Mbps`;
            })
            .catch(error => {
                console.error('Error:', error);
                resultText.textContent = 'Speed test failed.';
            });
    }

    resultText.textContent = 'Click the button below to start the speed test.';
    
    const startButton = document.getElementById('startTest');
    startButton.addEventListener('click', calculateSpeed);
});
