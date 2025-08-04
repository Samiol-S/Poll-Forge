# 🗳️ Berry's PollForge
## 🚀 Summary 
Poll-Forge is a full-stack polling platform designed for seamless group engagement. It enables authenticated users to create customized polls, vote, comment, and personalize their avatars — all within an intuitive, modern interface powered by Svelte and Supabase.

## ⚙️ Tech Stack
- Svelte (javascript framework) & SvelteKit (full-stack web application framework built on top of Svelte) (with SSR and custom API endpoints)
- Supabase (PostgreSQL)
- Bootstrap 5 



## ✨ Features
- Register/Login system with a custom Authentication system 
- Passwords are hashed using **bcrypt** before storing
- **JWTs (JSON Web Tokens)** are used to manage user sessions securely
- Role-based access to protect poll deleting/creation features
- Create and vote in custom polls
- Comment system under each poll for interaction
- Choose or update a custom avatar
- Fully responsive design for all screen sizes (mobile, tablet, desktop)
- Server-Side Rendering (SSR) with SvelteKit
- Dynamic page loading with `+page.server.js`using `load` functions
- Custom backend API routes implemented in src/routes/api/+server.js
- Deployment on Cloudflare Pages



## 📚 About the Project
This is my first full-stack web application, built entirely by me as a custom polling platform for my friend group. What started as a simple idea turned into a deep learning experience in full-stack development. The app includes user authentication with secure password handling, poll creation and voting, avatar customization, and a comment system for interaction.
Through this project, I gained hands-on experience with frontend and backend logic, database integration using Supabase, and deployment with Cloudflare Pages. It reflects both my technical progress and my commitment to continuous learning and building practical solutions.



## 🌐 Live Demo
[https://poll-forge.pages.dev](https://poll-forge.pages.dev)

## 📝 Notes
This is a personal learning project. I built everything myself and learned a lot about full-stack workflows, handling authentication, deploying live projects, and working with databases.
