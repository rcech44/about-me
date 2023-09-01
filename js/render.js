const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
        const createScene = function () {
            // Creates a basic Babylon Scene object
            const scene = new BABYLON.Scene(engine);
            // Creates and positions a free camera
            const camera = new BABYLON.FreeCamera("camera1", 
                new BABYLON.Vector3(0, 5, -10), scene);
            // Targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
            // Creates a light, aiming 0,1,0 - to the sky
            const light = new BABYLON.HemisphericLight("light", 
                new BABYLON.Vector3(0, 1, 0), scene);
            // Dim the light a small amount - 0 to 1
            light.intensity = 0.7;

            //Create Village ground
            // const groundMat = new BABYLON.StandardMaterial("groundMat");
            // groundMat.diffuseTexture = new BABYLON.Texture("assets/render_assets/terrain_texture.png");
            // groundMat.diffuseTexture.hasAlpha = true;
            // groundMat.diffuseTexture.uScale = 10;
            // groundMat.diffuseTexture.vScale = 10;

            // const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24}, scene);
            // ground.material = groundMat;

            //large ground
            const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
            largeGroundMat.diffuseTexture = new BABYLON.Texture("file://wsl.localhost/Ubuntu-22.04/home/ubuntu/Code/about-me/assets/render_assets/terrain_texture.png");

            const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "assets/render_assets/height_map.png", 
                {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 4}, scene);
            largeGround.material = largeGroundMat;
            largeGround.position.y = -0.01;

            return scene;
        };
        const scene = createScene(); //Call the createScene function
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
                scene.render();
        });
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });