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
        rest_name.innerHTML = item.rest_name + "id: " + item._id;

        rest_wrapper.append(rest_name);

        menu.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon"

}
resuorc()
async function resuorc2() {
    let response = await fetch("http://localhost:5000/api/workeradmin");
    let data = await response.json();
    data ? data.map((item) => {
        let rest_wrapper = document.createElement("div");
        rest_wrapper.innerHTML = `
            <div class="adminwrapper mt-5">
                        <strong class="my-5">1</strong>
                        <p class="mt-3"><strong>Admin Email: </strong>${item.email}</p>
                        <p><strong>Admin Password: </strong>${item.password}</p>
                    </div>
        `
        alladmins.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon"

}
resuorc2()
// 