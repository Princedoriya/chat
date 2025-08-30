require('dotenv').config();

const mongoose = require('mongoose');
const Profile = require('./models/Profile');

const MONGO_URI = process.env.MONGO_URI;

const seedProfile = {
  name: "Prince Doriya",
  email: "princedoriya691@gmail.com",
  education: [
    {
      institute: "Indian Institute of Information Technology Nagpur",
      degree: "B.Tech in ECE",
      start: "Nov 2022",
      end: "June 2026"
    },
    {
      institute: "RS-CIT",
      degree: "Diploma - IT Literacy",
      start: "Jan 2021",
      end: "Apr 2021"
    }
  ],
  skills: [
    { name: "C++" }, { name: "C" }, { name: "JavaScript" }, { name: "SQL" },
    { name: "React" }, { name: "HTML" }, { name: "CSS" }, { name: "Tailwind" },
    { name: "Node.js" }, { name: "Express" }, { name: "MongoDB" }
  ],
  projects: [
    {
      title: "EclairAI - PDF Summary generation Website",
      description: "Transform PDFs into impactful summaries with Next.js 15, OpenAI GPT-4, Langchain, ShadCN UI, NeonDB, Upload Thing, Stripe, TypeScript.",
      links: [
        "https://github.com/Princedoriya/EclairAI",
        "https://eclair-3wrs6wrh3-princedoriyas-projects.vercel.app/"
      ]
    },
    {
      title: "BaatCheet - Chat Website",
      description: "Real-time chat with React 19, Vite, Tailwind, Zustand, Socket.IO and authentication.",
      links: [
        "https://github.com/Princedoriya/Project-chat.git",
        "https://project-chat-twvc.onrender.com"
      ]
    },
    {
      title: "Ecommerce Website - Prince's electronics",
      description: "Full-stack e-commerce site with React, Node.js, Express, JWT auth, product management, deployed on Vercel.",
      links: [
        "https://github.com/Princedoriya/Project_ecommerce_web.git",
        "https://project-ecommerce-web01.vercel.app/"
      ]
    }
  ],
  work: [],
  links: {
    github: "https://github.com/Princedoriya",
    linkedin: "https://www.linkedin.com/in/prince-doriya-664990320",
    portfolio: "https://my-portfolio-livid-ten-99.vercel.app/"
  }
};
console.log("MONGO_URI:", process.env.MONGO_URI);


mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding");
    await Profile.deleteMany({});
    await Profile.create(seedProfile);
    console.log("Seeded profile for Prince Doriya");
    process.exit(0);
  })
  .catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
