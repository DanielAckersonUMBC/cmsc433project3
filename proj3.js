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

    ('alphaColor' in options)?
        this.alphaColor = options.alphaColor :
        this.alphaColor = null;

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

function loadImage(url) {
    return new Promise(r => {
        let i = new Image();
        i.onload = (() => r(i));
        i.src = url;
    });
}

function OregonTrailGame() {
    this.canvas = $('<canvas/>').width(640).height(480)[0];
    this.context = this.canvas.getContext('2d');
    $('.game').append(this.canvas);
    this.images = {};

    this.loadImages = async (name_url_pairs) => {
        let deferred = {};
        for (var name in name_url_pairs) {
            deferred[name] = loadImage(name_url_pairs[name]);
        }
        for (var name in deferred) {
            this.images[name] = await deferred[name];
        }
    };
}

$(async () => {
    var game = new OregonTrailGame();
    game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    await game.loadImages({
        'animals': 'sprites/Animals.png',
        'event': 'sprites/Event.png',
        'event2': 'sprites/Event2.png',
        'eventsnow': 'sprites/EventSnow.png',
        'eventsnow2': 'sprites/EventSnow2.png',
        'hunting': 'sprites/Hunting.png',
        'hunting2': 'sprites/Hunting2.png',
        'huntingsnow': 'sprites/HuntingSnow.png',
        'huntingsnow2': 'sprites/HuntingSnow2.png',
        'locations': 'sprites/Locations.png',
        'oxen': 'sprites/Oxen.png',
        'people': 'sprites/People.png',
        'river': 'sprites/River.png',
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
        scale: 0.25,
        context: game.context,
    });
});
