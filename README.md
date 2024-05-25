# NestJS Project with Swagger Integration

This NestJS project leverages Nestia's integration to streamline backend API development from a Swagger (`swagger.json`) specification. This approach simplifies the design process and ensures consistency between your API documentation and implementation.
Using https://nestia.io/docs/migrate/ to migrate this project **Without Nest CLI Installation**


## Getting Started

### Prerequisites

- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)


### Installation

1. **Clone:** Clone this repository to your local machine.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start Server Development:**
  ```bash
   npm run start:dev
  ```
This launches the NestJS server with hot-reloading enabled, and wiil open in: http://localhost:37001/

4. **Start Swagger UI:**
  Auto Generated from Nestia
   - **Access Swaggerhub:**
    ```bash
      npm run start:swagger
    ```
   - **Open Browser:** Navigate to http://127.0.0.1:37810/api-docs in your web browser to interact with the Swagger documentation and test your endpoints.

5. **Testing:**
  ```bash
      npm run test
  ```

# File Structure
   - .github\workflows (github actions)
      - build.yml
   - .vscode
   - node_modules
   - lib (built Javascript files to ```npm run server```)
   - packages (Auto Genereated from Swagger)
      - api
        - lib (auto generated files for swagger)
        - .gitignore
        - package.json
        - Readme.md
        - swagger.json 
        - tsconfig.json
   - src
        - api
            - structures (Some is built in)
        - auth (Auth Guard+ auth guard tests)
        - constants
        - controllers
        - executable
        - services (Tests included)
        - sign (Sign Guard)
        - MyBackend.ts (start server & swagger)
        - MyModule.ts (Module)
    - Readme.md
    - tsconfig.json
    - package.json
    - package-lock.json
    - Matrix.postman_collection.json (Postman collection Using)
    - nestia.config.ts
    - LICENSE
    - gitignore
    - webpack.config.js


# Modify code: 
  Add your custom business logic to the controllers, services, and models within the src directory.
# Update Swagger: 
  Make changes to packages/api/swagger.json to reflect updates to your API.
# Regenerate code: 
  Use Nestia to regenerate the NestJS codebase from the updated swagger.json.
