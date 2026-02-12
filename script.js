// Configuration
const CONFIG = {
  typewriterTexts: ["Fullstack Developer", "React.js Specialist", "UI/UX Enthusiast"],
  chatResponses: [
    "Thanks for reaching out! I'd love to help with your project.",
    "That sounds like an exciting opportunity! Let me know more details.",
    "I'm available for new projects. What do you have in mind?",
    "Great question! I specialize in modern web technologies.",
    "I'd be happy to discuss your requirements. When would be a good time to talk?",
    "Why don't you use React and Tailwind for your project instead of Next.js",
  ],
}

// Utility Functions
const utils = {
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  isElementInViewport: (el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  getRandomResponse: (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
  },
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loading-screen")
    this.init()
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hide()
      }, 2000)
    })
  }

  hide() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        this.loadingScreen.style.display = "none"
      }, 500)
    }
  }
}

// Navigation
class Navigation {
  constructor() {
    this.nav = document.querySelector(".navbar")
    this.hamburger = document.querySelector(".hamburger")
    this.navMenu = document.querySelector(".nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.themeToggle = document.getElementById("theme-toggle")
    
    this.init()
  }

  init() {
    this.setupScrollEffect()
    this.setupMobileMenu()
    this.setupThemeToggle()
    this.setupSmoothScroll()
  }

  setupScrollEffect() {
    window.addEventListener("scroll", utils.throttle(() => {
      if (window.scrollY > 50) {
        this.nav.classList.add("scrolled")
      } else {
        this.nav.classList.remove("scrolled")
      }
    }, 100))
  }

  setupMobileMenu() {
    if (!this.hamburger) return

    this.hamburger.addEventListener("click", () => {
      this.hamburger.classList.toggle("active")
      this.navMenu.classList.toggle("active")
    })

    this.navLinks.forEach(link => {
      link.addEventListener("click", () => {
        this.hamburger.classList.remove("active")
        this.navMenu.classList.remove("active")
      })
    })
  }

  setupThemeToggle() {
    if (!this.themeToggle) return

    const currentTheme = localStorage.getItem("theme") || "dark"
    document.documentElement.setAttribute("data-theme", currentTheme)
    this.updateThemeIcon(currentTheme)

    this.themeToggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme")
      const newTheme = theme === "dark" ? "light" : "dark"
      
      document.documentElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      this.updateThemeIcon(newTheme)
    })
  }

  updateThemeIcon(theme) {
    const icon = this.themeToggle.querySelector("i")
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    }
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href")
        if (href.startsWith("#")) {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
            
            this.navLinks.forEach(l => l.classList.remove("active"))
            link.classList.add("active")
          }
        }
      })
    })
  }
}

// Typewriter Effect
class TypewriterEffect {
  constructor(element, texts) {
    this.element = element
    this.texts = texts
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false
    this.typingSpeed = 100
    this.deletingSpeed = 50
    this.pauseTime = 2000
    
    if (this.element) {
      this.type()
    }
  }

  type() {
    const currentText = this.texts[this.textIndex]
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1)
      this.charIndex--
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1)
      this.charIndex++
    }

    let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed

    if (!this.isDeleting && this.charIndex === currentText.length) {
      speed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
      speed = 500
    }

    setTimeout(() => this.type(), speed)
  }
}

// Animated Counter
class AnimatedCounter {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number")
    this.observed = new Set()
    this.init()
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.observed.has(entry.target)) {
          this.animateCounter(entry.target)
          this.observed.add(entry.target)
        }
      })
    }, { threshold: 0.5 })

    this.counters.forEach(counter => observer.observe(counter))
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        element.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = element.getAttribute("data-target")
      }
    }

    updateCounter()
  }
}

// Animation Observer
class AnimationObserver {
  constructor() {
    this.init()
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 1s ease forwards"
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll(".service-card, .project-card, .blog-card, .testimonial-card")
    elements.forEach(el => observer.observe(el))

    // Animate skill progress bars
    const skillBars = document.querySelectorAll(".skill-progress")
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width")
          entry.target.style.width = width
        }
      })
    }, { threshold: 0.5 })

    skillBars.forEach(bar => skillObserver.observe(bar))
  }
}

// Project Filter
class ProjectFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll(".filter-btn")
    this.projectCards = document.querySelectorAll(".project-card")
    this.init()
  }

  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter")
        
        this.filterBtns.forEach(b => b.classList.remove("active"))
        btn.classList.add("active")
        
        this.filterProjects(filter)
      })
    })
  }

  filterProjects(filter) {
    this.projectCards.forEach(card => {
      const category = card.getAttribute("data-category")
      
      if (filter === "all" || category.includes(filter)) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "scale(1)"
        }, 10)
      } else {
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  }
}

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-card")
    this.dots = document.querySelectorAll(".nav-dot")
    this.currentSlide = 0
    this.init()
  }

  init() {
    if (this.slides.length === 0) return

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })

    setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")
    
    this.currentSlide = index
    
    this.slides[this.currentSlide].classList.add("active")
    this.dots[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(next)
  }
}

// FAQ Accordion
class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item")
    this.init()
  }

  init() {
    this.faqItems.forEach(item => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")
        
        this.faqItems.forEach(i => i.classList.remove("active"))
        
        if (!isActive) {
          item.classList.add("active")
        }
      })
    })
  }
}

// Contact Form
class ContactForm {
  constructor() {
    this.form = document.querySelector(".contact-form")
    this.init()
  }

  init() {
    if (!this.form) return

    this.form.addEventListener("submit", (e) => {
      // Form will submit to FormSubmit.co - no need to prevent default
      console.log("Form submitted successfully!")
    })
  }
}

// Newsletter Form
class NewsletterForm {
  constructor() {
    this.form = document.querySelector(".newsletter-form")
    this.init()
  }

  init() {
    if (!this.form) return

    this.form.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = this.form.querySelector("input[type='email']").value
      
      if (email) {
        alert("Thank you for subscribing! You'll receive updates at " + email)
        this.form.reset()
      }
    })
  }
}

// Download CV Button
class DownloadCV {
  constructor() {
    this.btn = document.getElementById("download-cv")
    this.init()
  }

  init() {
    if (!this.btn) return

    this.btn.addEventListener("click", (e) => {
      e.preventDefault()
      alert("CV download feature coming soon! Please contact me directly for my resume.")
    })
  }
}

// Project Modal
class ProjectModal {
  constructor() {
    this.modal = document.getElementById("project-modal")
    this.modalClose = document.querySelector(".modal-close")
    this.init()
  }

  init() {
    if (!this.modal) return

    this.modalClose.addEventListener("click", () => {
      this.closeModal()
    })

    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal()
      }
    })
  }

  openModal(projectId) {
    this.modal.style.display = "block"
    this.loadProjectContent(projectId)
  }

  closeModal() {
    this.modal.style.display = "none"
  }

  loadProjectContent(projectId) {
    const projects = {
      ecomarket: {
        title: "TradeReal E-commerce",
        description: "A full-stack e-commerce platform focused on sustainable products with advanced filtering, real-time inventory management, and integrated payment solutions.",
        features: [
          "Real-time inventory tracking",
          "Advanced product filtering",
          "Secure payment integration",
          "Responsive design",
          "Admin dashboard"
        ],
        tech: ["HTML", "CSS", "JavaScript"],
        image: "fas fa-store"
      },
      dataviz: {
        title: "DATA Analytics Dashboard",
        description: "Real-time analytics dashboard with AI-powered insights, interactive charts, and predictive analytics for product flow.",
        features: [
          "Real-time data visualization",
          "AI-powered insights",
          "Interactive charts",
          "Predictive analytics",
          "Custom reporting"
        ],
        tech: ["React.js", "Tailwind CSS"],
        image: "fas fa-chart-line"
      },
      educonnect: {
        title: "BrightFord - Learning Management System",
        description: "Comprehensive LMS with video streaming, interactive quizzes, progress tracking, and virtual classroom features.",
        features: [
          "Video streaming",
          "Interactive quizzes",
          "Progress tracking",
          "Virtual classrooms",
          "Student analytics"
        ],
        tech: ["HTML5", "CSS3", "JavaScript", "Node.js"],
        image: "fas fa-graduation-cap"
      }
    }

    const project = projects[projectId]
    const modalContent = document.getElementById("modal-content")
    const modalTitle = document.getElementById("modal-title")

    if (project) {
      modalTitle.textContent = project.title
      modalContent.innerHTML = `
        <div class="modal-project-content">
          <div class="modal-project-icon">
            <i class="${project.image}"></i>
          </div>
          <p class="modal-description">${project.description}</p>
          <h4>Key Features:</h4>
          <ul class="modal-features">
            ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join("")}
          </ul>
          <h4>Technologies Used:</h4>
          <div class="modal-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
          </div>
        </div>
      `
    }
  }
}

// Global function for project modal
function openProjectModal(projectId) {
  const modal = new ProjectModal()
  modal.openModal(projectId)
}

// Chat Widget
class ChatWidget {
  constructor() {
    this.chatToggle = document.getElementById("chat-toggle")
    this.chatWindow = document.getElementById("chat-window")
    this.chatMinimize = document.getElementById("chat-minimize")
    this.chatInput = document.getElementById("chat-input")
    this.chatSend = document.getElementById("chat-send")
    this.chatMessages = document.getElementById("chat-messages")
    this.isOpen = false

    this.init()
  }

  init() {
    if (!this.chatToggle) return

    this.setupEventListeners()
  }

  setupEventListeners() {
    this.chatToggle.addEventListener("click", () => this.toggleChat())
    this.chatMinimize.addEventListener("click", () => this.closeChat())
    this.chatSend.addEventListener("click", () => this.sendMessage())
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage()
      }
    })
  }

  toggleChat() {
    this.isOpen = !this.isOpen
    this.chatWindow.classList.toggle("active", this.isOpen)

    if (this.isOpen) {
      this.chatInput.focus()
      this.hideNotification()
    }
  }

  closeChat() {
    this.isOpen = false
    this.chatWindow.classList.remove("active")
  }

  sendMessage() {
    const message = this.chatInput.value.trim()
    if (!message) return

    this.addMessage(message, "user")
    this.chatInput.value = ""

    setTimeout(() => {
      const response = utils.getRandomResponse(CONFIG.chatResponses)
      this.addMessage(response, "bot")
    }, 1000)
  }

  addMessage(text, sender) {
    const messageEl = document.createElement("div")
    messageEl.className = `message ${sender}-message`

    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    messageEl.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
      </div>
      <div class="message-time">${timeString}</div>
    `

    this.chatMessages.appendChild(messageEl)
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
  }

  hideNotification() {
    const notification = document.querySelector(".chat-notification")
    if (notification) {
      notification.style.display = "none"
    }
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.btn = document.getElementById("back-to-top")
    this.init()
  }

  init() {
    if (!this.btn) return

    window.addEventListener("scroll", utils.throttle(() => {
      if (window.scrollY > 300) {
        this.btn.classList.add("visible")
      } else {
        this.btn.classList.remove("visible")
      }
    }, 100))

    this.btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }
}

// Initialize all components when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  new LoadingScreen()
  new Navigation()
  new TypewriterEffect(document.querySelector(".typewriter"), CONFIG.typewriterTexts)
  new AnimatedCounter()
  new AnimationObserver()
  new ProjectFilter()
  new TestimonialsSlider()
  new FAQAccordion()
  new ContactForm()
  new NewsletterForm()
  new DownloadCV()
  new ProjectModal()
  new ChatWidget()
  new BackToTop()
})