# Katana

## API endpoints
### /create
- This will create a new deck
#### expects
```json
{
    "type": "FULL" or "SHORT",
    "shuffled": boolean,
}
```
#### returns
```json
{
    "deckId": uuid,
    "type": "FULL" | "SHORT",
    "shuffled": boolean,
    "remaining": number
}
```
### /open
- will return the deck data
#### expects
```json
{
    "deckId": uuid,
}
```
#### returns
```json
{
    "deckId": uuid,
    "type": "FULL" or "SHORT",
    "shuffled": boolean,
    "remaining": number,
    "cards": [
        {
            "value": "ACE", //card value
            "suit": "SPADES", //card suit
            "code": "AS", //card code
        }
        ...
    ]
}
```
### /draw
- will draw from the deck
#### expects
```json
{
    "deckId": uuid,
    "count": number,
}
```
#### returns
```json
{
    "cards": [
        {
            "value": "ACE", //card value
            "suit": "SPADES", //card suit
            "code": "AS", //card code
        }
        ...
    ]
}
```

## How to run the project?
- make sure you have docker
- run "npm run compose"
### To run tests
- run "npm install"
- run "npm run test"