const allAnchors = document.querySelectorAll('a');
let firstAnchor = document.querySelectorAll('a')[0]
console.log('First anchor element:', firstAnchor);
let secondAnchor = document.querySelectorAll('a')[1]
console.log('Second anchor element:', secondAnchor);

// Assign the onclick event handler

firstAnchor.onclick = function(event) {
  console.log('Event type:', event.type);
  console.log('Event target:', event.target);
  window.alert('You clicked the first anchor element');
}

secondAnchor.onclick = function(event) {
    console.log('Hello, World!');
    console.log('Event type:', event.type);
    console.log('Event target:', event.target);
}