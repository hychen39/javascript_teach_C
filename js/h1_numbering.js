// Generate numbering for h1 and h2 elements in the lecture notes
// H1 numbering: 1, 2, 3, ...
// H2 numbering: 1.1, 1.2, 1.3, ...

let h1Counter = 0;
let h2Counter = 0;

document.querySelectorAll('h1, h2').forEach((heading) => {
    if (heading.tagName === 'H1') {
        h1Counter++;
        h2Counter = 0;
        heading.textContent = `${h1Counter}. ${heading.textContent}`;
    } else if (heading.tagName === 'H2') {
        h2Counter++;
        heading.textContent = `${h1Counter}.${h2Counter} ${heading.textContent}`;
    }
});