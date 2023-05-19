(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();

let BASE_URL = 'http://localhost:5000/api/restaurants'
async function resuorc() {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    data ? data.map((item, i) => {
        let rest_wrapper = document.createElement("tr");
        rest_wrapper.innerHTML = `
                <th scope="row">${i+1}</th>
                <td>${item.rest_name}</td>
                <td>${item._id}</td>
                <td><delete class="btn btn-danger allRestDelete" id=${item._id}>delete</delete></td>
                <td><delete class="btn btn-info text-light allRestUpdate" id=${item._id}>update</delete></td>
        `
        menu.append(rest_wrapper);
    }) : " Restarantlar hali ishga tushmadi. Soon"

}
resuorc()
async function resuorc2() {
    let response = await fetch("http://localhost:5000/api/workeradmin");
    let data = await response.json();
    data ? data.forEach((item, i) => {
        let rest_wrapper = document.createElement("tr");
        rest_wrapper.innerHTML =
            `
                <th scope="row">${i + 1}</th>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td><delete class="btn btn-danger allDeleteBtnAdmin" id=${item._id}>delete</delete></td>
                <td><delete class="btn btn-info text-light allUpdateBtnAdmin" id=${item._id}>update</delete></td>
        `
        alladmins.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon";
    let restaurants = await fetch(BASE_URL);
    let rest = await restaurants.json();
    rest ? rest.map((item, i) => {
        let rest_wrapper = document.createElement("option");
        rest_wrapper.innerHTML = item.rest_name
        AllRestaurantOption.append(rest_wrapper);

    }) : " Restarantlar hali ishga tushmadi. Soon"
    AllRestaurantOption.addEventListener("change", async (e) => {
        e.preventDefault();
        let response = await fetch(BASE_URL);
        let data = await response.json();
        data.forEach((item) => {
            if (item.rest_name == AllRestaurantOption.value) {
                bossaddWhichResta.value = item._id;
            }
        })
    })
    let allRestDelete = document.querySelectorAll('.allRestDelete');
    let allDeleteBtnAdmin = document.querySelectorAll('.allDeleteBtnAdmin');
    let allRestUpdate = document.querySelectorAll('.allRestUpdate');
    let allUpdateBtnAdmin = document.querySelectorAll('.allUpdateBtnAdmin');
    allRestUpdate.forEach((item) => {
        item.addEventListener('click', (e) => {
            update(e.target.getAttribute('id'), "rest")
        });
    })
    allUpdateBtnAdmin.forEach((item) => {
        item.addEventListener('click', (e) => {
            update(e.target.getAttribute('id'), "admin")
        });
    })
    allRestDelete.forEach((item) => {
        item.addEventListener('click', (e) => {
            deleteItem(e.target.getAttribute('id'));
        });
    })
    allDeleteBtnAdmin.forEach((item) => {
        item.addEventListener('click', (e) => {
            deleteItem2(e.target.getAttribute('id'));
        });
    })
}

resuorc2();
const deleteItem = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Server error');
        }
        const data = await response.json();
        data ? location.reload() : null
        // Element o'chirildi
    } catch (error) {
        console.log('error :', error);
        // Xatolikni ishlash
    }
}
const deleteItem2 = async (id) => {
    try {
        const response = await fetch(`${'http://localhost:5000/api/worker'}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Server error');
        }
        const data = await response.json();
        data ? location.reload() : null
        // Element o'chirildi
    } catch (error) {
        console.log('error :', error);
        // Xatolikni ishlash
    }
}
const body = document.querySelector("body")
async function update(id, rol) {
    modalContainer.classList.add("d-block");
    if (id && rol == "rest") {
        let response = await fetch(BASE_URL + "/" + id);
        let data = await response.json();
        if (data.rest_name) {
            IdName.value = data.rest_name
        }
        modlaUpdateRestAdmin.addEventListener("submit", async (e) => {
            e.preventDefault();
            let response = await fetch(BASE_URL + "/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rest_name: IdName.value.trim() ? IdName.value.trim() : undefined
                })
            });
            await response.json() ? location.reload() : alert("something went wrong;")
        });
    }
    if (id && rol == "admin") {
        let response = await fetch("http://localhost:5000/api/worker/" + id);
        let data = await response.json();
        if (data.email) {
            IdName.value = data.email;
        }
        modlaUpdateRestAdmin.addEventListener("submit", async (e) => {
            e.preventDefault();
            let response = await fetch("http://localhost:5000/api/workeradmin/" + id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: IdName.value.trim() ? IdName.value.trim() : undefined
                })
            });
            await response.json() ? location.reload() : alert("something went wrong;")
        });
    }
}