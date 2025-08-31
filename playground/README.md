# Prince Doriya Portfolio

Full-stack portfolio website with Next.js frontend and Express.js backend.

## Architecture
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, MongoDB, Mongoose
- **Features**: Profile, Skills, Projects sections with API integration

## Local Setup
1. **Backend**:
   ```bash
   cd playground/backend
   npm install
   # Create .env with MONGO_URI
   npm run seed
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd playground/frontend
   npm install
   npm run dev
   ```

## Production
- Backend: Deploy to Render with MongoDB Atlas
- Frontend: Deploy to Vercel

## Database Schema
Profile model with name, email, education, skills, projects, work, links.

## Sample API
- `GET /profile?email=...` - Get profile
- `GET /projects?skill=...` - Filter projects
- `GET /projects/skills/top` - Top skills

## Known Limitations
- No auth, pagination, rate limiting
- Basic error handling

## Resume
[View Resume](https://drive.google.com/file/d/13APmEB-Wh0o1ETr__STmBVircuoa5gUI/view?usp=drivesdk)
