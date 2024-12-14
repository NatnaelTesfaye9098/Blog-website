document.querySelectorAll(".readmore").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();  // Prevents any default behavior of the anchor tag
        
        // Find the closest post container for each "Read More" button
        const post = button.closest(".post");
        const content = post.querySelector(".post-content");

        // Toggle the "extended" class to show or hide content
        content.classList.toggle("extended");
        
        // Optionally, change button text depending on whether it's expanded or not
        if (content.classList.contains("extended")) {
            button.textContent = "Read Less";
        } else {
            button.textContent = "Read More...";
        }
    });
});
