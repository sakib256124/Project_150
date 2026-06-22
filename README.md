# Bank Management System

A full-stack educational bank management project built with HTML, CSS, JavaScript, Node.js, and Express.

## Included features

- Administrator login
- Dashboard with totals and recent activity
- Customer account creation, search, edit, and deletion
- Deposit, withdrawal, and account-to-account transfer
- Bill payment
- Transaction-history filtering
- Freeze/unfreeze account controls that block banking operations
- Customer PIN change with current-PIN verification
- Reports dashboard with low-balance monitoring and CSV export
- Persistent JSON-file storage (no database server required)
- Responsive interface for desktop and mobile

## Project structure

```text
PROJECT_150/
├── frontend/
│   ├── index.html, styles.css
│   └── js/
│       ├── features/         # deposit, withdraw, transfer, payment, accounts, history
│       └── views/            # separate page UI modules
├── backend/
│   ├── data/database.json    # Demo data; changes are saved here
│   ├── routes/               # Separate API route per banking feature
│   ├── lib/                  # Database, validation, and HTTP helpers
│   ├── server.js             # API dispatcher and static-file server
│   └── package.json
├── Bank-management-system/   # Previous frontend version (kept as reference)
└── BankManagement.cpp        # Previous C++ source (kept as reference)
```

## Run the project

Open a terminal in the project root, then run:

```powershell
npm start
```

You can also run `node server.js` directly from the project root. The root entry point starts `backend/server.js` for you.

Open **http://localhost:5000** in your browser. The backend serves the frontend automatically, so no second server is needed.

No `npm install` is needed: the backend uses only Node.js built-in modules.

## Demo administrator account

- Email: `admin@bank.local`
- Password: `admin123`

## Demo customer PINs

- `ACC-1001` → `1234`
- `ACC-1002` → `5678`

## Important note

This is a learning project, not production banking software. Passwords and PINs are intentionally stored in the JSON file for simplicity. A real application needs hashed credentials, authentication tokens, role-based authorization, a real database, validation/rate limits, audit logs, HTTPS, and security review.
