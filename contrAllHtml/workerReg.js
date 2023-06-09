import HOST from "./config.js";
formcontr.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(HOST + 'api/workerlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                useremail: email.value,
                userpassword: password.value
            })
        });
        const {
            token,
            data: {
                res_id
            }
        } = await response.json();
        if (token) {
            localStorage.setItem("workerToken", token);
            localStorage.setItem("workerRes_id", res_id ? res_id : null);
            location = "BookATable.html";
        } else {
            alert("please enter your email address");
        }

    } catch (error) {
        console.error(error);
    }
});