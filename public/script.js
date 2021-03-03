

document
  .querySelector('button[type="submit"]')
  .addEventListener("click", (e) => {
    e.preventDefault();

    const url = "https://res.cloudinary.com/dtmvrjb50/image/upload/v1614792190/strawberry.jpg"; //document.getElementById("url").value;
    const publicId = "straw1";//document.getElementById("publicid").value;
    const tag = "bgremoval"; //document.getElementById("tag").value;

    /* validate input */
    let warning = "";
    warning += !url? "<li>Please enter a Cloudinary image URL</li>" : "";
    warning += !publicId ? "<li>Please enter Cloudinary publicid</li>" : "";
    
    if (warning)
      return (document.getElementById("warning").innerHTML = warning);

  

    document.getElementById("result").innerHTML = result + "Please wait...";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ url: url, publicid: publicId, tag: tag }),
    };

    fetch("/.netlify/functions/bgremoval", options)
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);
        // const img = document.createElement("img");
        // // img.src = res.b64image;
        // img.src = response.secure_url;
        // img.alt = "screenshot";
        // document.getElementById("result").innerHTML = img.outerHTML;
      })
      .catch((err) => {
        console.log(err);
        document.getElementById(
          "result"
        ).textContent = `${err.toString()}`;
      });
  });
