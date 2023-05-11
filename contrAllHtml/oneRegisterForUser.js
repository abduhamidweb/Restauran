(() => {
    let tokenbos = localStorage.getItem("rest-id");
    if (!tokenbos) return location = "AllRestForUser.html";
})();
let ResId = localStorage.getItem("adminres_id") || localStorage.getItem("rest-id")

let BASE_URL = 'http://localhost:5000/api/';
(async () => {
    let response = await fetch(BASE_URL + "restaurants/" + localStorage.getItem("rest-id"));
    let {
        foods,
        contact,
        hero
    } = await response.json();
    bcgvhdjdwvg2.innerHTML = contact
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
    // <!-- ======= Menu Section ======= -->
    foods ? foods.forEach(food => {
        if (food.res_id == ResId) {
            let cardUser = document.createElement("div");
            cardUser.setAttribute('id', food._id);
            cardUser.setAttribute("class", "col-lg-6 menu-item filter-starters");
            cardUser.innerHTML = `
            <div class="menu-content">
              <a href="#">${food.name ? food.name : "bu muxim odam"}</a><span>$${food.price ? food.price : "bu muxim odam"}</span>
            </div>
            <div class="menu-ingredients">
             ${food.description ? food.description : "bu muxim odam"} 
            </div>
          </div>
                `
            AllFoodsWrap.append(cardUser);
        }
        // console.log(menu-flters);
        // cardUser.addEventListener('click', async (e) => {
        //     const parentCard = e.target.closest('.user');
        //     const id = parentCard.getAttribute('id');
        //     let response = await fetch(BASE_URL + "foods/" + id);
        //     let {
        //         name,
        //         calories,
        //         type,
        //         price,
        //         isAvailable,
        //         description,
        //         _id
        //     } = await response.json();
        //     updateworkername.value = name ? name : ""
        //     updatePassword2.value = type ? type : ""
        //     updateworkeremail.value = calories ? calories : ""
        //     updateworkerPhone.value = price ? price : ""
        //     updateworkerinfo.value = isAvailable ? isAvailable : ""
        //     updateworkerTime.value = description ? description : ""
        //     workerIdUpdate.value = _id ? _id : ""
        // })
    }) : "";
    const carouselInner = document.querySelector('.carousel-inner');
    // for (let i = 0; i < hero.length; i++) {
    // console.log('i :', i);
    //     const item = document.createElement('div');
    //     item.classList.add('carousel-item');
    //     if (i === 0) {
    //         item.classList.add('active');
    //     }
    //     const img = document.createElement('img');
    //     img.classList.add('d-block');
    //     img.classList.add('w-100');
    //     img.setAttribute('src', hero[i]);
    //     item.appendChild(img);
    //     carouselInner.appendChild(item);
    // }


    hero ? hero.forEach((item, i) => {
        const item3 = document.createElement('div');
        item3.classList.add('carousel-item');
        if (i === 0) {
            item3.classList.add('active');
        }
        const img = document.createElement('img');
        img.classList.add('d-block');
        img.classList.add('w-100');
        img.setAttribute('src', 'http://localhost:5000/imgs/' + item.imgLink);
        item3.appendChild(img);
        carouselInner.appendChild(item3);
    }) : ""
    hero ? hero.forEach((item, i) => {
        // console.log('item :', i);

        // let herowrapperItems = document.createElement("div");
        // // herowrapperItems.setAttribute('id', item._id);
        // herowrapperItems.setAttribute("class", "carousel-item ");
        // herowrapperItems.setAttribute("style", "background-image: url(assets/img/slide/slide-2.jpg);");
        // herowrapperItems.innerHTML = `
        //           <div class="carousel-container">
        //             <div class="carousel-content">
        //               <h2 class="animate__animated animate__fadeInDown">Lorem Ipsum Dolor</h2>
        //               <p class="animate__animated animate__fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi
        //                 ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea
        //                 voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
        //               <div>
        //                 <a href="#menu" class="btn-menu animate__animated animate__fadeInUp scrollto">Our Menu</a>
        //                 <a href="#book-a-table" class="btn-book animate__animated animate__fadeInUp scrollto">Book a Table</a>
        //               </div>
        //             </div>
        //           </div>
        // `
        // heroWrapperAll.append(herowrapperItems);
    }) : ""
    let menuFilters = document.querySelectorAll('.menuFilters li')
    menuFilters.forEach(item => {
        item.addEventListener('click', (e) => {
            let type = e.target.getAttribute("id");
            if (type) {
                AllFoodsWrap.innerHTML = ""
                foods ? foods.forEach(food => {
                    if (food.type == type && food.res_id == ResId) {
                        let cardUser = document.createElement("div");
                        cardUser.setAttribute('id', food._id);
                        cardUser.setAttribute("class", "col-lg-6 menu-item filter-starters");
                        cardUser.innerHTML = `
                  <div class="menu-content">
                    <a href="#">${food.name ? food.name : "bu muxim odam"}</a><span>$${food.price ? food.price : "bu muxim odam"}</span>
                  </div>
                  <div class="menu-ingredients">
                   ${food.description ? food.description : "bu muxim odam"} 
                  </div>
                </div>
                      `
                        AllFoodsWrap.append(cardUser);
                    }
                    // console.log(menu-flters);
                    // cardUser.addEventListener('click', async (e) => {
                    //     const parentCard = e.target.closest('.user');
                    //     const id = parentCard.getAttribute('id');
                    //     let response = await fetch(BASE_URL + "foods/" + id);
                    //     let {
                    //         name,
                    //         calories,
                    //         type,
                    //         price,
                    //         isAvailable,
                    //         description,
                    //         _id
                    //     } = await response.json();
                    //     updateworkername.value = name ? name : ""
                    //     updatePassword2.value = type ? type : ""
                    //     updateworkeremail.value = calories ? calories : ""
                    //     updateworkerPhone.value = price ? price : ""
                    //     updateworkerinfo.value = isAvailable ? isAvailable : ""
                    //     updateworkerTime.value = description ? description : ""
                    //     workerIdUpdate.value = _id ? _id : ""
                    // })
                }) : "";
            } else {
                AllFoodsWrap.innerHTML = ""
                foods ? foods.forEach(food => {
                    if (food.res_id == ResId) {

                        let cardUser = document.createElement("div");
                        cardUser.setAttribute('id', food._id);
                        cardUser.setAttribute("class", "col-lg-6 menu-item filter-starters");
                        cardUser.innerHTML = `
            <div class="menu-content">
              <a href="#">${food.name ? food.name : "bu muxim odam"}</a><span>$${food.price ? food.price : "bu muxim odam"}</span>
            </div>
            <div class="menu-ingredients">
             ${food.description ? food.description : "bu muxim odam"} 
            </div>
          </div>
                `
                        AllFoodsWrap.append(cardUser);
                    }
                    // console.log(menu-flters);
                    // cardUser.addEventListener('click', async (e) => {
                    //     const parentCard = e.target.closest('.user');
                    //     const id = parentCard.getAttribute('id');
                    //     let response = await fetch(BASE_URL + "foods/" + id);
                    //     let {
                    //         name,
                    //         calories,
                    //         type,
                    //         price,
                    //         isAvailable,
                    //         description,
                    //         _id
                    //     } = await response.json();
                    //     updateworkername.value = name ? name : ""
                    //     updatePassword2.value = type ? type : ""
                    //     updateworkeremail.value = calories ? calories : ""
                    //     updateworkerPhone.value = price ? price : ""
                    //     updateworkerinfo.value = isAvailable ? isAvailable : ""
                    //     updateworkerTime.value = description ? description : ""
                    //     workerIdUpdate.value = _id ? _id : ""
                    // })
                }) : "";
            }
        })
    })






})();


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