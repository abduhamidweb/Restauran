(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();
addadmin.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        let data = await fetch('http://localhost:5000/api/worker/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: bossadminadd.value,
                password: "123",
                rol: "admin",
                res_id: bossaddWhichResta.value,
            })
        });
        let result = await data.json()
        console.log('result :', result);
        result ? location.reload() : null

    } catch (error) {
        console.error(error);
    }
})