const svg = document.querySelector('.svg');
const icon = document.querySelector('.icon');
const holder = document.querySelector('.holder');
const message = document.querySelector('.message');
const card = document.querySelector('.card');

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const amount = urlParams.get('amount');
    const currency = urlParams.get('currency');

    if (window.location.search === '') {
        card.innerHTML= `<p style="text-align: center;">Nothing to show</p>`
    } else if (status === 'success') {
        message.setAttribute('style', 'color:#008000');
        message.textContent = 'Transaction is successfull!';
        holder.innerHTML = `<p><br/><b style="color:#008000; font-size:1.4em;">${currency} ${parseFloat(amount.replace(/[^0-9.]/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></p>`
        svg.classList.add('success')
        if (icon.classList.contains('fa-x')) {
            icon.classList.remove('fa-x');
            icon.classList.add('fa-check')
        }
    } else if (status === 'fail') {
        message.setAttribute('style', 'color:#ff0000');
        message.textContent = 'Transaction failed!'
        if(amount){
            holder.innerHTML = `<p><br/><b style="color:#ff0000; font-size:1.4em;">${currency} ${parseFloat(amount.replace(/[^0-9.]/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></p>`;
        }
        svg.classList.remove('success')
        svg.classList.add('fail');
        if (icon.classList.contains('fa-check')) {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-x')
        }
    } else {
        console.log('Unknown status or no status parameter provided.');
    }
});


