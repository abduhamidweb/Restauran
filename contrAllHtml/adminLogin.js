 formcontr.addEventListener("submit", async (e) => {
     e.preventDefault();
     // let email = document.querySelector("#email");
     try {
         const response = await fetch('http://localhost:5000/api/workerisadmin', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json' 
             },
             body: JSON.stringify({
                 useremail: email.value,
                 userpassword: password.value
             })
         });
         const {
             token,
             res_id
         } = await response.json();
  
         if (token) {
             localStorage.setItem("tokenadmin", token);
             localStorage.setItem("adminres_id",res_id ? res_id : null);
             location = "adminOneRes.html";
         } else {
             alert("please enter your email address");
         }

     } catch (error) {
         console.error(error);
     }
 });
