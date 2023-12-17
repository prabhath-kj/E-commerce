# Product Management Application

## Live
- Live Link [Click](#https://product-management-kt9t.onrender.com)
- !!! Web service deployed on render 

      ### Spinning down on idle

      Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. Render spins the service back up whenever it next receives a request to process.Spinning up a service takes a few seconds, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily.
      
## Functionalities
1. **User Authentication:**
   - Sign up and log in securely.

2. **Category Management:**
   - Manage product categories.
   - Add sub-categories under each category.

3. **Product Management:**
   - Add, !edit, and display products.
   - Organize products under sub-categories.

4. **Wishlist:**
   - Implement wishlist functionality using Redux Tool Kit

5. **Search and Filter:**
   - Search for products by name.
   - Filter products by sub-category.

6. **Pagination:**
   - Implement Infinte Scroll for better user experience.

## Backend Architecture (MVC)
- **Model (models/):**
  - Defines data structures and business logic.
  - Interacts with the database.
- **View (views/):**
  - Handles the presentation layer.
  - Renders data to the user.
- **Controller (controllers/):**
  - Manages the flow of data between the Model and View.
  - Handles user inputs and business logic.

## Setup Instructions

## Installation

1.Clone the repository and install dependencies.
 
    git clone https://github.com/your-username/product-management.git

2.Navigate to the project directory.
    
    cd E-commerce
    npm install

3.Install the dependencies using your preferred package manager in both the server and client directorie
    
    cd api &&  npm install
    cd client && npm install
4.Set up the required environment variables by renaming the .env.example file to .env and providing the necessary values for your environment.

## Usage

   ### Developement

   1. Start the development server
        
           cd api  && npm start
  
   2.Access the server at http://localhost:3000.

   (Repeat the same process for access the UI , instead  cd api && npm start use cd clien && npm run dev.
   Access dev server at http://localhost:5173)




```   
Feel free to adjust the content and formatting based on your specific needs.

