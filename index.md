# The Waffletone

The Waffletone is a musical instrument.

## The idea

It's a grid of square buttons with a regular (isomorphic) layout of notes.  Go up one square to increase pitch by one semitone; go right one square to add 3 semitones (a minor third).

## The physical object

Here's one way to build a waffletone!

It acts like a USB MIDI keyboard -- plug it into a host device (computer, ipad) and it sends MIDI events over USB.  But it's built out of hardware usually used for computer (typing) keyboards.

It doesn't make sound by itself.  It needs a host device running a synthesizer which makes sound.

# Design criteria

* Notes are arranged with regularity so that transposing is easy (unlike a piano or guitar)
* Notes are arranged to allow easy understanding of chords
* It requires minimal hand or finger force to play
* It places the hands and arms in an ergonomic position

# How to play it

It's best played while sitting in an ergonomic chair at a desk, as if typing on a computer.

## Note layout

Notes are arranged in a regular grid.
Move up one button to +1 semitone.
Move right one button to +3 semitones (a minor third interval).

Think of vertical columns as strings which increase in pitch as you move up them.

This is similar to a chromatic button accordion (C system) except that's slanted into a hexagonal grid, and this is in a square grid.

## Scales

The major scale is inherently irregular and therefore makes an idiosyncratic shape:

TODO: add scale diagrams

## Chords

Each flavor of chord, like a major chord, always makes the same shape on the grid no matter how you transpose it.
That means you only need to learn each flavor or chord once and then you can play it in any key.

Each finger of your (right) hand corresponds to one of the 4 common notes in a chord:
* index finger: root note (most chords) or second (sus2)
* middle finger: third (major or minor chords) or fourth (sus4)
* ring finger: fifth (or augmented or diminshed chords)
* pinky: seventh (major seventh, seventh, or sixth chords)

TODO: add chord diagrams

On a Waffletone with at least 5 rows you can play any chord without wrapping around.  If you have 4 or fewer rows you will have to wrap around the top/bottom edge for some chords.

## Recommended MIDI software

Plug your Waffletone into an iPad and use these apps to create sound:

* [Thumbjam](https://thumbjam.com/) is an iOS app which receives MIDI signals and plays sounds.  It has a built-in menu for downloading more sounds, which includes a lot of real instruments.
* Garage Band

Note that to connect to an iPad you need a [lightning to USB adapter](https://www.apple.com/shop/product/MD821AM/A/lightning-to-usb-camera-adapter).  If your Waffletone draws a lot of power over USB, you'll need the version of the adapter which also allows charging the iPad at the same time.

Or on a desktop,

* Garage Band
* [Ableton Live](https://www.ableton.com/)
* [Bitwig Studio](https://www.bitwig.com/en/home.html)

# Building the hardware

We're using the same hardware used by the DIY mechanical keyboard enthusiast community.  (Typing keyboard hardware, not piano keyboard hardware.)
They call these grid-shaped layouts "ortholinear keyboards".
The smallest usefully playable grid is about 7 wide and 5 tall.  An ideal size is 12 wide and 6 tall.

You can make a single large flat keyboard or a split keyboard with one piece for each hand.
The split keyboard can be "tented" (lifted in the middle) for better ergonomics, but that means the hands are separated by a gap and can't help each other play patterns.
In this document we're building only one side of the BFG-9000 split keyboard as a prototype.

## Vocabulary / Parts of a keyboard

**Microcontroller** - The brains.  It's a thumb-sized board with a microcontroller and a USB port.
The standard one is a "Pro Micro" which is an Atmel ATmega24u4 chip, the same used in the Arduino Micro.  Many premade keyboard PCBs are designed to match its footprint.

**PCB** - The large circuit board that the keys attach to.  You can also hand-wire the keys to each other if you don't have a PCB.

**Plate** - A thin material with holes cut for each key.  Often made from acrylic or steel.  This gives mechanical support to the keys.  They keys can also be supported only by the PCB but that's more fragile.

**Mechanical keyswitch** - The guts of each key, containing a spring.  Cherry MX is the original brand but now there are many imitators.  Gateron is the most common.
Keyswitches come with different spring strenghts and different tactilities (smooth, clicky).  These are named after colors and the plastic of the keyswitch is color-coded to match the name.

**Keycap** - The part of the key you touch.  These come in a wide variety of shapes, colors, and materials.  You will need "cherry mx" compatible keycaps in "1x1" size, probably blank (no letters printed on them).

**TRRS cable** - If you're making a split keyboard, the two sides will communicate over this cable.  It's the same kind of cable used for headphones that also have microphones - a 4 conductor 1/8 inch audio jack - but in this case data is going over the cable.  Some are wired differently, so buy one from a keyboard vendor to make sure it works.

## Resources

Forums:

* [Reddit: OLKB](https://www.reddit.com/r/olkb/)
* [Reddit: MechanicalKeyboards](https://www.reddit.com/r/MechanicalKeyboards/)

Similar existing keyboards you can buy:

* [BFO-9000](https://keeb.io/collections/frontpage/products/bfo-9000-keyboard-customizable-full-size-split-ortholinear?variant=8116065271914) - split, 9 x 6 on each side.  This is what we're using in this prototype.
* [Viterbi](https://keeb.io/collections/frontpage/products/viterbi-keyboard-pcbs-5x7-70-split-ortholinear) - split, 7 x 5 on each side
* [Preonic](https://olkb.com/) - single piece, 12 x 5, hard to find

Keyboard-specific helper tools:

* [Keyboard Layout Generator](http://www.keyboard-layout-editor.com/) -- here is [a layout for BFO-9000](http://www.keyboard-layout-editor.com/#/gists/0dd473c2262c1fbf7df6f6164264f312)
* [Plate & Case Builder](http://builder.swillkb.com/) -- generates SVG outlines for laser cutting an enclosure
* [generate PCB from keyboard layout](https://kalerator.clueboard.co/)

Or make your own PCBs from scratch:

* [Upverter](https://upverter.com/dashboard/) - design PCBs online
* [OSHPark](https://oshpark.com/) - order PCBs

## Supplies list

In this case we're building a one-handed version with 6 x 9 buttons.

| Kind of item     | Specific item                         | # items needed | items / pack | # packs needed | cost / pack | total cost | link                                                                                                      |
|------------------|---------------------------------------|----------------|--------------|----------------|-------------|------------|-----------------------------------------------------------------------------------------------------------|
| Keyboard PCB     | BFO-9000 keyboard PCB (one side only) | 1              | 2            | 1              | $20         | $20        | https://keeb.io/products/bfo-9000-keyboard-customizable-full-size-split-ortholinear?variant=8116065271914 |
| Controller board | Elite-C pro micro compatible board    | 1              | 1            | 1              | $18         | $20        | https://keeb.io/products/elite-c-usb-c-pro-micro-replacement-arduino-compatible-atmega32u4                |
| Keyswitches      | Gateron Silent Clear                  | 54             | 10           | 6              | $3.80       | $22.80     | https://novelkeys.xyz/products/gateron-silent-switches?variant=19441364172893                             |
| Keycaps          | G20 1 unit keycap, various colors     | 54             | 10           | 6              | $10         | $60        | https://pimpmykeyboard.com/g20-1-space-pack-of-10/                                                        |
| Enclosure        | wood or laser cut acrylic             | 1              | 1            | 1              | $10         | $10        | DIY                                                                                                       |
| USB cables       | magnetic breakaway USB-C cable        | 1              | 1            | 1              | $10         | $10        | https://www.amazon.com/gp/product/B07H2T12HM/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1              |
|                  |                                       |                |              |                |             |            |                                                                                                           |
|                  |                                       |                |              |                |             | **$142**   | **grand total**                                                                                           |

You can get cheaper keycaps from Amazon: [link1](https://www.amazon.com/Profile-Keycaps-Switches-Mechanical-Keyboard/dp/B06XK8BD4G/ref=sr_1_2?keywords=cherry+keycaps+blank&qid=1552427878&s=gateway&sr=8-2) [link2](https://www.amazon.com/Keycaps-Non-Backlit-Switches-Mechanical-Keyboard/dp/B07G9DHJT4/ref=sr_1_3?keywords=cherry%2Bkeycaps%2Bblank&qid=1552427955&refinements=p_85%3A2470955011&rnid=2470954011&rps=1&s=gateway&sr=8-3&th=1#customerReviews) [link3](https://www.amazon.com/Profile-Keycaps-Switches-Mechanical-Keyboard/dp/B06XK984SB/ref=sr_1_12?keywords=cherry+keycaps+blank&qid=1552427955&refinements=p_85%3A2470955011&rnid=2470954011&rps=1&s=gateway&sr=8-12)

Also: [Wii Nunchuck](https://www.adafruit.com/product/342) and its [Proprietary Plug adapter](https://www.adafruit.com/product/345) so we can have a joystick to use for pitch bends.

It's a good idea to use magnetic USB cables to avoid damage to the microcontroller board if the USB cable gets yanked.  The USB socket on the microcontroller can be easily torn off the board.

### Keyswitch choices

I recommend "silent" keyswitches because the clack of keys will distract from the music.
I recommend "linear" keyswitches which don't have a tactile click, but this is personal preference.
Gateron Silent Clear has the lightest available spring of any keyswitch, for easy pressing.
When you play the Waffletone you have to press and hold many keys for an extended time, so lighter springs will keep your hands from getting tired.

### Keycap choices

I like the G20 profile keys (which are flat on top) because it's easier to slide your fingers across them.
DCS and XDA would also be ok choices.  XDA is hard to find.
DSA has an upper surface that's too small.
I recommend against the taller keycaps because they would wobble too much.

![](keycap-profiles.jpg)

There are also "Kailh Choco Low Profile Switches" which are very flat and might be a good choice.
They feel more like Macbook chiclet keys.
They use different keyswitches which fit into differently shaped holes in the PCB and are not Cherry MX compatible.  Some PCBs have extra holes to support them.

## Soldering

Follow this [build guide for the BFO-9000](https://docs.keeb.io/nyquist-build-guide/) except we're only building one of the two hands of the keyboard.

This other [build guide](https://docs.keeb.io/iris-build-guide/) has tips on soldering the diodes.

Solder in this order so things won't get in the way of each other:

1. Diodes
2. Headers for the microcontroller
3. Keyswitches
4. Microcontroller itself

## Soldering the microcontroller

![](soldering-guide.png)

This is how to solder the microcontroller to the large PCB, viewed from the underside of the keyboard (which says "BFO-9000").

There are five extra pins along the bottom which could be used for extra knobs, joysticks, or toggle switches.  More switches could also be added as an extra virtual row in the key grid.

The pink rectangles mark pins which support analog IO.  We might want to use some of them later to add a joystick or something.

The "RGB" pin connects to some holes on the side edge of the BFO PCB - it's intended for connecting to a strip of addressible LEDs such as NeoPixels, but we're not using it.

The SDA and SCL pins are routed to the TRRS (headphone style) connector along the top of the BFO PCB, to communicate with the other hand's keyboard.
These are the native I2C pins of the microcontroller.  The QMK firmware communicates over these pins using serial by default but can also use I2C.
For now we're only making a one-handed board so this can be re-used to talk to a Wii Nunchuk over I2C.

On most Pro Micros, `RAW` is the VCC power from USB or something like that.  The BFO PCB either doesn't use it or connects it to VCC.  However the Elite-C uses this pin to expose an additional IO port.  We're not soldering it to the BFO, but it could be connected directly to some other accessory.

## Enclosure

You'll have to figure out your own enclosure.  I'm planning to make a wood enclosure with integrated wrist-rest like this:

![](wood-example.png)

...but with some extra knobs along the top.

## Extra Knobs

I'm planning to add some extra controls:

* Toggle switch or knob with detents for changing MIDI channel (to change instrument sound made by the synth software)
* Knob with detents for transposing in octives
* 1/4 jack to connect a piano pedal for sustain
* A joystick or whammy bar for pitch bend and vibrato.  In this case I'm using a Wii Nunchuk which communicates over I2C.

The controls might look like this, but in a single row above the key grid:

![](pedal.jpg)

You can also set up a function key and re-use the normal key grid to change your settings.  See the Firmware section below for details.

## Ergonomics

It's best to "tent" a split keyboard by lifting the inner edges so your hands are tilted.
In this case I want to add folding feet on both sides so you can set up this one-handed instrument to be played by either hand.

I usually chose instrument sounds which don't require me to hold down the key to keep a sound going - the sound is triggered and then rings for a while.
Xylophone, dulcimer, and harp are good examples.

## Bluetooth

You could make a Bluetooth Waffletone by using something like [this](https://www.adafruit.com/product/2829) or [this](https://www.adafruit.com/product/4062) controller board instead of a Pro Micro.
It's possible but tricky and annoying to connect these as a MIDI device over Bluetooth Low Energy to iOS and to Macs.
It works with a range of about 8 feet, then you start getting latency and dropped notes.
You would also need to add batteries and a charging controller since you wouldn't be powered over USB.

You can also use the same hardware that wireless mouse dongles use to connect to their little USB receivers - is it 2.4ghz?  That would be more reliable than Bluetooth and faster to set up.  Adafruit sells these transmitters but I don't remember what they're called.  nRF something.

## Power

As mentioned above, avoid using very much power or iPads will refuse to connect unless they are also plugged into wall power.  This means limited LEDs.  A string of 10 addressable LEDs is too many.

## MIDI port

You could add an old fashioned MIDI cable port if you wanted to plug it into older synthesizers.

These use low-bandwidth serial connections which the microcontroller should be able to support.

Note that those old fashioned MIDI cables don't supply power.

# Firmware

Most mechanical keyboards run [QMK](https://qmk.fm/) which is an easy-to-customize firmware.

QMK can act as a USB MIDI device and send MIDI events.
Its support for MIDI is [not documented well](https://beta.docs.qmk.fm/features/feature_audio#midi-functionality) -- maybe [these docs are better](https://github.com/qmk/qmk_firmware/pull/1112).
Note that you don't want "Audio" features - those are piezo beeps - you want MIDI.  Check my fork below for how to enable it.

You could also write your own firmware using the Arduino IDE.  The Pro Micro controller board can act as a USB MIDI device if you choose the right settings in the Arduino IDE menus.

## My QMK fork

https://github.com/cinnamon-bun/qmk_firmware/commit/9763843670accc2ded57b099df21932a5687b264

This adds a 9x6 Waffletone layout to QMK along with some MIDI configuration and a new feature `MIDI_DEEP` which temporarily drops the keys an octave or two.

## Example QMK note layout

This is the keymap from the older, first Waffletone prototype which was a two-handed split keyboard.

The right hand's upper left key is a function key which enables the second keymap layer with transpose controls.
It also has volume adjustment keys which work the same as keys on a regular computer keyboard.

The top left and bottom right keys are the least-used for playing music so they're good places for extra functionality.

I added the keycode `MI_MOD` which is like a sustain pedal but in toggle mode instead of momentary.


```c
  // sustain                                                    function
  // toggle                                                     function
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
     MI_MOD ,MI_C_1 ,MI_Ds_1,MI_Fs_1,MI_A_1 ,MI_C_2 ,MI_Ds_2,     FN1  ,MI_C_3 ,MI_Ds_3,MI_Fs_3,MI_A_3 ,MI_C_4 ,MI_Ds_4,
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
     MI_Gs  ,MI_B   ,MI_D_1 ,MI_F_1 ,MI_Gs_1,MI_B_1 ,MI_D_2 ,   MI_Gs_2,MI_B_2 ,MI_D_3 ,MI_F_3 ,MI_Gs_3,MI_B_3 ,MI_D_4 ,
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
     MI_G   ,MI_As  ,MI_Cs_1,MI_E_1 ,MI_G_1 ,MI_As_1,MI_Cs_2,   MI_G_2 ,MI_As_2,MI_Cs_3,MI_E_3 ,MI_G_3 ,MI_As_3,MI_Cs_4,
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
     MI_Fs  ,MI_A   ,MI_C_1 ,MI_Ds_1,MI_Fs_1,MI_A_1 ,MI_C_2 ,   MI_Fs_2,MI_A_2 ,MI_C_3 ,MI_Ds_3,MI_Fs_3,MI_A_3 ,MI_C_4 ,
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
     MI_F   ,MI_Gs  ,MI_B   ,MI_D_1 ,MI_F_1 ,MI_Gs_1,MI_SUS ,   MI_F_2 ,MI_Gs_2,MI_B_2 ,MI_D_3 ,MI_F_3 ,MI_Gs_3,MI_B_3
  //+-------+-------+-------+-------+-------+-------+-------+   -------+-------+-------+-------+-------+-------+-------+
  //                                                 sustain
  ),

  [_FN] = KC_KEYMAP(
  //|----+----+----+----+----+----+-------+       ------+---------+---------+---------+----------+----------+--------|
         ,    ,    ,    ,    ,    ,       ,             ,MI_OCT_N1,MI_OCT_0, MI_OCT_1 ,MI_OCT_2  ,MI_OCT_3  ,        ,
         ,    ,    ,    ,RST ,    ,       ,             ,         ,MI_TRNS_2,MI_TRNS_5,MI_TRNS_N4,MI_TRNS_N1,        ,
         ,    ,    ,    ,    ,    ,       ,             ,         ,MI_TRNS_1,MI_TRNS_4,MI_TRNS_N5,MI_TRNS_N2,        ,
         ,    ,    ,    ,    ,    ,       ,             ,         ,MI_TRNS_0,MI_TRNS_3,MI_TRNS_6 ,MI_TRNS_N3,        ,
         ,    ,    ,    ,    ,    ,MI_SUST,             ,         ,         ,         ,MUTE      ,VOLD      ,VOLU
  //|----+----+----+----+----+----+-------+       ------+---------+---------+---------+----------+----------+--------|
  )


```

# Prior art / similar things

Apps

* [MinorThirds](https://www.youtube.com/watch?v=1ktnz6aP668) (iOS)
  * Happens to have the same note layout as a Waffletone
* [Musix Pro](https://shiverware.com/musixpro/) (iOS)
  * You can configure a Waffletone style grid in this app

Musical devices with regular grids

* Chromatic button accordions
  * C-system button accordions have the same layout as Waffletone, but skewed from a square grid into a hex grid
* [Linnstrument](http://www.rogerlinndesign.com/linnstrument.html)
  * Has a different note layout - guitar/bass style fourths instead of minor thirds, oriented differently
  * Velocity sensitive
  * Requires more hand force to play - not ergonomic
* [Ableton Push](https://www.ableton.com/en/push/)
  * Same layout as a Linnstrument
  * Velocity sensitive
  * Requires more hand force to play - not ergonomic
* Monome
* Novation Launchpad
* Midi Fighter
* [Chromatone](https://chromatone.jp/)
  * Like a normal MIDI keyboard but in Janko layout
* Harpejji - strings spaced in regular intervals of a major second (2 semitones)
* Bass guitar - strings spaced in regular intervals of a fourth (5 semitones)
* Mandolin - strings spaced in regular intervals of a fifth (7 semitones)

Other isomorphic key layouts

* Janko
* Wicki-Hayden

Grid-shaped typing keyboards ("ortholinear" keyboards)

* [BFO-9000](https://keeb.io/products/bfo-9000-keyboard-customizable-full-size-split-ortholinear?variant=8116065271914)
* Planck and Preonic by [OLKB](https://olkb.com/)