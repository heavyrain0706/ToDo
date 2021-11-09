document.addEventListener("DOMContentLoaded", init)

function init(){

    const url = 'https://jsonplaceholder.typicode.com/todos';
    const placeholderOpenClassName = 'label__server-open';
    const placeholderDeleteClassName = 'label__server-delete';
    const myOpenClassName = 'label__my-open';
    const myDeleteClassName = 'label__my-delete';

    let inputArea = document.querySelector('.box__input');
    let addBtn = document.querySelector('.box__button-add');

    let itemsFromStorage = JSON.parse(localStorage.getItem('items'));

    addBtn.addEventListener('click', () => {
        if(inputArea.value != '') {
            myTaskAppendor();
        } else {
            inputArea.classList.add('error')
        }
    })

    inputArea.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            if(inputArea.value != '') {
                myTaskAppendor();
            } else {
                inputArea.classList.add('error')
            }
        }
    })

    const sendRequest = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(data => createPage(data))
        .then(getPlaceholderOpenButtons)
        .then(getPlaceholderDelButtons)
        .then(drawFromStorage)
    }

    const myTaskAppendor = () => {
        pushToStorage(inputArea.value);
        dynamicDrawFromStorage();
        inputArea.classList.remove('error')
        inputArea.value = '';
    }

    const pushToStorage = (element) => {
        let itemsToStorage = JSON.parse(localStorage.getItem('items'));
        if(itemsToStorage) {
            let newToDo = {
                id: Date.now(),
                text: element
            }
            itemsToStorage.push(newToDo);
        } else {
            itemsToStorage = [];
            let newToDo = {
                id: Date.now(),
                text: element
            }
            itemsToStorage.push(newToDo);
        }
        
        localStorage.setItem('items', JSON.stringify(itemsToStorage))
    }

    const drawFromStorage = () => {
        if(itemsFromStorage) {
            itemsFromStorage.forEach(element => {
                DrawHTML(element.text, myOpenClassName, myDeleteClassName, element.id, setHandlersForStorageItems);
            });
        }
    }

    const dynamicDrawFromStorage = () => {
        let itemsFromStorage = JSON.parse(localStorage.getItem('items'));
        DrawHTML((itemsFromStorage[itemsFromStorage.length - 1]).text, myOpenClassName, myDeleteClassName, (itemsFromStorage[itemsFromStorage.length - 1]).id, setDynamicHandlers);
    }

    const getPlaceholderOpenButtons = () => {
        const deleteButtons = document.querySelectorAll('.label__server-open');
        deleteButtons.forEach(element => {
            element.addEventListener('click', () => {
                let newWindow = window.open("", "Item", "width=500, height=600");
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>ToDo Item</title>
                    <link rel="stylesheet" href="./css/item.css">
                    </head>
                    <body>
                        <div class="Item">
                            <h1>Task</h1>
                            <h3>Description</h3>
                            <p>
                                In this task, you need to do ${element.parentNode.parentNode.innerText}
                            </p>
                        </div>
                    </body>
                    </html>
                `);
            })
        })
    }

    const getPlaceholderDelButtons = () => {
        const deleteButtons = document.querySelectorAll('.label__server-delete');
        deleteButtons.forEach(element => {
            element.addEventListener('click', () => {
                let htmlToDelete = element.parentNode.parentNode;
                htmlToDelete.remove();
            })
        })
    }

    const setDynamicHandlers = (openBtn, deleteBtn, element) => {
        openBtn.addEventListener('click', () => {
            let newWindow = window.open("", "Item", "width=500, height=600");
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ToDo Item</title>
                <link rel="stylesheet" href="./css/item.css">
                </head>
                <body>
                    <div class="Item">
                        <h1>Task</h1>
                        <h3>Description</h3>
                        <p>
                            In this task, you need to do ${element.innerText}
                        </p>
                    </div>
                </body>
                </html>
            `);
        })
        deleteBtn.addEventListener('click', () => {
            let htmlToDelete = element;
            let deleteFromStorage = htmlToDelete.id;
            htmlToDelete.remove();
            delElementFromStorage(deleteFromStorage, JSON.parse(localStorage.getItem('items')))
        })
    }

    const setHandlersForStorageItems = (openBtn, deleteBtn, element) => {
        openBtn.addEventListener('click', () => {
            let newWindow = window.open("", "Item", "width=500, height=600");
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ToDo Item</title>
                <link rel="stylesheet" href="./css/item.css">
                </head>
                <body>
                    <div class="Item">
                        <h1>Task</h1>
                        <h3>Description</h3>
                        <p>
                            In this task, you need to do ${element.innerText}
                        </p>
                    </div>
                </body>
                </html>
            `);
        })
        deleteBtn.addEventListener('click', () => {
            let htmlToDelete = element;
            let deleteFromStorage = htmlToDelete.id;
            htmlToDelete.remove();
            delElementFromStorage(deleteFromStorage, JSON.parse(localStorage.getItem('items')))
        })
    }
    
    const delElementFromStorage = (element, storage) => {
        let itemsToStorage = storage.filter(elementFromStorage => elementFromStorage.id != element)
        console.log(itemsToStorage)
        localStorage.setItem('items', JSON.stringify(itemsToStorage))
    }

    const DrawHTML = (data, classNameOpen, classNameDelete, idName = null, setHandlersCallback = null) => {
        let elementLabel = document.createElement('label');
        elementLabel.className = 'label';
        if(idName) {
            elementLabel.id = idName;
        }
        document.querySelector('.box').appendChild(elementLabel);
        elementLabel.innerHTML = `
        <input class="label__checkbox" type="checkbox">
        <span class="label__check-style"></span>
        <span class="label__text">${data}</span>
        <div class="label__buttons">
            <button class="${classNameOpen}">
                <svg width="20" heigth="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#8F0500" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
            </button>
            <button  class="${classNameDelete}">
                <svg width="20" heigth="20" aria-hidden="true" focusable="false" data-prefix="far" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#8F0500" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path></svg>
            </button>
        </div>
        `
        if(setHandlersCallback){
            let openBtn = elementLabel.children[3].children[0],
                deleteBtn = elementLabel.children[3].children[1];
            setHandlersCallback(openBtn, deleteBtn, elementLabel);
        }
    }

    const createPage = (data) => {
        for(key in data) {
            if(data[key].id <= 10) {
                DrawHTML(data[key].title, placeholderOpenClassName, placeholderDeleteClassName);
            } else {
                break;
            }
        }
    }

    sendRequest(url);
}