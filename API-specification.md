# API Specification
## Examples of queries implemented back-end:

* /api/getImages?searchPhrase=ja&firstIdx=3&numberOfImgs=3
* /api/getCategories

## Fetching list of wallpapers
These below shall return:
* List of wallpapers with:
 * Unique ID
 * Text of quote
 * Image path
 * Category ID (for URL ==> Not index)
 * Category in readable form-group
 * Rating (sum of votes)
 * No. of votes
* total number of wallpapers with specific criteria (for paging)


### All within range
Info to be provided in params:
* Range from
* Range to

### From specific category within range
Info to be provided in params:
* Range from
* Range to
* Category ID (Not index!)

### Containing search phrase within range
Info to be provided in params:
* Range from
* Range to
* Search phrase

## Fetching number of wallpapers (for paging)
Deprecated - number of wallpapers shall be returned in above requests

## Fetching list of categories
No params, returning:
* List of categories with:
  * category ID (not index)
  * Category in human readable form

## Placing a vote for wallpapers
Params:
* ID of wallpaper
* Vote value (1-5)

Return: nothing
