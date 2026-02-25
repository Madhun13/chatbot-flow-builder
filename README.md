# chatbot-flow-builder

A visual drag-and-drop tool to design chatbot conversation flows using nodes and connections. This project provides an interactive canvas where users can create, edit, and manage chatbot message sequences with real-time updates.

---

## 🚀 Live Demo

🔗 **Deployed on Vercel:**
👉 https://chatbot-flow-builder-ten-blue.vercel.app/

---

## ✨ Features

* 🧩 Drag & Drop chatbot nodes onto the canvas
* 🔗 Connect nodes to define conversation flow
* ⚙️ Dynamic settings panel to edit node content
* 🗂️ Visual flow management
* ⚡ Real-time updates with smooth performance
* 🎨 Clean and minimal UI

---

## 🛠️ Tech Stack

* **Frontend:** React 18 + TypeScript
* **Flow Library:** React Flow
* **Build Tool:** Vite
* **Icons:** Lucide React
* **Styling:** CSS

---

## 📁 Project Structure

```
chatbot-flow-builder/
│── src/
│   ├── components/
│   │   ├── NodesPanel.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── TopBar.tsx
│   │
│   ├── hooks/
│   │   └── useFlowBuilder.ts
│   │
│   ├── nodes/
│   │   └── TextMessageNode.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── flowUtils.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Madhun13/chatbot-flow-builder.git
cd chatbot-flow-builder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 📦 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build production         |
| `npm run preview` | Preview production build |

---

## 🧠 How It Works

1. Drag a **Text Message Node** from the panel to the canvas.
2. Connect nodes to create chatbot conversation paths.
3. Select a node to edit its message in the settings panel.
4. Flow updates instantly.

---

## ☁️ Deployment (Vercel)

This project is deployed using **Vercel**.

To deploy yourself:

```bash
npm run build
```

Then upload the project to Vercel or connect your GitHub repository for automatic deployments.


---

## 📄 License

This project is for educational purpose
---

## 👨‍💻 Author

Made with ❤️ for building chatbot workflows visually.

##Questions? Contact: [nainmadhu1316@email.com]

