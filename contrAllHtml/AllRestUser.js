import HOST from "./config.js";

let BASE_URL = HOST + 'api/restaurants'
async function resuorc() {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    data ? data.map((item) => {
        let rest_wrapper = document.createElement("div");
        rest_wrapper.setAttribute("class", "col-lg-3")
        rest_wrapper.innerHTML = `
            <div class="card" >
                <img src=${ item.rest_img ? HOST+"restaurant/"+item.rest_img : "https://www.shutterstock.com/image-photo/friends-having-pasta-dinner-home-260nw-1206985765.jpg"} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.rest_name}</h5>
                    <p class="card-text">
                        ${item.description}</p>
                    <button class="btn btn-primary allrestbtn" data-id=${item._id}>Go Restaurant</button>
                </div>
            </div>
        `
        allrestwrapper.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon"
    let allrest = document.querySelectorAll(".allrestbtn");
    allrest.forEach(item => {
        item.addEventListener("click", (e) => {
            e.target.getAttribute("data-id") ? localStorage.setItem("rest-id", e.target.getAttribute("data-id")) : "",
                location = "../index.html"
        })
    })

}

resuorc();