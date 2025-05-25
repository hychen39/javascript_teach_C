
// Callback hell example

function startTimeouts() {
    setTimeout(() => {
        console.log('First timeout');
        setTimeout(() => {
            console.log('Second timeout');
            setTimeout(() => {
                console.log('Third timeout');
                setTimeout(() => {
                    console.log('Fourth timeout');
                    // Continue nesting if needed
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

// Call the function
startTimeouts();