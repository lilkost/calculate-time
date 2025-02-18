const hoursInput = document.getElementById("hours"),
    minutsInput = document.getElementById("minuts"),
    resultNode = document.querySelector(".result"),
    listNode = document.querySelector(".list"),
    setBtn = document.querySelector(".set-btn");

let resArr = [];


// получение часов
const setValue = () => {
    let hoursInputValue = hoursInput.value ? Number(hoursInput.value) : 0;
    let minutsInputValue = minutsInput.value ? Number(minutsInput.value) : 0;
    
    if(hoursInputValue === 0 && minutsInputValue === 0) return;

    const newArr = [hoursInputValue, minutsInputValue];
    resArr.push(newArr);
    createHTML(newArr, resArr.length);

    console.log(resArr);
    hoursInput.value = '';
    minutsInput.value = '';
}

// создание результата 
const coutResult = () => {
    const h = [],
        m = [];

    resArr.forEach(item=> {
        h.push(item[0]);
        m.push(item[1]);
    });

    let resM = 0;
    let resH = 0;

    m.forEach(m=> {
        resM+=m;
    });

    h.forEach(h=> {
        resH+=h;
    });

    const hoursNodeVal = resH + Math.floor(resM / 60);
    const minutesNodeVal = resM % 60;

    return `${hoursNodeVal} ч. ${minutesNodeVal} м.`;
}

// создание html
const createHTML = (item, count) => {
    let li = document.createElement("li");
    let button = document.createElement("button");

    li.classList.add("list-item");
    button.classList.add("delete-btn");
    button.innerHTML = `
        <svg width="64px" height="64px" viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -1146.000000)" fill="#002333"> <path d="M540.647,1159.24 C541.039,1159.63 541.039,1160.27 540.647,1160.66 C540.257,1161.05 539.623,1161.05 539.232,1160.66 L536.993,1158.42 L534.725,1160.69 C534.331,1161.08 533.692,1161.08 533.298,1160.69 C532.904,1160.29 532.904,1159.65 533.298,1159.26 L535.566,1156.99 L533.327,1154.76 C532.936,1154.37 532.936,1153.73 533.327,1153.34 C533.718,1152.95 534.352,1152.95 534.742,1153.34 L536.981,1155.58 L539.281,1153.28 C539.676,1152.89 540.314,1152.89 540.708,1153.28 C541.103,1153.68 541.103,1154.31 540.708,1154.71 L538.408,1157.01 L540.647,1159.24 L540.647,1159.24 Z M545.996,1146 L528.051,1146 C527.771,1145.98 527.485,1146.07 527.271,1146.28 L518.285,1156.22 C518.074,1156.43 517.983,1156.71 517.998,1156.98 C517.983,1157.26 518.074,1157.54 518.285,1157.75 L527.271,1167.69 C527.467,1167.88 527.723,1167.98 527.979,1167.98 L527.979,1168 L545.996,1168 C548.207,1168 550,1166.21 550,1164 L550,1150 C550,1147.79 548.207,1146 545.996,1146 L545.996,1146 Z" id="delete" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
    `;

    li.innerText = `${
        item[0] < 10 ? '0'+item[0]: item[0]
    }:${
        item[1] < 10 ? '0'+item[1] : item[1]
    }`

    li.appendChild(button);

    listNode.appendChild(li);
    
    button.addEventListener("click", ()=> {
        resArr.splice(count-1, 1);
        li.style.display = 'none';
        resultNode.innerHTML = coutResult()
    });
    
    resultNode.innerHTML = coutResult()
}

window.addEventListener("keypress", (e)=> {
    if(e.key === "Enter") setValue();
});

setBtn.addEventListener("click", ()=> setValue())

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker зарегистрирован с областью:', registration.scope);
            })
            .catch((error) => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}
