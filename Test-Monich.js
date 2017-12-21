//data location
let url="http://www.mrsoft.by/data.json";
// build DOM elements
// create element fot search key input (can be a number or a string)
let input=document.createElement("input");
input.id="key";
input.style.width="200px";
document.body.appendChild(input);
// move to a new line
let br=document.createElement("br");
document.body.appendChild(br);
// create checkbox input with label and move to a new line
let checkBox=document.createElement("input");
checkBox.type="checkbox";
checkBox.id="checkbox";
document.body.appendChild(checkBox);
let useRegistr=document.createElement("label");
useRegistr.for="checkbox";
useRegistr.innerHTML="Use register";
document.body.appendChild(useRegistr);
document.body.appendChild(br.cloneNode(true));
// create button for filter data by word's length
let button1=document.createElement("button");
button1.innerHTML="Words length filter";
button1.style.marginBottom="10px";
button1.style.marginTop="10px";
// assign an anonymous function to the button click
button1.onclick=function () {
    // getting data by url
    $.get(url, function(data){
        //get the input data
        let inputData=document.getElementById("key");
        let key=inputData.value;
        //get element where result of searching will be shown
        let result=document.getElementById("result");
        //check is data is valid for searching (must be integer and !<0)
        if ((key%1)===0 && key>=0){
            //output searching result
            result.innerHTML=searchNumber(key,data.data);
        }else{
            alert("Sorry, you didn't enter an integer or number less 0. Please, try again!")
        }
    });
};
document.body.appendChild(button1);
document.body.appendChild(br.cloneNode(true));
// create button for filter data by substring
let button2=document.createElement("button");
button2.style.marginBottom="10px";
button2.innerHTML="Words substring button";
// assign an anonymous function to the button click
button2.onclick=function () {
    // getting data by url
    $.get(url, function(data){
        //get the input data
        let key=document.getElementById("key");
        //get element where result of searching will be shown
        let result=document.getElementById("result");
        //output searching result
        result.innerHTML=serchSub(key.value,data.data);
    });
};
document.body.appendChild(button2);
document.body.appendChild(br.cloneNode(true));
//create div  for output searching result
let result=document.createElement("div");
result.id="result";
document.body.appendChild(result);

/**
 * function for searching by word's length
 * @param key is required word length
 * @param data is element where we are searching
 * @returns {string} words that satisfy the filter
 */
function  searchNumber(key,data) {
    let s="";
    for(let i=0; i<data.length;i++){
        if(data[i].length>=key){
            s+=data[i]+"<br>";
        }
    }
    if (s==="")
        s="Sorry, no data by your request! Please try again!";
    return s;
}

/**
 * function for searching by substring
 * @param key key is required word length
 * @param data data is element where we are searching
 * @returns {string} words that satisfy the filter
 */
function serchSub(key,data) {
    let s="";
    // check checkbox value for searching by substring with Registr
    let checkbox=document.getElementById("checkbox").checked;
    if(checkbox){
        for(let i=0; i<data.length;i++){
            if(data[i].indexOf(key)>-1){
                s+=data[i]+"<br>";
            }
        }
    }else{
        for(let i=0; i<data.length;i++){
            if(data[i].toLowerCase().indexOf(key)>-1){
                s+=data[i]+"<br>";
            }
        }
    }
    if (s==="")
        s="Sorry, no data by your request! Please try again!";
    return s;
}