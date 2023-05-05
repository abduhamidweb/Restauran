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
        formData.append('username', workername.value)
        formData.append('email', workeremail.value)
        formData.append('password', Password2.value)
        formData.append('userPhone', workerPhone.value)
        formData.append('userInfo', workerinfo.value)
        formData.append('workingTime', workerTime.value)
        formData.append('file', workerImg.files[0])
        formData.append('salary', workersalary.value)
        formData.append('rol', workerRol.value)
        formData.append('res_id', localStorage.getItem("adminres_id"))
        await fetch('http://localhost:5000/api/worker', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });

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
let BASE_URL = "http://localhost:5000/api/"
async function AllWorker() {
    let response = await fetch(BASE_URL + "restaurants/" + localStorage.getItem("adminres_id"));
    let {
        workers
    } = await response.json();
    workers ? workers.forEach(worker => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', worker._id);
        cardUser.setAttribute("class", "user");
        cardUser.innerHTML = `
                <div class="userImg">
                    <img src= ${ worker.userPhoto ? "/imgs/"+worker.userPhoto : ""} alt="workers imgs">
                </div>
                <div class="userInfo">
                    <h4><strong>name:</strong> ${worker.username ?worker.username : "bu muxim odam" }</h4>
                    <h5><strong>positon:</strong> ${worker.rol ? worker.rol : "bu rol maxfiy"}</h5>
                    <h5><strong>Id:</strong> ${worker._id ? worker._id : "id mavjud emas"}</h5>
                </div>
                `
        allWorkerWrapper2.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL + "worker/" + id);
            let {
                email,
                password,
                res_id,
                salary,
                userInfo,
                username,
                workingTime,
                userPhone,
                rol,
                _id
            } = await response.json();
            updateworkername.value = username ? username : ""
            updatePassword2.value = password ? password : ""
            updateworkeremail.value = email ? email : ""
            updateworkerPhone.value = userPhone ? userPhone : ""
            updateworkerinfo.value = userInfo ? userInfo : ""
            updateworkersalary.value = salary ? salary : ""
            updateworkerTime.value = workingTime ? workingTime : ""
            updateworkerRol.value = rol ? rol : ""
            updateworkersres.value = res_id ? res_id : ""
            workerIdUpdate.value = _id ? _id : ""
        })


    }) : ""
    updateadmin.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', updateworkername.value ? updateworkername.value : "")
            formData.append('email', updateworkeremail.value ? updateworkeremail.value : "")
            formData.append('password', updatePassword2.value ? updatePassword2.value : "")
            formData.append('userPhone', updateworkerPhone.value ? updateworkerPhone.value : "")
            formData.append('userInfo', updateworkerinfo.value ? updateworkerinfo.value : "")
            formData.append('workingTime', updateworkerTime.value ? updateworkerTime.value : "")
            formData.append('file', updateworkingImg.files[0] ? updateworkingImg.files[0] : "")
            formData.append('salary', updateworkersalary.value ? updateworkersalary.value : "")
            formData.append('rol', updateworkerRol.value ? updateworkerRol.value : "")
            formData.append('res_id', localStorage.getItem("adminres_id"))
            await fetch('http://localhost:5000/api/worker/' + workerIdUpdate.value, {
                method: 'PUT',
                headers: {
                    'enctype': 'multipart/form-data'
                },
                body: formData
            });

        } catch (error) {
            console.error(error);
        }
    });
}
AllWorker()