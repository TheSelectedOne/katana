# Katana

## API endpoints
### /create
- This will create a new deck
#### expects
```json
{
    "type": "FULL",
    "shuffled": true,
}
```
- type can be "FULL" or "SHORT"
- shuffled is boolean value
#### returns
```json
{
    "deckId": "cYkuhw88293rjf",
    "type": "FULL",
    "shuffled": true,
    "remaining": 52
}
```
- deckId is unique id given for deck
- remaining tells you how many cards are left in deck
### /open
- will return the deck data
#### expects
```json
{
    "deckId": "cYkuhw88293rjf",
}
```
#### returns
```json
{
    "deckId": "cYkuhw88293rjf",
    "type": "FULL",
    "shuffled": true,
    "remaining": 29,
    "cards": [
        {
            "value": "ACE",
            "suit": "SPADES",
            "code": "AS",
        }
        ...
    ]
}
```
- cards is an array of cards that are in deck
### /draw
- will draw from the deck
#### expects
```json
{
    "deckId": "cYkuhw88293rjf",
    "count": 4,
}
```
- count is how many cards you want from deck
#### returns
```json
{
    "cards": [
        {
            "value": "ACE",
            "suit": "SPADES",
            "code": "AS",
        }
        ...
    ]
}
```
- cards here are cards taken from taken
## How to run the project?
- make sure you have docker
- run "npm run compose"
### To run tests
- run "npm install"
- run "npm run test"