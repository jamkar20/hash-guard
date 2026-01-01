# 🔐 HashGuard

**HashGuard** is a lightweight, fast, and cross-platform **File Integrity Checker** built with **Rust** and **Tauri**.

It allows users to compute secure file hashes and verify whether files have been modified or tampered with.

---

## ✨ Features

- 📂 Select files from the operating system
- 🔑 Secure **SHA-256** hash computation
- ⚡ High performance powered by Rust
- 🖥️ Modern desktop UI (React + Tailwind CSS)
- 🧩 Cross-platform support (Windows, Linux, macOS)
- 🔒 Fully local — no network or cloud usage

---

## 🧠 Why HashGuard?

File integrity verification is a core concept in:

- Security auditing
- Malware detection
- Software authenticity validation
- Digital forensics

HashGuard focuses on **simplicity, security, and transparency**, making it ideal as both a practical tool and a portfolio project.

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | 🦀 Rust |
| Desktop Framework | Tauri |
| Frontend | ⚛️ React |
| Styling | Tailwind CSS |
| Cryptography | SHA-256 (`sha2` crate) |

---

## 🧱 Architecture Overview

```
React UI
   ↓ (invoke)
Tauri Command
   ↓
Rust Backend
   ↓
SHA-256 Hash
```

- All cryptographic operations are handled in the **Rust backend**
- The frontend never accesses files or crypto directly

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/hashguard.git
cd hashguard
```

### 2️⃣ Install frontend dependencies
```bash
npm install
```

### 3️⃣ Run in development mode
```bash
npm run tauri dev
```

---

## 🧪 Usage

1. Launch the application
2. Click **Select File**
3. Choose a file from your system
4. Click **Compute Hash**
5. The SHA-256 hash will be displayed

---

## 🔒 Security Notes

- ✔ Uses a secure cryptographic hash algorithm (SHA-256)
- ✔ Streams file data (memory-safe)
- ✔ No sensitive data is stored or transmitted
- ✔ No unnecessary system permissions

> HashGuard is **not** a password manager and does not store credentials.

---

## 📸 Screenshots

_Add screenshots here_

---

## 🧩 Roadmap / Possible Enhancements

## 🛣 Roadmap

- [x] ~~Initial project structure~~
- [x] ~~Tauri + Rust backend setup~~
- [x] ~~React frontend with modern UI~~
- [x] ~~File hashing engine (SHA-256)~~
- [ ] Integrity report import/export (JSON / txt)
- [ ] Tray mode support
- [ ] Cross-platform testing (Windows / Linux / macOS)
- [ ] Code signing for production builds
---

## 📄 License

MIT License  
Free to use, modify, and distribute.

---

## 👨‍💻 Author

**Jamal Kargar**  
Backend & Security Engineer  


---


