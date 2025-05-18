---
marp: false
theme: default
header: 'Chapter 13 互動式內容與事件監聽器'
footer: 'Hung-Yi Chen, Dept. of Info. Mgt., CYUT  | 2024'
class: lead
paginate: true
headingDivider: [1, 2, 3, 4]
lang: zh-tw
---

<style>
    .columns {
    display: flex;
  }
  .column {
    flex: 1;
    padding: 10px;
  }
  .column.large{
    flex: 2;
  }
  .small-font {
    font-size: 0.8em;
  }

  section > header,
section > footer {
  position: absolute;
  left: auto;
  right: 90px;
  height: 20px;
}

header {
  top: 30px;
}

footer {
  bottom: 30px;
}
</style>

# Chapter 13 互動式內容與事件監聽器 Part 4

## `input` 元素 的 onblur/onfocus 與 onchange 事件

### `onblur` 與 `onfocus` 事件

當 input 元素失去焦點時會觸發 `onblur` 事件。

相反地，當 input 元素獲得焦點時會觸發 `onfocus` 事件。

### 範例 6：當 input 元素獲得或失去焦點時改變背景顏色

![w:300px](img/24-09-01-09-31-44.png)

針對表單內所有 input 元素：
- 當 input 元素獲得焦點時，背景顏色變為黃色。
- 當 input 元素失去焦點時，背景顏色變回白色。

我們將 `focus` 與 `blur` 事件註冊到 form 元素(所有`input` 的父元素)，以處理其所有子元素的事件。

在**捕獲階段**（capturing phase）呼叫事件處理函式，在事件到達目標元素之前改變背景顏色。

---

此範例的 JavaScript 程式碼如下：
```javascript
const form = document.getElementById('myForm');
form.addEventListener('focus', function(event) {
    // 設定元素的 style 屬性
    event.target.style.backgroundColor = 'yellow';
}, true);
form.addEventListener('blur', function(event) {
    event.target.style.backgroundColor = '';
}, true);
```
- `addEventListener()` 的第三個參數設為 `true`，代表在捕獲階段註冊事件監聽器。

完整範例請見 [ex_11_6.html](ex_11_06.html)

### `input` 元素的 `onchange` 事件

當 input 元素的值改變且元素失去焦點時，會觸發 `onchange` 事件。

### 範例 10-7：當欄位變更時自動產生全名

- 每當名字或姓氏欄位的值改變時，會在輸出欄位顯示全名。

我們監聽 form 元素的 `change` 事件，就可以同時處理所有 input 元素的變更事件。
- 因為 input 元素的 `change` 事件會浮昇到 form 元素。

![](img/24-09-01-10-09-19.png)

---

此範例的 JavaScript 程式碼如下：

```javascript
const form = document.getElementById('myForm');
form.onchange = function (event) {
    const output = document.getElementById('output');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    output.innerHTML = `${firstName} ${lastName}`;
};
```

完整範例請見 [ex_11_7.html](ex_11_7.html)

## Key Events

Let you capture the key pressed by the user and perform the necessary operations.

### The `keydown`, `keyup`, and `keypress` events

The `keydown` event is fired when a key is pressed down.

The `keyup` event is fired when a key is released.

Both of the two events emit the `KeyboardEvent` object.

The `keypress` event is fired when a key is pressed down and released. 

![bg right:40% fit](https://s1.o7planning.com/web-rs/web-image/en/arf-1141686-vi.webp)
https://o7planning.org/12319/javascript-keyboardevent

---


Warning: 
- The [`keypress` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event) has been deprecated in the latest version of the JavaScript.

### Get the pressed key or code

The `KeyboardEvent` object provides:
- `key` property: returns the **character value** of the key pressed
  - e.g. Press b key, returns "b"; Press shift+b key, returns "B"
  - Press left control key, returns "Control"

- `code` property: returns the **physical key** pressed
  - e.g. Press b key, returns "KeyB"; Press shift+b key, returns "KeyB"
  - Press left control key, returns "ControlLeft"

### keyboardEvent event and  keyboardEvent.key property

When user presses a key, the browser generates a `KeyboardEvent` object.

The `key` property of the `KeyboardEvent` object returns the **character value** of the key pressed.

If the pressed key has a **printed representation**, the returned value is a non-empty Unicode character string containing the printable representation of the key.
- Press b key, returns "b"
- Press shift+b key, returns "B"

---

If the pressed key is a **control or special character**, the returned value is one of the pre-defined key values.
- Press Enter key, returns "Enter"
- Press Backspace key, returns "Backspace"
- See the complete list of pre-defined key values in [Key values for keyboard events - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#editing_keys)

If the key cannot be identified, the returned value is Unidentified.

### keyboardEvent.code property

The `KeyboardEvent.code` property returns the pressed **physical key**. 

It is not affected by the keyboard layout or the state of the modifier keys.

For example:
- Press b key, returns "KeyB"
- Press left-shift and b key, returns "ShiftLeft" and "KeyB" (two events are generated)

### Example 10-8: Display the key and code values when a key is pressed

Enter any keys in the input field, the key and code values of the pressed key are displayed on the page.

![](img/24-09-01-11-47-46.png)

---

The JavaScript code for this example:

```javascript
const input = document.querySelector("input");
    const keyLog = document.getElementById("keyCodeLog");
    const charLog = document.getElementById("charCodeLog");

    input.addEventListener("keydown", logKey);

    function logKey(e) {
        keyLog.textContent += ` ${e.code}`;
        charLog.textContent += ` ${e.key}`;
    }
    function clearLogs() {
        keyLog.textContent = "";
        charLog.textContent = "";
    }
```

See the complete example in [ex_11_8.html](ex_11_8.html)

### Example 10-9: Allow only numbers to be entered in the input field, no spaces, alphabets, or special characters

- The example allows only numbers to be entered in the input field. 
- Exceptional keys include Backspace, Delete, ArrowLeft, and ArrowRight for editing. 

![](img/24-09-01-13-10-19.png)

---

The JavaScript code to validate the input field:

```javascript
// Add the keydown event listener to the input field
input.addEventListener("keydown", isNumberKey);

 // function to check if the key pressed is a number
function isNumberKey(event) {
    const exceptionKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if ((isNaN(event.key) && !exceptionKeys.includes(event.code)) || event.code =='Space') {
            // prevent the default behavior of the keydown event, and stop the event propagation
            event.preventDefault();
            // stop the event propagation
            event.stopPropagation();
    }
}
```

--- 

First, the `keydown` event is registered to the input field. When a key is pressed, the `isNumberKey` function is invoked.

The `isNumberKey` function checks if the pressed key is a number. 

If the key is not a number, the `preventDefault()` method is called to prevent the default action of the key.
- That is, the key is not entered in the input field.

See the complete example in [ex_11_9.html](ex_11_09.html)

### Notes to the deprecated `keycode` and `charcode` properties

The `keycode` and `charcode` properties have been deprecated in the latest version of the JavaScript.
- Do not use them.
- Use the `key` property instead.

<!-- `keycode` represents a system and implementation dependent numerical code, such as ASCII code.
- All keys have `keycode` values, including the function keys, arrow keys, and control keys that do not generate character values.

`charcode` is the returned the Unicode value of a character key when the key is pressed. 
- These keys are the alphabetical, numerical, and punctuation keys. -->

### Review Questions

- What the events should you listen to if you want to show a list of suggestions when the user types in an input field?
  A. `keydown`, `keyup`, or `keypress`
  B. `blur` and `focus`
  C. `change`

<!-- Ans: use `keydown`, `keyup`, or `keypress` events to capture the key pressed. the `change` event is suitable too.
 -->

- You want to know if the user presses the left control key. Which property of the `keyboardEvent` object should you use?
  A. `keyboardEvent.key`
  B. `keyboardEvent.code`

<!-- Ans: use `keyboardEvent.code` to get the physical key pressed. -->

## Form Submission

Form submission is a fundamental aspect of web development, allowing users to send data to a server for processing.

### Setup a form

To create a form, use the `<form>` element and include various input elements, such as text fields, radio buttons, checkboxes, and submit buttons.

Set:
- the `action` attribute: the URL of the server-side script that will process the form data.
  - or the redirect URL after the form is submitted.
- the `method` attribute: the HTTP method used to send the form data, such as `GET` or `POST`.

---

```html
<body>
     <form id="exampleForm" 
        action="https://formtester.goodbytes.be/post.php" 
        method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <br>
        <input type="submit" value="Submit">
    </form>
</body>
```

### Listen to the form submission event

- The form submission event is fired when the user submits the form by clicking the submit button: 
  - the input element with the `type="submit"` attribute.

You can perform:
- validation, 
- data processing, or
- other operations 
before the form is submitted in the form submission event handler.

### Get the form data from the form element

Use the `new FormData(formElementObject)` constructor to create a new `FormData` object from the existing form element.  

The `FormData` object provides methods to retrieve the form data, such as `get()`, `getAll()`, and `entries()`.
- store a set of key-value pair of the form data.
- the `name` attribute of the input element is the key, and the `value` attribute is the value.

### Example 11-11: Construct a `FormData` object from the form data

When the user submits the form, the form data is displayed in the console.

```javascript
const form = document.getElementById("exampleForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
    });
```

---

![w:600px](img/24-Dec-15-16-48-32.png)

### Example 11-12: Validate the form data before submission

When the user submits the form, the form data is validated. If the form data is invalid, the form is not submitted.

S1. Create a validation function to check if the name and email fields are empty.

```js
function validate(formData) {
            const name = formData.get('name');
            const email = formData.get('email');
            if (name === "" || email === "") {
                alert("Name and email are required.");
                return false;  // return false to prevent the form submission
            } else 
            return true;  // return true to allow the form submission
        }
```
---

S2. Validate the form data in the form submission event handler.

```js
form.addEventListener('submit', function(event) {
            const form = document.getElementById('exampleForm');
            const formData = new FormData(form);
            if (!validate(formData)) {
                event.preventDefault();  // prevent the form submission
            } else {
                form.submit();  // allow the form submission
                alert("Form submitted successfully.");
            }
        });
```

---

Notes to the `form.submit()` method:
- The JS will create a new `FormData` object from the form data and send the `FormData` object to the server when the form is submitted.
- If you want to modify the `FormData` object before submission, you can listen to the `formdata` event of the form element.
- See [HTMLFormElement: formdata event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event)

See the complete example in [ex_11_11.html](ex_11_11.html)

### Review Questions

- What is the responsibility of the `FormData` object in JavaScript? (Select all that apply)
  A. To store the form data in a key-value pair
  B. To create a new form element
  C. To submit the form data to the server

<!-- Ans: A. To store the form data in a key-value pair
Incorrect options:
- C. The HTMLFormElement object is used to submit the form data to server. 
-->


- What can you do in the form submission event handler? (Select all that apply)
  A. Validate the form data
  B. Process the form data
  C. Prevent the form submission
  D. Call fetch() to send the form data to the server

<!-- Ans: A, B, C, D -->

