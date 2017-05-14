/*
 * In this file you can specify all sort of initializers
 *  We provide an example of simple initializer that generates points withing a cube.
 */

function VoidInitializer ( opts ) {
    this._opts = opts;
    return this;
};

VoidInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {};


////////////////////////////////////////////////////////////////////////////////
// Splash Initializer
////////////////////////////////////////////////////////////////////////////////

function SplashInitializer ( opts ) {
    this._opts = opts;
    return this;
};

SplashInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var pos = new THREE.Vector3( 1.0 - 2.0 * Math.random(),
                                     1.0 - 2.0 * Math.random(),
                                     1.0 - 2.0 * Math.random() );
        pos.add(base_pos);
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

SplashInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var vel = base_vel;
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

SplashInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var col = base_col;

        col.x = 0.2;
        col.y = 0.2;
        col.z = 1-0.5*Math.random();

        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

SplashInitializer.prototype.initializeTextures = function ( textures, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var texture = 0;

        setElement( idx, textures, texture );
    }
    sizes.needUpdate = true;
}


SplashInitializer.prototype.initializeBounced = function ( bounced, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var bounce = false;

        setElement( idx, bounced, bounce );
    }
    bounced.needUpdate = true;
}

SplashInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var size = this._opts.size;

        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

SplashInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
SplashInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

   // this.initializeTextures( particleAttributes.textures, toSpawn );

   // this.initializeBounced( particleAttributes.bounced, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};