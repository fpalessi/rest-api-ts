Features:

User Management: Implements user management functionalities, such as registration, login, password recovery, etc.

Product, Order and User Controllers: Defines controllers to manage CRUD (Create, Read, Update, Delete) operations for product, order and user resources.

Password Hashing: Uses secure techniques for storing passwords, such as storing password hashes instead of the passwords themselves.

Controller Security: Implements security controls at the controller level to restrict access to actions depending on the user's role.

Authentication Middleware: Employs ASP.NET Core authentication middleware to validate JWT tokens on each incoming request and establish user identity context.

JWT (JSON Web Tokens): Uses JWT to generate secure access tokens containing user authentication and authorisation information. These tokens can be verified by the API to guarantee the user's identity and permissions.

Authentication: implements an authentication mechanism to verify the identity of users accessing the API. You can use access tokens, cookies or JWT (JSON Web Tokens) for this purpose.

Role-based authorisation: Define roles and permissions within your application to control which users have access to specific resources. Use authorisation attributes on controllers and actions to restrict access based on roles.

These features are essential to ensure the security and functionality of a Web API built with .NET that includes multiple controllers and has requirements for role-based authorisation, authentication, JWTs and password hashing.
