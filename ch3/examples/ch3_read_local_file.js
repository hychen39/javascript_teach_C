
/**
 * Read a local file using the fs/promises module in Node.js.
 * This example demonstrates how to read a file asynchronously and handle errors.
 * 
 * 注意: 這並不是最佳的寫法，因為它需要手動管理文件的打開和關閉，這可能會導致資源泄漏或其他問題。
 * 在實際應用中，建議使用 readFile 方法來簡化代碼並確保文件被正確關閉。
 */

import { open } from 'fs/promises';

const filePath = 'product-list.txt';

let productList = null;
let fileHandle;
try {
    // open() returns a FileHandle; encoding is specified when reading.
    fileHandle = await open(filePath, 'r');
    productList = await fileHandle.readFile({ encoding: 'utf8' });
} catch (error) {
    console.error(`== Error reading file: ${error.message} == \n` );
    productList = 'Error reading product list.';
} finally {
    console.log('== Finished attempting to read the file.== \n');
    if (fileHandle) {
        await fileHandle.close();
        console.log('== File closed. == \n');
    }
}


console.log(productList);

/**
 * Note: 你可以使用 readFile() 方法直接讀取文件，不需要取得 file handle, 也不需要在手動關閉文件。
 * readFile 方法會自動處理文件的打開和關閉，這樣可以簡化代碼並減少錯誤的可能性。
 * 下面是使用 readFile 方法的示例：
 * 
 * import { readFile } from 'fs/promises';
 * 
 * const filePath = 'product-list.txt';
 * 
 * let productList = null;
 * try {
 *     productList = await readFile(filePath, { encoding: 'utf8' });
 * } catch (error) {
 *     console.error(`== Error reading file: ${error.message} == \n` );
 *     productList = 'Error reading product list.';
 * } finally {
 *     console.log('== Finished attempting to read the file.== \n');
 * }
 * 
 * console.log(productList);
 * 
 * 這樣的寫法更簡潔，並且不需要擔心文件是否被正確關閉，因為 readFile 方法會自動處理這些細節。
 */