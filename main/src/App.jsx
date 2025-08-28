// App.jsx
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

// Sample initial recipes
const initialRecipes = [
  {
    id: 1,
    title: "Blueberry Pancakes",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Breakfast",
    ingredients: [
      "1 cup all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1 cup milk",
      "1 large egg",
      "2 tablespoons melted butter",
      "1 cup fresh blueberries"
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, beat the egg, then add milk and melted butter.",
      "Pour wet ingredients into dry ingredients and stir until combined.",
      "Gently fold in blueberries.",
      "Heat a lightly oiled griddle over medium heat.",
      "Pour batter onto griddle and cook until bubbles form and edges are dry.",
      "Flip and cook until browned on the other side."
    ],
    popularity: 8,
    date: "2023-10-15"
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Dinner",
    ingredients: [
      "8 oz pasta",
      "2 tablespoons olive oil",
      "3 cloves garlic, minced",
      "16 oz mushrooms, sliced",
      "1 cup heavy cream",
      "1/2 cup grated Parmesan",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook pasta according to package instructions.",
      "Heat olive oil in a large skillet over medium heat.",
      "Add garlic and cook until fragrant, about 1 minute.",
      "Add mushrooms and cook until softened and browned.",
      "Pour in heavy cream and bring to a simmer.",
      "Stir in Parmesan until melted and sauce has thickened.",
      "Season with salt and pepper.",
      "Toss with cooked pasta and garnish with parsley."
    ],
    popularity: 9,
    date: "2023-11-02"
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Desserts",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, whisk together flour, baking soda, and salt.",
      "In a large bowl, beat butter and sugars until creamy.",
      "Beat in eggs and vanilla until smooth.",
      "Gradually beat in flour mixture.",
      "Stir in chocolate chips.",
      "Drop by rounded tablespoon onto ungreased baking sheets.",
      "Bake for 9-11 minutes or until golden brown."
    ],
    popularity: 10,
    date: "2023-09-20"
  },
  {
    id: 4,
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Breakfast",
    ingredients: [
      "2 slices bread",
      "1 ripe avocado",
      "1 tablespoon lemon juice",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "2 eggs (optional)",
      "Microgreens for garnish"
    ],
    instructions: [
      "Toast bread to desired crispness.",
      "Cut avocado in half, remove pit, and scoop flesh into a bowl.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread avocado mixture on toast.",
      "Optional: Top with fried or poached eggs.",
      "Sprinkle with red pepper flakes and microgreens."
    ],
    popularity: 7,
    date: "2023-10-28"
  },
  {
    id: 5,
    title: "Berry Smoothie",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Drinks",
    ingredients: [
      "1 cup mixed berries (fresh or frozen)",
      "1 banana",
      "1 cup milk or plant-based alternative",
      "1/2 cup yogurt",
      "1 tablespoon honey or maple syrup",
      "1 tablespoon chia seeds (optional)"
    ],
    instructions: [
      "Add all ingredients to a blender.",
      "Blend until smooth and creamy.",
      "Adjust sweetness to taste.",
      "Pour into glasses and serve immediately."
    ],
    popularity: 6,
    date: "2023-11-05"
  },
  {
    id: 6,
    title: "Veggie Spring Rolls",
    image: "https://images.unsplash.com/photo-1584269600519-1127833a92e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80",
    category: "Snacks",
    ingredients: [
      "12 rice paper wrappers",
      "2 oz rice vermicelli noodles",
      "1 carrot, julienned",
      "1 cucumber, julienned",
      "1 bell pepper, julienned",
      "1 avocado, sliced",
      "Fresh mint and cilantro leaves",
      "Water for dipping"
    ],
    instructions: [
      "Cook rice noodles according to package instructions, then drain.",
      "Prepare all vegetables and herbs.",
      "Dip a rice paper wrapper in warm water for 5-10 seconds until pliable.",
      "Lay wrapper on a clean surface.",
      "Add a small amount of noodles and vegetables in the center.",
      "Fold sides over filling, then roll tightly.",
      "Repeat with remaining wrappers and filling.",
      "Serve with peanut or hoisin dipping sauce."
    ],
    popularity: 8,
    date: "2023-10-10"
  }
];

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('home'); // home, recipes, recipe-detail, favorites, admin, login
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [gridView, setGridView] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    image: '',
    category: 'Breakfast',
    ingredients: [''],
    instructions: ['']
  });
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize data from localStorage
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    const storedFavorites = localStorage.getItem('favorites');
    
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    } else {
      setRecipes(initialRecipes);
      localStorage.setItem('recipes', JSON.stringify(initialRecipes));
    }
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }, []);

  // Update localStorage when recipes or favorites change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || recipe.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.popularity - a.popularity;
      }
    });

  // Toggle favorite
  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter(id => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
  };

  // View recipe details
  const viewRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setView('recipe-detail');
  };

  // Generate PDF for a single recipe
  const generateRecipePDF = (recipe) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(139, 0, 0);
    doc.text(recipe.title, 105, 20, { align: 'center' });
    
    // Category and date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`${recipe.category} • ${recipe.date}`, 105, 28, { align: 'center' });
    
    // Image (if available)
    if (recipe.image) {
      try {
        doc.addImage(recipe.image, 'JPEG', 15, 35, 180, 100);
      } catch (e) {
        console.error("Error adding image to PDF:", e);
      }
    }
    
    // Ingredients
    doc.setFontSize(16);
    doc.setTextColor(139, 0, 0);
    doc.text('Ingredients', 20, 150);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 160;
    recipe.ingredients.forEach(ingredient => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text('• ' + ingredient, 20, yPosition);
      yPosition += 7;
    });
    
    // Instructions
    yPosition += 10;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.setTextColor(139, 0, 0);
    doc.text('Instructions', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    recipe.instructions.forEach((step, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${index + 1}. ${step}`, 20, yPosition);
      yPosition += 7;
    });
    
    doc.save(`${recipe.title.replace(/\s+/g, '_')}.pdf`);
  };

  // Generate PDF for all favorites
  const generateFavoritesPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    
    doc.setFontSize(24);
    doc.setTextColor(139, 0, 0);
    doc.text('My Favorite Recipes', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    
    favorites.forEach(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (!recipe) return;
      
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(recipe.title, 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`${recipe.category} • ${recipe.date}`, 20, yPosition);
      yPosition += 15;
    });
    
    doc.save('My_Favorite_Recipes.pdf');
  };

  // Admin login
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (username === 'admin' && password === 'password') {
      setAdminLoggedIn(true);
      setView('admin');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin/password');
    }
  };

  // Admin logout
  const handleLogout = () => {
    setAdminLoggedIn(false);
    setView('home');
  };

  // Add ingredient field
  const addIngredient = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, '']
    });
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    if (newRecipe.ingredients.length <= 1) return;
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients.splice(index, 1);
    setNewRecipe({
      ...newRecipe,
      ingredients: updatedIngredients
    });
  };

  // Handle ingredient change
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index] = value;
    setNewRecipe({
      ...newRecipe,
      ingredients: updatedIngredients
    });
  };

  // Add instruction field
  const addInstruction = () => {
    setNewRecipe({
      ...newRecipe,
      instructions: [...newRecipe.instructions, '']
    });
  };

  // Remove instruction field
  const removeInstruction = (index) => {
    if (newRecipe.instructions.length <= 1) return;
    const updatedInstructions = [...newRecipe.instructions];
    updatedInstructions.splice(index, 1);
    setNewRecipe({
      ...newRecipe,
      instructions: updatedInstructions
    });
  };

  // Handle instruction change
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...newRecipe.instructions];
    updatedInstructions[index] = value;
    setNewRecipe({
      ...newRecipe,
      instructions: updatedInstructions
    });
  };

  // Handle form submission for new recipe
  const handleRecipeSubmit = (e) => {
    e.preventDefault();
    
    const recipeData = {
      ...newRecipe,
      id: isEditing ? newRecipe.id : Date.now(),
      popularity: isEditing ? newRecipe.popularity : 0,
      date: isEditing ? newRecipe.date : new Date().toISOString().split('T')[0]
    };
    
    if (isEditing) {
      setRecipes(recipes.map(recipe => 
        recipe.id === newRecipe.id ? recipeData : recipe
      ));
    } else {
      setRecipes([...recipes, recipeData]);
    }
    
    // Reset form
    setNewRecipe({
      title: '',
      image: '',
      category: 'Breakfast',
      ingredients: [''],
      instructions: ['']
    });
    
    setIsEditing(false);
    setView('recipes');
  };

  // Edit recipe
  const editRecipe = (recipe) => {
    setNewRecipe(recipe);
    setIsEditing(true);
    setView('admin');
  };

  // Delete recipe
  const deleteRecipe = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    setFavorites(favorites.filter(id => id !== recipeId));
  };

  // Navigation component
  const Navigation = () => (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={() => setView('home')}>
          <h1>Deliciously Anna</h1>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('home'); setMobileMenuOpen(false); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('recipes'); setMobileMenuOpen(false); }}>Recipes</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('favorites'); setMobileMenuOpen(false); }}>Favorites</a>
          {adminLoggedIn ? (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); setView('admin'); setMobileMenuOpen(false); }}>Admin</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }}>Logout</a>
            </>
          ) : (
            <a href="#" onClick={(e) => { e.preventDefault(); setView('login'); setMobileMenuOpen(false); }}>Admin</a>
          )}
        </nav>
      </div>
    </header>
  );

  // Home view
  const HomeView = () => (
    <div className="home-view">
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Deliciously Anna</h2>
          <p>Discover amazing recipes for every occasion. From breakfast to dinner, snacks to desserts, find your next favorite dish here!</p>
          <button className="btn-primary" onClick={() => setView('recipes')}>Explore Recipes</button>
        </div>
      </section>

      <section className="featured-recipes">
        <div className="container">
          <h2>Featured Recipes</h2>
          <div className="featured-grid">
            {recipes.slice(0, 3).map(recipe => (
              <div key={recipe.id} className="recipe-card" onClick={() => viewRecipe(recipe)}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <button 
                    className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                  >
                    ♥
                  </button>
                </div>
                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <span className="category">{recipe.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Recipes view
  const RecipesView = () => (
    <div className="recipes-view">
      <div className="container">
        <div className="recipes-header">
          <h2>Recipe Library</h2>
          <div className="view-options">
            <button 
              className={`view-toggle ${gridView ? 'active' : ''}`}
              onClick={() => setGridView(true)}
            >
              Grid
            </button>
            <button 
              className={`view-toggle ${!gridView ? 'active' : ''}`}
              onClick={() => setGridView(false)}
            >
              List
            </button>
          </div>
        </div>

        <div className="filters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-options">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        <div className={`recipes-grid ${gridView ? 'grid-view' : 'list-view'}`}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card" onClick={() => viewRecipe(recipe)}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <button 
                    className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                  >
                    ♥
                  </button>
                </div>
                <div className="recipe-info">
                  <h3>{recipe.title}</h3>
                  <p className="category">{recipe.category}</p>
                  <p className="description">{recipe.instructions[0].substring(0, 100)}...</p>
                  {!gridView && (
                    <button 
                      className="btn-secondary"
                      onClick={(e) => { e.stopPropagation(); viewRecipe(recipe); }}
                    >
                      View Recipe
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No recipes found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Recipe detail view
  const RecipeDetailView = () => (
    <div className="recipe-detail-view">
      {currentRecipe && (
        <div className="container">
          <button className="back-btn" onClick={() => setView('recipes')}>
            ← Back to Recipes
          </button>

          <div className="recipe-hero">
            <img src={currentRecipe.image} alt={currentRecipe.title} />
            <div className="recipe-hero-content">
              <h2>{currentRecipe.title}</h2>
              <div className="recipe-meta">
                <span className="category">{currentRecipe.category}</span>
                <span className="date">{currentRecipe.date}</span>
              </div>
              <div className="recipe-actions">
                <button 
                  className={`favorite-btn ${favorites.includes(currentRecipe.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(currentRecipe.id)}
                >
                  {favorites.includes(currentRecipe.id) ? '♥ Favorited' : '♡ Favorite'}
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => generateRecipePDF(currentRecipe)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="recipe-content">
            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <label>
                      <input type="checkbox" />
                      <span>{ingredient}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions-section">
              <h3>Instructions</h3>
              <ol className="instructions-list">
                {currentRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Favorites view
  const FavoritesView = () => (
    <div className="favorites-view">
      <div className="container">
        <h2>My Favorites</h2>
        
        {favorites.length > 0 ? (
          <>
            <div className="favorites-actions">
              <button className="btn-primary" onClick={generateFavoritesPDF}>
                Download All as PDF
              </button>
            </div>
            
            <div className="recipes-grid grid-view">
              {recipes
                .filter(recipe => favorites.includes(recipe.id))
                .map(recipe => (
                  <div key={recipe.id} className="recipe-card" onClick={() => viewRecipe(recipe)}>
                    <div className="recipe-image">
                      <img src={recipe.image} alt={recipe.title} />
                      <button 
                        className={`favorite-btn favorited`}
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                      >
                        ♥
                      </button>
                    </div>
                    <div className="recipe-info">
                      <h3>{recipe.title}</h3>
                      <span className="category">{recipe.category}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <div className="no-favorites">
            <p>You haven't favorited any recipes yet.</p>
            <button className="btn-primary" onClick={() => setView('recipes')}>
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Admin login view
  const AdminLoginView = () => (
    <div className="admin-login-view">
      <div className="container">
        <div className="login-form">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                defaultValue="admin"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                defaultValue="password"
                required 
              />
            </div>
            {loginError && <p className="error">{loginError}</p>}
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );

  // Admin panel view
  const AdminPanelView = () => (
    <div className="admin-panel-view">
      <div className="container">
        <h2>Admin Panel</h2>
        
        <div className="admin-actions">
          <button 
            className="btn-secondary"
            onClick={() => {
              setNewRecipe({
                title: '',
                image: '',
                category: 'Breakfast',
                ingredients: [''],
                instructions: ['']
              });
              setIsEditing(false);
            }}
          >
            {isEditing ? 'Cancel Edit' : 'Add New Recipe'}
          </button>
        </div>

        <form className="recipe-form" onSubmit={handleRecipeSubmit}>
          <div className="form-group">
            <label htmlFor="title">Recipe Title</label>
            <input
              type="text"
              id="title"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={newRecipe.image}
              onChange={(e) => setNewRecipe({...newRecipe, image: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}
              required
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ingredients</label>
            {newRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="input-with-button">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                >
                  −
                </button>
              </div>
            ))}
            <button type="button" className="add-more-btn" onClick={addIngredient}>
              + Add Another Ingredient
            </button>
          </div>

          <div className="form-group">
            <label>Instructions</label>
            {newRecipe.instructions.map((instruction, index) => (
              <div key={index} className="input-with-button">
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="remove-btn"
                  onClick={() => removeInstruction(index)}
                >
                  −
                </button>
              </div>
            ))}
            <button type="button" className="add-more-btn" onClick={addInstruction}>
              + Add Another Instruction
            </button>
          </div>

          <button type="submit" className="btn-primary">
            {isEditing ? 'Update Recipe' : 'Add Recipe'}
          </button>
        </form>

        <div className="existing-recipes">
          <h3>Existing Recipes</h3>
          <div className="admin-recipes-list">
            {recipes.map(recipe => (
              <div key={recipe.id} className="admin-recipe-item">
                <div className="admin-recipe-info">
                  <h4>{recipe.title}</h4>
                  <span className="category">{recipe.category}</span>
                </div>
                <div className="admin-recipe-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => editRecipe(recipe)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate view
  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView />;
      case 'recipes':
        return <RecipesView />;
      case 'recipe-detail':
        return <RecipeDetailView />;
      case 'favorites':
        return <FavoritesView />;
      case 'login':
        return <AdminLoginView />;
      case 'admin':
        return adminLoggedIn ? <AdminPanelView /> : <AdminLoginView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main>
        {renderView()}
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Deliciously Anna. All recipes and images are for demonstration purposes.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;