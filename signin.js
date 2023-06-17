const signIn = document.getElementById("signIn");
signIn.innerText = "Sign in";

signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signIn.innerText = "loading...";
    signIn.classList.add("pulse");

    if(
        email === "" ||
        password === ""
    ){
        swal.fire({
            icon : "info",
            text: "All fields required",
            confirmButtonText : "ok"
        });
        signIn.innerText = "Sign in";
        signIn.classList.remove("pulse");
    } else {
        const signInData = new FormData();
        signInData.append("email", email);
        signInData.append("password", password);

        const signReq = {
            method : "POST",
            body: signInData,
        };
        
        const URL = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";
        
        fetch (URL, signReq)
            .then((response) => response.json())
            .then((result) => {
                console.log(result, result.status);
                localStorage.setItem("adminObj", JSON.stringify(result));  

                const getAdminObj = localStorage.getItem("adminObj");
                const adminObj = JSON.parse(getAdminObj);

                if (adminObj.hasOwnProperty("email")) {
                    location.href ="dashboard.html";
                } else {
                    swal.fire({
                        icon : "warning",
                        text: "Login unsuccesful",
                        confirmButtonColor : "#2D85DE",
                    });

                }
                signIn.innerText = "sign In"
                signIn.classList.remove("pulse");
                
          
        })
        .catch((error) => {
            console.log("Error", error);
        });
    }
    
})