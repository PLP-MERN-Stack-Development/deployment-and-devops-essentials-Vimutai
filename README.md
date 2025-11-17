# 💰 Budget Planner – Enyan Market Edition 🇰🇪

A full-stack MERN budget planning application with authentic Kenyan flavor! Track your shillings, manage matumizi, and plan your finances like a pro.

## 🌟 Features

- ✅ Add income and expense transactions
- 📊 Visual dashboard with KPI cards
- 🥧 Category breakdown with pie charts
- 💵 KES currency formatting
- 🇰🇪 Kenyan categories (Gikomba, Matatu, Boda-boda, Mama Mboga, etc.)
- 📱 Mobile-responsive design
- 🔄 Real-time balance calculation
- 🗑️ Delete transactions
- 🎨 Clean, modern UI with Tailwind CSS

## 🛠️ Tech Stack

**Backend:**

- Node.js & Express
- MongoDB Atlas with Mongoose
- Helmet (security)
- Morgan & Winston (logging)
- CORS enabled

**Frontend:**

- React 18 with Vite
- Tailwind CSS
- Recharts for visualizations
- Axios for API calls
- Lucide React icons

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works!)
- Git installed

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

## 🌍 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/budget_planner
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Deploy Backend to Render

1. Create account on [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Name:** budget-planner-api
   - **Root Directory:** server
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-frontend.vercel.app`
6. Click "Create Web Service"

### Deploy Frontend to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to client folder: `cd client`
3. Run: `vercel`
4. Follow prompts
5. Set environment variable:

```bash
   vercel env add VITE_API_URL production
   # Enter: https://your-backend.render.com/api
```

6. Redeploy: `vercel --prod`

**Alternative: Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Set Root Directory to `client`
4. Add environment variable `VITE_API_URL`
5. Deploy!

## 📡 API Endpoints
