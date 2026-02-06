# Attendance Management System

A modern, scalable attendance management system built with Next.js 14, TypeScript, and Ant Design.

## 🚀 Features

- **Session-based Authentication** - Secure login/register without client-side token storage
- **Employee Management** - CRUD operations for employee profiles
- **Face Registration** - Upload and store employee face photos for verification
- **Attendance Tracking** - Punch in/out with face verification and geolocation
- **Monthly Reports** - Comprehensive attendance reports with statistics
- **Role-based Access** - Admin, HR, and Employee roles
- **Responsive Design** - Mobile-friendly UI using Ant Design

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on http://localhost:5000

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd attendance-management
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                        # Next.js 14 App Router
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── employees/
│   │   ├── attendance/
│   │   └── profile/
│   ├── layout.tsx
│   └── page.tsx
├── components/                 # React components
│   ├── auth/
│   ├── employee/
│   ├── attendance/
│   ├── upload/
│   ├── layout/
│   └── shared/
├── lib/                        # Core utilities
│   ├── api/                    # API client & interceptors
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── utils/                  # Helper functions
├── services/                   # API service layer
│   ├── auth.service.ts
│   ├── employee.service.ts
│   ├── attendance.service.ts
│   └── upload.service.ts
└── store/                      # Zustand state management
    ├── authStore.ts
    ├── employeeStore.ts
    └── attendanceStore.ts
```

## 🔑 Authentication

This system uses **session-based authentication**:
- No JWT tokens stored on client
- Session managed by backend cookies
- Automatic redirect on 401 (session expiry)
- `withCredentials: true` in axios config

## 📡 API Integration

All API calls go through `src/lib/api/client.ts`:
```typescript
import { apiClient } from '@/lib/api/client';

// Automatically handles session cookies
const response = await apiClient.get('/api/Employee');
```

## 🧩 Key Files

- **API Client**: `src/lib/api/client.ts`
- **API Endpoints**: `src/lib/api/endpoints.ts`
- **Types**: `src/lib/types/*.types.ts`
- **Services**: `src/services/*.service.ts`
- **Hooks**: `src/lib/hooks/*.ts`
- **Middleware**: `src/middleware.ts`

## 🎨 UI Components

Built with Ant Design components:
- Forms (Login, Register, Employee, Attendance)
- Tables (Employee list, Attendance reports)
- Upload (Face photo upload, Camera capture)
- Layout (Sidebar, Header, Breadcrumb)

## 📊 State Management

Using Zustand for state management:
- `authStore` - User authentication state
- `employeeStore` - Employee data cache
- `attendanceStore` - Attendance records cache

## 🔒 Route Protection

Protected routes in `(dashboard)` group automatically check session validity via middleware and API interceptors.

## 🚀 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 👥 Team

- Backend API: [Your Backend Team]
- Frontend: [Your Frontend Team]

## 🐛 Troubleshooting

### Session expires immediately
- Check CORS settings on backend
- Ensure `withCredentials: true` in axios config
- Verify backend sends session cookies

### Face upload fails
- Check file size (max 5MB)
- Ensure file type is image/*
- Verify multipart/form-data headers

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall
- Check Node.js version (18+)