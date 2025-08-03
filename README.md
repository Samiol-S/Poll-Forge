# 🗳️ Berry's PollForge

## ⚙️ Tech Stack
- Svelte & SvelteKit
- Supabase (PostgreSQL)
- Bootstrap

## 📚 About the Project
This is my first full-stack web application, created entirely by me. I built it as a custom polling platform for my friend group, but it turned into a deeper learning experience in full-stack development. It includes user authentication, poll creation and voting, avatar customization, and a comment system. The project helped me understand the full development cycle — from frontend and backend logic to database integration and deployment. It reflects both my technical progress and my commitment to continuous learning.

## ✨ Features
- Register/Login system with a custom Authentication system 
- Passwords are hashed using **bcrypt** before storing
- **JWTs (JSON Web Tokens)** are used to manage user sessions securely
- Role-based access to protect poll deleting/creation features
- Create and vote in custom polls
- Comment system under each poll
- Choose or update a custom avatar
- Secure backend with role-based access
- Fully responsive design for all screen sizes (mobile, tablet, desktop)
- Server-Side Rendering (SSR) with SvelteKit
-  Dynamic page loading with `+page.server.js`using `load` functions



## 🌐 Live Demo
[https://poll-forge.pages.dev](https://poll-forge.pages.dev)

## 📝 Notes
This is a personal learning project. I built everything myself and learned a lot about full-stack workflows, handling authentication, deploying live projects, and working with databases.
