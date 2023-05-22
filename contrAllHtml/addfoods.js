import HOST from "./config.js";


let tokenbos = localStorage.getItem("tokenadmin");
let resId = localStorage.getItem("adminres_id");
(() => {
    if (!tokenbos) return location = "adminLogin.html";
    if (!resId) return location = "adminLogin.html";
})();
addadmin.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', workername.value)
        formData.append('calories', workeremail.value)
        formData.append('type', Password2.value)
        formData.append('price', workerPhone.value)
        formData.append('isAvailable', workerinfo.value)
        formData.append('file', workerImg.files[0])
        formData.append('description', workersalary.value)
        formData.append('res_id', localStorage.getItem("adminres_id"));
        let data = await fetch(HOST + 'api/foods', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });
        data ? location.reload() : null;
    } catch (error) {
        console.error(error);
    }
});


// const card = document.querySelector('.card');
// let offsetX = 0;
// let offsetY = 0;

// card.addEventListener('mousedown', dragStart);

// function dragStart(e) {
//     offsetX = e.offsetX;
//     offsetY = e.offsetY;
//     card.addEventListener('mousemove', drag);
//     card.addEventListener('mouseup', dragEnd);
// }

// function drag(e) {
//     const x = e.clientX - offsetX;
//     const y = e.clientY - offsetY;
//     card.style.left = `${x}px`;
//     card.style.top = `${y}px`;
// }

// function dragEnd() {
//     card.removeEventListener('mousemove', drag);
//     card.removeEventListener('mouseup', dragEnd);
// };
let BASE_URL = HOST + "api/"
async function AllWorker() {
    let response = await fetch(BASE_URL + "restaurants/" + localStorage.getItem("adminres_id"), {
        headers: {
            'Content-Type': 'application/json',
            token: tokenbos
        }
    });
    let {
        foods
    } = await response.json();
    //     name
    //     calories
    //     type
    //     price
    //     isAvailable
    //     file
    // description
    foods ? foods.forEach(food => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', food._id);
        cardUser.setAttribute("class", "user");
        cardUser.innerHTML = `
                <div class="userImg">
                    <img src= ${ food.imgLink ? HOST+"imgs/"+food.imgLink : ""} alt="workers imgs">
                </div>
                <div class="userInfo">
                    <h4><strong>name:</strong> ${food.name ?food.name : "bu muxim odam" }</h4>
                    <h5><strong>positon:</strong> ${food.type ? food.type : "bu rol maxfiy"}</h5>
                    <h5><strong>Id:</strong> ${food._id ? food._id : "id mavjud emas"}</h5>
                </div>
                `
        allWorkerWrapper2.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL + "foods/" + id);
            let {
                name,
                calories,
                type,
                price,
                isAvailable,
                description,
                _id
            } = await response.json();
            updateworkername.value = name ? name : ""
            updatePassword2.value = type ? type : ""
            updateworkeremail.value = calories ? calories : ""
            updateworkerPhone.value = price ? price : ""
            updateworkerinfo.value = isAvailable ? isAvailable : ""
            updateworkerTime.value = description ? description : ""
            workerIdUpdate.value = _id ? _id : ""
        })
    }) : ""
    updateadmin.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', updateworkername.value ? updateworkername.value : "")
            formData.append('calories', updateworkeremail.value ? updateworkeremail.value : "")
            formData.append('type', updatePassword2.value ? updatePassword2.value : "")
            formData.append('price', updateworkerPhone.value ? updateworkerPhone.value : "")
            formData.append('isAvailable', updateworkerinfo.value ? updateworkerinfo.value : "")
            formData.append('description', updateworkerTime.value ? updateworkerTime.value : "")
            formData.append('file', updateworkingImg.files[0] ? updateworkingImg.files[0] : "")
            formData.append('res_id', localStorage.getItem("adminres_id"))
            let data = await fetch(BASE_URL + 'foods/' + workerIdUpdate.value, {
                method: 'PUT',
                headers: {
                    'enctype': 'multipart/form-data'
                },
                body: formData
            });
                        let {
                            errors,
                        } = await data.json();
                        errors ? console.log(errors) : location.reload();
        } catch (error) {
            console.error(error);
        }
    });
    foods ? foods.forEach(food => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', food._id);
        cardUser.setAttribute("class", "user");
        cardUser.innerHTML = `
          <div class="card2">
       <div class="banner">
          <div class="avatar">
          <img src=${HOST+"imgs/" + food.imgLink}>
          </div>
       </div>
    	<h3>${food.name}</h3>
       <p>price: ${food.price}</p>
       <p>desc:  ${food.description}</p>
    	<ul>
          <a href="#" target="_blank"><i class="fa fa-twitter" style="font-size:16px"></i></a>
    	   <a href="#" target="_blank"><i class="fa fa-linkedin" style="font-size:16px"></i></a>
          <a href="#" target="_blank"><i class="fa fa-instagram" style="font-size:16px"></i></a>
          <a href="#" target="_blank"><i class="fa fa-facebook" style="font-size:16px"></i></a>
    	</ul>
        <button class="btn btn-danger mb-3" id=${food._id}>Delete</button>
    </div>
                    `
        allCards.append(cardUser);
    }) : "";

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}foods/${id}`, {
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
    let allWrapper = document.querySelectorAll('.btn-danger');
    allWrapper.forEach(item => {
        item.addEventListener('click', (e) => {
            let id = e.target.getAttribute("id");
            if (id) {
                deleteItem(id)
                // window.location.reload()
            } else alert("Something is strange")
        })
    })
}
AllWorker()