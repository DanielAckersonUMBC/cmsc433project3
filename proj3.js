class Person{ // Person class
	constructor(name, health, healthIssue){
	this.name = name;
	this.health = health; // Good, Poor, Dead
	this.healthIssue = healthIssue; // Specific issue, broken arm etc.
	}
}

class Wagon{ // Wagon class
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


function maskImage(image, mask) {
    let canvas = $('<canvas/>').width(512).height(512)[0];
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
    return $('<image src="' + imageSrc +'"/>')[0];
}


/*
 * UniformSpritesheet object:
 * required:
 *      image
 *      rows
 *      cols
 * optional:
 *      spriteWidth
 *      spriteHeight
 *      xoff
 *      yoff
 */
function UniformSpritesheet(options) {
    this.image = options.image;
    this.rows = options.rows;
    this.cols = options.cols;

    ('spriteWidth' in options)?
        this.spriteWidth = options.spriteWidth :
        this.spriteWidth = parseInt(this.image.width / this.cols);

    ('spriteHeight' in options)?
        this.spriteHeight = options.spriteHeight :
        this.spriteHeight = parseInt(this.image.height / this.rows);

    ('xoff' in options)?
        this.xoff = options.xoff :
        this.xoff = 0;

    ('yoff' in options)?
        this.yoff = options.yoff :
        this.yoff = 0;

    this.drawSprite = function(options) {
        options.context.drawImage(
            this.image,
            options.col * this.spriteWidth + this.xoff,
            options.row * this.spriteHeight + this.yoff,
            this.spriteWidth,
            this.spriteHeight,
            options.x,
            options.y,
            options.scale * this.spriteWidth,
            options.scale * this.spriteHeight
        );
    };
}


/*
 * returns a Promise. get result with 'await'
 */
function loadImage(url) {
    return new Promise(r => {
        let i = new Image();
        i.onload = (() => r(i));
        i.src = url;
    });
}


/*
 * OregonTrailGame object
 */
function OregonTrailGame() {
    let game = $('.game');
    this.canvas = $('<canvas/>').width('100%').height('100%')[0];
    this.canvas.width = game.width();
    this.canvas.height = game.height();
    this.context = this.canvas.getContext('2d');
    $('.game').append(this.canvas);
    this.images = {};

    this.loadImages = async (name_url_pairs) => {
        let deferred = {};
        for (var name in name_url_pairs) {
            deferred[name] = loadImage(name_url_pairs[name].url);
        }
        for (var name in deferred) {
            this.images[name] = await deferred[name];
            if (name_url_pairs[name].mask) {
                this.images[name] = maskImage(this.images[name], name_url_pairs[name].mask);
            }
        }
    };
}


/*
 * entry point
 */
$(async () => {
    var game = new OregonTrailGame();
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    await game.loadImages({
        'animals':      { url: 'sprites/Animals.png',
                          mask: null },
        'event':        { url: 'sprites/Event.png',
                          mask: null },
        'event2':       { url: 'sprites/Event2.png',
                          mask: null },
        'eventsnow':    { url: 'sprites/EventSnow.png',
                          mask: null },
        'eventsnow2':   { url: 'sprites/EventSnow2.png',
                          mask: null },
        'hunting':      { url: 'sprites/Hunting.png',
                          mask: null },
        'hunting2':     { url: 'sprites/Hunting2.png',
                          mask: null },
        'huntingsnow':  { url: 'sprites/HuntingSnow.png',
                          mask: null },
        'huntingsnow2': { url: 'sprites/HuntingSnow2.png',
                          mask: null },
        'locations':    { url: 'sprites/Locations.png',
                          mask: null },
        'oxen':         { url: 'sprites/Oxen.png',
                          mask: null },
        'people':       { url: 'sprites/People.png',
                          mask: [255, 0, 128] },
        'river':        { url: 'sprites/River.png',
                          mask: null },
        'ot_locations': { url: 'sprites/ot_locations.gif',
                          mask: null },
        'ot_misc':      { url: 'sprites/ot_misc.gif',
                          mask: null },
    });

    var people = new UniformSpritesheet({
        image: game.images['people'],
        rows: 6,
        cols: 4,
    });
    people.drawSprite({
        row: 0,
        col: 2,
        x: 10,
        y: 10,
        scale: 1,
        context: game.context,
    });
});
