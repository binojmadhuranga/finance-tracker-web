# 💰 Finance Tracker Web

A modern **AI-Integrated Personal Finance Tracking** web application built with **Next.js 16**, **Redux Toolkit**, and **TailwindCSS**.  
This frontend allows users to manage income, expenses, categories, and view financial summaries through a clean, responsive, and secure UI.

---

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT tokens
- 💼 **Transaction Management** - Add, edit, delete income & expenses
- 📊 **Financial Dashboard** - Monthly summaries and insights
- 🎨 **Modern UI/UX** - Dark blue/black theme with glass-morphism effects
- 🔒 **Protected Routes** - Middleware-based route protection
- ⚡ **Redux State Management** - Centralized state with Redux Toolkit
- 📱 **Fully Responsive** - Works seamlessly on all devices

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **State Management:** Redux Toolkit, React-Redux
- **Styling:** TailwindCSS 4
- **Language:** TypeScript
- **API Integration:** Fetch API with custom client
- **Authentication:** JWT tokens with httpOnly cookies

---

## 📁 Current Folder Structure

```
finance-tracker-web/
├── app/
│   ├── (auth)/                    # Authentication routes (grouped)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Register page
│   │
│   ├── (dashboard)/               # Dashboard routes (grouped, protected)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   └── transactions/
│   │       └── page.tsx          # Transactions page
│   │
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page (home)
│   └── providers.tsx             # Redux Provider wrapper
│
├── components/
│   ├── Footer.tsx                # Footer component
│   └── Navbar.tsx                # Navigation bar component
│
├── services/
│   ├── apiClient.ts              # Base API client with fetch wrapper
│   └── authService.ts            # Authentication API service
│
├── store/
│   ├── authSlice.ts              # Auth Redux slice with thunks
│   ├── authTypes.ts              # TypeScript types for auth
│   ├── hooks.ts                  # Typed Redux hooks
│   └── index.ts                  # Redux store configuration
│
├── public/
│   └── icon.png                  # App favicon
│
├── middleware.ts                 # Next.js middleware for route protection
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── .env.local                    # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn/pnpm
- **Backend API** running on `http://localhost:5000`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd finance-tracker-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://127.0.0.1:5050
   ```

---

## 📖 Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard
- `/transactions` - Transaction management

---

## 🔌 API Endpoints

The application connects to the following backend endpoints:

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login

### Transactions (Coming Soon)
- **GET** `/api/transactions` - Get all transactions
- **POST** `/api/transactions` - Create transaction
- **PUT** `/api/transactions/:id` - Update transaction
- **DELETE** `/api/transactions/:id` - Delete transaction

---

## 🎨 Design System

### Color Palette
- **Primary:** Dark Blue (`#1e40af`, `#3b82f6`)
- **Background:** Slate/Black gradients (`#0f172a`, `#1e3a8a`)
- **Text:** White/Slate shades
- **Accent:** Blue-500 for buttons and links

### Key UI Components
- Glass-morphism cards with backdrop blur
- Smooth hover animations and transitions
- Loading spinners for async operations
- Error message displays with proper styling

---

## 📦 Scripts

```bash
npm run dev      # Start development server on port 5050
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔐 Authentication Flow

1. User registers via `/register` page
2. User data sent to backend API
3. User redirected to `/login` after successful registration
4. User logs in via `/login` page
5. JWT token received and stored in:
   - Redux store (in-memory)
   - Browser cookie (for middleware checks)
6. Protected routes accessible via middleware validation
7. User can access dashboard and other protected pages

---

## 🛡️ Security Features

- JWT token-based authentication
- HTTP-only cookie storage
- Middleware route protection
- Input validation
- Error handling with user-friendly messages

---

## 🚧 Roadmap

- [ ] Complete dashboard with charts
- [ ] Transaction CRUD operations
- [ ] Category management
- [ ] Monthly reports and analytics
- [ ] Export data to CSV/PDF
- [ ] Dark/Light mode toggle
- [ ] Multi-language support

---

## 👨‍💻 Development

### Code Structure
- **App Router:** Next.js 13+ App Router with route groups
- **State Management:** Redux Toolkit with async thunks
- **Type Safety:** Full TypeScript coverage
- **Styling:** Utility-first with TailwindCSS
- **API Layer:** Centralized service layer with error handling

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please reach out to [your-email@example.com]

---

**Built with ❤️ using Next.js and Redux Toolkit**
## 📁 Current Folder Structure

```
finance-tracker-web/
├── app/
│   ├── (auth)/                    # Authentication routes (grouped)
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Register page
│   │
│   ├── (dashboard)/               # Dashboard routes (grouped, protected)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   └── transactions/
│   │       └── page.tsx          # Transactions page
│   │
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page (home)
│   └── providers.tsx             # Redux Provider wrapper
│
├── components/
│   ├── Footer.tsx                # Footer component
│   └── Navbar.tsx                # Navigation bar component
│
├── services/
│   ├── apiClient.ts              # Base API client with fetch wrapper
│   └── authService.ts            # Authentication API service
│
├── store/
│   ├── authSlice.ts              # Auth Redux slice with thunks
│   ├── authTypes.ts              # TypeScript types for auth
│   ├── hooks.ts                  # Typed Redux hooks
│   └── index.ts                  # Redux store configuration
│
├── public/
│   └── icon.png                  # App favicon
│
├── middleware.ts                 # Next.js middleware for route protection
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── .env.local                    # Environment variables
```
│   ├── auth.ts
│   ├── constants.ts
│   └── helpers.ts
│
├── types/
│   ├── user.ts
│   ├── transaction.ts
│   └── category.ts
│
├── utils/
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── validators.ts
│
└── middleware.ts


---

## 📦 Installation

```bash
git clone https://github.com/binojmadhuranga/finance-tracker-web
cd finance-tracker-web
npm install
npm run dev
