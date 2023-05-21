// ma'lumotlar ro'yxati
let myArray = [{
        title: "Test",
        description: "bu page javascript da qilingan",
        link: "./about.html"
    },
    {
        title: "Boss",
        description: `
        <span class='text-danger fs-3'>
        Iltimos ko'rinishiga axamyat bermang. tezlikda qilganim uchun xunik chiqqan.</span> 
        <br> Bu page hamma restaurantlarni boshqarib turuvchi page hisoblanad. bu yerda
         yangi restaurant yoki yangi admin yarata oladi. holasa o'chirishi va o'zgartirishi ham mumkun
         . bu yerga birinchi bo'lib login qilib kirishi kerak. <br>
         <strong>Boss Email: </strong>
         <span class='text-info fs-3'> boss@gmail.com </span><br><strong>Boss Password: </strong>
         <span class='text-info fs-3'> boss</span>
        `,

        link: "../bossRestCrud.html"
    },
    {
        title: "admin",
        description: `admin panelda siz to'liq resturant ishlarini olib borishingiz mumkun.
         agar kirishni xoxlasangiz pastda email va passwordi qoldiraman.
         xolasangiz shu orqali kirib tekshirishingiz mumkun.
         agar unday bo'lmasa boss orqali yangi admin kiritib o'sha orqali 0 dan saytni to'ldirib chiqsangiz bo'ladi.
         <br>         <strong>Admin Email: </strong>
         <span class='text-info fs-3'> abduhamidjon2005@gmail.com </span><br><strong>Boss Password: </strong>
         <span class='text-info fs-3'> 123</span>`,
        link: "../adminOneRes.html"
    },
    {
        title: "asosy index saxifamiz",
        description: `bu yerda qilgan o'zgarishlarni ko'rsa bo'ladi. agra kirganizda ma'lumot 
        bo'lmasa o'zingiz buni to'ldirib chiqishingizga to'gri keladi. 
        bu yerga kirganizda bir nechta restaurantlar o'zlarining eng 
        yaxshi taomlarini reklama qilib turadi. o'sha taomlardan biri 
        yoqsa o'shani bittasini bosib u restauran haqida ko'proq 
        ma'lumot olishingiz mumkun. va ya'na siz o'z restaurantinguizdagi 
        o'zgarishlarini shu page orqlai bilib turishingiz mumkun. o'zingiz yaratgan
         web saxifani yuqoridagi link orqali kirib o'z
         restaurantningizni tanlab  kuzatib borishingiz mumkun.`,
        link: "../index.html"
    },
];

// accordion HTML elementlarini yaratish
let accordionHtml = '<div class="accordion" id="accordionExample">';
for (let i = 0; i < myArray.length; i++) {
    accordionHtml +=
        '<div class="accordion-item">' +
        '<h2 class="accordion-header" id="heading' +
        i +
        '">' +
        '<button class="accordion-button" type="button" data-mdb-toggle="collapse" data-mdb-target="#collapse' +
        i +
        '" aria-expanded="true" aria-controls="collapse' +
        i +
        '">' +
        myArray[i].title +
        "</button>" +
        "</h2>" +
        '<div id="collapse' +
        i +
        '" class="accordion-collapse collapse" aria-labelledby="heading' +
        i +
        '" data-mdb-parent="#accordionExample">' +
        '<div class="accordion-body">' +
        `
  <strong class="fs-3">Link: </strong><a href=${myArray[i].link} class="fs-4" target="_blank">  ${myArray[i].link}</a><br><br>
        ` +
        myArray[i].description +

        "</div>" +
        "</div>" +
        "</div>";
}
accordionHtml += "</div>";

// accordion HTML elementlarini render qilish
document.getElementById("accordion-container").innerHTML = accordionHtml;