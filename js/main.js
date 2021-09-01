const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const countryContainer =document.getElementById('country-container');
const countryDetails =document.getElementById('country-details');

const error =document.getElementById('error');

searchBtn.addEventListener("click",function(){
    const search = searchInput.value ;
    // clear value dom
    if (search =='' ){
error.innerText ="search field cannot be empty";
return;
    }
    countryContainer.innerHTML= "";
    countryDetails.innerHTML= "";

    const url =`https://restcountries.eu/rest/v2/name/${search}`;
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> showData(data));
  


function showData (countryArray) {
      // erroor handelling
      if (countryArray.status === 404 ){
        error.innerText="no result found";
    }
    else {
       error.innerText="";
    }
    // --------------------------
      countryArray.forEach(item => {
            console.log(item.flag);
            const div =document.createElement("div");
             div.classList.add('col-md-3');
             div.innerHTML=`
             <div class="rounded overflow-hidden border p-2">
               <img
                 src="${item.flag}"
                 class="w-100"
                 alt=""
               />
             </div>
             
             <div
               class="
                 py-2
                 d-flex
                 justify-content-between
                 align-items-center
                 d-md-block
                 text-md-center
               "
             >
               <h1>${item.name}</h1>
               <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
             </div>`;
             countryContainer.appendChild(div);
      });
    }
})
function showDetails(alpha3Code){
 fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}
 `)
 .then(res => res.json())
 .then((data) => {
countryDetails.innerHTML=`
<div class="col-md-12">
<h1>${data.name}</h1>
<p>Capital: ${data.capital}</p>
<p>Currency Name: ${data.currencies[0].name}</p>
<p>Currency Symbol: ${data.currencies[0].symbol}</p>
</div>`
 });
}