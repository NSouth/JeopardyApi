# Jeopardy API Fun
Thanks for stopping by. This web app is an interface on top of the open source Jeopardy Clue Database hosted [here](https://github.com/jwolle1/jeopardy_clue_dataset). All clues are the property of Jeopardy Productions and this site makes no claims to own them and no effort to monetize them. Seriously, I just did this for fun.
## Project Components
- **Azure Cosmos DB:** The clues have been imported into Azure Cosmos DB for querying.
- **Azure Functions:** This is an API wrapper for querying clues from Cosmos DB.
- **React App:** The frontend which calls the Azure Functions API.
