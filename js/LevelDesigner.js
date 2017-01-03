/*

  level width = 750
  designer breaks it in 25px chunks
  30 wide
  level1,

  ## Should dynamically set the game vertical bounds, remove from CFG

  level format

`-----------------------------|
     _______                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     ___________              |
                              |
                              |
                              |
                ______________| // hero can jump up "8" rows
                              |
                              |
                              |
________________              |
                              |
                              |
                              |
------------------------------|

width of game is 750
______________________________| 25px

_______  1 = 7
___________  2 = 11
______________  3 = 14
________________  4 = 16

real dimensions
1 = 175
2 = 265
3 = 340
4 = 400
*/
((Phaser, Game, CFG) => {
  // get or create Game module
  if( Game === undefined ){
    Game = window.Game = {};
  }

  const PARTS = {
    PLATFORM : '_',
    WALL : '|',
    SPACE : ' ',
  };
  const SEGMENTS = {
    7 : 1,
    11 : 2,
    14 : 3,
    16 : 4
  };
  const COL_WIDTH = 25;
  const ROW_HEIGHT = 50;
  const ROW_OFFSET = 100;

  const levels = {
    1 :
`-----------------------------|
                              |
                              |
                              |
                              |
     _______                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     ___________              |
                              |
                              |
                              |
                ______________|
                              |
                              |
                              |
________________              |
                  ___________ |
                              |
                              |
                              |
                              |
     _______                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     ___________              |
                              |
                              |
                              |
                ______________|
                              |
                              |
                              |
________________              |
                  ___________ |
                              |
                              |
                              |
                              |
     _______                  |
                              |
                              |
                              |
                              |
                              |
                    _______   |
                              |
                              |
                              |
     ___________              |
                              |
                              |
                              |
                ______________|
                              |
                              |
                              |
________________              |
                              |
                              |
                              |
------------------------------|` // level 1
  };

  const spawnPlatform = (game, x, y, size) => {
    x *= COL_WIDTH;
    y *= ROW_HEIGHT;
    y += ROW_OFFSET;
    Game.platformsGroup.add(new Game.Platform(game, x, y, size).sprite);
  };

  const spawnRow = game => ( row, y ) => {
    // discover platforms
    let parts = row.split('');
    let spawns = parts
      .map( cell => cell === PARTS.WALL ? PARTS.SPACE : cell )
      .reduce((lastPart, curPart, x) => {
        // building a platform at the end of a sequence of underscores
        if( curPart === PARTS.PLATFORM ){ // add to the sequence
          return lastPart + curPart;
        } else { // not in sequence
          if( lastPart.length > 0 ){ // end of a sequence
            spawnPlatform(game, x-lastPart.length, y, SEGMENTS[lastPart.length]);
          }
          return ''; // reset sequence
        }
      }, '');
  };

  const load = ( game, levelId ) => {

    if( !levels.hasOwnProperty(levelId) ){
      throw RangeError(`Level ID:${levelId} has not yet been designed.`);
    }

    // spawn the floor
    spawnPlatform(game, -3, -1, 4);
    spawnPlatform(game, 6, -1, 4);
    spawnPlatform(game, 15, -1, 4);

    let level = levels[levelId];
    // ignore top and bottom rows, always have a floor
    // scan each row from bottom(end) to top(beginning)
    let levelRows = level.split(`\n`).reverse();
    levelRows.pop();
    levelRows.shift();
    levelRows.forEach(spawnRow(game));
  };

  Game.LevelDesigner = {
    load
  };

})(window.Phaser, window.Game, window.Game.Configuration);

