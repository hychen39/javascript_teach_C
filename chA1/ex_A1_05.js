const url = "https://jsonplaceholder.typicode.com/posts/1";
fetch(url)
        .then(response => {  // register a callback to handle the response
            console.log("First handler for the fetch()'s promise")
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // response.text() returns a promise that resolves with the response body
            return response.text();
        })
        .then(data => {
            console.log("Second handler for the response.text()'s promise");
            // data is the response body
            console.log('Data fetched:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        