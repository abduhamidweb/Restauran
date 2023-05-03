(() => {
    let tokenbos = localStorage.getItem("tokenbos");
    if (!tokenbos) return location = "bossLogin.html";
})();
addrest.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        await fetch('http://localhost:5000/api/restaurants', {
            method: 'POST',
            headers: {
                token: localStorage.getItem("tokenbos"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rest_name: rest_name.value,
                rest_year: "1934",
                description: "lsnklkdjsn lknsdlkcnsd kjncdsklnc sk kn;dsknsda",
                contact: "09813330938",
                rest_img: "/nskdcjnsldm/diwoke.jpg"
            })
        });

    } catch (error) {
        console.error(error);
    }
})