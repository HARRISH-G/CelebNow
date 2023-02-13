var axios = require('axios');

const sms = async(otp,number) => {
    var data = JSON.stringify({
        "route": "q",
        "message": message,
        "language": "english",
        "flash": 0,
        "numbers": number
      });
    var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://www.fast2sms.com/dev/bulkV2',
        headers: { 
          'Authorization': 'LpHQ5dzxkWM2Xrgyt0lUnK6Z4BTISOfAeuEP1NwG7biRo9qsvYwZaL2SkunjKQyzbX4xegG8vdI3iFDU', 
          'Content-Type': 'application/json', 
          'Cookie': 'IhXGGRiw7Tj46sMdhoAwL4T8JsLIWky7tFumUDBY=eyJpdiI6IldtUkFWaTR1TEgrbWNPcXBcL3pLQVpRPT0iLCJ2YWx1ZSI6Ilwvb3RBazVZYmtDZjd6bGFERTlSdTJ1Z3VZamhjbklBcDdta0dHQUZrUEFFWmhRTnRENnRTRDJCOXczSHN2dHRpRVVxKzBpVStVWG5LWHh2bzRlUjNyMUZDUks4U1dha0VPUGZLNytZUnNiRnM0Y3NPd2RHYlBsUGxpaFhNZHVKdlJ6RmRKWnVtd3ZLYkcxS0trWkVNc2wrbW04UzBudmlmbjNjUXVVbVwvVlRJUUNIUTFnSFwveUh2NFBZOFo0cWtZejZpNDFKeVd0cDhQR0VBcGR3eXdwbFcxdTdraFpRQ2NZaVdhaFR0NURrdDQ9IiwibWFjIjoiYzA5NDQwNzY4YWUyOGJjNDk3ZTRhZTFjN2NjYmUwNjkwNjI1MzU5NWU4MjZjY2ExMDdiMmExYmQzZWQ4YmUyNCJ9; XSRF-TOKEN=eyJpdiI6ImtaQzhFQk10ak9FMnBEaTNWZEd4UVE9PSIsInZhbHVlIjoiWVI1TVR2ZlUyU2NxTk9BQ3RGUDYwZTk1WDRjUWxMMGNXMHpUKzNTT2NOWHZ1SkJUUWdwRWJkVEZJVzFtazBXeHpoRDVTU1pKMzdzR1wvb1wvTlQ0Rkpadz09IiwibWFjIjoiMzVlOTY5NDFkODNjMzI1YzYwNWFhNTBmNzE5YWVjZGVjYWZhYTNkMDZhN2E0Y2IzZDQ2MjYzZDIwZGI4ODE5ZSJ9; laravel_session=eyJpdiI6IkN3MzZkYlk3RHdLY050VWJlcHVzU3c9PSIsInZhbHVlIjoiTG1TbXFOanB0dzY3NzltWGVERCtua0lPTHBuV0FyU3VMaGVUMHVrUUdHMzA5aG9wbXo0SVp2WW13aDBPVEJ2Q1dsS2hLa2lnN3FCM1BFdlwvTWQxV3dRPT0iLCJtYWMiOiI4NmYzMzY2NjE5YjAzY2FkMzIzZWE4ZmIxZDBhNWE1MjJhN2VjYWY1MDJlOGIwODgzMWVkYjQxOWY4YjE4ZGIwIn0%3D'
        },
        data : data
      };
    let res = await axios(config);
    return JSON.stringify(response.data)
}


module.exports = sms;