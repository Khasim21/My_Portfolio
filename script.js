// Toggle Dark Mode
document.addEventListener("DOMContentLoaded", () => {
  const darkModeSwitch = document.querySelector(".dark-mode-switch");
  const body = document.body;

  darkModeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });

  // Animated text effect
  const animateText = (element) => {
    const text = element.textContent;
    element.innerHTML = "";
    text.split(" ").forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      word.split("").forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.transition = "transform 0.3s ease";
        span.addEventListener("mouseover", () => {
          span.style.transform = "translateY(-5px) scale(1.1)";
        });
        span.addEventListener("mouseout", () => {
          span.style.transform = "translateY(0) scale(1)";
        });
        wordSpan.appendChild(span);
      });
      element.appendChild(wordSpan);
      if (wordIndex < text.split(" ").length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  };

  document.querySelectorAll(".animate-text").forEach(animateText);

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 200,
  });

  // Initialize Framer Motion
  const { motion } = window.Motion;

  // Animate landing section
  motion("#landing", {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" },
  });

  // Animate project cards
  document.querySelectorAll(".project-card").forEach((card, index) => {
    motion(card, {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Form submission
  document.querySelector("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    // Example: Log form data (replace with actual submission logic)
    console.log("Form submitted:", formValues);

    // Show a success message (replace with your preferred method)
    alert("Thank you for your message! I'll get back to you soon.");

    // Clear the form
    e.target.reset();
  });

  // Intersection Observer for revealing sections
  const revealSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });
});

// Parallax effect for landing section
window.addEventListener("scroll", () => {
  const landing = document.getElementById("landing");
  const scrollPosition = window.pageYOffset;
  landing.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});
