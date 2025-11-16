# .NET Core Backend Integration Guide

This document explains how to integrate this React frontend with your ASP.NET Core Web API backend.

## Configuration

1. **Environment Variables**

   - Copy `.env.example` to `.env`
   - Set `VITE_API_URL` to your .NET Core API base URL

   ```bash
   VITE_API_URL=http://localhost:5001/api
   ```

2. **CORS Configuration (Backend)**
   Your .NET Core API must allow requests from the frontend:

   ```csharp
   // Program.cs or Startup.cs
   builder.Services.AddCors(options =>
   {
       options.AddPolicy("AllowReactApp",
           policy =>
           {
               policy.WithOrigins("http://localhost:8080", "https://your-production-url.com")
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials();
           });
   });

   app.UseCors("AllowReactApp");
   ```

## API Endpoints Expected

### Authentication

```
POST /api/auth/login
Body: { "email": "string", "password": "string" }
Response: { "token": "string", "user": User }

POST /api/auth/register
Body: { "email": "string", "password": "string", "name": "string", "role": "string" }
Response: { "token": "string", "user": User }
```

### Projects

```
GET /api/projects
Response: Project[]

GET /api/projects/{id}
Response: Project

POST /api/projects
Body: { "name": "string", "description": "string", "managerId": "string", "deadline": "string" }
Response: Project

PUT /api/projects/{id}
Body: Project
Response: Project

DELETE /api/projects/{id}
Response: 204 No Content
```

### Tasks

```
GET /api/tasks
Response: Task[]

GET /api/tasks/{id}
Response: Task

POST /api/tasks
Body: { "title": "string", "description": "string", "projectId": "string", "assigneeId": "string", "status": "string", "priority": "string" }
Response: Task

PUT /api/tasks/{id}
Body: Task
Response: Task

DELETE /api/tasks/{id}
Response: 204 No Content
```

### Team

```
GET /api/team
Response: User[]

GET /api/team/{id}
Response: User

POST /api/team/invite
Body: { "email": "string", "name": "string", "role": "string" }
Response: User

PUT /api/team/{id}
Body: User
Response: User

DELETE /api/team/{id}
Response: 204 No Content
```

### Dashboard

```
GET /api/dashboard/stats
Response: { "totalProjects": number, "activeTasks": number, "teamMembers": number, "pendingReviews": number }
```

## JWT Authentication

The frontend automatically:

1. Stores JWT token in localStorage after login
2. Adds `Authorization: Bearer {token}` header to all requests
3. Redirects to login on 401 responses

Your .NET Core API should:

```csharp
// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
```

## Data Models (Expected by Frontend)

### User

```csharp
public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Role { get; set; } // Admin, Manager, Developer, Tester
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Project

```csharp
public class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Guid ManagerId { get; set; }
    public User Manager { get; set; }
    public string Status { get; set; } // Planning, In Progress, Review, Completed
    public int Progress { get; set; }
    public DateTime Deadline { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Task

```csharp
public class Task
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Guid ProjectId { get; set; }
    public Project Project { get; set; }
    public Guid AssigneeId { get; set; }
    public User Assignee { get; set; }
    public string Status { get; set; } // todo, in-progress, done
    public string Priority { get; set; } // low, medium, high
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

## Validation

All forms use Zod schema validation on the client side. Your backend should also validate:

- Email format and uniqueness
- Required fields
- String length limits
- Date constraints
- UUID format for IDs

## Error Handling

The frontend expects errors in this format:

```json
{
  "message": "Error message",
  "errors": {
    "fieldName": ["Error 1", "Error 2"]
  },
  "statusCode": 400
}
```

## Testing the Integration

1. Start your .NET Core API
2. Update `.env` with your API URL
3. Run the React app: `npm run dev`
4. Test authentication flow first
5. Verify API calls in browser DevTools Network tab

## Security Checklist

- ✅ Enable HTTPS in production
- ✅ Implement CORS properly
- ✅ Validate all inputs server-side
- ✅ Use secure JWT configuration
- ✅ Implement rate limiting
- ✅ Add input sanitization
- ✅ Use parameterized queries (prevent SQL injection)
- ✅ Implement proper authentication and authorization
