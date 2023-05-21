import HOST from "./config.js";

(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();
addadmin.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let data = await fetch(HOST + 'api/worker/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: bossadminadd.value,
                password: bossadminaddpassword.value,
                rol: "admin",
                res_id: bossaddWhichResta.value,
            })
        });
        let result = await data.json()
        result ? location.reload() : null

    } catch (error) {
        console.error(error);
    }
})