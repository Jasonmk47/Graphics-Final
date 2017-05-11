/*
 * In this file you can specify all sort of initializers
 *  We provide an example of simple initializer that generates points withing a cube.
 */


function VoidInitializer ( opts ) {
    this._opts = opts;
    return this;
};

VoidInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

};
////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function SphereInitializer ( opts ) {
    this._opts = opts;
    return this;
};

SphereInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        // from lecture slides (21)
        var z = Math.random() * 2 * r - r;
        var phi = Math.random() * 2 * Math.PI;
        var d = Math.sqrt(r*r - z*z);
        var pos = new THREE.Vector3(base.x + d * Math.cos(phi),
                                    base.y + d * Math.sin(phi),
                                    base.z + z);

        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

SphereInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // just to get started, make the velocity the same as the initial position
        var pos = getElement( idx, positions );
        var vel = pos.clone().multiplyScalar(5.0);

        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

SphereInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var col = base_col;

        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

SphereInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var size = this._opts.size;

        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

SphereInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
SphereInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};



////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function FountainInitializer ( opts ) {
    this._opts = opts;
    return this;
};

FountainInitializer.prototype.initializePositions = function ( positions, toSpawn) {
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

FountainInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var vel = base_vel;

        vel.x = 10 - 20*Math.random();
        vel.z = 10 - 20*Math.random();
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

FountainInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
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

FountainInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var size = this._opts.size;

        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

FountainInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
FountainInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};