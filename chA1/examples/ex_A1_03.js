console.log('Start');
setTimeout(() => {
    // Task 1 的 callback fun
    console.log('Complete Task 1');
    // 在 Task 1 的 callback 中啟動 Task 2
    setTimeout(() => {
        // Task 2 的 callback function
        console.log('Complete Task 2');
        // 在 Task 2 的 callback 中啟動 Task 3
        setTimeout(() => {
            // Task 3 的 callback function
            console.log('Complete Task 3');
            // 在 Task 3 的 callback 中啟動 Task 4
            setTimeout(() => {
                console.log('Complete Task 4');
                console.log('Finish');
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);