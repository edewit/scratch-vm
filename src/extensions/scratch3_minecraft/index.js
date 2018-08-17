const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const storeys = require('storeys');
const cryptJS = require('jsencrypt');
const EventBus = require('vertx-bus-client');

const log = require('../../util/log');

const blockIconURI = 'data:image/png;base64,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';

class Minecraft {
    constructor() {
        this.eventsReceived = [];
        this.code;

        var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

        var urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);

        var crypt = new cryptJS.JSEncrypt(512);
        var eb = new EventBus(urlParams.eventBusURL);

        this.minecraft = new storeys.Minecraft(eb);
        var _this = this;

        eb.onopen = () => {
            if (typeof (urlParams.code !== 'undefined')) {
                crypt.getKey(function() {
                    _this.minecraft.login(urlParams.code, crypt.getPublicKeyB64()).subscribe(response => {
                        var id = crypt.decrypt(response.secret);
                        crypt = new cryptJS.JSEncrypt();
                        crypt.setPublicKey(response.key);
                        _this.code = crypt.encrypt(id);
                    });
                });
            }
        }
    }

    /**
     * @return {object} This extension's metadata.
     */
    getInfo() {
        return {
            id: 'minecraft',
            name: 'Minecraft',
            menuIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'whenEvent',
                    blockType: BlockType.HAT,
                    text: 'when [EVENT]',
                    arguments: {
                        EVENT: {
                            type: ArgumentType.STRING,
                            menu: 'menuEvents',
                            defaultValue: 'playerJoined'
                        }
                    }
                },
                {
                    opcode: 'whenEntity',
                    blockType: BlockType.HAT,
                    text: 'when [ENTITY] [INTERACTION]',
                    arguments: {
                        ENTITY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Entity'
                        },
                        INTERACTION: {
                            type: ArgumentType.STRING,
                            menu: 'menuInteraction',
                            defaultValue: 'rightClicked'
                        }
                    }
                },
                {
                    opcode: 'whenInside',
                    blockType: BlockType.HAT,
                    text: 'when inside [X1] [Y1] [Z1] [X2] [Y2] [Z2]',
                    arguments: {
                        X1: { type: ArgumentType.NUMBER, defaultValue: 10},
                        Y1: { type: ArgumentType.NUMBER, defaultValue: 10},
                        Z1: { type: ArgumentType.NUMBER, defaultValue: 10},
                        X2: { type: ArgumentType.NUMBER, defaultValue: 10},
                        Y2: { type: ArgumentType.NUMBER, defaultValue: 10},
                        Z2: { type: ArgumentType.NUMBER, defaultValue: 10}
                    }
                },
                {
                    opcode: 'narrate',
                    blockType: BlockType.COMMAND,
                    text: '[ENTITY] speaks [TEXT]',
                    arguments: {
                        ENTITY: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Entity'
                        },
                        TEXT: {
                            type: ArgumentType.STRING
                        }
                    }
                },
                {
                    opcode: 'minecraftCommand',
                    blockType: BlockType.COMMAND,
                    text: '/[COMMAND]',
                    arguments: {
                        COMMAND: {
                            type: ArgumentType.STRING,
                            defaultValue: 'demo'
                        }
                    }
                },
                {
                    opcode: 'showTitle',
                    blockType: BlockType.COMMAND,
                    text: 'title [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Welcome!'
                        }
                    }
                },
                {
                    opcode: 'getPlayerItemHeld',
                    blockType: BlockType.REPORTER,
                    text: 'Item held'
                }
            ],
            menus: {
                menuEvents: [
                    {
                        value: 'playerJoined',
                        text: 'Player joins'
                    }
                ],
                menuInteraction: [
                    {
                        value: 'rightClicked',
                        text: 'right clicked'
                    }
                ]
            },
            // translations
            translation_map: {
                fr: {
                },
                de: {
                },
                nl: {
                }
            }
        };
    }

    whenEvent(args) {
        return false;
    }

    whenEntity(args) {
        return false;
    }

    whenInside(args) {
        return false;
    }

    getPlayerItemHeld(args) {
        return this.minecraft.getPlayerItemHeld(this.code, storeys.HandItem.HandItem).toPromise();
    }

    narrate(args, callback) {
        this.minecraft.narrate(this.code, args.ENTITY, args.TEXT).subscribe(() => log('narrate called'), err => log('error:', err));
    }

    minecraftCommand(args) {
    }

    showTitle(args, callback) {
        this.minecraft.showTitle(this.code, args.TEXT).subscribe(() => log('showTitle called'), err => log('error:', err));
    }
}

module.exports = Minecraft;
