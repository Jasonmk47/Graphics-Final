
var Main = Main || { };


// called when the gui params change and we need to update mesh
Main.particleSystemChangeCallback = function ( InputSettings ) {

    // Get rid of an old system
    ParticleEngine.stop();
    for ( var i = 0 ; i < ParticleEngine._emitters.length ; ++i ) {
        Scene.removeObject( ParticleEngine.getDrawableParticles( i ) );
    }
    ParticleEngine.removeEmitters();
    ParticleEngine.removeAnimations();

    // Get rid of old models
    Scene.removeObjects();

    // Create new system
    var initializer = new InputSettings.initializerFunction ( InputSettings.initializerSettings );

    var updater     = new InputSettings.updaterFunction ( InputSettings.updaterSettings );

    var emitter     = new Emitter( {
        maxParticles:  InputSettings.maxParticles,   // how many particles can be generated by this emitter?
        particlesFreq: InputSettings.particlesFreq,  // how many particle per second will we emit?
        initialize:    initializer,                  // initializer object
        update:        updater,                      // updater object
        material:      InputSettings.particleMaterial,
        width:         InputSettings.width,
        height:        InputSettings.height,
    } );

    ParticleEngine.addEmitter ( emitter );

    // Add new particle system
    ParticleEngine.start();

    // Add the particle system
    for ( var i = 0 ; i < ParticleEngine._emitters.length ; ++i ) {
        Scene.addObject( ParticleEngine.getDrawableParticles( i ) );
    }

    // Create the scene
    InputSettings.createScene();
};

// when HTML is finished loading, do this
window.onload = function() {
    Student.updateHTML();

    // Setup renderer, scene and gui
    Gui.init( Main.controlsChangeCallback,
              Main.displayChangeCallback );
    Scene.create();

    // Add particle system
    Main.particleSystemChangeCallback( SystemSettings.splash );

    Renderer.create( Scene, document.getElementById("canvas") );

    Renderer.update();
};
