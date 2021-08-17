# Questions & Answers Service API - Heck Reactor
What the Heck Reactor?

## Client Specifications
The client expected a service that yielded a <50ms response time E2E, while also handling more than 15 million rows of data. The service would return nested responses, sometimes with at least 3 levels of nesting. The service was expected to be easily integrated into an existing React frontend.

## Prerequisites & Installation
1. Run the `npm install` command to install the dependencies in `package.json`
2. Run `cp example.env .env` and edit the `.env` file with your own settings
3. Provide the datasets and store in `/models/etl/data`
4. Run `npm run dbinit` to initialize the PostgreSQL tables
5. Run `npm run etl-all` to add the data
6. Run `npm start` to start the nodemon instance.

## Endpoints
`[GET] /qa/questions`
| Query Parameter | Type    | Description                                               |
| --------------- | ------- | --------------------------------------------------------- |
| product_id      | integer | Specifies the product for which to retrieve questions.    |
| page            | integer | Selects the page of results to return. Default 1.         |
| count           | integer | Specifies how many results per page to return. Default 5. |

`[GET] /qa/questions/:question_id/answers`
| Parameter   | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| question_id | integer | Required ID of the question for which answers are needed |

| Query Parameter | Type    | Description                                               |
| --------------- | ------- | --------------------------------------------------------- |
| page            | integer | Selects the page of results to return. Default 1.         |
| count           | integer | Specifies how many results per page to return. Default 5. |

`[POST] /qa/questions`
| Body Parameter | Type    | Description                                                 |
| -------------- | ------- | ----------------------------------------------------------- |
| body           | text    | Text of question being asked                                |
| name           | text    | Username for question asker                                 |
| email          | text    | Email address for question asker                            |
| product_id     | integer | Required ID of the Product for which the question is posted |

## Closing Thoughts
