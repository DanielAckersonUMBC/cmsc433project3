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
 *      rows
 *      cols
 * optional:
 *      spriteWidth in pixels
 *      spriteHeight in pixels
 *      xoff in pixels
 *      yoff in pixels
 */
function UniformSpritesheet(options) {
    this.image = options.image;
    this.rows = options.rows;
    this.cols = options.cols;

    this.spriteWidth = ('spriteWidth' in options)?
        options.spriteWidth :
        parseInt(this.image.width / this.cols);

    this.spriteHeight = ('spriteHeight' in options)?
        options.spriteHeight :
        parseInt(this.image.height / this.rows);

    this.xoff = ('xoff' in options)?  options.xoff : 0;
    this.yoff = ('yoff' in options)?  options.yoff : 0;

    /*
     * draw sprite from this spritesheet
     *
     * required:
     *      row
     *      col
     *      x (unit length: [0, 1], left to right)
     *      y (unit length: [0, 1], top to bottom)
     *      width (unit length, positive scalar)
     *      height (unit length, positive scalar)
     *      context
     */
    this.drawSprite = function(options) {
        let cvWidth = options.context.canvas.width;
        let cvHeight = options.context.canvas.width;
        let x = options.x * cvWidth;
        let y = options.y * cvHeight;
        let width = options.width * this.spriteWidth;
        let height = options.height * this.spriteHeight;

        options.context.drawImage(
            this.image,
            options.col * this.spriteWidth + this.xoff,
            options.row * this.spriteHeight + this.yoff,
            this.spriteWidth,
            this.spriteHeight,
            x,
            y,
            width,
            height
        );
    };
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
 * OregonTrailGame object
 */
function OregonTrailGame() {
    let $game = $('.game');
    let canvas = $('<canvas/>').width('100%').height('100%')[0];
    canvas.width = $game.width();
    canvas.height = $game.height();

    this.context = canvas.getContext('2d');
    this.images = {};

    this.loadImages = (name_url_pairs) => {
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

    this.clear = () => {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    $game.append(canvas);
}


imageInfo = {
    animals:      { url: 'sprites/Animals.png',
                      mask: null },
    event:        { url: 'sprites/Event.png',
                      mask: null },
    event2:       { url: 'sprites/Event2.png',
                      mask: null },
    eventsnow:    { url: 'sprites/EventSnow.png',
                      mask: null },
    eventsnow2:   { url: 'sprites/EventSnow2.png',
                      mask: null },
    hunting:      { url: 'sprites/Hunting.png',
                      mask: null },
    hunting2:     { url: 'sprites/Hunting2.png',
                      mask: null },
    huntingsnow:  { url: 'sprites/HuntingSnow.png',
                      mask: null },
    huntingsnow2: { url: 'sprites/HuntingSnow2.png',
                      mask: null },
    locations:    { url: 'sprites/Locations.png',
                      mask: null },
    oxen:         { url: 'sprites/Oxen.png',
                      mask: null },
    people:       { url: 'sprites/People.png',
                      mask: [255, 0, 128] },
    river:        { url: 'sprites/River.png',
                      mask: null },
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
    game.clear();
    await game.loadImages(imageInfo);

    var people = new UniformSpritesheet({
        image: game.images.people,
        rows: 6,
        cols: 4,
    });
    people.drawSprite({
        row: 0,
        col: 2,
        x: 0.2,
        y: 0.2,
        width: 0.5,
        height: 0.4,
        context: game.context,
    });
});
