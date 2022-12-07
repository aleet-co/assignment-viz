from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def get_assignments():
    return ["abc", "def"]


@app.get("/{id}")
def get_assignment(id: str):
    return {"driverA": [{"lat": 52.23, "lon": 21.03}]}
