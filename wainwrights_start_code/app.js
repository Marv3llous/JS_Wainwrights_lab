let wainwrightsInfo;

const wainwrightsList = document.querySelector("#wainwrights-list");

const getAllWainwrights = async () => {
    const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
    const information = await response.json();
    wainwrightsInfo = information;
    mapWainwrights(wainwrightsInfo);
    console.log(wainwrightsInfo);

}


const mapWainwrights = (wainwrightsArray) => {
    wainwrightsList.innerText = "";
    for(wainwright of wainwrightsArray){
        let wainwrightElement = document.createElement("li");

        addWainwrightInfoToElement(wainwrightElement, wainwright);
        wainwrightsList.appendChild(wainwrightElement);
    }
}

const addWainwrightInfoToElement = (wainwrightElement) => {
    let wainwrightNameElement = document.createElement("h3");
    wainwrightNameElement.innerText = wainwright.name;
    wainwrightElement.appendChild(wainwrightNameElement);

    let wainwrightHeightElement = document.createElement("h4");
    wainwrightHeightElement.innerText = `Height: ${wainwright.heightMetres}m / ${wainwright.heightFeet} ft`
    wainwrightElement.appendChild(wainwrightHeightElement);

    let wainwrightAreaElement = document.createElement("p");
    wainwrightAreaElement.innerText = `Area: ${wainwright.area.areaName}`
    wainwrightElement.appendChild(wainwrightAreaElement);
}



const filterWainwrights = async (filterTerm) => {
    let filteredWainwrightsList = await wainwrightsInfo.filter(wainwright => wainwright.name.toLowerCase().includes(filterTerm));
    mapWainwrights(filteredWainwrightsList);
}

const form = document.querySelector("#filter-wainwrights-form");

form.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    wainwrightsList.innerText = "";
    let filterTerm = evt.target['filter-term'].value.toLowerCase();
    console.log(filterTerm);
    filterWainwrights(filterTerm);
})

getAllWainwrights();