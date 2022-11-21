// https://swapi.dev/api/people/?search=
let searchCont = document.querySelector("#searchCont");
searchCont.style.display="none";

let hr = document.querySelector("hr");
hr.style.display="none";

let nf = document.querySelector("#not-found");

let flexcol = document.querySelector(".flex-col");

let viewCont = document.querySelector("#viewCont");
viewCont.style.display="none";

function getData(query){

    fetch(`https://swapi.dev/api/people/?search=${query}`)
    .then((res)=>{
        return res.json();
    })
    .then((response)=>{
        let {results} = response;

        if(query!=="" && results.length){
            searchCont.style.display="block";
            hr.style.display="block";
            displayChar(results);
        }
        else if(!query || !results.length){
            searchCont.style.display="none";
            hr.style.display="none";
        }
        
        if(!results.length){
            nf.style.display="block";
        }
        else{
            nf.style.display="none";
        }
    })
    .catch((error)=>{
        console.log(error);
    });
}

let charArr=[];
function displayChar(data){
    searchCont.innerHTML=""
    data.forEach((elem,index)=>{
        let main = document.createElement("div");
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let name = document.createElement("p");
        let birth = document.createElement("p");
        let gender = document.createElement("span");

        name.innerText = elem.name;
        birth.innerText = elem.birth_year;
        gender.innerText = elem.gender;

        div2.append(gender);
        div1.append(name,birth);
        main.append(div1,div2);

        searchCont.append(main);

        main.addEventListener("click",()=>{
            charArr.push(elem);
            localStorage.setItem("current",JSON.stringify(charArr));
            charArr=[];
            let data = JSON.parse(localStorage.getItem("current"));
            viewChar(data);
        })
    });
}
function viewChar(data){
    viewCont.innerHTML="";
    flexcol.style.display="none";
    viewCont.style.display="block";
    data.forEach((elem,index)=>{
        let main = document.createElement("div")
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let title = document.createElement("h1");
        let personalInfo = document.createElement("h3");
        let birth = document.createElement("p");
        let gender = document.createElement("p");
        let height = document.createElement("p");
        let anatomy = document.createElement("h3");
        let eye = document.createElement("p");
        let mass = document.createElement("p");
        let hair = document.createElement("p");
        let button = document.createElement("button");

        title.innerText = elem.name;
        button.innerText="Go Back";
        button.setAttribute("id","back");

        personalInfo.innerText = "Personal Info";
        birth.innerText = "Birth Year: "+elem.birth_year;
        gender.innerText ="Gender: "+elem.gender;
        height.innerText = "Height: "+elem.height;

        anatomy.innerText = "Anatomy";
        eye.innerText = "Eye Color: "+elem.eye_color;
        mass.innerText = "Mass: "+elem.mass;
        hair.innerText = "Hair Color: "+elem.hair_color;

        div1.append(personalInfo,birth,gender,height);
        div2.append(anatomy,eye,mass,hair);
        main.append(div1,div2);
        viewCont.append(title,main,button);

        button.addEventListener("click",()=>{
            flexcol.style.display="block";
            viewCont.style.display="none";
        })
    })
}

let id;
function debounce(func,delay){
    let query = document.querySelector("#query").value;

    if(id){
        id = clearTimeout(id);
    }
    id = setTimeout(() => {
        func(query);
    },delay);
}

window.addEventListener("click",()=>{
    searchCont.style.display="none";
    hr.style.display="none";
    nf.style.display="none";
});