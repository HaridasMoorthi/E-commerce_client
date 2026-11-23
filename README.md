# ⚜️ OLD MONEY | Wear Your Legacy
### Production-Grade Old Money Menswear E-Commerce Platform & Atelier Studio

A full-stack, enterprise-grade luxury menswear e-commerce platform built with **React 18 + TypeScript + Vite + Tailwind CSS** on the frontend, and a production **Django 5 REST Framework + PostgreSQL + JWT Authentication** backend.

---

## 🏛️ Platform Highlights (Pure Old Money Menswear)

> **Important**: This platform is exclusively dedicated to **100% Pure Menswear Tailoring & Quiet Luxury** (no womenswear).

- **Sartorial Menswear Catalog**:
  - **Suits & Tuxedos**: Hand-tailored Savile Row Super 150s Wool Tuxedos, Double-Breasted Dinner Suits, Italian Silk Velvet Peak-Lapel Dinner Jackets.
  - **Shirts & Polos**: Extra-long staple Egyptian Giza Cotton French-Cuff Shirts, Cutaway Collar Poplin Shirts, Biella 18-gauge Silk-Cotton Knitted Polos.
  - **Trousers & Chinos**: High-waisted British Wool Flannel Gurkha Trousers with extended crossover brass buckles and 2-inch cuffed turn-ups.
  - **Knitwear & Sweaters**: Two-ply Grade-A Mongolian Cashmere rope cable-knits, Scottish Cashmere Chesterfield Overcoats with velvet top collars.
  - **Fine Footwear**: Goodyear-welted oak bark leather penny loafers with hand-burnished patina.
- **Enterprise 13-Module Admin Studio**:
  - Smooth Bézier sales revenue curves (no crude bar charts).
  - Bulk markdown engine, product inventory matrices, live order management, real-time CMS content/banner editors, and coupon controls.
- **Master-Detail Live Shipment Tracking**:
  - **Authenticated Access Only**: Protected by a security gateway. Only authenticated clients and store administrators can access the tracker and view orders.
  - **Order Selection List**: Browse all placed orders with client name, city, garment thumbnails, and live transit status badges. Track each order separately with a single click.
  - **5-Stage Milestone Progress Stepper**: Order Placed ➔ Atelier Quality Inspection ➔ Dispatched from Heritage Hub ➔ Out for Delivery ➔ Signature Handover.
  - **Air Logistics & Real-Time GPS Sync**: Blue Dart Priority Air Express with copyable Air Waybills (AWBs).
- **PostgreSQL Database & JWT Authentication**:
  - Fully normalized database schema for users, products, orders, order items, and shipping addresses.
  - SimpleJWT authentication with access tokens and refresh tokens.

---

## 🛠️ Tech Stack & Architecture

| Tier | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons |
| **Backend API** | Python 3.10+, Django 5.x, Django REST Framework (DRF), SimpleJWT |
| **Database** | PostgreSQL 14+ (Local database: `oldmoney_ecommerce`) |
| **Authentication** | JWT Bearer Authentication + Optional Firebase Google 1-Click Auth |
| **State Management** | React Context API with LocalStorage fallback & PostgreSQL sync |

---

## 📋 System Prerequisites

Ensure you have the following installed on your machine before setup:
1. **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
2. **Python**: v3.10 or higher ([Download Python](https://www.python.org/))
3. **PostgreSQL**: v14.0 or higher ([Download PostgreSQL](https://www.postgresql.org/download/))
4. **Git**: Installed and configured

---

## ⚡ Step-by-Step Local Setup Guide

Follow these steps to get both the frontend and backend running locally.

### Step 1: Clone the Repository

```bash
git clone https://github.com/HaridasMoorthi/E-commerce_client.git
cd E-commerce_client
```

---

### Step 2: PostgreSQL Database Setup

1. Open your PostgreSQL terminal (`psql`) or **pgAdmin**:
   ```sql
   CREATE DATABASE oldmoney_ecommerce;
   ```
2. Verify that your PostgreSQL service is running on `localhost:5432` with user `postgres` (or update `backend/core/settings.py` if your password/user differs).

---

### Step 3: Backend Setup (Django REST API)

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (Command Prompt)**:
     ```cmd
     python -m venv venv
     .\venv\Scripts\activate.bat
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations to PostgreSQL:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Seed sample Old Money orders and users into PostgreSQL:
   ```bash
   python seed_data.py
   ```

6. Start the Django backend server:
   ```bash
   python manage.py runserver 0.0.0.0:8001
   ```
   > The REST API will be live at: **`http://localhost:8001/api/`**

---

### Step 4: Frontend Setup (Vite + React)

1. Open a **new terminal window** in the project root directory (`E-commerce clinet/`).

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   > The storefront will be live at: **`http://localhost:3000/`**

---

## 🔑 Default Credentials & Access Accounts

| Role | Username / Email | Password | Access Rights |
|---|---|---|---|
| **Store Owner / Admin** | `admin@oldmoney.luxury` (or `admin`) | `admin123` | Complete 13-Module Admin Studio, Catalog, Orders, Pricing, CMS |
| **Verified Client** | `harid3837@gmail.com` | `client123` | Storefront, Client Orders, Live GPS Shipment Tracking Dossier |
| **Guest / Public** | *Unauthenticated* | *N/A* | Browse Menswear Catalog, Bag, Wishlist (Tracker gated behind login) |

> 💡 **Quick Demo Access**: On both the **Sign In** page and the **Tracking Gateway**, convenient 1-Click buttons (*Client: Harid* and *Store Admin*) are provided for instant evaluation without typing credentials.

---

## 🌐 API Endpoints Reference (Django REST)

All endpoints accept and return `application/json`:

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/accounts/login/` | Obtain JWT access & refresh tokens | No |
| `POST` | `/api/accounts/register/` | Register new customer account | No |
| `GET` | `/api/accounts/profile/` | Fetch authenticated user profile | Bearer JWT |
| `POST` | `/api/accounts/token/refresh/` | Refresh expired access token | No |
| `GET` | `/api/orders/` | List all orders (Admin gets all, Client gets theirs) | Bearer JWT / Any |
| `POST` | `/api/orders/` | Place and persist a new order to PostgreSQL | Any |
| `GET` | `/api/orders/track/<order_id>/` | Fetch live tracking & waybill for an order | Any |

---

## 📂 Project Directory Structure

```text
E-commerce client/
├── backend/                        # Django REST API & PostgreSQL Backend
│   ├── accounts/                   # Custom User model & JWT authentication
│   ├── core/                       # Django project settings, URLs & WSGI
│   ├── orders/                     # Order model, line items, and tracking views
│   ├── manage.py                   # Django CLI management script
│   ├── requirements.txt            # Python dependencies
│   └── seed_data.py                # Database population script
├── public/                         # Static assets (favicons, official logos)
├── src/                            # Frontend React 18 Application
│   ├── components/
│   │   ├── admin/                  # 13-Module Enterprise Admin Dashboard
│   │   ├── card/                   # ProductCard with image galleries & size selector
│   │   ├── checkout/               # CheckoutModal & OrderSuccessModal
│   │   ├── home/                   # HeroSlider, CategoryShowcase, Spotlight, LuxeEdit
│   │   ├── layout/                 # Header with MegaMenu & Footer
│   │   ├── pdp/                    # ProductDetail page with fabric & tailoring specs
│   │   ├── plp/                    # CatalogPage with FilterSidebar
│   │   └── search/                 # SearchModal with auto-complete
│   ├── context/                    # ECommerceContext state manager & cart totals
│   ├── data/                       # Menswear products, categories, banners, coupons
│   ├── pages/                      # HomePage, CatalogPage, LoginPage, TrackingPage
│   ├── services/                   # backendApi.ts (Axios REST) & firebase.ts
│   ├── types/                      # TypeScript domain models
│   ├── App.tsx                     # Top-level routing and view switcher
│   └── index.css                   # Tailwind CSS root styles
├── .env.example                    # Sample environment variables
├── .gitignore                      # Git exclusion rules
├── package.json                    # Frontend dependencies & npm scripts
├── tailwind.config.js              # Tailwind custom styling & fonts
└── README.md                       # Documentation
```

---

## 🔧 Useful Commands

### Frontend:
```bash
npm run dev        # Launch Vite development server on port 3000
npm run build      # TypeScript validation & production build (dist/)
npm run preview    # Preview production bundle locally
```

### Backend:
```bash
python manage.py runserver 0.0.0.0:8001   # Launch Django server on port 8001
python manage.py makemigrations           # Create migration files
python manage.py migrate                  # Apply migrations to PostgreSQL
python manage.py createsuperuser          # Create a custom superuser
python seed_data.py                       # Populate PostgreSQL with sample orders
```

---

## ❓ Troubleshooting & FAQs

#### 1. PostgreSQL Database Connection Error:
- Verify that PostgreSQL is running:
  - Windows: Open `services.msc` and verify **postgresql-x64-XX** status is *Running*.
  - macOS/Linux: `sudo service postgresql status` or `brew services list`.
- Verify database existence:
  ```bash
  psql -U postgres -c "CREATE DATABASE oldmoney_ecommerce;"
  ```
- If your PostgreSQL password is not blank, edit `DATABASES['default']['PASSWORD']` in `backend/core/settings.py`.

#### 2. Port Conflict (Port 3000 or 8001 in use):
- To run Vite on a different port: `npm run dev -- --port 3001`
- To run Django on a different port: `python manage.py runserver 0.0.0.0:8002` (remember to update `VITE_API_URL` in `.env` if changed).

#### 3. CORS Headers:
- `django-cors-headers` is pre-configured in `backend/core/settings.py` to accept requests from `http://localhost:3000` and all local loopback addresses.

---

## 📜 License & Copyright

© 2026 **OLD MONEY ATELIER**. Wear Your Legacy. All rights reserved. Built for private bespoke distribution.
