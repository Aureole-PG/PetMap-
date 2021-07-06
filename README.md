
# Pet-Map



You can use this project if you need some page for try your GPS project 
## Start 
```bash 
  npm run dev
```
    
## API Reference
this project has internal backend but if is used with external hardware
you can create an api with this endpoints
#### save current position

```http
  GET url/api/get/${gps_id}/${lat}/${lng}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `gps_id` | `string` | **Required**.  id with you registered you pet|
| `lat` | `string` | **Required** latitude |
| `lng` | `string` | **Required** longitude |

### Get last position saved

```http
    GET url/api/gps/${id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**.  id with you registered you pet|

## Demo
last deploy link
[`Pet Map`](https://pet-map-8l6ty330c-aureole-ia.vercel.app/login)
