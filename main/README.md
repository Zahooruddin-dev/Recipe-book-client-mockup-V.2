# Deliciously Anna – Recipe Hub

A cozy, food-blog inspired recipe hub built with **React (Vite)** and **Vanilla CSS**.  
This project is designed to be lightweight yet feature-rich, showcasing recipes, favorites, and even an admin demo panel.

---

## 🚀 Tech Stack
- **React JS (Vite)**
- **Vanilla CSS (index.css only)**
- **LocalStorage** for persistence
- **jsPDF** for PDF generation

---

## 📂 Project Structure
```
Deliciously-Anna-RecipeHub/
├── index.html
├── src/
│   ├── App.jsx        # All components and logic in a single file
│   ├── index.css      # Styling (mobile-first, responsive)
│   └── main.jsx       # ReactDOM entry
├── package.json
└── README.md
```

---

## ✨ Features
1. **Homepage**
   - Cozy welcome note with Anna’s branding.
   - Featured recipes section (grid/carousel).
   - Hero banner with short intro.

2. **Recipe Library**
   - Responsive grid/list toggle view.
   - Search bar (by name).
   - Category filter (Breakfast, Dinner, Desserts, Snacks, Drinks).
   - Sorting options (newest, popularity).

3. **Recipe Detail Page**
   - Hero image.
   - Ingredients checklist.
   - Step-by-step instructions.
   - Mobile/desktop responsive layout.
   - Download recipe as PDF.

4. **Favorites**
   - Save recipes to favorites (stored in localStorage).
   - Favorites page to view all saved recipes.
   - Download all favorites as one PDF.

5. **Admin Demo Panel**
   - Hardcoded login.
   - Add, edit, delete recipes.
   - State-based persistence (localStorage optional).

6. **Design**
   - Cozy food-blog style with warm colors.
   - Mobile-first responsive CSS grid system.
   - Smooth transitions and sticky header.

---

## 🔧 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/zahooruddin-dev/deliciously-anna-recipe-hub.git

cd deliciously-anna-recipe-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 👩‍🍳 Author
Created by [zahooruddin-dev](https://github.com/zahooruddin-dev) ❤️  
Inspired by the love of food and sharing recipes.

---

## 📜 License
MIT License – feel free to use, modify, and share!
