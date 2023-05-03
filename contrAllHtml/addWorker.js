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
          formData('username', workername.value)
          formData('email', workeremail.value)
          formData('password', Password2.value)
          formData('userPhone', workerPhone.value)
          formData('userInfo', workerinfo.value)
          formData('workingTime', workerTime.value)
          formData('userPhoto', workingImg.files[0])
          formData('salary', workersalary.value)
          formData('rol', workerRol.value)
          formData('res_id', workersres.value)
        await fetch('http://localhost:5000/api/worker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData
        });

    } catch (error) {
        console.error(error);
    }
})
