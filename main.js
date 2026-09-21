document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profile-icon');
  const loginModal = document.querySelector('.login-html'); // Targets your login container from the video

  if (profileIcon && loginModal) {
    profileIcon.addEventListener('click', (event) => {
      event.preventDefault(); // Prevents page reload or anchor jump
      loginModal.classList.toggle('show');
    });
  }
});



// 
// 



    document.addEventListener("DOMContentLoaded", () => {

        const openBtn =
            document.getElementById("open-location-modal");

        const modal =
            document.getElementById("location-modal");

        const searchInput =
            document.getElementById("state-search");


        // Open modal
        openBtn.addEventListener("click", () => {

            modal.classList.add("active");

        });


        // Close modal when clicking the dark overlay
        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                modal.classList.remove("active");

            }

        });


        // Real-time search filter
        searchInput.addEventListener("input", (e) => {

            const query =
                e.target.value.toLowerCase().trim();

            const cards =
                document.querySelectorAll(".location-card");


            cards.forEach((card) => {

                const stateName =
                    card
                        .querySelector(".state-name")
                        .textContent
                        .toLowerCase();


                if (stateName.includes(query)) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

