# fitness-js
A NodeJS module for common fitness calculation functions provided to you by PressPage Entertainment Inc DBA Fitness Brands (https://fitnessbrands.us).

# Installation
To install,

    npm i @presspage/fitnessjs

# Getting Starting
To use in a standard NodeJS file, first import the module,

    const {body_fat, tdee, healthy_weight, find_body_frame, bmi, get_daily_targets} = require('@presspage/fitness-js);

then invoke the desired function passing the correct parameters,

    body_fat,
    tdee,
    healthy_weight,
    find_body_frame,
    bmi,
    get_daily_targets

To use in Electron within the Electron browser window, create a preload.js file that is loaded by the Electron browser window,

    mainWindow = new BrowserWindow({
        width: 1072,
        height: 910,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js')
        }
    })

then inside the preload.js, add then import the module and add the functions,

    const {contextBridge} = require("electron");

    const {body_fat, tdee, healthy_weight, find_body_frame, bmi, get_daily_targets} = require('@presspage/fitness-js);

    contextBridge.exposeInMainWorld(
        "fitness", {
            body_fat: body_fat, 
            tdee: tdee, 
            healthy_weight: healthy_weight, 
            find_body_frame: find_body_frame, 
            bmi: bmi, 
            get_daily_targets: get_daily_targets
        }
    );

then invoke the function from with the Electron browser window javascript context,

    var body_fat = window.fitness.body_fat("male", 210, 10);

# Fitness Functions

## body_fat
Calculates the body fat based on weight, wrist, waist, hip and forearm measurements.

    body_fat(sex, weight, wrist, waist=0, hip=0, forearm=0)

### Body Fat Formula For Women

    Factor 1: (Total body weight x 0.732) + 8.987
    Factor 2: Wrist measurement (at fullest point) / 3.140
    Factor 3: Waist measurement (at naval) x 0.157
    Factor 4: Hip measurement (at fullest point) x 0.249
    Factor 5: Forearm measurement (at fullest point) x 0.434
 
#### Lean Body Mass

    Factor 1 + Factor 2 - Factor 3 - Factor 4 + Factor 5

#### Body Fat Weight

    Total bodyweight - Lean Body Mass

#### Body Fat Percentage

    Body Fat Weight x 100) / total bodyweight

### Body Fat Formula For Men

    Factor 1: (Total body weight x 1.082) + 94.42
    Factor 2: Waist measurement x 4.15

#### Lean Body Mass

    Factor 1 - Factor 2

#### Body Fat Weight

    Total bodyweight - Lean Body Mass

#### Body Fat Percentage

    (Body Fat Weight x 100) / total bodyweight

## tdee

    tdee(metric, sex, activity_level, weight, height, age)

where activity_level is,

    1.2   for "Sendentary: Little or No Exercise, Desk Job"
    1.375 for "Lightly Active: Light exercise, Sports 1-3 days/week"
    1.55  for "Moderate Active: Moderate exercise, Sports 3-5 days/week"
    1.725 for "Very Active: Heavy Exercise, Sports 6-7 days/week"
    1.9   for "Extremely Active: Exercise, Sports several times per day"


## healthy_weight

    healthy_weight(metric, sex, height, frame)

### Calculating Ideal Body Weight

Your ideal body weight, or IBW, depends on both your gender and height. 
 
For men, ideal body weight is calculated by using 106 pounds for the first 5 feet of height and adding 6 additional pounds for each inch. 

Women should weigh a bit less, so the ideal body weight calculation starts with 100 pounds for the first 5 feet of height, and you only add 5 pounds for each additional inch. 

If you're under 5 feet tall, subtract 2 pounds for each inch under 5 feet.
 
Using the equation, a 5-foot, 4-inch tall woman would have an ideal weight of 120 pounds: IBW = 100 + (4 x 5) = 120.
 
A man who is 6 feet tall has an IBW of 178 pounds: IBW = 106 + (12 x 6) = 178.
 
### Effect of Frame Size on Ideal Weight
 
Your body frame size helps determine your IBW, too. The equation calculates the IBW for someone with a medium frame. You can subtract 10 percent for a person of the same height with a small frame, and add 10 percent for a large-framed individual. So in the end, you end up with an IBW range.

For example, for the 5-foot, 4-inch tall woman in the first example with an IBW of 120 pounds, her IBW range is 108 to 132 pounds. A healthy weight for small-framed woman of this height would be toward the low end of 108 pounds, while a large-framed woman could weigh toward the high end. 

And the man who's 6 feet tall has an IBW range of 160 to 196 pounds.

If you're not sure of your frame size, here's a quick way to figure it out. Place your thumb and middle finger around your wrist, right where you'd wear a watch. If your fingers overlap, you have a small frame. If they touch, your frame is medium and if they don't meet, you have a large frame.

## find_body_frame

    find_body_frame(metric, height, wrist)

To determine Body Frame from Height and Wrist circumference

       Height					  Small Frame			          Medium Frame				  Large Frame
    below 62"|157cm			  Wrist: <5.5"|13.9cm			5.5"|13.9cm to 5.75"|14.6cm		> 5.75"|14.6cm
    62"|157cm to 65"|165cm	  Wrist: <6"|15.2cm				6"|15.2cm to 6.25"|15.8cm		> 6.25"|15.8cm
    over 65"|165cm			  Wrist: <6.25"|15.8cm			6.25"|15.8cm to 6.5"|16.5cm		> 6.5"|16.5cm

## bmi
Calculates the Body Mass Index or BMI for both metric and imperial measurements.

    bmi(metric, weight, height)

### English BMI Formula (Imperial) 
 
    BMI = (Weight in Pounds / (Height in inches x Height in inches)) x 703

### Metric BMI Formula 

    BMI = (Weight in Kilograms / (Height in Meters x Height in Meters))
 
where, 
    metric: 0=Imperial, 1=Metric
    weight: lbs or kg
    height: inches or centimeters (converted to meters)

## get_daily_targets
Calculates the daily targets based on weight and computed tdee

    get_daily_targets(weight, tdee)

returns,

    {
		'daily_calorie': NNN,
		'daily_protein': NNN,
		'daily_fat': NNN,
		'daily_carbs': NNN
    }

## Sample Results
For a 6 foot, 210 pound, 42 year old male,

    Body Fat:  {
        LEAN_BODY_MASS: 440.66,
        BODY_FAT: -120.66000000000003,
        BODY_FAT_PCT: -0.38
    }
    TDEE:  2411
    Body Frame:  large
    Health Weight:  195.8
    BMI:  28.48
    Daily Targets:  {
        daily_calorie: 1929,
        daily_protein: 252,
        daily_fat: 43,
        daily_carbs: 134
    }

# Contact us
The best contact method is via email at presspage.entertainment@gmail.com

# License
Creative Commons Attribution 4.0

# EOL or End-of-Life Doctrine
When a piece of software is useful, there should never be an EOL doctrine. The intention for this package is to achieve immoratlity ;).

At some point of time in the future, this package may appear to be dead and abandon. The opposite will be true!

When this project reaches that stage, this package has matured to a level where maintenance is no longer needed.

When external dependencies are removed from a package, then an immortal package lifespan is achievable!

Patrick Ingle
Developer

