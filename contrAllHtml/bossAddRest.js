import HOST from "./config.js";


let tokenbos = localStorage.getItem("tokenbos");
console.log('tokenbos :', tokenbos);
(() => {
    if (!tokenbos) return location = "bossLogin.html";
})();
addrest.addEventListener("submit", async (e) => {
    e.preventDefault();
    let Rest = rest_name.value
    let contact = rest_contact.value
    try {
        let data = await fetch(HOST + 'api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "token": tokenbos,
            },
            body: JSON.stringify({
                rest_name: Rest,
                contact
            })
        });
        await data.json() ? location.reload() : null

    } catch (error) {
        console.error(error);
    }
})