let tokenbos = localStorage.getItem("tokenadmin");
let resId = localStorage.getItem("adminres_id");
(() => {
    if (!tokenbos) return location = "adminLogin.html";
    if (!resId) return location = "adminLogin.html";
})();
const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})

let BASE_URL = "http://localhost:5000/api/";
async function AllWorker() {

    let response = await fetch(BASE_URL + "restaurants/" + localStorage.getItem("adminres_id"));
    let {
        zakaz
    } = await response.json();
    zakaz ? zakaz.forEach(z => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute("class", "activity-data")
        cardUser.innerHTML = `
                              <div class="data names">
                        <span class="data-title">username</span>
                        <span class="data-list">${z.username}</span>
                    </div>
                    <div class="data email">
                        <span class="data-title">Email</span>
                        <span class="data-list">${z.email}</span>
                    </div>
                    <div class="data joined">
                        <span class="data-title">phone</span>
                        <span class="data-list">${z.phone}</span>
                    </div>
                    <div class="data type">
                        <span class="data-title">date</span>
                        <span class="data-list">${z.date}</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">time</span>
                        <span class="data-list">${z.time}</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">number people</span>
                        <span class="data-list">${z.num_people}</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">message</span>
                        <span class="data-list">${z.message}</span>
                    </div>
                    <div class="data status">
                        <span class="data-title">update</span>
                        <span class="data-list">
                            <button class="btn btn-info text-light" id=${z._id}>Update</button>
                        </span>
                    </div>
                    <div class="data status">
                        <span class="data-title">delete</span>
                        <span class="data-list">
                            <button class="btn btn-danger" id=${z._id}>Delete</button>
                        </span>
                    </div>
                `
        activityData.append(cardUser);
        const deleteItem = async (id) => {
            try {
                const response = await fetch(`${BASE_URL}zakazlar/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Server error');
                }
                // Element o'chirildi
            } catch (error) {
                console.log('error :', error);
                // Xatolikni ishlash
            }
        }
        cardUser.addEventListener('click', async (e) => {
            if (e.target.classList.contains("btn-danger")) {
                let deleteId = e.target.getAttribute("id")
                if (deleteId) {
                    deleteItem(deleteId)
                }
            }
            if (e.target.classList.contains("btn-info")) {
                let updateId = e.target.getAttribute("id")
                console.log('updateId :', updateId);
            }
            // const parentCard = e.target.closest('.user');
            // const id = parentCard.getAttribute('id');
            // let response = await fetch(BASE_URL + "foods/" + id);
            // let {
            //     name,
            //     calories,
            //     type,
            //     price,
            //     isAvailable,
            //     description,
            //     _id
            // } = await response.json();
            // updateworkername.value = name ? name : ""
            // updatePassword2.value = type ? type : ""
            // updateworkeremail.value = calories ? calories : ""
            // updateworkerPhone.value = price ? price : ""
            // updateworkerinfo.value = isAvailable ? isAvailable : ""
            // updateworkerTime.value = description ? description : ""
            // workerIdUpdate.value = _id ? _id : ""
        })
    }) : ""
    // updateadmin.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     try {
    //         const formData = new FormData();
    //         formData.append('name', updateworkername.value ? updateworkername.value : "")
    //         formData.append('calories', updateworkeremail.value ? updateworkeremail.value : "")
    //         formData.append('type', updatePassword2.value ? updatePassword2.value : "")
    //         formData.append('price', updateworkerPhone.value ? updateworkerPhone.value : "")
    //         formData.append('isAvailable', updateworkerinfo.value ? updateworkerinfo.value : "")
    //         formData.append('description', updateworkerTime.value ? updateworkerTime.value : "")
    //         formData.append('file', updateworkingImg.files[0] ? updateworkingImg.files[0] : "")
    //         formData.append('res_id', localStorage.getItem("adminres_id"))
    //         await fetch(BASE_URL + 'foods/' + workerIdUpdate.value, {
    //             method: 'PUT',
    //             headers: {
    //                 'enctype': 'multipart/form-data'
    //             },
    //             body: formData
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });
    // foods ? foods.forEach(food => {
    //     let cardUser = document.createElement("div");
    //     cardUser.setAttribute('id', food._id);
    //     cardUser.setAttribute("class", "user");
    //     cardUser.innerHTML = `
    //       <div class="card2">
    //    <div class="banner">
    //       <div class="avatar">
    //       <img src=${"http://localhost:5000/imgs/" + food.imgLink}>
    //       </div>
    //    </div>
    // 	<h3>${food.name}</h3>
    //    <p>price: ${food.price}</p>
    //    <p>desc:  ${food.description}</p>
    // 	<ul>
    //       <a href="#" target="_blank"><i class="fa fa-twitter" style="font-size:16px"></i></a>
    // 	   <a href="#" target="_blank"><i class="fa fa-linkedin" style="font-size:16px"></i></a>
    //       <a href="#" target="_blank"><i class="fa fa-instagram" style="font-size:16px"></i></a>
    //       <a href="#" target="_blank"><i class="fa fa-facebook" style="font-size:16px"></i></a>
    // 	</ul>
    //     <button class="btn btn-danger mb-3" id=${food._id}>Delete</button>
    // </div>
    //                 `
    //     allCards.append(cardUser);
    // }) : "";

    // const deleteItem = async (id) => {
    //     try {
    //         const response = await fetch(`${BASE_URL}foods/${id}`, {
    //             method: 'DELETE'
    //         });
    //         if (!response.ok) {
    //             throw new Error('Server error');
    //         }
    //         // Element o'chirildi
    //     } catch (error) {
    //         console.log('error :', error);
    //         // Xatolikni ishlash
    //     }
    // }
    // let allWrapper = document.querySelectorAll('.btn-danger');
    // allWrapper.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         let id = e.target.getAttribute("id");
    //         if (id) {
    //             deleteItem(id)
    //             window.location.reload()
    //         } else alert("Something is strange")
    //     })
    // })
}
AllWorker()