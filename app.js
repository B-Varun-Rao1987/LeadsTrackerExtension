//Refactor to addEventListener().
//a const variable cant be reassigned,but let can always be reassigned.
//variables which are not required to be reassigned or are simply not reassigned.Then we can make it a const var.
// localStorage.clear()
let myLeads = []
let oldLeads = [] //inorder to hold some previous saved leads which is not present in myLeads
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("saveTab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

delBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
// const tabs = [{ url: "" }] //array of object.
saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

//active:true means save the tab of the currently active tab out of the possible tabs that are running.
//currentWindow:true means the current window of the browser which is now currently open out of the possible other browser windows that might be open.
//function(tabs) will be triggered only when chrome has found out the tab as per the specification. 

// for (let count = 0; count < myLeads.length; count++) {
//     ulEl.innerHTML += "<li>" + myLeads[count] + "</li>"
// }

// for (let count = 0; count < myLeads.length; count++) {
//     const li = document.createElement("li")
//     li.textContent(myLeads[count])
//     ulEl.append(li)
// }

//Now,the leads are required to be links..
//So,we have to wrap the lead in an anchor tag (<a>) inside the <li>
// Can u make the link open in new tab??
//Yes,by taking target attr and setting it to '_blank'.


function render(leads) {
    let listItems = ""
    for (let count = 0; count < leads.length; count++) {
        // listItems += "<li><a href='" + leads[count] + "' target='_blank'>" + leads[count] + "</a></li>"
        //The above string is a lot hectic to use..rather than we should we should use template strings.
        //Using $ sign we can get the value of the javascript variable in between the html code in btw  `` (tilted quotes).
        //This is Template Strings.

        listItems += `
            <li>
                <a target='_blank' href='${leads[count]}'>${leads[count]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;  //Using DOM costs..so use it as less as possible!!
}









