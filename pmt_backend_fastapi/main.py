from fastapi import FastAPI 
from router import test

app = FastAPI()
app.include_router(test.router)

@app.get("/")
async def root(): 
    return {"message": "hello world !!!"}

@app.post("")
async def post():
    return {"message": "hello from the post route"}