
# Rule Engine Application

A dynamic rule engine built using **Node.js**, **Express**, and **MongoDB** that allows users to create, combine, and evaluate rules using Abstract Syntax Trees (ASTs). This project helps evaluate complex rules based on user attributes like age, department, income, and spending.

## Features

- **Create Rules**: Define custom rules with a simple syntax and store them in the database.
- **Combine Rules**: Merge multiple rules together using logical operators like `AND` and `OR`.
- **Evaluate Rules**: Evaluate rules against a set of user data to check eligibility or other criteria.

## Folder Structure

```
rule-engine/
├── client/               # Frontend HTML, CSS, JS for UI
├── controllers/          # Controllers for handling routes
├── models/               # MongoDB models
├── routes/               # API routes
├── utils/                # Utility functions like AST manipulation
├── app.js                # Main Express app configuration
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB for storing rules and evaluations
- **Other Tools**: Mongoose, dotenv, CORS, Body-Parser

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or above)
- [MongoDB](https://www.mongodb.com/) (local instance or cloud-based)
- [Postman](https://www.postman.com/) for testing API endpoints

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/rule-engine.git
   cd rule-engine
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:

   ```
   MONGO_URI=mongodb://localhost:27017/rule-engine-db
   ```

4. Run the MongoDB server (if using locally):

   ```bash
   mongod
   ```

5. Start the Node.js server:

   ```bash
   npm start
   ```

   The server will start on port 5000 by default.

### Frontend

The frontend interface can be accessed by opening `client/index.html` in your browser. It allows you to:

- **Create Rules**
- **Combine Rules**
- **Evaluate Rules**

### Backend API Endpoints

Use [Postman](https://www.postman.com/) or other API tools to test the following endpoints:

#### 1. **Create Rule**
   - **URL**: `/api/rules/create_rule`
   - **Method**: POST
   - **Request Body**:

     ```json
     {
       "ruleName": "Rule1",
       "ruleString": "(age > 30 AND department = 'Sales')"
     }
     ```

#### 2. **Combine Rules**
   - **URL**: `/api/rules/combine_rules`
   - **Method**: POST
   - **Request Body**:

     ```json
     {
       "rules": ["Rule1", "Rule2"],
       "op": "AND"
     }
     ```

#### 3. **Evaluate Rule**
   - **URL**: `/api/rules/evaluate_rule`
   - **Method**: POST
   - **Request Body**:

     ```json
     {
       "ast": "Rule1",
       "data": {
         "age": 32,
         "department": "Sales",
         "salary": 60000
       }
     }
     ```

### Error Handling

- If no matching rules are found in the database during the combination or evaluation of rules, the API returns a `404` status.
- Server errors return a `500` status with an appropriate error message.

## Example Screenshots

1. **Create Rule Form**
   ![Create Rule](https://example.com/create-rule-screenshot)

2. **Combine Rules Form**
   ![Combine Rules](https://example.com/combine-rules-screenshot)

## Contributing

Feel free to submit issues and pull requests to help improve the project. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
