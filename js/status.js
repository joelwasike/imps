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
        card.innerHTML= `<p style="text-align: center;">No query parameters provided.<br> Kindly Pass the Query Parameters on the url</p>`
    } else if (status === 'success') {
        message.textContent = 'Transaction was done successfully!'
        holder.innerHTML = `<p>Amount ${currency} ${amount}</p>`
        svg.classList.add('success')
        if (icon.classList.contains('fa-x')) {
            icon.classList.remove('fa-x');
            icon.classList.add('fa-check')
        }
    } else if (status === 'fail') {
        message.textContent = 'Transaction failed!'
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


