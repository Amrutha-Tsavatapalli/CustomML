function getRecommendations() {
    const gre = document.getElementById("gre").value;
    const toefl = document.getElementById("toefl").value;
    const cgpa = document.getElementById("cgpa").value;

    if (!gre || !toefl || !cgpa) {
        alert("Please fill in all fields!");
        return;
    }

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gre: gre, toefl: toefl, cgpa: cgpa })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("courses-container").innerHTML =
            `<p><strong>Recommended Courses:</strong> ${data.recommended_courses.join(", ")}</p>`;
    })
    .catch(error => console.error("Error:", error));
}
