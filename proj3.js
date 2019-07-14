class Person{ // Person class: Contains the name, health status and current health issues
	constructor(name, health, healthIssue){
	this.name = name;
	this.health = health; // Good, Poor, Dead
	this.healthIssue = healthIssue; // Specific issue, broken arm etc.
	}
}

class Wagon{ // Wagon class: Contains the starting type, settler array and item numbers
	constructor(startType, settlers, oxenNum, foodLbs, clothesSet, wheels, tongues, axels){
		this.startType = startType; //Banker(1), Carpender(2) or Farmer(3)
		this.settlers = settlers; // Array of Person classes
		// Other various items we need
		this.oxenNum = oxenNum;
		this.foodLbs = foodLbs;
		this.clothesSet = clothesSet;
		this.wheels = wheels;
		this.tongues = tongues;
		this.axels = axels;
	}
}


class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    scale(n) {
        return new Rect(
            this.x * n,
            this.y * y,
            this.width * width,
            this.height * height
        );
    }

    translate(dx, dy) {
        return new Rect(
            this.x + dx,
            this.y + dy,
            this.width,
            this.height
        );
    }
}


function getPixelRGBA(pixelData, x, y, width, height) {
    let i = 4 * (x + y * width);
    return [
        pixelData[    i],
        pixelData[1 + i],
        pixelData[2 + i],
        pixelData[3 + i],
    ];
}


function setPixelRGBA(pixelData, x, y, width, height, pixel) {
    let i = 4 * (x + y * width);
    pixelData[    i] = pixel[0];
    pixelData[1 + i] = pixel[1];
    pixelData[2 + i] = pixel[2];
    pixelData[3 + i] = pixel[3];
}


/*
 * returns a Promise. get result with 'await'
 */
function requestImage(url) {
    return new Promise(r => {
        let i = new Image();
        i.onload = (() => r(i));
        i.src = url;
    });
}

/* 
 * returns a Promise. get result with 'await'
 */
function requestMaskedImage(image, mask) {
    return new Promise(async resolve => {
        if (!mask) {
            resolve(image);
            return;
        }
        let canvas = $('<canvas/>')[0];
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        let imgData = context.getImageData(0, 0, image.width, image.height);
        let pixelData = imgData.data;
        for (var y = 0; y < image.height; y++) {
            for (var x = 0; x < image.width; x++) {
                let p = getPixelRGBA(pixelData, x, y, image.width, image.height);
                if (p[0] == mask[0] && p[1] == mask[1] && p[2] == mask[2]) {
                    setPixelRGBA(pixelData, x, y, image.width, image.height, [0, 0, 0, 0]);
                }
            }
        }
        context.putImageData(imgData, 0, 0);
        let imageSrc = canvas.toDataURL('image/png');
        let maskedImage = await requestImage(imageSrc);
        resolve(maskedImage);
    });
}


/*
 * UniformSpritesheet object:
 * required:
 *      image
 * optional:
 *      rows (default: 1)
 *      cols (default: 1)
 *      width in pixels (default: image.width / cols)
 *      height in pixels (default: image.height / rows)
 *      xoff in pixels (default: 0)
 *      yoff in pixels (default: 0)
 */
class UniformSpritesheet {
    constructor(options) {
        this.image = options.image;
        this.rows = ('rows' in options)? options.rows : 1;
        this.cols = ('cols' in options)? options.cols : 1;
        this.xoff = ('xoff' in options)?  options.xoff : 0;
        this.yoff = ('yoff' in options)?  options.yoff : 0;
        this.width = ('width' in options)?
            options.width :
            parseInt(this.image.width / this.cols);
        this.height = ('height' in options)?
            options.height :
            parseInt(this.image.height / this.rows);
    }

    /*
     * draw sprite from this spritesheet
     *
     * required:
     *      rect:
     *          x (unit length: [0, 1], left to right)
     *          y (unit length: [0, 1], top to bottom)
     *          width (unit length, positive scalar)
     *          height (unit length, positive scalar)
     *      context
     * optional:
     *      row (default: 0)
     *      col (default: 0)
     */
    drawSprite(options) {
        let cvWidth = options.context.canvas.width;
        let cvHeight = options.context.canvas.height;
        let x = options.rect.x * cvWidth;
        let y = options.rect.y * cvHeight;
        let width = options.rect.width * cvWidth;
        let height = options.rect.height * cvHeight;
        let row = ('row' in options)? options.row : 0;
        let col = ('col' in options)? options.col : 0;

        options.context.drawImage(
            this.image,
            col * this.width + this.xoff,
            row * this.height + this.yoff,
            this.width,
            this.height,
            x,
            y,
            width,
            height
        );
    }

}


/*
 * OregonTrailGame object
 */
class OregonTrailGame {
    constructor() {
        let $game = $('.game');
        let canvas = $('<canvas/>').width('100%').height('100%')[0];
        canvas.width = $game.width();
        canvas.height = $game.height();

        this.context = canvas.getContext('2d');
        this.context.imageSmoothingEnabled = false;
        this.images = {};
        this.sprites = {};

        $game.append(canvas);
    }

    loadImages(name_url_pairs) {
        return new Promise(async resolve => {
            let deferred = {};
            for (var name in name_url_pairs) {
                deferred[name] = requestImage(name_url_pairs[name].url);
            }
            for (var name in deferred) {
                this.images[name] = await deferred[name], name_url_pairs[name].mask;
                this.images[name] = await requestMaskedImage(this.images[name], name_url_pairs[name].mask);
            }
            resolve(this);
        });
    };

    clear() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    loadSpritesheets() {
        this.sprites.oxenWalking = new UniformSpritesheet({
            image: this.images.ot_misc,
            rows: 2,
            cols: 1,
            width: 97,
            height: 29,
        });

        this.sprites.hills = new UniformSpritesheet({
            image: this.images.ot_misc,
            width: 279,
            height: 11,
            xoff: 5,
            yoff: 278,
        });

        this.sprites.mountains = new UniformSpritesheet({
            image: this.images.ot_misc,
            width: 279,
            height: 17,
            xoff: 5,
            yoff: 291,
        });

        this.sprites.river_crossing = new UniformSpritesheet({
            image: this.images.ot_misc,
            width: 64,
            height: 23,
            xoff: 201,
            yoff: 58,
        });

    }
}


class WalkingAnimation {
    constructor(game) {
        this.game = game;
        this.ids = {
            oxen: null,
            background: null,
            river: null,
        };
        this.rects = {
            oxen:       new Rect(0.75, 0.2, 0.2, 0.1),
            background: new Rect(0, 0.1, 1, 0.06),
            river:      new Rect(0, 0.2, 0.2, 0.1),
        };
        this.oxen_state = 0;
        this.dx_background = 0.005;
        this.dx_river = 0.01;
        this.river_stop = this.rects.oxen.x - this.rects.river.width;
    }

    walk(background_name) {
        if (!this.ids.oxen) {
            this.ids.oxen = window.setInterval(() => {
                this.game.sprites.oxenWalking.drawSprite({
                    row: this.oxen_state,
                    col: 0,
                    rect: this.rects.oxen,
                    context: this.game.context,
                });

                this.oxen_state ^= 1; // swap between 0 & 1
            }, 500);
        }

        if (!this.ids.background) {
            this.ids.background = window.setInterval(() => {
                let background = this.rects.background;
                if (background.x >= 1) {
                    background.x -= 1;
                }
                this.game.sprites[background_name].drawSprite({
                    rect: background.translate(-background.width, 0),
                    context: this.game.context,
                });
                this.game.sprites[background_name].drawSprite({
                    rect: background,
                    context: this.game.context,
                });
                background.x += this.dx_background;
            }, 40);
        }
    }

    approachRiver() {
        this.rects.river.x = -this.rects.river.width;
        if (!this.ids.river) {
            this.ids.river = window.setInterval(() => {
                let river = this.rects.river;
                if (river.x >= this.river_stop)
                    this.stop();
                this.game.context.clearRect(
                    (river.x - this.dx_river) * this.game.context.canvas.width - 1,
                    river.y * this.game.context.canvas.height,
                    this.dx_river * this.game.context.canvas.width + 1,
                    river.height * this.game.context.canvas.height
                );
                this.game.sprites.river_crossing.drawSprite({
                    rect: river,
                    context: this.game.context,
                });
                river.x += this.dx_river;
            }, 40);
        }
    }

    stop() {
        for (var id in this.ids) {
            if (this.ids[id])
                window.clearInterval(this.ids[id]);
            this.ids[id] = null;
        }
    }
}


var imageInfo = {
    ot_locations: { url: 'sprites/ot_locations.gif',
                      mask: null },
    ot_misc:      { url: 'sprites/ot_misc.gif',
                      mask: null },
    title_graphic:{ url: 'sprites/title_graphic.png',
                      mask: null },
    trail_title:  { url: 'sprites/trail_title.png',
                      mask: null },
};


/*
 * entry point
 */
$(async () => {
    var game = new OregonTrailGame();
    await game.loadImages(imageInfo);
    game.loadSpritesheets();

    var oxenAnim = new WalkingAnimation(game);
    oxenAnim.walk('mountains');
    window.setTimeout(() => { oxenAnim.approachRiver(); }, 100);
    window.setTimeout(() => { oxenAnim.stop(); }, 10000);

    /* Get user input and store for gameplay use

        1. Banker, carpenter, or farmer
            - determines scoring and starting money

        2. Player name and 4 names for rest of party
            - We hould use 4 predetermined names for now and worry
              about custom names later

        3. Start month
            - March, April, May, June, July

        4. Supplies
            - oxen, food, clothing, ammo?, spare parts
    */

});
