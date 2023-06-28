### Log in

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - username: str
  - password: str

- Response: Account information and a token
- Response shape (JSON):
  ```json
    {
      "account": {
        "key": type,
      },
      "token": str
    }
  ```

### Log out

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

### Sign Up

- Endpoint path: /api/accounts
- Endpoint method: POST

- Request shape (JSON):

  ```json
    {
      "username":str,
      "password": str,
      "email": str,
      "phone": int,
      }
  ```

- Response: User account gets created
- Response shape (JSON):
  ```json
  {
    "message": str
  }
  ```

### Read/Listing all dogs

- Endpoint path: /api/dogs
- Enpoint method: GET

- Response: A list of dogs
- Response shape:

```json
    {
        "dogs": [
            {
                "id": int,
                "name": str,
                "age": int,
                "picture_url": str,
                "sex": str,
                "breed": str,
                "spayed/neutered": bool,
                "adopted": bool,
                "date_posted": date,
                "owner_id": int,
            }
        ]
    }
```

### List of rehomer's dogs

- Endpoint path: /api/dogs/{owner_id}
- Endpoint method: GET

- Response: A list of dogs
- Response shape:

```json
    {
        "dogs": [
            {
                "id": int,
                "name": str,
                "age": int,
                "picture_url": str,
                "sex": str,
                "breed": str,
                "spayed_neutered": bool,
                "adopted": bool,
                "reason": text,
                "date_posted": date,
                "owner_id": int,
                "address_city": str,
                "address_state": str,
            }
        ]
    }
```

### Add a new dog

- Endpoint path: /api/dogs/{owner_id}
- Endpoint method: POST

- Headers:
  \*Authorization: Bearer token

- Request: A form to add a new dog for rehoming
- Request shape:

```json
    {
        "name": str,
        "age": int,
        "picture_url": str,
        "sex": str,
        "breed": str,
        "spayed_neutered": bool,
        "adopted": bool,
        "reason": str,
        "date_posted": date NOW,
        "address_city": str,
        "address_state": str,
    }
```

- Response: A list of that rehomer's dogs
- Response shape:

```json
    {
        "dogs": [
            {
                "id": int,
                "name": str,
                "age": int,
                "picture_url": str,
                "sex": str,
                "breed": str,
                "spayed_neutered": bool,
                "adopted": bool,
                "reason": text,
                "date_posted": date,
                "owner_id": int,
                "address_city": str,
                "address_state": str,
            }
        ]
    }
```

### Edit a dog

- Endpoint path: /api/dogs/{owner_id}/{dog_id}
- Endpoint method: PUT

- Headers:
- Authorization: Bearer token

- Request: A form to edit a single dog's information
- Request shape:

```json
    {
        "age": int,
        "picture_url": str,
        "spayed_neutered": bool,
        "adopted": bool,
        "reason": text,
        "address_city": str,
        "address_state": str,
    }
```

- Response: A list of that rehomer's dogs
- Response shape:

```json
    {
        "dogs": [
            {
                "id": int,
                "name": str,
                "age": int,
                "picture_url": str,
                "sex": str,
                "breed": str,
                "spayed_neutered": bool,
                "adopted": bool,
                "reason": text,
                "date_posted": date,
                "owner_id": int,
                "address_city": str,
                "address_state": str,
            }
        ]
    }
```

### Delete a dog

- Endpoint path: /api/dogs/{owner_id}/{dog_id}
- Endpoint method: DELETE

- Headers:
- Authorization: Bearer token

- Response: An indication of success or failure
- Response shape:

```json
{
  "delete": true
}
```
