import * as me from 'melonjs';
import { destroyEnemy } from '../actions';
import game from '../game';

class PathEnemyEntity extends me.Entity{

    tokenId = 0;
    startX: number;
    endX: number;
    walkLeft: boolean;
    isMovingEnemy: boolean;
    particleTint: string;

    /**
     * constructor
     */
    constructor(x: number, y: number, settings: { width: any; framewidth: any; height: any; frameheight: any; shapes: any; velX?: any; velY?: any; name?: string | undefined; id?: string | undefined; image?: string | (new (width?: number | undefined, height?: number | undefined) => HTMLImageElement) | undefined; anchorPoint?: any; type?: string | undefined; collisionMask?: number | undefined; }) {

        // save the area size defined in Tiled
        var width = settings.width || settings.framewidth;

        // adjust the setting size to the sprite one
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the super constructor
        super(x, y, settings);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.walkLeft = false;

        // body walking & flying speed
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // only check for collision against player and world shape
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.WORLD_SHAPE);

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;

        // default tint for particles
        this.particleTint = "#FFF";
    }


    /**
     * manage the enemy movement
     */
    update(dt: any) {

        if (this.alive) {
            if (this.walkLeft === true)
                if (this.pos.x <= this.startX) {
                    // if reach start position
                    this.walkLeft = false;
                    this.renderable.flipX(true);
                } else {
                    this.body.force.x = -this.body.maxVel.x;
                }
            }

            if (this.walkLeft === false) {
                if (this.pos.x >= this.endX) {
                    // if reach the end position
                    this.walkLeft = true;
                    this.renderable.flipX(false);
                } else {
                    this.body.force.x = this.body.maxVel.x;
                }
        }

        // return true if we moved of if flickering
        return super.update(dt);
    }

    /**
     * collision handle
     */
    onCollision(response: { overlapV: { y: number; }; a: { body: me.Body }; }) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
            // make it dead
            this.alive = false;
            //avoid further collision and delete it
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            // make the body static
            this.body.setStatic(true);
            // set dead animation
            // this.renderable.setCurrentAnimation("dead"); // TODO Reimplemnt

            var emitter = new me.ParticleEmitter(this.centerX, this.centerY);
            /**
             * , {
                width: this.width / 4,
                height : this.height / 4,
                tint: this.particleTint,
                totalParticles: 32,
                angle: 0,
                angleVariation: 6.283185307179586,
                maxLife: 5,
                speed: 3
            });
             */

            me.game.world.addChild(emitter,this.pos.z);
            me.game.world.removeChild(this);
            emitter.burstParticles();

            // dead sfx
            me.audio.play("enemykill", false);
            // give some score
            // game.data.score += 150;

            destroyEnemy(BigInt(this.tokenId));

        }

        return false;
    }

};

/**
 * An Slime enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class SlimeEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x: any, y: any, settings: any) {
        // super constructor
        super(x, y, settings);

        this.tokenId = 2;

        // set a renderable
        const sprite = game.valueOf().texture.createAnimationFromName([
            "slime_normal.png", "slime_walk.png", "slime_dead.png"
        ]) as me.Sprite;

        

    

        // custom animation speed ?
        if (settings.animationspeed) {
            sprite.animationspeed = settings.animationspeed;
        }
        // walking animatin
        sprite.addAnimation("walk", ["slime_normal.png", "slime_walk.png"]);
        // dead animatin
        sprite.addAnimation("dead", ["slime_dead.png"]);

        // set default one
        sprite.setCurrentAnimation("walk");
        
        this.renderable = sprite;
        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        // particle tint matching the sprite color
        this.particleTint = "#FF35B8";

    }
};

/**
 * An Fly enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class FlyEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x: any, y: any, settings: any) {
        // super constructor
        super(x, y, settings);

        this.tokenId = 1;

        // set a renderable
        const sprite = game.valueOf().texture.createAnimationFromName([
            "fly_normal.png", "fly_fly.png", "fly_dead.png"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            sprite.animationspeed = settings.animationspeed;
        }

        // walking animatin
        sprite.addAnimation ("walk", ["fly_normal.png", "fly_fly.png"]);
        // dead animatin
        sprite.addAnimation ("dead", ["fly_dead.png"]);

        // set default one
        sprite.setCurrentAnimation("walk");

        this.renderable = sprite;

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        // particle tint matching the sprite color
        this.particleTint = "#000000";

    }
};
