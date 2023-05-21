let HOST = 'http://localhost:5000/'

(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();
addrest.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let data = await fetch(HOST + 'api/restaurants', {
            method: 'POST',
            headers: {
                token: localStorage.getItem("tokenbos"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rest_name: rest_name.value,
            })
        });
        data ? location.reload() : null

    } catch (error) {
        console.error(error);
    }
})