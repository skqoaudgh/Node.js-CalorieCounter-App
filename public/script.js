const clearBtn = document.getElementById('clear');
const moreBtn = document.getElementById('more');

if(clearBtn) {
    clearBtn.addEventListener('click', (e) => {
        window.location.href = "http://localhost:3000"; 
    });
}

moreBtn.addEventListener('click', (e) => {
    const hiddenList = document.getElementsByClassName('hidden');
    const max = hiddenList.length<5?hiddenList.length:5;
    for(let i=0; i<max; i++) {
        hiddenList[0].classList.remove('hidden');
    }
});
