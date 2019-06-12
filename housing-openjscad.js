//
// This file is a 3d model of the BFO-9000 PCB with attached keyswitches and microcontroller.
// This is then subtracted from some planks of wood to make a housing for the Waffletone.
//
// TO VIEW THIS FILE
// 
// 1. Visit https://openjscad.org/
// 2. Drag this file from your computer into the dotted box in the lower left corner.
// 3. After it processes, use the scroll wheel to zoom out
// 
// The planks are meant to be cut on a CNC machine.
// The thickness of the wood is set in the HOUSING_THICK_* variables.
// At the end of this file are 2 variables, Z_EXPLODE and X_EXPLODE, which move and disassemble the
// parts so you can see inside.  Set them both to 0 to reassamble.
//
// To convert this into SVG for a CNC machine, you have to first export it as an OBJ or STL model
// somehow, from OpenJSCAD.  Then use https://slic3r.org/ to make cross sections and export as SVG.
// 
// These dimensions were measured from real life objects but I haven't tried cutting the wood
// and fitting everything together yet.
//
// z is up
// dimensions are in mm
// origin at lower left of key grid

const HOLE_RESOLUTION = 8;
const EPSILON = 0.001;
const SQUEEZE = 1; // added space to allow things to fit easitly

// TODO: add squeeze to nubs

const NUM_KEYS_X = 9;
const NUM_KEYS_Y = 6;

const INCH = 25.4; // mm
// 1/2 IN = 12.7
// 1/4 IN = 6.35 mm
// 1/8 IN = 3.175

// housing
const HOUSING_PADDING_SIDE = 10;
const HOUSING_PADDING_TOP = 20;
const HOUSING_PADDING_BOTTOM = 100;
const HOUSING_THICK_BASE = 6.3;
const HOUSING_THICK_MID = 6.3;
const HOUSING_THICK_TOP = 6.3;  // max ~12 to avoid hiding keys (half inch)

// keyswitches
const KEY_SPACING = 19.05;
const KEY_RAD = 14/2; // horizontal radius of the key footprint
const KEY_HEIGHT = 11;  // not counting stem
const STEM_RAD = 2;  // horiz radius of key stem
const STEM_HEIGHT = 4;  // height of stem by itself
const CHERRY_GRID = 1.27
const FOOT_HEIGHT = 3;
const LEAD_HEIGHT = 3.2;
const BIG_FOOT_RAD = 4/2;
const SMALL_FOOT_RAD = 1.7/2;
const THROUGH_HOLE_RAD = 1.5/2;

// main bfo-9000 pcb
const BFO_THICK = 1.5;
const BFO_BIG_NUB_WIDTH = 42.1;
const BFO_NUB_DEPTH = 4.6;
const BFO_SMALL_NUB_WIDTH = 6.9;
const BFO_SCREW_HOLE_RAD = 4/2;  // 4/2
const BFO_TOTAL_DEPTH = KEY_SPACING * NUM_KEYS_Y + BFO_NUB_DEPTH;
const BFO_TOTAL_WIDTH = KEY_SPACING * NUM_KEYS_X;
const BFO_OVER_NUB_CLEARANCE = 2;

const BFO_UNDER_CLEARANCE_TRUE = 3;  // how much components protrude from the underside of the PCB
const BFO_UNDER_CLEARANCE_THRU = HOUSING_THICK_MID - BFO_THICK + EPSILON;  // go all the way through
const BFO_UNDER_CLEARANCE = Math.max(BFO_UNDER_CLEARANCE_THRU, BFO_UNDER_CLEARANCE_TRUE)

// elite-c pcb
const ELITE_C_WIDTH = 18.5;
const ELITE_C_DEPTH = 33.2;
const ELITE_C_THICK = 0.8;
// usb-c port
const USBC_WIDTH = 8.8;
const USBC_THICK = 3.1;
const USBC_OVERHANG = 0.4; // beyond elite-c pcb
const USBC_DEPTH = 7;  // guess
// elite-c assembly with bfo-9000 pcb
const ELITE_C_SOLDERED_DEPTH = 6.5; // from top surface of main PCB to bottom surface of elite-C pcb
const ELITE_C_OVERHANG = 0.8; // from main PCB to elite-C pcb
const ELITE_C_UNDER_CLEARANCE = 2;  // space needed under pcb for soldering leads

// housing cutaway space for usb port access
const USBC_FINGER_VERT_CLEAR = 5;  // space above and below the usbc socket for cord and finger access
const USBC_FINGER_HORIZ_CLEAR = 10;  // space left and right of the usb socket

// derived numbers
const HOUSING_OVERALL_WIDTH = NUM_KEYS_X * KEY_SPACING + 2 * HOUSING_PADDING_SIDE;
const HOUSING_OVERALL_DEPTH = NUM_KEYS_Y * KEY_SPACING + HOUSING_PADDING_BOTTOM + HOUSING_PADDING_TOP;

// colors
const GRAY = [0.4, 0.4, 0.4];
const SILVER = [0.8, 0.8, 0.8];
const BLUE = [0.5, 0.5, 1];
const GOLD = [1, 0.8, 0.2];
const BROWN = [0.8, 0.6, 0.3];
const CLEAR = [0, 1, 1]; // for clearance volumes
const CLEAR2 = [0, 1, 1];
const RED = [1, 0.2, 0.4];

//================================================================================
// HELPERS

let makeRow = (thing, n, d) => {
    let assembly = thing;
    for (let x = 1; x < n; x++) {
        assembly = assembly.union(thing.translate([
            d[0] * x, d[1] * x, d[2] * x,
        ]));
    }
    return assembly;
}

let makeGrid = (thing, nx, ny, dx, dy) => {
    let myrow = makeRow(thing, nx, [dx, 0, 0]);
    return makeRow(myrow, ny, [0, dy, 0]);
}

//================================================================================
// HOUSING

let housingPlate = (thick) =>
    // origin at key grid origin but with housing plate top surface at altitude zero
    CSG.roundedCube({
        corner1: [
            -HOUSING_PADDING_SIDE,
            -HOUSING_PADDING_BOTTOM,
            -thick,
        ],
        corner2: [
            BFO_TOTAL_WIDTH + HOUSING_PADDING_SIDE,
            BFO_TOTAL_DEPTH + HOUSING_PADDING_TOP,
            0,
        ],
        roundradius: thick/2 * 0.2,
    }).setColor(BROWN);

//================================================================================
// ELITE-C

let eliteC = () =>
    // "elite C" side down; origin at top surface of PCB in bottom left
    union(
        // pcb
        CSG.cube({
            corner1: [0, 0, 0],
            corner2: [ELITE_C_WIDTH, ELITE_C_DEPTH, -ELITE_C_THICK],
        }).setColor(BLUE),
        // usb-c
        CSG.cube({
            corner1: [USBC_WIDTH/2, 0, USBC_THICK],
            corner2: [-USBC_WIDTH/2, -USBC_DEPTH, 0],
        })
        .translate([ELITE_C_WIDTH/2, ELITE_C_DEPTH + USBC_OVERHANG, 0])
        .setColor(SILVER)
    );

let eliteCClearance = () =>
    // TODO: add USB
    union(
        // space around the pcb and between it and the BFO
        CSG.cube({
            corner1: [-SQUEEZE, -SQUEEZE, ELITE_C_SOLDERED_DEPTH - ELITE_C_THICK - EPSILON],
            corner2: [SQUEEZE + ELITE_C_WIDTH, ELITE_C_DEPTH, -ELITE_C_THICK - ELITE_C_UNDER_CLEARANCE],
        }).setColor(CLEAR),
        // tall space in front of the USB port for access by fingers
        //CSG.cube({
        //    corner1: [-SQUEEZE, 100, 50],
        //    corner2: [SQUEEZE + ELITE_C_WIDTH, ELITE_C_DEPTH - ELITE_C_OVERHANG - EPSILON, -50]
        //}).setColor(CLEAR)
        CSG.cube({
            corner1: [ELITE_C_WIDTH/2 - USBC_WIDTH/2 - USBC_FINGER_HORIZ_CLEAR, 100, USBC_THICK + USBC_FINGER_VERT_CLEAR],
            corner2: [ELITE_C_WIDTH/2 + USBC_WIDTH/2 + USBC_FINGER_HORIZ_CLEAR, ELITE_C_DEPTH - ELITE_C_OVERHANG - EPSILON, -USBC_FINGER_VERT_CLEAR]
        }).setColor(CLEAR)
    );

let moveEliteCToPosition = (e) =>
    // moved to position relative to pcb()
    e.translate([
        KEY_SPACING,
        KEY_SPACING * NUM_KEYS_Y - ELITE_C_DEPTH + BFO_NUB_DEPTH + ELITE_C_OVERHANG,
        -ELITE_C_SOLDERED_DEPTH + ELITE_C_THICK
    ]);


//================================================================================
// KEYSWITCHES

// TODO: keycap

let keyUpper = () =>
    // origin at the base
    union(
        // housing
        CSG.cube({
            center: [0, 0, KEY_HEIGHT/2 + EPSILON],
            radius: [KEY_RAD, KEY_RAD, KEY_HEIGHT/2],
        }),
        // stem
        CSG.cube({
            center: [0, 0, KEY_HEIGHT + STEM_HEIGHT/2],
            radius: [STEM_RAD, STEM_RAD, STEM_HEIGHT/2],
        })
    ).setColor(RED);

let keyLower = () =>
    union(
        // big foot
        CSG.cylinder({
            start: [0, 0, EPSILON],
            end: [0, 0, -FOOT_HEIGHT],
            radius: BIG_FOOT_RAD,
            resolution: HOLE_RESOLUTION,
        }),
        // small feet
        CSG.cylinder({
            start: [CHERRY_GRID * 4, 0, EPSILON],
            end: [CHERRY_GRID * 4, 0, -FOOT_HEIGHT],
            radius: SMALL_FOOT_RAD,
            resolution: HOLE_RESOLUTION,
        }),
        CSG.cylinder({
            start: [-CHERRY_GRID * 4, 0, EPSILON],
            end: [-CHERRY_GRID * 4, 0, -FOOT_HEIGHT],
            radius: SMALL_FOOT_RAD,
            resolution: HOLE_RESOLUTION,
        }),
        // through holes
        CSG.cylinder({
            start: [CHERRY_GRID * 2, CHERRY_GRID * 4, EPSILON],
            end: [CHERRY_GRID * 2, CHERRY_GRID * 4, -LEAD_HEIGHT],
            radius: THROUGH_HOLE_RAD,
            resolution: HOLE_RESOLUTION,
        }),
        CSG.cylinder({
            start: [-CHERRY_GRID * 3, CHERRY_GRID * 2, EPSILON],
            end: [-CHERRY_GRID * 3, CHERRY_GRID * 2, -LEAD_HEIGHT],
            radius: THROUGH_HOLE_RAD,
            resolution: HOLE_RESOLUTION,
        })
    ).setColor(GOLD);

let keyLowerClearance = () =>
    // in key space, centered around the bottom of the key
    CSG.cube({
        corner1: [KEY_SPACING/2 + EPSILON, CHERRY_GRID * 5.5, EPSILON],
        corner2: [-CHERRY_GRID * 5.5, -CHERRY_GRID * 5, -BFO_THICK - BFO_UNDER_CLEARANCE - BFO_THICK],  // last "- BFO_THICK" is needed when shifting the plates to avoid cutting a pcb-shaped well
    }).setColor(CLEAR);

let key = () =>
    union(keyLower(), keyUpper());

//================================================================================
// BFO-9000 PCB

let bfoNoNubs = (squeeze) =>
    // origin at lower left of key grid
    CSG.cube({
        corner1: [-squeeze, -squeeze, 0],
        corner2: [
            NUM_KEYS_X * KEY_SPACING + squeeze,
            NUM_KEYS_Y * KEY_SPACING + squeeze,
            -BFO_THICK,
        ],
    })

let bfoPlate = (squeeze) => {
    // origin at lower left of key grid
    return union(
        // main
        bfoNoNubs(squeeze),
        // nub around microcontroller
        CSG.cube({
            corner1: [
                KEY_SPACING,
                NUM_KEYS_Y * KEY_SPACING - EPSILON,
                0
            ],
            corner2: [
                KEY_SPACING + BFO_BIG_NUB_WIDTH,
                NUM_KEYS_Y * KEY_SPACING + BFO_NUB_DEPTH,
                -BFO_THICK,
            ],
        }),
        // small nub around TRRS jack
        CSG.cube({
            corner1: [
                KEY_SPACING * 6 - BFO_SMALL_NUB_WIDTH / 2,
                NUM_KEYS_Y * KEY_SPACING - EPSILON,
                0
            ],
            corner2: [
                KEY_SPACING * 6 + BFO_SMALL_NUB_WIDTH / 2,
                NUM_KEYS_Y * KEY_SPACING + BFO_NUB_DEPTH,
                -BFO_THICK,
            ],
        })
    ).setColor(GRAY);
}

let bfoScrewHole = () => {
    // origin at center top surface
    return CSG.cylinder({
        start: [0, 0, EPSILON],
        end: [0, 0, -BFO_THICK - EPSILON],
        radius: BFO_SCREW_HOLE_RAD,
        resolution: HOLE_RESOLUTION,
    }).setColor(GRAY);
}

let allBfoScrewHoles = () => {
    // origin at lower left of key grid
    // TODO: mirror this
    return union(
        bfoScrewHole().translate([1 * KEY_SPACING, 1 * KEY_SPACING, 0]),
        bfoScrewHole().translate([1 * KEY_SPACING, 2 * KEY_SPACING, 0]),
        bfoScrewHole().translate([1 * KEY_SPACING, 3 * KEY_SPACING, 0]),
        bfoScrewHole().translate([1 * KEY_SPACING, 4 * KEY_SPACING, 0]),

        bfoScrewHole().translate([3 * KEY_SPACING, 1 * KEY_SPACING, 0]),
        bfoScrewHole().translate([3 * KEY_SPACING, 2 * KEY_SPACING, 0]),
        bfoScrewHole().translate([3 * KEY_SPACING, 3 * KEY_SPACING, 0]),
        bfoScrewHole().translate([3 * KEY_SPACING, 5 * KEY_SPACING, 0]),

        bfoScrewHole().translate([6 * KEY_SPACING, 1 * KEY_SPACING, 0]),
        bfoScrewHole().translate([6 * KEY_SPACING, 2 * KEY_SPACING, 0]),
        bfoScrewHole().translate([6 * KEY_SPACING, 3 * KEY_SPACING, 0]),
        bfoScrewHole().translate([6 * KEY_SPACING, 5 * KEY_SPACING, 0]),

        bfoScrewHole().translate([8 * KEY_SPACING, 1 * KEY_SPACING, 0]),
        bfoScrewHole().translate([8 * KEY_SPACING, 2 * KEY_SPACING, 0]),
        bfoScrewHole().translate([8 * KEY_SPACING, 4 * KEY_SPACING, 0]),
        bfoScrewHole().translate([8 * KEY_SPACING, 5 * KEY_SPACING, 0])
    );
}

//================================================================================
// ASSEMBLIES

let keyGrid = () => 
    // origin at lower left outer edge
    makeGrid(key(), NUM_KEYS_X, NUM_KEYS_Y, KEY_SPACING, KEY_SPACING)
        .translate([KEY_SPACING/2, KEY_SPACING/2, 0]);

let keyLowerGrid = () => 
    // origin at lower left outer edge
    makeGrid(keyLower(), NUM_KEYS_X, NUM_KEYS_Y, KEY_SPACING, KEY_SPACING)
        .translate([KEY_SPACING/2, KEY_SPACING/2, 0]);

let keyLowerClearanceRow = () =>
    union(
        keyLowerClearance(),
        keyLowerClearance().mirroredX().translate([KEY_SPACING * 1, 0, 0]),
        keyLowerClearance()            .translate([KEY_SPACING * 2, 0, 0]),
        keyLowerClearance().mirroredX().translate([KEY_SPACING * 3, 0, 0]),
        keyLowerClearance()            .translate([KEY_SPACING * 4, 0, 0]),
        keyLowerClearance().mirroredX().translate([KEY_SPACING * 5, 0, 0]),
        keyLowerClearance()            .translate([KEY_SPACING * 6, 0, 0]),
        keyLowerClearance()            .translate([KEY_SPACING * 7, 0, 0]),
        keyLowerClearance()            .translate([KEY_SPACING * 8, 0, 0])
    );

let keyLowerClearanceGrid = () => 
    // origin at lower left outer edge
    //makeGrid(keyLowerClearance(), NUM_KEYS_X, NUM_KEYS_Y, KEY_SPACING, KEY_SPACING)
    makeRow(keyLowerClearanceRow(), NUM_KEYS_Y, [0, KEY_SPACING, 0])
        .translate([KEY_SPACING/2, KEY_SPACING/2, 0]);

let bfoWithHoles = () =>
    bfoPlate(0)
        .subtract(allBfoScrewHoles())
        .subtract(keyLowerGrid());

let holesForHousingPlate = () =>
    union(
        // actual pcb
        bfoPlate(SQUEEZE),
        // space above pcb nubs
        bfoPlate(SQUEEZE).translate([0, 0, BFO_THICK - EPSILON]).scale([1, 1, BFO_OVER_NUB_CLEARANCE / BFO_THICK]).setColor(CLEAR2),
        // space above nubless rectangle, for keys
        bfoNoNubs(SQUEEZE).translate([0, 0, BFO_THICK - EPSILON]).scale([1, 1, 50]).setColor(CLEAR),
        allBfoScrewHoles().scale([1, 1, 20]),
        moveEliteCToPosition(eliteCClearance()),
        keyLowerClearanceGrid()
    );

let housingPlateMid = () =>
    housingPlate(HOUSING_THICK_MID)
    .translate([0, 0, -EPSILON - BFO_THICK])
    .subtract(holesForHousingPlate());

let housingPlateBase = () =>
    housingPlate(HOUSING_THICK_BASE)
    .translate([0, 0, -EPSILON - BFO_THICK - HOUSING_THICK_MID])
    .subtract(holesForHousingPlate());

let housingPlateTop = () =>
    housingPlate(HOUSING_THICK_TOP)
    .translate([0, 0, EPSILON - BFO_THICK + HOUSING_THICK_TOP])
    .subtract(holesForHousingPlate());

const Z_EXPLODE = 90;  // 90;
const X_EXPLODE = 0; //HOUSING_OVERALL_WIDTH + HOUSING_PADDING_SIDE;
let main = () =>
    union(
        housingPlateBase().translate([-X_EXPLODE, 0, -Z_EXPLODE])  ,//.setColor(BROWN),
        housingPlateMid()                               ,//.setColor(CLEAR),
        housingPlateTop().translate([X_EXPLODE, 0, Z_EXPLODE])    ,//.setColor(GOLD),
        union(
            keyGrid(),
            bfoWithHoles(0),
            moveEliteCToPosition(eliteC())
        ).translate([0, X_EXPLODE > 1 ? BFO_TOTAL_DEPTH + HOUSING_PADDING_TOP + HOUSING_PADDING_SIDE : 0, Z_EXPLODE/2])
        //holesForHousingPlate()
        //moveEliteCToPosition(eliteCClearance()),
        //housingPlate(),
        //keyGrid(),
    )
    .translate([-NUM_KEYS_X/2 * KEY_SPACING, -NUM_KEYS_Y/2 * KEY_SPACING, 0]) // center
    .translate([0, 0, 2 * BFO_THICK]);  // get above the pesky grid
