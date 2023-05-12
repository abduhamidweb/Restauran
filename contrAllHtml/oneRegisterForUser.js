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
        hero,
        resource,
        choose
    } = await response.json();
    console.log(resource);
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
    hero ? hero.forEach((item, index) => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "carousel-item");
        cardUser.setAttribute("style", `background-image: url(${'http://localhost:5000/imgs/' + item.imgLink}`)
        if (index === 0) {
            cardUser.classList.add('active');
        }
        cardUser.innerHTML = `
            <div class="carousel-container">
              <div class="carousel-content">
                <h2 class="animate__animated animate__fadeInDown"><span>Delicious</span> ${item.title}</h2>
                <p class="animate__animated animate__fadeInUp">${item.description}</p>
                <div>
                  <a href="#menu" class="btn-menu animate__animated animate__fadeInUp scrollto">Our Menu</a>
                  <a href="#book-a-table" class="btn-book animate__animated animate__fadeInUp scrollto">Book a Table</a>
                </div>
              </div>
            </div>
        `
        heroWrapperAllItems.append(cardUser);
        console.log('cardUser :', cardUser);
    }) : "";
    const prevButton = document.querySelector(".carousel-control-prev");
    const nextButton = document.querySelector(".carousel-control-next");
    let activeIndex = 0;
    prevButton.addEventListener("click", () => {
        activeIndex--;
        if (activeIndex < 0) activeIndex = hero.length - 1;
        renderSlides();
    });

    nextButton.addEventListener("click", () => {
        activeIndex++;
        if (activeIndex >= hero.length) activeIndex = 0;
        renderSlides();
    });

    // slide-larni yangilash
    function renderSlides() {
        const carouselItems = document.querySelectorAll(".carousel-item");
        carouselItems.forEach((item, index) => {
            if (index === activeIndex) item.classList.add("active");
            else item.classList.remove("active");
        });
    }
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
    }) : "";
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




    resource ? resource.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "row")
        cardUser.innerHTML = `
             <div class="col-lg-5 align-items-stretch video-box" style='background-image: url("assets/img/about.jpg");'>
            <a href="${item.videoLink}"
            class="venobox play-btn mb-4" data-vbtype="video"
            data-autoplay="true"></a>
          </div>

          <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">

            <div class="content">
              <h3>Eum ipsam laborum deleniti <strong>${item.title}</strong></h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Duis aute irure dolor in reprehenderit
              </p>
              <p class="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua.
              </p>
              <ul>
                <li><i class="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                <li><i class="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                <li><i class="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla
                  pariatur.</li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                in
                culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>

          </div>
        `
        AbouteOneTop.append(cardUser)
    }) : "";
    choose ? choose.forEach((item, i) => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", `${i>1 ?"col-lg-4" : "col-lg-4 mt-lg-0" }`)
        cardUser.innerHTML = `
            <div class="box">
              <span>0${i+1}</span>
              <h4>${item.title}</h4>
              <p>${item.message}</p>
            </div>
        `
        chooseCard.append(cardUser)
    }) : "";
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
    });
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