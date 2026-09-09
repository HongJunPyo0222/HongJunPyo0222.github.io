document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu Drawer Toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- 2. Header Scroll & Progress Indicators ---
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Header Glass morph change on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress calculations
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // --- 3. Terminal typing simulator (junpyo.json) ---
  const terminalText = document.getElementById('terminal-text');
  const devProfileData = {
    name: "홍준표 (Hong Jun Pyo)",
    role: "Backend Developer",
    status: "Building reliable services together...",
    coreStack: ["Java", "Spring Cloud", "Python", "C++", "Docker", "AWS", "SQL"],
    interests: ["Tableau", "ETL Pipelines", "PaddleOCR", "MSA", "Database Design"],
    hobbies: ["Bodybuilding", "Running", "Climbing"],
    credo: "Turn tedious repetitive tasks into solid automation scripts."
  };

  const jsonString = JSON.stringify(devProfileData, null, 2);
  let typingIndex = 0;
  const speed = 15; // Character typing speed (milliseconds)

  function typeTerminal() {
    if (terminalText && typingIndex < jsonString.length) {
      terminalText.textContent += jsonString.charAt(typingIndex);
      typingIndex++;
      setTimeout(typeTerminal, speed);
    }
  }

  // Delay terminal typing slightly for polished introductory feel
  setTimeout(typeTerminal, 1000);

  // --- 4. Interactive Strengths vs. Weaknesses Personality Tabs ---
  const tabs = document.querySelectorAll('.personality-tab');
  const panels = document.querySelectorAll('.personality-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const activeTab = tab.getAttribute('data-tab');

      // Update active tab buttons
      tabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      // Show/Hide corresponding panel with smooth fade in
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${activeTab}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  // --- 5. Intersection Observer: Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserverOptions = {
    root: null,
    threshold: 0.1, // Element is revealed when 10% is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing to retain state and reduce observer overhead
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- 6. Language Gauge Fill Animation on Scroll ---
  const barFills = document.querySelectorAll('.lang-bar-fill');

  const progressObserverOptions = {
    root: null,
    threshold: 0.2
  };

  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-score');
        fill.style.width = targetPercent + '%';
        observer.unobserve(fill);
      }
    });
  }, progressObserverOptions);

  barFills.forEach(fill => {
    progressObserver.observe(fill);
  });

  // --- 7. Direct Contact Clipboard Actions & Toast feedback ---
  const emailCard = document.getElementById('email-card');
  const phoneCard = document.getElementById('phone-card');
  const toast = document.getElementById('clipboard-toast');
  const toastMessage = document.getElementById('toast-message');

  function triggerToast(message) {
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      // Auto dismiss toast after 2.5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  }

  if (emailCard) {
    emailCard.addEventListener('click', () => {
      const email = emailCard.getAttribute('data-email');
      navigator.clipboard.writeText(email)
        .then(() => {
          triggerToast(`이메일 주소(${email})가 복사되었습니다!`);
        })
        .catch(err => {
          console.error('클립보드 복사 실패: ', err);
          triggerToast('이메일 주소를 직접 복사해 주세요.');
        });
    });
  }

  if (phoneCard) {
    phoneCard.addEventListener('click', () => {
      // In practice, this could contain his actual phone number or a placeholder prompt
      const textToCopy = "010-3837-7756"; // Standard placeholder or target
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          triggerToast('연락처(010-3837-7756)가 복사되었습니다!');
        })
        .catch(err => {
          console.error('클립보드 복사 실패: ', err);
          triggerToast('연락처 복사 도중 에러가 발생했습니다.');
        });
    });
  }

  // --- 8. Navigation Scrollspy - Highlight Active Section in Navbar ---
  const sections = document.querySelectorAll('section');
  
  const scrollspyOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: "-20% 0px -50% 0px" // Adjusted to trigger closer to current section centers
  };

  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, scrollspyOptions);

  sections.forEach(sec => {
    scrollspyObserver.observe(sec);
  });
});
