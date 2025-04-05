#### 💙 VitalLog - Health Metric Logger

VitalLog is a full-stack web application that helps users **log and monitor key health metrics** like **weight**, **blood pressure**, and **blood sugar**. It features an intuitive dashboard, date-based filters, and a clean UI built with React and Tailwind CSS, backed by Django REST Framework and JWT authentication.

---

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend:** Django, Django REST Framework, JWT Auth

---

## ✨ Features(CRUD Operations)
- User registration & secure login
- Add/edit/delete health readings
- Filter logs by 30-day date range
- Sort and view logs by metric type
- Tailwind-powered responsive dashboard
---
## Advanced Filtering & Summary

Filter metrics by type (e.g., Weight, Blood Pressure)
Filter by custom date ranges (e.g., Last 30 days)
Sort capabilities (e.g., by recorded date)
Prominent display of latest readings and summaries

---
## Responsive Design
Mobile-friendly interface
Consistent experience across various screen sizes

---

## 🛠️ Getting Started

### 🔁 Clone the Repo
```bash
git clone https://github.com/druvath-09/VitalLog.git
cd VitalLog

---

## 🧱 Tech Stack
##  🖥 Frontend
- React
- Tailwind CSS
- Axios
- React Router
---
## ⚙️ Backend
- Django
- Django REST Framework
- SQLite3 (Default DB)
- JWT Authentication
---
##  📦 API Endpoints
- `POST /api/register/` - Register a new user  
- `POST /api/token/` - Get JWT access & refresh tokens  
- `GET /api/metrics/` - List all metrics for the user  
- `POST /api/metrics/` - Create new health metric  
- `PUT /api/metrics/:id/` - Update metric  
- `DELETE /api/metrics/:id/` - Delete metric  

---
## 🧪 Setup & Installation

### Backend Setup (Django)

```bash
cd vitallog_backend
python -m venv env
source env/bin/activate  # macOS/Linux
# env\Scripts\activate    # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

---

## Front-End Setup
cd vitallog-frontend
npm install
npm start

## 🔒 Environment Variables
Create a .env file inside vitallog-frontend/:

REACT_APP_API_URL=http://localhost:8000/api


## 🗂️ Project Structure
VitalLog/
│
├── vitallog-frontend/       # React Frontend
│   ├── Node modules/ 
│   ├── src/
        └── Api
        ├── Components
│   ├── public/
│   └── ...
│
├── vitallog_backend/        # Django Backend
│   ├── metrics/
│   ├── vitallog_backend/
│   ├── node modules
│   └── ...
│
└── README.md

---

## 👨‍💻 Author
Druvath Kumar
GitHub: @druvath-09

📄 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this software in both personal and commercial projects, provided that the original copyright and license notice are included.
