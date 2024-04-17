from fastapi import FastAPI 
from router import test
from sqlalchemy.orm import Session
from database import engine
import models


# activate venv on MacOS / Linux
# source env/bin/activate

# start server on MacOS: "$ python3 -m uvicorn main:app --reload" (system path issue)
# start server on Linux: "$ uvicorn main:app --reload"

models.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.include_router(test.router)


@app.get("/")
async def root(): 
    return {"message": "hello world !!!"}

@app.post("")
async def post():
    return {"message": "hello from the post route"}