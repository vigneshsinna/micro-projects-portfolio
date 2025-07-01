from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="Sample API",
    description="A sample API for testing the documentation generator",
    version="1.0.0",
    contact={
        "name": "API Support",
        "email": "support@example.com"
    }
)

# Models
class User(BaseModel):
    """User model with basic information"""
    id: int
    name: str
    email: str
    age: Optional[int] = None
    is_active: bool = True

class UserCreate(BaseModel):
    """Model for creating new users"""
    name: str
    email: str
    age: Optional[int] = None

class UserUpdate(BaseModel):
    """Model for updating existing users"""
    name: Optional[str] = None
    email: Optional[str] = None
    age: Optional[int] = None
    is_active: Optional[bool] = None

# In-memory database
users_db = [
    User(id=1, name="John Doe", email="john@example.com", age=30),
    User(id=2, name="Jane Smith", email="jane@example.com", age=25),
]

@app.get("/", tags=["root"])
async def root():
    """
    Root endpoint returning API information
    """
    return {
        "message": "Welcome to the Sample API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health", tags=["health"])
async def health_check():
    """
    Health check endpoint
    
    Returns the health status of the API
    """
    return {"status": "healthy", "timestamp": "2025-07-01T12:00:00Z"}

@app.get("/users", response_model=List[User], tags=["users"])
async def get_users(
    skip: int = 0,
    limit: int = 10,
    active_only: bool = True
) -> List[User]:
    """
    Retrieve a list of users
    
    - **skip**: Number of users to skip (for pagination)
    - **limit**: Maximum number of users to return
    - **active_only**: Filter to only active users
    
    Returns a list of user objects with their information.
    """
    filtered_users = users_db
    if active_only:
        filtered_users = [user for user in users_db if user.is_active]
    
    return filtered_users[skip:skip + limit]

@app.get("/users/{user_id}", response_model=User, tags=["users"])
async def get_user(user_id: int) -> User:
    """
    Get a specific user by ID
    
    - **user_id**: The ID of the user to retrieve
    
    Returns the user object if found, otherwise raises 404.
    """
    user = next((user for user in users_db if user.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=User, tags=["users"])
async def create_user(user: UserCreate) -> User:
    """
    Create a new user
    
    Creates a new user with the provided information.
    Email must be unique across all users.
    
    - **user**: User creation data
    
    Returns the created user object with assigned ID.
    """
    # Check if email already exists
    if any(existing_user.email == user.email for existing_user in users_db):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_id = max([user.id for user in users_db], default=0) + 1
    new_user = User(
        id=new_id,
        name=user.name,
        email=user.email,
        age=user.age
    )
    users_db.append(new_user)
    return new_user

@app.put("/users/{user_id}", response_model=User, tags=["users"])
async def update_user(user_id: int, user_update: UserUpdate) -> User:
    """
    Update an existing user
    
    Updates user information. Only provided fields will be updated.
    
    - **user_id**: The ID of the user to update
    - **user_update**: Updated user data
    
    Returns the updated user object.
    """
    user_index = next((i for i, user in enumerate(users_db) if user.id == user_id), None)
    if user_index is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = users_db[user_index]
    update_data = user_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(user, field, value)
    
    return user

@app.delete("/users/{user_id}", tags=["users"])
async def delete_user(user_id: int):
    """
    Delete a user
    
    Permanently deletes a user from the system.
    
    - **user_id**: The ID of the user to delete
    
    Returns confirmation message.
    """
    user_index = next((i for i, user in enumerate(users_db) if user.id == user_id), None)
    if user_index is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    deleted_user = users_db.pop(user_index)
    return {"message": f"User {deleted_user.name} deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
