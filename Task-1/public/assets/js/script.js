const nav_toggle = document.getElementById("nav_toggle")
const nav_close = document.getElementById("nav_close")
nav_toggle.addEventListener("click", () => {
    nav_menu.classList.add("show_menu");
})
nav_close.addEventListener("click", () => {
    nav_menu.classList.remove("show_menu");
})
const scrollup = () => {
    const header = document.querySelector('#header')
    window.scrollY >= 50 ? header.classList.add('shrink') : header.classList.remove('shrink')
}

window.addEventListener('scroll', scrollup)


// Drag & Drop Image
const dropArea = document.getElementById('drop-area');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const files = e.dataTransfer.files[0];
    console.log(files)
    handleFiles(files);
}

dropArea.addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const files = e.target.files[0];
    handleFiles(files);
});

function handleFiles(files) {
    previewImage(files);
    uploadImage(files);
}

/* To show preview image */
function previewImage(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        let fileurl = reader.result;
        const img = `<img src=${fileurl} alt="" />`
        img.src = e.target.result;
        dropArea.style.border = "none"
        dropArea.innerHTML = img
    };
}

/* Upload image to the server */
function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => console.log('Image uploaded:', data))
        .catch(error => console.error('Error uploading image:', error));
}


/* load data by jquery ajax call */
$(document).ready(function () {
    // Fetch data using AJAX
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'http://numbersapi.com/1/30/date?json',
        success: function (data) {
            setTimeout(()=>{
                $('#randomFact').text(data.text);
            },2000)
        }
    });
});

/* Scroll Reveal Animation */

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 350,
    // reset: true
})

sr.reveal(`.home_data, .footer_container`);
sr.reveal(`.home_card`, {delay: 600, distance: '70px', interval: 100});
sr.reveal(`.about_data`, {origin: 'left'});
sr.reveal(`.about_image`, {origin: 'right'});
sr.reveal(`.contact_content`, {origin: 'left'});
sr.reveal(`.contact_form`, {origin: 'right'});