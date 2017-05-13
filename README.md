[![Build Status](https://travis-ci.org/maccyber/micro-bigfive-save.svg?branch=master)](https://travis-ci.org/maccyber/micro-bigfive-save)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-bigfive-save

micro webservice stores bigfive answers

## Example

https://save.bigfive.world

## Add data

### Request

```POST / OR /store```

```sh
$ curl -v -H "Authorization: INSERT-JWT-TOKEN" http://localhost:3000 -d '{"someData": "this is posted to database" }'
```

```PUT /:id OR /store/:id```

```sh
$ curl -v -H "Authorization: INSERT-JWT-TOKEN" http://localhost:3000/58a475c47bd88a143a79d4a2 -X PUT -d '{"someData": "this is posted to database" }'
```

### Response

```JavaScript
{
  "id": "58a475c47bd88a143a79d4a2"
}
```

## Get all data

### Request
```GET /search```

```sh
$ curl -v http://localhost:3000/search
```

### Response

```JavaScript
[  
  {  
    "_id":"58a474c4fa5fdf11fe3176e4",
    "testType":"personality",
    "langCode":"no",
    "data":{  
      "O":{  
        "score":33,
        "count":10,
        "result":"positive",
        "facet":{  

        }
      },
      "N":{  
        "score":21,
        "count":10,
        "result":"negative",
        "facet":{  

        }
      },
      "E":{  
        "score":31,
        "count":10,
        "result":"positive",
        "facet":{  

        }
      },
      "C":{  
        "score":31,
        "count":10,
        "result":"positive",
        "facet":{  

        }
      },
      "A":{  
        "score":30,
        "count":10,
        "result":"neutral",
        "facet":{  

        }
      }
    }
  }
]
```

## Get some data

### Request

```GET /?id=58a475c47bd88a143a79d4a2```

```sh
$ curl -v http://localhost:3000/?id=58a475c47bd88a143a79d4a2
```

### Response

Same as get all data

## Delete data

```DELETE /:id OR /store/:id```

```sh
$ curl -v -H "Authorization: INSERT-JWT-TOKEN" -X DELETE -v http://localhost:3000/58a475c47bd88a143a79d4a2
```

### Response

```JavaScript
{
  "id": "58a475c47bd88a143a79d4a2"
}
```

## Deploy to Now

```bash
now secret add BIGFIVE_SAVE_DATABASE_URL something.mlab.com
now secret add BIGFIVE_SAVE_DB bigfive
now secret add BIGFIVE_SAVE_USER bigfive
now secret add BIGFIVE_SAVE_PASSWORD password
now secret add BIGFIVE_SAVE_PORT 53659
now secret add BIGFIVE_SAVE_TOKEN_KEY "Gibberish, jibberish, jibber-jabber and gobbledygook"
now -E results.env
```

## License

[MIT](LICENSE)

## About

Created with :heart: by [zrrzzt](https://github.com/zrrrzzt) and [maccyber](https://github.com/maccyber)

![alt text](https://robots.kebabstudios.party/zrrrzzt.png "Robohash image of zrrrzzt") 
![alt text](https://robots.kebabstudios.party/maccyber.png "Robohash image of maccyber")
