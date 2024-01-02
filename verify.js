// verify.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('verificationBtn').addEventListener('click', function() {
        var userInput = document.getElementById('verificationInput').value;
        if (userInput === '1551') {
            window.location.href = 'secret.html';
        }
    });
});
