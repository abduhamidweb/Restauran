let tokenbos = localStorage.getItem("tokenadmin");
let resId = localStorage.getItem("adminres_id");
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
                console.log(await data.json());
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
                console.log(await data.json());
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
                window.location.reload()
            } else alert("Something is strange")
        })
    });

    // hero end ===============================================
    let allArray = data.resource;
    allArray.forEach(item => {
        EumIpsamUpdate.value = item.title,
            videoEumIpsam.value = item.videoLink
        videoEumIpsamId.value = item._id
    });
    EumIpsam.addEventListener("submit", async (e) => {
        e.preventDefault();
        let bookatable = await fetch(BASE_URL2 + "resources/" + videoEumIpsamId.value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: EumIpsamUpdate.value,
                videoLink: videoEumIpsam.value,
            })
        });
        const data = await bookatable.json();
        data ? alert("oke") : ""
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
            videoupdatechooseFormId.value = _id ? _id : ""
        })
    });
    updatechooseForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let bookatable = await fetch(BASE_URL2 + "choose/" + videoupdatechooseFormId.value, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: updatechooseFormUpdate.value,
                message: videoupdatechooseForm.value,
            })
        });
        const data = await bookatable.json();
        console.log('data :', data);
        data ? alert("oke") : ""
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
        // formupdatehero.addEventListener("submit", async (e) => {
        //     e.preventDefault();
        //     try {
        //         const formData = new FormData();
        //         formData.append('title', updateherotitle.value ? updateherotitle.value : "")
        //         formData.append('description', updateherodescription.value ? updateherodescription.value : "")
        //         formData.append('file', updateheroImg.files[0] ? updateheroImg.files[0] : "")
        //         formData.append('res_id', localStorage.getItem("adminres_id"))
        //         let data = await fetch(BASE_URL2 + 'hero/' + updateheroImgId.value, {
        //             method: 'PUT',
        //             headers: {
        //                 'enctype': 'multipart/form-data'
        //             },
        //             body: formData
        //         });
        //         console.log(await data.json());
        //     } catch (error) {
        //         console.error(error);
        //     }
        // });
    }) : ""
        let allWrapperchoose = document.querySelectorAll('.btnchooseDelete');
        allWrapperchoose.forEach(item => {
            item.addEventListener('click', (e) => {
                let id = e.target.getAttribute("id");
                console.log('id :', id);
                if (id) {
                    deleteItem("choose", id)
                    window.location.reload()
                } else alert("Something is strange")
            })
        });
    // console.log('chooseArray :', chooseArray);
    // allArray.map(item => {
    //     // submit
    //     let buttonUpdate = document.createElement("button");
    //     buttonUpdate.setAttribute("class", "update");
    //     buttonUpdate.setAttribute("id", item._id);
    //     buttonUpdate.setAttribute("type", "submit");
    //     buttonUpdate.innerHTML = "Update"
    //     // lable and input
    //     let titleLable = document.createElement("label");
    //     let textTitleArea = document.createElement("textarea");
    //     // lable and input wrapper
    //     let title = document.createElement("div");
    //     // lable textContexnt
    //     titleLable.innerHTML = "title"
    //     // set atribute for lable and input
    //     titleLable.setAttribute("for", "title");
    //     titleLable.setAttribute("class", "title");
    //     textTitleArea.setAttribute("type", "text");
    //     textTitleArea.setAttribute("id", "title");
    //     // backend title value
    //     textTitleArea.value = item.title;
    //     // append lable and input  to wrapper
    //     title.append(titleLable)
    //     title.append(textTitleArea);
    //     // wrapper append to adminSection1
    //     staticOurFood.append(title);

    //     // description 
    //     item.description.map((txt, index) => {
    //         let textDescArea = document.createElement("textarea");
    //         let textDescTitle = document.createElement("h4");
    //         textDescTitle.innerHTML = "Descriptions " + index;
    //         let br = document.createElement("br");
    //         textDescArea.value = txt,
    //             staticOurFood.append(textDescTitle, textDescArea, br)
    //     })
    //     // video CRUD
    //     let videoLink = document.createElement("textarea");
    //     videoLink.value = item.videoLink
    //     staticOurFood.append(videoLink)
    //     // update btn added last becouse for update
    //     staticOurFood.append(buttonUpdate)
    // })
    // wrapper.append(staticOurFood);
    // staticOurFood.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     let texts = document.querySelectorAll("textarea");
    //     let idUpdate = document.querySelector('.update').getAttribute("id");
    //     const response = await fetch(BASE_URL2 + `resources/${idUpdate}`, {
    //         method: 'put',
    //         headers: {
    //             token: localStorage.getItem("token"),
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             title: texts[0].value ? texts[0].value : "",
    //             description: [texts[1].value, texts[2].value] ? [texts[1].value, texts[2].value] : "",
    //             space: null || ["taom 1", "taom 2"],
    //             videoLink: texts[3].value ? texts[3].value : "https://www.youtube.com/watch?v=GlrxcuEDyF8"
    //         })
    //     });
    //     const data = await response.json();
    //     data ? alert("success") : "error";
    // })
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
        await fetch(BASE_URL2 + 'hero', {
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data'
            },
            body: formData
        });

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
        await fetch(BASE_URL2 + 'choose', {
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