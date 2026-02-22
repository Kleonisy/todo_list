# Todo List Application

### 📁 Organized Structure
```
src/
├── features/         # Feature modules (todos)
├── shared/           # Possible reusable logic
└── App.tsx
```

## 🛠️ Technology Stack

- **Build Tool**: Vite
- **Language**: TypeScript
- **Framework**: React 19
- **State Management**: Redux Toolkit with typed hooks
- **Styling**: CSS Modules
- **Code Quality**: Biome
- **Persistence**: localStorage service layer

## 🚦 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173/
```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Code Quality

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
```
