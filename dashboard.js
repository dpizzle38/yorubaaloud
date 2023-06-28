function fetchDashBoardData(){

    // selecting the html element first by its ID
    const pageModal = document.getElementById("pageModal");

    pageModal.style.display = "flex";

    const getAuthToken = localStorage.getItem("adminObj");

    const tokenAcquired = JSON.parse(getAuthToken);

    const token =  tokenAcquired.token;

    const headers = new Headers();

    headers.append("Authorization", `Bearers ${token}`);

    const request = {
        method : "GET",
        headers : headers
    };

    const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    const resultData = [];
    
    fetch(URL, request)
    
     .then((response) => response.json())
    
     .then((result) =>{

        console.log(result);
        
        const getCategory = document.getElementById("category");
        getCategory.innerHTML = `${result.total_number_of_categories}`;

        const getLearningMaterials = document.getElementById("learningMaterials");
        getLearningMaterials.innerHTML = `${result.total_number_of_learningmaterial}`;

        const getSubCategories = document.getElementById("subCategories");
        getSubCategories.innerHTML = `${result.total_number_of_categories}`;

        const getTotalQuiz = document.getElementById("totalQuiz");
        getTotalQuiz.innerHTML = `${result.total_number_of_quiz}`;

        const getTotalStudents = document.getElementById("totalStudents");
        getTotalStudents.innerHTML = `${result.total_number_of_students}`;

        const getAdminUserName = document.getElementById("adminUserName");
        getAdminUserName.innerHTML = `${result.admin_name}`;

        pageModal.style.display = "none";
    })

    .catch((error) => console.log("error", error));
}

fetchDashBoardData();

const topThreeStudentBtn = document.getElementById("topThreeStudent");

topThreeStudentBtn.addEventListener("click", (event) =>{
    event.preventDefault();

    const studentModal = document.getElementById("studentModal");
    
    studentModal.style.display = "block";

    const authToken = localStorage.getItem("adminObj");

    const tokenAcquired = JSON.parse(authToken);

    const token = tokenAcquired.token;

    const headers = new Headers();

    headers.append("Authorization", `Bearer ${token}`)

    const request = {
        method: "GET",
        headers: headers
    }

    const URL = "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

    const resultData = [];

    fetch(URL, request)
    .then((response) => response.json())
    .then((result) =>{
    
    console.log(result);
    
    const getBestStudents = document.getElementById("topThreeScores");
        if(result.length === 0){
            getBestStudents.innerHTML = "No information found";
        }

        result.map((item) =>{
            resultData.push(`
            <div class="search-card">
                    <div class="card">
                        <p>Name:</p>
                        <p>${item.name}</p>
                    </div>
                    
                    <div class="card">
                        <p>Email:</P>
                        <p>${item.email}</p>
                    </div>
                    
                    <div class="card">
                        <p>Phone Number</p>
                        <p>${item.phone_number}</p>
                    </div>
                  
                    <div class="card">
                        <p>Position</p>
                        <p>${item.position}</p>
                    </div>
                   
                    <div class="card">
                        <p>Total score</p>
                        <p>${item.score}</p>
                    </div>

                    
                </div>
            
            
            `)

        });
     
    getBestStudents.innerHTML = resultData.join("");
    
    studentModal.classList.add("show");

    })
    .catch((error) => console.log("error", error));
})

