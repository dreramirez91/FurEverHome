from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, dogs

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(dogs.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home route allows for regular health checks to make sure app is working
@app.get("/")
def home():
    return True
