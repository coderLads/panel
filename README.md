# panel

Displays informational tiles similar to windows phone notification badges.

![site](https://i.imgur.com/kVXQYPG.png)

[View the current site here](https://panel-6b9aa.firebaseapp.com/home)

## Available tiles
View the current tile list [here](src/tiles.json)


## Development
```
yarn install      - installs dependencies
yarn serve        - hot reloading dev server
yarn build        - builds for production
firebase deploy   - deploys to hosting
```
### Adding your own tiles

If you want to create tiles for this project, simply add the tile to the [tile template file](src/tiles.json) with the proper fields and descriptions.

Next, make a copy of [the example tile](src/componenets/tiles/ExampleTile.vue) and modify it to suit your needs. Make sure that the name of the tile file and the name in the template file are exactly the same.
