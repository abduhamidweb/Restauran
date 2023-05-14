let tokenbos = localStorage.getItem("tokenadmin");
let resId = localStorage.getItem("adminres_id");
console.log('resId :', resId);
(() => {
    if (!tokenbos) return location = "adminLogin.html";
    if (!resId) return location = "adminLogin.html";
})();
let BASE_URL = 'http://localhost:5000/api/restaurants/'
let BASE_URL2 = 'http://localhost:5000/api/';
async function section1() {
    let staticOurFood = document.createElement("form");
    let staticOurTitle = document.createElement("h2");
    staticOurTitle.innerHTML = "staticOurFood"
    staticOurFood.append(staticOurTitle)

    staticOurFood.setAttribute("id", "staticOurFood")
    let response = await fetch(BASE_URL + resId);
    let data = await response.json();
    let hero = data.hero;
    let updatePanelHero = document.querySelector('.tabUpdatePanelUpdate');
    // Eventsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    let allEvents = data.events;
    // added
    infoadd.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', infoaddtitle.value ? infoaddtitle.value : "")
            formData.append('price', infoaddprice.value ? infoaddprice.value : "")
            formData.append('desc_short', infoaddshorts.value ? infoaddshorts.value : "")
            formData.append('desc_long', infoaddlongs.value ? infoaddlongs.value : "")
            formData.append('file', infoaddimgupload.files[0] ? infoaddimgupload.files[0] : "")
            formData.append('res_id', localStorage.getItem("adminres_id"))
            let data = await fetch(BASE_URL2 + 'events/', {
                method: 'POST',
                headers: {
                    'enctype': 'multipart/form-data'
                },
                body: formData
            });
            data ? location.reload() : null
        } catch (error) {
            console.error(error);
        }
    });
    // update
    allEvents ? allEvents.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userImg">
                    <img src= ${ item.imgLink ? "http://localhost:5000/imgs/"+item.imgLink : ""} alt="workers imgs">
                </div>
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" }</h4>
                </div>
                `
        eventsUpdate.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL2 + "events/" + id);
            let {
                title,
                price,
                desc_short,
                desc_long,
                res_id,
                _id
            } = await response.json();
            infoupdatetitle.value = title ? title : "something is strange"
            infoupdateprice.value = price ? price : "something is strange"
            infoupdateshorts.value = desc_short ? desc_short : "something is strange"
            infoupdatelongs.value = desc_long ? desc_long : "something is strange"
            infoupdateId.value = _id ? _id : "something is strange"
        })
        infoupdate.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('title', infoupdatetitle.value ? infoupdatetitle.value : "")
                formData.append('price', infoupdateprice.value ? infoupdateprice.value : "")
                formData.append('desc_short', infoupdateshorts.value ? infoupdateshorts.value : "")
                formData.append('desc_long', infoupdatelongs.value ? infoupdatelongs.value : "")
                formData.append('file', infoupdateimgupload.files[0] ? infoupdateimgupload.files[0] : "")
                formData.append('res_id', localStorage.getItem("adminres_id"))
                let data = await fetch(BASE_URL2 + 'events/' + infoupdateId.value, {
                    method: 'PUT',
                    headers: {
                        'enctype': 'multipart/form-data'
                    },
                    body: formData
                });
                data ? location.reload() : null
            } catch (error) {
                console.error(error);
            }
        });
    }) : ""
    // delete    =================================
    allEvents ? allEvents.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" } <button class="btn btn-danger btnEventsDelete" id=${item._id}>delete</button></h4>
                </div>
                `
        deletEventsWrapper.append(cardUser);
    }) : ""
    let allWrapperEvents = document.querySelectorAll('.btnEventsDelete');
    allWrapperEvents.forEach(item => {
        item.addEventListener('click', (e) => {
            let id = e.target.getAttribute("id");
            if (id) {
                deleteItem("events", id)
            } else alert("Something is strange")
        })
    });
    // hero CRUD================================
    hero ? hero.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userImg">
                    <img src= ${ item.imgLink ? "http://localhost:5000/imgs/"+item.imgLink : ""} alt="workers imgs">
                </div>
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" }</h4>
                </div>
                `
        updatePanelHero.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL2 + "hero/" + id);
            let {
                title,
                description,
                _id
            } = await response.json();
            updateherotitle.value = title ? title : ""
            updateherodescription.value = description ? description : ""
            updateheroImgId.value = _id ? _id : ""
        })
        formupdatehero.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('title', updateherotitle.value ? updateherotitle.value : "")
                formData.append('description', updateherodescription.value ? updateherodescription.value : "")
                formData.append('file', updateheroImg.files[0] ? updateheroImg.files[0] : "")
                formData.append('res_id', localStorage.getItem("adminres_id"))
                let data = await fetch(BASE_URL2 + 'hero/' + updateheroImgId.value, {
                    method: 'PUT',
                    headers: {
                        'enctype': 'multipart/form-data'
                    },
                    body: formData
                });
                data ? location.reload() : null
            } catch (error) {
                console.error(error);
            }
        });
    }) : ""
    hero ? hero.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" } <button class="btn btn-danger btnHeroDelete" id=${item._id}>delete</button></h4>
                </div>
                `
        deletHeroWrapper.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL2 + "hero/" + id);
            let {
                title,
                description,
                _id
            } = await response.json();
            updateherotitle.value = title ? title : ""
            updateherodescription.value = description ? description : ""
            updateheroImgId.value = _id ? _id : ""
        })
        formupdatehero.addEventListener("submit", async (e) => {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('title', updateherotitle.value ? updateherotitle.value : "")
                formData.append('description', updateherodescription.value ? updateherodescription.value : "")
                formData.append('file', updateheroImg.files[0] ? updateheroImg.files[0] : "")
                formData.append('res_id', localStorage.getItem("adminres_id"))
                let data = await fetch(BASE_URL2 + 'hero/' + updateheroImgId.value, {
                    method: 'PUT',
                    headers: {
                        'enctype': 'multipart/form-data'
                    },
                    body: formData
                });
                data ? location.reload() : null
            } catch (error) {
                console.error(error);
            }
        });
    }) : ""
    const deleteItem = async (path, id) => {
        try {
            const response = await fetch(`${BASE_URL2}${path}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Server error');
            }
            const data = await response.json();
            data ? location.reload() : null
            // Element o'chirildi
        } catch (error) {
            console.log('error :', error);
            // Xatolikni ishlash
        }
    }
    let allWrapper = document.querySelectorAll('.btnHeroDelete');
    allWrapper.forEach(item => {
        item.addEventListener('click', (e) => {
            let id = e.target.getAttribute("id");
            if (id) {
                deleteItem("hero", id)
                // window.location.reload()
            } else alert("Something is strange")
        })
    });

    // hero end ===============================================
    let allArray = data.resource;
    allArray.forEach(item => {
        EumIpsamUpdatePut.value = item.title,
            videoEumIpsamPut.value = item.videoLink
        videoEumIpsamIdPut.value = item._id
    });
    EumIpsamPost.addEventListener("submit", async (e) => {
        e.preventDefault();
        let bookatable = await fetch(BASE_URL2 + "resources/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: EumIpsamUpdate.value,
                videoLink: videoEumIpsam.value,
                res_id: resId
            })
        });
        const data = await bookatable.json();
        data ? location.reload() : null

    });
    EumIpsamPut.addEventListener("submit", async (e) => {
        e.preventDefault();
        let bookatable = await fetch(BASE_URL2 + "resources/" + videoEumIpsamIdPut.value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: EumIpsamUpdatePut.value,
                videoLink: videoEumIpsamPut.value,
                res_id: resId
            })
        });
        const data = await bookatable.json();
        data ? location.reload() : null

    });
    let chooseArray = data.choose;
    chooseArray.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" } </h4>
                </div>
                `
        updatechooseForms.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            let response = await fetch(BASE_URL2 + "choose/" + id);
            let {
                data: {
                    title,
                    message,
                    _id
                }
            } = await response.json()
            updatechooseFormUpdate.value = title ? title : ""
            videoupdatechooseForm.value = message ? message : ""
            videoupdatechssssooseFormId.value = _id ? _id : ""
            localStorage.setItem('videoupdatechooseFormId', _id)
        })
    });
    updatechooseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let id = localStorage.getItem('videoupdatechooseFormId')
        let bookatable = await fetch(BASE_URL2 + "choose/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: updatechooseFormUpdate.value,
                message: videoupdatechooseForm.value,
                res_id: localStorage.getItem('rest-id')
            })
        });
        const data = await bookatable.json();
        data ? location.reload() : null

    });
    chooseArray ? chooseArray.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item.title ?item.title : "bu muxim odam" } <button class="btn btn-danger btnchooseDelete" id=${item._id}>delete</button></h4>
                </div>
                `
        deletChooseWrapper.append(cardUser);
    }) : ""

    let allWrapperchoose = document.querySelectorAll('.btnchooseDelete');
    allWrapperchoose.forEach(item => {
        item.addEventListener('click', (e) => {
            let id = e.target.getAttribute("id");
            if (id) {
                deleteItem("choose", id)
                window.location.reload()
            } else alert("Something is strange")
        })
    });

    let photos = data.photos
    photos ? photos.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                                    <img src=${'http://localhost:5000/imgs/'+item.imgLink} width="300" alt="" class="img-fluid">
                </div>
                `
        photoUpdate.append(cardUser);
        cardUser.addEventListener('click', async (e) => {
            const parentCard = e.target.closest('.user');
            const id = parentCard.getAttribute('id');
            updateimg.value = id ? id : ""
        })
    }) : ""
    // Delete ================================
    photos ? photos.forEach(item => {
        let cardUser = document.createElement("div");
        cardUser.setAttribute('id', item._id);
        cardUser.setAttribute("class", "user border border-2 m-4 p-4 d-flex");
        cardUser.innerHTML = `
                <div class="userInfo ms-5 mt-5">
                    <h4><strong>name:</strong> ${item._id ?item._id : "bu muxim odam" } <button class="btn btn-danger btnphotosDelete" id=${item._id}>delete</button></h4>
                </div>
                     <div class="userInfo ms-5 mt-5">
                                    <img src=${'http://localhost:5000/imgs/'+item.imgLink} width="200" alt="" class="img-fluid">
                </div>
                `
        imgUploadDeleted.append(cardUser);
        // ================================================
    }) : ""
    let allWrapperImgId = document.querySelectorAll('.btnphotosDelete');
    allWrapperImgId.forEach(item => {
        item.addEventListener('click', (e) => {
            let id = e.target.getAttribute("id");
            if (id) {
                deleteItem("photo", id)
            } else alert("Something is strange")
        })
    });
}
section1();
formaddhero.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('title', herotitle.value)
        formData.append('description', herodescription.value)
        formData.append('file', heroImg.files[0])
        formData.append('res_id', localStorage.getItem("adminres_id"));
        let data = await fetch(BASE_URL2 + 'hero', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });
        data ? location.reload() : null

    } catch (error) {
        console.error(error);
    }





    // let contactdata = await fetch(BASE_URL + "contact", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username: contactname.value,
    //         email: contactemail.value,
    //         subject: contactsubject.value,
    //         message: contactmessage.value,
    //         res_id: ResId
    //     })
    // })
    // let {
    //     success,
    //     message
    // } = await contactdata.json();
    // success ? alert(message) : alert("Error")
});
chooseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let data = await fetch(BASE_URL2 + 'choose', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: chooseFormUpdate.value,
                message: videochooseForm.value,
                res_id: localStorage.getItem("adminres_id")
            })
        });
        data ? window.location.reload() : alert("Error")
    } catch (error) {
        console.error(error);
    }





    // let contactdata = await fetch(BASE_URL + "contact", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         username: contactname.value,
    //         email: contactemail.value,
    //         subject: contactsubject.value,
    //         message: contactmessage.value,
    //         res_id: ResId
    //     })
    // })
    // let {
    //     success,
    //     message
    // } = await contactdata.json();
    // success ? alert(message) : alert("Error")
});
imgupload.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('file', photoUpload.files[0])
        formData.append('res_id', localStorage.getItem("adminres_id"))
        let data = await fetch(BASE_URL2 + 'photo', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });
        data ? window.location.reload() : alert("Error")

    } catch (error) {
        console.error(error);
    }
});
imguploadUpdate.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('file', photoUploadUpdate.files[0])
        formData.append('res_id', localStorage.getItem("adminres_id"))
        let data = await fetch(BASE_URL2 + 'photo/' + updateimg.value, {
            method: 'PUT',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });
        data ? window.location.reload() : alert("Error")

    } catch (error) {
        console.error(error);
    }
});