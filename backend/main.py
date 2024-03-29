import json
import boto3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

s3 = boto3.client("s3")

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

BUCKET_PREFIX = "vizyah-dev-assignments"
REQ_BUCKET = f"assignment-dev-generic-assignment-requests"
RES_BUCKET = f"vizyah-dev-assignments-responses"

# Files contain a timestamp in their name. Strip that, use just the parent folder.
def get_key(id):
    as_id = id.split("-", maxsplit=7)
    return as_id[7].removesuffix('-request.json')


# If there's more than 1 object, just take the one with the "largest" name.
# The only dynamic part in the content is the timestamp, so largest == newest.
def get_first_object_in_dir(bucket, dir):
    objects = s3.list_objects_v2(Bucket=bucket)["Contents"]
    assert len(objects) > 0
    return max(obj["Key"] for obj in objects)


@app.get("/")
def get_assignments():
    objects = s3.list_objects_v2(Bucket=REQ_BUCKET)["Contents"]
    return [obj["Key"] for obj in objects]


@app.get("/{id:path}")
def get_assignment(id: str):
    request_key = id
    response_key = f"{get_key(id)}-response.json"
    request = json.load(s3.get_object(Bucket=REQ_BUCKET, Key=request_key)["Body"])
    response = json.load(s3.get_object(Bucket=RES_BUCKET, Key=response_key)["Body"])
    tasks = {
        task["taskToken"]: {
            "lat": task["location"]["latitude"],
            "lon": task["location"]["longitude"],
            "time": task.get("preferredTime"),
        }
        for booking in request["bookings"]
        for task in booking["tasks"]
    }
    return {
        plan["vehicleToken"]: [tasks[task["taskToken"]] for task in plan["tasks"]]
        for plan in response["assignment"]
    }
