var receivedData = [];

function process_response(data) {
    receivedData = data;
    data = JSON.parse(JSON.stringify(data));
    printAllUnicorns(data);
}

function printAllUnicorns(unicorns) {
    let result = "<ol>";
    unicorns.forEach( (unicorn, i) => {
        result += `<li><button onclick="displayUnicorn(${i})">${unicorn.name}</button></li>`;
    });
    result += "</ol>";
    $("#result").html(result);
}

function displayUnicorn(index) {
    let info = "<ul>";
    let unicorn = receivedData[index];
    for(key in unicorn) {
        if (key == "loves") {
            info += '<ul>';
            for (j = 0; j < unicorn["loves"].length; j++) {
                info += "<li>";
                info += unicorn[key][j];
                info += "</li>";
            }
            info += '</ul>';
        } else {
            info += `<li>${unicorn[key]}</li>`;
        }
    }
    info += "</ul>";
    $("#right").html(info);
}

function getAllUnicorns() {
    // I could've done this with a GET request to my own server instead
    $.ajax({
        url: "https://morning-anchorage-07550.herokuapp.com/findAll",
        type: "POST",
        data: {
            
        },
        success: process_response
    });
}

function setup() {
    $("#allUnicorns").click(getAllUnicorns);
}

$(document).ready(setup);