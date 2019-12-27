const clearBtn = document.getElementById('clear');

if(clearBtn) {
    clearBtn.addEventListener('click', (e) => {
        window.location.href = "http://localhost:3000"; 
    });
}
