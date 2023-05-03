(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();

let BASE_URL = 'http://localhost:5000/api/restaurants'
async function resuorc() {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    data ? data.map((item) => {
        let rest_wrapper = document.createElement("div");
        let rest_name = document.createElement("h3");
        rest_name.setAttribute("id", item._id);
        rest_name.innerHTML = item.rest_name;

        rest_wrapper.append(rest_name);

        menu.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon"

}
resuorc()