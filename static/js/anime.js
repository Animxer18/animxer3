let img = document.querySelector("#img img");
let title = document.querySelector("#desc span");
let desc = document.querySelector("#desc");
let info = document.querySelector(".info");
let trailer = document.querySelector("#trailer");
let d = "";
// fetch(`${url}`).then(res => res.json()).then(data =>).catch(err => console.warn(err.message))
   
function search(url) {
    fetch(`${url}`).then(res => res.json()).then(data => sResult(data)).catch(err => console.warn(err.message));
}

function sResult(data) {
    console.log(data);
    img.src = data["image_url"];
    title.innerHTML = data["title"];
    desc.innerHTML += `
        ${data["synopsis"].slice(0,100)}<span id="dots">.....</span><span style="display: none" id="more">${data["synopsis"].slice(100,-1)}</span> &nbsp;&nbsp;&nbsp;<a style="color: blue" href="#" onclick="readMoreLess()" id="myBtn">Read More</a>
        `;
    // info.style.backgroundImage = `url('${data["image_url"]}')`;
    d += data
    trailer.src = data["trailer_url"]
    document.querySelector("#Animtitle").innerHTML = data["title"];
    document.querySelector("#title_japanese").innerHTML = data["title_japanese"];
    document.querySelector("#epnum").innerHTML = data["episodes"];
    document.querySelector("#durationPerEp").innerHTML = data["duration"];
    document.querySelector("#rank").innerHTML = data["rank"];
    document.querySelector("#startDate").innerHTML = data["aired"]["string"].split("to")[0];
    document.querySelector("#endDate").innerHTML = data["aired"]["string"].split("to")[1];
}

search(base_url)

function readMoreLess() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    }
    else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}


//   console.log(fetch(`${window.location.origin}/sresult/${d["title"]}`))
console.log(d);
