export const PORTFOLIO_DATA = {
  personal: {
    name: "Rajeev Ranjan Prasad",
    role: "Software Developer",
    avatar: "https://res.cloudinary.com/dyy8sqeh7/image/upload/v1779719415/notionists-1779719391796_dx82bd.png",
    title: "Software Developer with 5+ years of experience delivering projects to clients",
    availability: "Available for New Projects",
    timezone: "IST (UTC+5:30) / Bengaluru, India",
    location: "Bengaluru, Karnataka, India",
    locationDescription: "📍 Based in Bengaluru, India's Silicon Valley",
    remoteAvailability: "Available worldwide remotely",
    email: "rajeevranjan.freelance@gmail.com",
    phone: "+91 7079369859",
    whatsapp: "https://wa.me/917079369859",
    github: "https://github.com",
    linkedin: "https://www.linkedin.com/in/rajeev-ranjan-prasad-4764b8233",
    web3formsKey: "0a7369aa-badc-4166-81ce-46792f864ecf", // Register at https://web3forms.com to get a free key for actual email notifications
    calendly: "", // Add your real Calendly link here to override the mock scheduler with Calendly if desired
    emailjsServiceId: "", // Register at https://www.emailjs.com to get a free Service ID
    emailjsTemplateId: "", // Create a template in EmailJS and enter the Template ID here
    emailjsPublicKey: "", // Copy your Public Key from the Account tab in EmailJS
    twitter: "https://twitter.com",
    upwork: "https://upwork.com",
    stats: {
      experience: "5+ Years",
      projects: "20+ Projects",
      clients: "50+",
      rating: "4.9★",
      githubStars: "240+",
      clientsServed: "50+",
      deliveryRate: "100%",
      consultationsDone: "120+"
    }
  },
  hero: {
    badgeText: "Cost-Optimized Cloud for 1K → 1M Users",
    headline: "Scalable Web + Mobile Apps. Enterprise Backend. Smart Cloud.",
    subheadline: "Java Spring Boot | React | React Native | MySQL",
    ctaPrimary: "See My Work",
    ctaSecondary: "Get Free Consultation"
  },
  cloudStrategy: {
    heading: "Cloud Infrastructure Built for Your Scale",
    subheading: "Stop overpaying for idle resources. I match infrastructure directly to your user metrics.",
    footerText: "I don't overcharge you on cloud. I match infrastructure to your actual users.",
    tiers: [
      {
        scale: "0 - 1,000 users",
        provider: "AWS Lightsail / DigitalOcean",
        cost: "$10 - $25/mo",
        why: "Best value, simple setup, minimal system administration required.",
        badge: "Startup Ready",
        isPopular: false
      },
      {
        scale: "1,000 - 10,000 users",
        provider: "AWS EC2 t3.medium + RDS",
        cost: "$60 - $120/mo",
        why: "Auto-scaling configuration enabled, Decoupled Database, Secure VPC.",
        badge: "Growth Scale",
        isPopular: true
      },
      {
        scale: "10,000+ users",
        provider: "AWS EKS + Load Balancers",
        cost: "Custom Pricing",
        why: "Enterprise-grade high availability, microservices clustering, dynamic replica counts.",
        badge: "Enterprise SLA",
        isPopular: false
      }
    ]
  },
  services: [
    {
      title: "Web Applications",
      description: "High-performance SPA and PWAs built with React.js, Next.js, Redux, and Tailwind CSS. Structured for fast load times and absolute responsiveness.",
      tech: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"],
      icon: "web"
    },
    {
      title: "Mobile Apps",
      description: "Cross-platform mobile applications for iOS & Android built using React Native. Reusable codebase, near-native performance, and offline-first syncing capabilities.",
      tech: ["React Native", "iOS & Android", "Redux", "Native Modules"],
      icon: "mobile"
    },
    {
      title: "Backend APIs",
      description: "Industrial-grade secure backend servers built in Java Spring Boot. Configured with Spring Security, JWT, WebSockets, and JPA for high transactional performance.",
      tech: ["Java Spring Boot", "Spring Security", "JWT Auth", "REST / WebSockets"],
      icon: "backend"
    },
    {
      title: "Cloud Architecture",
      description: "Smart infrastructure configuration on AWS/DigitalOcean. Containerization with Docker, Kubernetes cluster orchestration, and automated CI/CD deployment pipelines.",
      tech: ["AWS / DigitalOcean", "Docker & Kubernetes", "GitHub Actions", "Cloud Cost Optimization"],
      icon: "cloud"
    }
  ],
  projects: [
    {
      id: "food-delivery",
      title: "UberEats-style Food Delivery",
      description: "Multi-tenant restaurant logistics platform supporting live courier tracking, dynamic dispatch queues, and customer cart updates.",
      tech: ["React Native", "Spring Boot", "MySQL", "WebSocket"],
      users: "2,500+ active",
      cloud: "AWS EC2 (auto-scaling)",
      cost: "$85/mo avg",
      rating: 4.9,
      demoUrl: "#demo"
    },
    {
      id: "healthcare-portal",
      title: "Healthcare Patient Portal",
      description: "HIPAA-compliant EHR database and management portal enabling patient check-ins, doctor appointment slots, and encrypted medical records.",
      tech: ["React", "Spring Boot", "MySQL", "JWT"],
      users: "5,000+ patients",
      cloud: "HIPAA-ready AWS",
      cost: "$120/mo avg",
      rating: 5.0,
      demoUrl: "#demo"
    },
    {
      id: "elearning",
      title: "E-Learning Platform with Live Classes",
      description: "Digital course academy supporting WebRTC classroom streams, synchronized whiteboard notes, interactive quizzes, and course completion badges.",
      tech: ["React", "Spring Boot", "WebRTC", "MySQL"],
      users: "10,000+ students",
      cloud: "AWS with CloudFront",
      cost: "$150/mo avg",
      rating: 4.8,
      demoUrl: "#demo"
    },
    {
      id: "realestate",
      title: "Real Estate Marketplace",
      description: "Geospatial search directory mapping over 50,000 real estate properties, featuring automatic distance matching, price trends, and agent routing.",
      tech: ["React", "Spring Boot", "ElasticSearch", "MySQL"],
      users: "50,000+ listings",
      cloud: "DigitalOcean ($20/mo tier)",
      cost: "$20/mo fixed",
      rating: 4.9,
      demoUrl: "#demo"
    },
    {
      id: "fitness",
      title: "Fitness Tracking Mobile App",
      description: "Sleek workout journal with active GPS route plotting, calorie calculator, step scoreboard syncing, and peer motivation feeds.",
      tech: ["React Native", "Spring Boot", "Redis", "MySQL"],
      users: "8,000+ active",
      cloud: "AWS Lightsail (cost-optimized)",
      cost: "$15/mo fixed",
      rating: 4.8,
      demoUrl: "#demo"
    },
    {
      id: "inventory",
      title: "Inventory Management System",
      description: "Enterprise warehouse logistics interface integrating automated PO workflows, barcode scanners, stock level projections, and PDF manifest printing.",
      tech: ["React", "Spring Boot", "MySQL", "JasperReports"],
      users: "500+ employees",
      cloud: "On-prem + AWS backup",
      cost: "$35/mo backup",
      rating: 4.9,
      demoUrl: "#demo"
    },
    {
      id: "social-dashboard",
      title: "Social Media Dashboard",
      description: "Aggregating platform visualizer providing content post queues, real-time analytics graphs over WebSocket feeds, and PDF auditor outputs.",
      tech: ["React", "Spring Boot", "WebSocket", "MySQL"],
      users: "15,000+ creators",
      cloud: "AWS EKS (microservices)",
      cost: "$280/mo scale",
      rating: 4.7,
      demoUrl: "#demo"
    },
    {
      id: "fintech",
      title: "Fintech Payment Gateway",
      description: "PCI-compliant transaction broker integration connecting custom merchant wallets, processing payout Webhooks, and updating ledger sheets.",
      tech: ["React Native", "Spring Boot", "MySQL", "Stripe API"],
      users: "3,000+ merchants",
      cloud: "AWS with PCI compliance",
      cost: "$110/mo avg",
      rating: 5.0,
      demoUrl: "#demo"
    }
  ],
  whyChooseMe: [
    {
      title: "Full-Stack Specialist",
      description: "I build end-to-end applications. No communication gaps. I design the React UI, draft the Spring Boot APIs, and tune the MySQL server personally."
    },
    {
      title: "Cost-Transparent Solutions",
      description: "You'll understand exactly what cloud resources you are paying for. I implement cost-containment measures to prevent surprise cloud bills."
    },
    {
      title: "MySQL Performance Tuner",
      description: "Experienced in explaining query plans, configuring composites/indexes, tuning buffers, and establishing Redis caches to maximize throughput."
    },
    {
      title: "CI/CD & Container Orchestration",
      description: "Dockerized systems deploy smoothly. I construct reliable Git workflows deploying straight to staging or auto-scaled environments seamlessly."
    }
  ],
  testimonials: [
    {
      quote: "Migrated us from $500/month to $45/month on DigitalOcean without losing performance. Absolutely stellar consultation.",
      author: "CTO, SaaS Startup",
      scale: "$455/mo saved"
    },
    {
      quote: "Built our React Native app + Spring Boot backend in 12 weeks. Now serving 10k daily users. Our system has never been more stable.",
      author: "Founder, HealthTech",
      scale: "10k daily users"
    },
    {
      quote: "The cloud architecture he designed handles traffic spikes effortlessly. Unparalleled expertise in AWS cost control.",
      author: "Product Lead, E-commerce",
      scale: "100% uptime"
    }
  ],
  partners: ["AWS", "DigitalOcean", "Linode", "Vultr", "Google Cloud"]
};
