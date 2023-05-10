(() => {
    let tokenbos = localStorage.getItem("rest-id");
    if (!tokenbos) return location = "AllRestForUser.html";
})();

let BASE_URL = 'http://localhost:5000/api/';
(async () => {
    let response = await fetch(BASE_URL + "restaurants/" + localStorage.getItem("rest-id"));
    let GET = await response.json();
    bcgvhdjdwvg2.innerHTML = GET.contact
    const today = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[today.getDay()];
    if (dayOfWeek !== "Sun" && dayOfWeek !== "Mon") {
        const startTime = new Date();
        startTime.setDate(startTime.getDate() + (8 + (7 - startTime.getDay())) % 7);
        startTime.setHours(11);
        startTime.setMinutes(0);

        const endTime = new Date();

        endTime.setDate(endTime.getDate() + (8 + (7 - endTime.getDay())) % 7);
        endTime.setHours(23);
        endTime.setMinutes(0);
        sabdhjbhds.innerHTML = ` ${dayOfWeek}-${daysOfWeek[(daysOfWeek.indexOf(dayOfWeek) + 5) % 7]}: ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`
    } else {
        sabdhjbhds.innerHTML = 'Closed'
    }




})();

let ResId = localStorage.getItem("adminres_id") || localStorage.getItem("rest-id")

let bookatable = document.querySelector('.bookatablefood')
bookatable.addEventListener("submit", async (e) => {
    e.preventDefault();
    let bookatable = await fetch(BASE_URL + "zakazlar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernamebook.value,
            email: useremailbook.value,
            phone: userphonebook.value,
            date: userdatebook.value,
            time: usertimebook.value,
            num_people: userpeoplebook.value,
            message: usermessagebook.value,
            res_id: ResId
        })
    })
    let {
        success,
        message
    } = await bookatable.json();
    success ? alert(message) : alert("Error")
})
let contactUs = document.querySelector('.contactUs')
contactUs.addEventListener("submit", async (e) => {
    e.preventDefault();
    let contactdata = await fetch(BASE_URL + "contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: contactname.value,
            email: contactemail.value,
            subject: contactsubject.value,
            message: contactmessage.value,
            res_id: ResId
        })
    })
    let {
        success,
        message
    } = await contactdata.json();
    success ? alert(message) : alert("Error")
})