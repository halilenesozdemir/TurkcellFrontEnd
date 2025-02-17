const pushList = document.querySelector('.pushList');
const addPost = document.querySelector('#add-post-btn')
const id = document.querySelector('#id');
const city = document.querySelector('#city');
const place = document.querySelector('#place');
const image = document.querySelector('#image');
const region = document.querySelector('#region');
const category = document.querySelector('#category')
const summary = document.querySelector('#summary');
const date = document.querySelector('#date');


        fetch('http://localhost:3000/travel')
        .then(response => response.json())
        .then(data => {
            
            data.forEach((item) => {
                
             sendUi(item.id,item.city, item.place, item.image,item.region,item.category,item.summary,item.date,)
            });
         })


function sendUi(tcity,tplace,timage,tsummary,tregion,tdate){
    let col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `<img src="${timage}" class="img-fluid image" alt="..." style="height:100% ;
    width: 100%;">
</div>
<div class="card-body col-5 d-flex flex-column px-2 bg-success">
    <h6 class="card-title my-2 city">"${tcity}"</h6>
    <h5 class="card-title my-2 place">"${tplace}"</h5>
  <p class="card-text summary">"${tsummary}"</p>
  <span class="card-text my-2 region">Bölge : <span>"${tregion}"</span></span>
  <span class="card-text my-2 category">Kategori : <span>"${tregion}"</span></span>
  <small class="date">Tarih ve Saat : <small>"${tdate}"</small></small>
  <div class="row p-3">
    <button class="btn btn-primary col-5">Düzenle</button>
    <button class="btn btn-danger col-5 ms-auto">Sil</button>`;
}

addPost.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        city: city.value,
        place:place.value,
        image:image.value,
        region:region.value,
        category: category.value,
        summary: summary.value,
        date: date.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  
    city.value = "";
    place.value = "";
    image.value = "";
    region.value = "";
    category.value = "";
    summary.value = "";
    date.value = "";
  });

  pushList.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.parentElement.dataset.id;
    if (e.target.id === "delete") {
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
    }
    if (e.target.id === "edit") {
      const parent = e.target.parentElement;
      let city = parent.querySelector(".city").textContent;
      let place = parent.querySelector(".place").textContent;
      let image = parent.querySelector(".image").textContent;
      let region = parent.querySelector(".region").textContent;
      let category = parent.querySelector(".category").textContent;
      let summary = parent.querySelector(".summary").textContent;
      let date = parent.querySelector(".date").textContent;
        
      city.value = city;
      place.value = place;
      image.value = image;
      region.value = region;
      category.value = category;
      summary.value = summary;
      date.value = date;
    }
  
    document.getElementById("add-post-btn").addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            city: city.value,
            place:place.value,
            image:image.value,
            region:region.value,
            category: category.value,
            summary: summary.value,
            date: date.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(() => location.reload());
  
        city.value = "";
        place.value = "";
        image.value = "";
        region.value = "";
        category.value = "";
        summary.value = "";
        date.value = "";
    });
  });

  document.querySelector("#filter").addEventListener("keyup", filterPosts);
function filterPosts(e) {
  const filterValue = e.target.value.toLowerCase();
  let postItems = document.querySelectorAll(".card-subtitle");
  postItems.forEach((postItems) => {
    let text = postItems.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      postItems.parentElement.parentElement.setAttribute(
        "style",
        "display:none !important"
      );
    } else {
      postItems.parentElement.parentElement.setAttribute(
        "style",
        "display:block"
      );
    }
  });
}




