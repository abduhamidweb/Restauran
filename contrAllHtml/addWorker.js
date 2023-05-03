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
        console.log('workerImg :', workerImg);
        formData.append('salary', workersalary.value)
        formData.append('rol', workerRol.value)
        formData.append('res_id', workersres.value)
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
})