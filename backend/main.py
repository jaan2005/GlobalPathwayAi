from fastapi import FastAPI

app = FastAPI(
    title="DecisionPath - Strategic Discovery Engine"
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}