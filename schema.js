export const schema = `#graphql

  type User {
    _id: ID!
    name: String!
    email: String!
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    title: String!
    completed: Boolean!
    user: User!
  }
    type loginRes{
    
     token: String!
     }

  type Query {
    getAllUsers: [User]
    getUserById(id: ID!): User
    getAllTodos: [Todo]
    getTodoById(id: ID!): Todo
    getTodosByUser(userId: ID!): [Todo]
  }

  type Mutation {
    register(user: newUser): User
     login(user:logUser): String
     deleteUser(id: ID!): String
     updateUser(id: ID!, user: updateUser): User

     addTodo(todo: newTodo,userId: ID!): Todo
     updateTodo(id: ID!, todo: updateTodo): Todo
     deleteTodo(id: ID!): String
  }

  input newUser {
    name: String!
    password: String!
    email: String!
    role: String
  }
    
  input logUser {
  email: String!
  password: String!
  }

  input updateUser {
    name: String
    email: String
  }

  input newTodo {
    title: String!
    completed: Boolean!
    
  }
    
  input updateTodo {
   title: String,
   completed: Boolean}

`;
