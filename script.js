
var pageNo = document.getElementById("pageNo");
var prevBtn = document.getElementById("prevBtn");


var nextBtn = document.getElementById("nextBtn");
var playBtn = document.getElementById("playBtn");
var input = document.getElementById("input");

var presTitle = document.getElementById("presTitle")
var presShort = document.getElementById("presShort")
var presLong = document.getElementById("presLong")
var presImage = document.getElementById("presImage")
var display = document.getElementById('presBackground')

prevBtn.addEventListener("click",prevPage);
nextBtn.addEventListener("click",nextPage);
playBtn.addEventListener("click",updateData);


window.addEventListener('keydown', (e) => {
    if (document.activeElement == input) return;
    if (e.key == "ArrowRight" || e.key == "d"){
        nextPage();
    }
    if (e.key == "ArrowLeft" || e.key == "a"){
        prevPage();
    }
});

class Page{
    constructor(text=""){
        this.text = text;
    }

    parseText(){
        let title = '';
        let short = '';
        let long = '';
        let image = '';
        let background = '';
        let text = this.text;
        text = text.trim().split("@")
        text.shift()
        
        console.log(text);
        for (let i=0; i <text.length; i++){
            text[i] = text[i].split("\n");
            text[i] = text[i].filter(n => n)
        }
        
        for (let i=0; i <text.length; i++){
            let tag = text[i].shift();

            if (tag.startsWith("title")){
                title= text[i].join("\n");
            }
            if (tag.startsWith("short")){
                short= text[i].join("\n");
            }
            if (tag.startsWith("long")){
                long = text[i].join("\n");
            }
            if (tag.startsWith("image")){
                image = text[i].join("\n");
            }
            if (tag.startsWith("background")){
                background= text[i].join("\n");
            }
        }

        if ( !background.startsWith("http") && !background.startsWith("www"))
        background = `https://source.unsplash.com/900x600/?${background}`;

        if (image != "")
        if ( !image.startsWith("http") && !image.startsWith("www"))
        image = `https://source.unsplash.com/300x300/?${image}`;

        return [title,short,long,image,background]
    }
}


var pages = [];
var currentPage = 1;
newPage();
prevPage();
prevBtn.disabled = true;

function newPage(){
    pages.push(new Page());
    nextPage()
}


function prevPage(){
    pages[currentPage-1].text = input.value;

    if (currentPage >1){
        currentPage --;
        pageNo.innerHTML = `Slide: ${currentPage}`;
    } 

    if (currentPage == 1) prevBtn.disabled = true;

    input.value = pages[currentPage-1].text;
    updateData();
}  


function nextPage(){
    pages[currentPage-1].text = input.value;

    if (currentPage < pages.length) {
        currentPage ++;
        pageNo.innerHTML = `Slide: ${currentPage}`;
    }
    else if (currentPage == pages.length) {
        newPage();
    }

    prevBtn.disabled = false;
    input.value = pages[currentPage-1].text;

    updateData();

}

function updateData(){
    pages[currentPage-1].text = input.value;
    let data = pages[currentPage-1].parseText()
    console.log(data)
    presTitle.innerHTML = data[0];
    presShort.innerHTML = data[1];
    presLong.innerHTML = data[2];
    presImage.src = data[3];
    display.style.backgroundImage =`url(${data[4]})`;
}