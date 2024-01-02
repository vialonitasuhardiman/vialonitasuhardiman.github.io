document.addEventListener('DOMContentLoaded', function () {
    // Initial Erpcoin value
    let erpcoinValue = 5;

    // Function to update Erpcoin value and display
    function updateErpcoin() {
        erpcoinValue--; // Decrease Erpcoin value
        document.getElementById('erpcoin-display').innerText = erpcoinValue + ' Erpcoin';
    }

    // Event listener for the button click
    document.querySelector('button').addEventListener('click', function () {
        if (erpcoinValue > 0) {
            updateErpcoin();
            // Add your logic for buying stuff here
        } else {
            alert('Insufficient Erpcoin balance!');
        }
    });

    // Display initial Erpcoin value
    updateErpcoin();
});
