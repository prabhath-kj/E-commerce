# Product Management Application

## Live
- [Live Link](https://product-management-kt9t.onrender.com)
- Web service deployed on Render with automatic spinning down on idle.

### Spinning down on idle

Render spins down a free web service that goes 15 minutes without receiving inbound traffic. Spinning up takes a few seconds, causing a delay for incoming requests until the service is back up.

## Functionalities

1. **User Authentication:**
   - Sign up and log in securely using JWT for authentication.

2. **Category Management:**
   - Manage product categories.
   - Add sub-categories under each category.

3. **Product Management:**
   - Add, edit, and display products.
   - Organize products under sub-categories.
   - Utilize Multer and Cloudinary for image upload.

4. **Wishlist:**
   - Implement wishlist functionality using Redux Toolkit for state management.

5. **Search and Filter:**
   - Search for products by name.
   - Filter products by sub-category.

6. **Pagination:**
   - Implemented Infinite Scroll for a better user experience.

## Setup Instructions

### Installation

1. Clone the repository and install dependencies.
 
    ```bash
    git clone https://github.com/your-username/product-management.git
    cd E-commerce
    npm install
    ```

2. Navigate to the server and client directories, then install dependencies.
    
    ```bash
    cd api && npm install
    cd client && npm install
    ```

3. Set up the required environment variables by renaming the `.env.sample` file to `.env` and providing the necessary values for your environment, including Cloudinary credentials.

### Usage

#### Development

1. Start the development server for the API.
        
    ```bash
    cd api && npm start
    ```

2. Access the API at http://localhost:3000.

3. Start the development server for the UI.

    ```bash
    cd client && npm run dev
    ```

4. Access the UI at http://localhost:5173.

Feel free to adjust the content and formatting based on your specific needs.
