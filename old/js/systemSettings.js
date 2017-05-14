var SystemSettings = SystemSettings || {};

SystemSettings.standardMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/waterfall.png' )  }
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.secondaryMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/waterspray.png' )  }
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );



////////////////////////////////////////////////////////////////////////////////
// Splash system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.splash = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,
    secondaryMaterial : SystemSettings.secondaryMaterial,

    // Initialization
    initializerFunction : SplashInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, -10.0, 0.0),
        lifetime: 7,
        size:     5.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -30, 0),
            attractors : [],
        },
        collidables: {
            bounceSpheres : [ {sphere : new THREE.Vector4( 0, 0, 0, 10.0 ), damping : 0.5 }, 
                            {sphere : new THREE.Vector4( -50, 0, 0, 10.0 ), damping : 0.5 },
                            {sphere : new THREE.Vector4( 50, 0, 0, 10.0 ), damping : 0.5 } ],
            sinkPlanes : [ { plane : new THREE.Vector4( 0, -10, 0, 0 ) } ],
        },
    },

    // Scene
    maxParticles :  10000,
    particlesFreq : 1000,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 10, 10, 10 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0xeeeeee, emissive:0xeeeedd, side: THREE.DoubleSide } );
        var sphere1 = new THREE.Mesh( sphere_geo, phong )
        var sphere2 = new THREE.Mesh( sphere_geo, phong )
        var sphere3 = new THREE.Mesh( sphere_geo, phong )

        sphere1.position.set (-50.0, 0.0, 0.0);
        sphere2.position.set (0.0, 0.0, 0.0);
        sphere3.position.set (50.0, 0.0, 0.0);

        Scene.addObject( sphere1 );
        Scene.addObject( sphere2 );
        Scene.addObject( sphere3 );
    },
};