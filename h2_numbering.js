// add the following script at the end of your marp slide file.
const h2s = document.querySelectorAll('h2');
h2s.forEach(function(h2, idx){
    h2.innerHTML = `<span class="small-font">${idx + 1}</span> ${h2.innerHTML}`
})