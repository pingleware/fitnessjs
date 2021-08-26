"use strict"

 
function body_fat(sex, weight, wrist, waist=0, hip=0, forearm=0) {
    if (sex === 'male') {
        return body_fat_for_men(weight, waist);
    }
    return body_fat_for_women(weight, wrist, waist, hip, forearm);
}

/*
 * Body Fat Formula For Women
 * Factor 1: (Total body weight x 0.732) + 8.987
 * Factor 2: Wrist measurement (at fullest point) / 3.140
 * Factor 3: Waist measurement (at naval) x 0.157
 * Factor 4: Hip measurement (at fullest point) x 0.249
 * Factor 5: Forearm measurement (at fullest point) x 0.434
 * 
 * Lean Body Mass
 * --------------
 * Factor 1 + Factor 2 - Factor 3 - Factor 4 + Factor 5
 * 
 * Body Fat Weight
 * ---------------
 * Total bodyweight - Lean Body Mass
 * 
 * Body Fat Percentage
 * -------------------
 * Body Fat Weight x 100) / total bodyweight
 */
function body_fat_for_women(weight, wrist, waist, hip, forearm) {
	if (isNaN(weight)) {
		weight = 0;
	}
	if (isNaN(wrist)) {
		wrist = 0;
	}
	if (isNaN(waist)) {
		waist = 0;
	}
	if (isNaN(hip)) {
		hip = 0;
	}
	if (isNaN(forearm)) {
		forearm = 0;
	}
	var factor_1 = (Number(weight) * 0.732) + 8.987;
	var factor_2 = Number(wrist) / 3.140;
	var factor_3 = Number(waist) * 0.157;
	var factor_4 = Number(hip) * 0.249;
	var factor_5 = Number(forearm) * 0.434;
	
	var lbm = (Number(factor_1) + Number(factor_2) - Number(factor_3) - Number(factor_4) + Number(factor_5));
	
	if (weight > 0) {
		return {
			'LEAN_BODY_MASS': lbm,
			'BODY_FAT': (Number(weight) - Number(lbm)),
			'BODY_FAT_PCT': ((Number(weight) - Number(lbm)) * 100) / Number(weight)
        };
	} else {
		return {
			'LEAN_BODY_MASS': 0,
			'BODY_FAT': 0,
			'BODY_FAT_PCT': 0
        };
	}
}

/*
 * Body Fat Formula For Men
 * 
 * Factor 1: (Total body weight x 1.082) + 94.42
 * Factor 2: Waist measurement x 4.15
 * 
 * Lean Body Mass
 * --------------
 * Factor 1 - Factor 2
 * 
 * Body Fat Weight
 * ---------------
 * Total bodyweight - Lean Body Mass
 * 
 * Body Fat Percentage
 * -------------------
 * (Body Fat Weight x 100) / total bodyweight
 */

function body_fat_for_men(weight=0, waist=0) {
	if (isNaN(weight)) {
		weight = 0.0;
	}
	if (isNaN(waist)) {
		waist = 0.0;
	}

	var factor_1 = (Number(weight) * 1.082) + 94.42;
	var factor_2 = Number(waist) * 4.15;
	
	var lbm = Number(factor_1) - Number(factor_2);

	var body_fat_pct = 0;
	if (weight > 0) {
		body_fat_pct = round(((Number(weight) - Number(lbm)) * 100) / Number(weight)) / 100;
	}
	
	return {
		'LEAN_BODY_MASS': lbm,
		'BODY_FAT': (Number(weight) - Number(lbm)),
		'BODY_FAT_PCT': body_fat_pct
    };
}

function tdee(metric, sex, activity_level, weight, height, age) {
    var results = 0.0;

	if (isNaN(height)) {
		height = 0.0;
	}
	if (isNaN(weight)) {
		weight = 0.0;
	}
	if (isNaN(age)) {
		age = 0.0;
	}
	
	// US-English
	if (Numeric(metric) == 0) {
		if (sex === 'male') {
			results = Number(activity_level) * ((6.25 * Number(weight)) + (12.7 * Number(height)) - (6.76 * Number(age)) + 66);
		} else {
			results = Number(activity_level) * ((4.35 * Number(weight)) + (4.7 * Number(height)) - (4.68 * Number(age)) + 655);
		}
	} else {
		if ($sex === 'male') {
			results = Number(activity_level) * ((13.75 * Number(weight)) + (5 * Number(height)) - (6.76 * Number(age)) + 66);
		} else {
			results = Number(activity_level) * ((9.56 * Number(weight)) + (1.85 * Number(height)) - (4.68 * Number(age)) + 655);
		}
	}

	return Math.round(results);
}

/**  
 * Calculating Ideal Body Weight
 * -----------------------------
 * Your ideal body weight, or IBW, depends on both your gender and height. 
 * 
 * For men, ideal body weight is calculated by using 106 pounds for the first 5 feet of height and 
 * adding 6 additional pounds for each inch. 
 * 
 * Women should weigh a bit less, so the ideal body weight calculation starts with 100 pounds for the first 5 feet of height, 
 * and you only add 5 pounds for each additional inch. 
 * 
 * If you're under 5 feet tall, subtract 2 pounds for each inch under 5 feet.
 * 
 * Using the equation, 
 * A 5-foot, 4-inch tall woman would have an ideal weight of 120 pounds: IBW = 100 + (4 x 5) = 120.
 * 
 * A man who is 6 feet tall has an IBW of 178 pounds: IBW = 106 + (12 x 6) = 178.
 * 
 * Effect of Frame Size on Ideal Weight
 * ------------------------------------
 * 
 * Your body frame size helps determine your IBW, too. 
 * The equation calculates the IBW for someone with a medium frame. 
 * You can subtract 10 percent for a person of the same height with a small frame, 
 * and add 10 percent for a large-framed individual. So in the end, you end up with an IBW range.
 * 
 * For example, for the 5-foot, 4-inch tall woman in the first example with an IBW of 120 pounds, 
 * her IBW range is 108 to 132 pounds. 
 * A healthy weight for small-framed woman of this height would be toward the low end of 108 pounds, 
 * while a large-framed woman could weigh toward the high end. 
 * 
 * And the man who's 6 feet tall has an IBW range of 160 to 196 pounds.
 * 
 * If you're not sure of your frame size, here's a quick way to figure it out. 
 * Place your thumb and middle finger around your wrist, right where you'd wear a watch. 
 * If your fingers overlap, you have a small frame. 
 * If they touch, your frame is medium and 
 * if they don't meet, you have a large frame.
 */
function healthy_weight(metric, sex, height, frame) {
	var weight = 0;
	
	if (metric == 0) {
		weight = 100;
		if (sex === 'male') {
			weight = 106 + ((Number(height) - 60) * 6);
		} else {
			weight += (Number(height) - 60) * 5;
		}
		if (height < 60) {
			weight -= (Number(height) - 60) * 2;
		}
		if (frame === 'large') {
			weight += (Number(weight) * 0.1);
		} else {
			weight -= (Number(weight) * 0.1);
		}
	} else {
		weight = 100 * 0.45;
		if (sex === 'male') {
			weight = (106 * 0.45) + ((Number(height) - (60 * 2.54)) * (6 * 0.45));
		} else {
			weight += (Number(height) - (60 * 2.54)) * (5 * 0.45);
		}
		if (height < 60) {
			weight -= ((Number(height) - 60) * (2 * 0.45));
		}
		if (frame === 'large') {
			weight += (Number(weight) * 0.1);
		} else {
			weight -= (Number(weight) * 0.1);
		}
	}
	
	return weight;
}

/**
 * 
 * To determine Body Frame from Height and Wrist circumference
 * 
 *  Height								Small Frame			Medium Frame					Large Frame
 * below 62"|157cm			  Wrist: <5.5"|13.9cm			5.5"|13.9cm to 5.75"|14.6cm		> 5.75"|14.6cm
 * 62"|157cm to 65"|165cm	  Wrist: <6"|15.2cm				6"|15.2cm to 6.25"|15.8cm		> 6.25"|15.8cm
 * over 65"|165cm			  Wrist: <6.25"|15.8cm			6.25"|15.8cm to 6.5"|16.5cm		> 6.5"|16.5cm
 */
function find_body_frame(metric, height, wrist) {
	var frames = ['small', 'medium', 'large'];
	
	if (metric == 0) {
		if (Number(height) < 62) {
			if (Number(wrist) < 5.5) {
				return frames[0]; // small
			} else if (Number(wrist) >= 5.5 && Number(wrist) <= 5.75)  {
				return frames[1]; // medium
			} else {
				// > 5.75"
				return frames[2]; // large
			}
		} else if (Number(height) >= 62 && Number(height) <= 65) {
			if (Number(wrist) < 6) {
				return frames[0]; // small
			} else if (Number(wrist) >= 6 && Number(wrist) <= 6.25)  {
				return frames[1]; // medium
			} else {
				// > 6.25"
				return frames[2]; // large
			}
		} else {
			// $height > 65"
			if (Number(wrist) < 6.25) {
				return frames[0]; // small
			} else if (Number(wrist) >= 6.25 && Number(wrist) <= 6.5)  {
				return frames[1]; // medium
			} else {
				// > 6.5"
				return frames[2]; // large
			}
		}
	} else {
		// metric measurements
		if (Number(height) < 157) {
			if (Number(wrist) < 13.9) {
				return frames[0]; // small
			} else if (Number(wrist) >= 13.9 && Number(wrist) <= 14.6) {
				return frames[1]; // medium
			} else {
				// > 14.6
				return frames[2]; // large
			}
		} else if (Number(height) >= 157 && Number(height) <= 165) {
			if (Number(wrist) < 15.2) {
				return frames[0]; // small
			} else if (Number(wrist) >= 15.2 && Number(wrist) <= 16.5) {
				return frames[1]; // medium
			} else {
				// > 16.5
				return frames[2]; // large
			}
		} else {
			// > 165 cm
			if (Number(wrist) < 15.8) {
				return frames[0]; // small
			} else if (Number(wrist) >= 15.8 && Number(wrist) <= 14.6) {
				return frames[1]; // medium
			} else {
				// > 14.6
				return frames[2]; // large
			}
		}
	}
	
	return "unknown";
}

/**
 * English BMI Formula (Imperial) 
 * BMI = (Weight in Pounds / (Height in inches x Height in inches)) x 703
 * 
 * Metric BMI Formula 
 * BMI = (Weight in Kilograms / (Height in Meters x Height in Meters))
 * $metric: 0=Imperial, 1=Metric
 * $weight: lbs or kg
 * $height: inches or centimeters (converted to meters)
 * @return  
 */
function bmi(metric, weight, height) {
	if (Number(metric) == 0) {
		if (Number(height) > 0) {
			return Math.round(((Number(weight) * 703) / Math.pow(Number(height),2)) * 100) / 100;
		} else {
			return 0;
		}
	}
	return Math.round((Number(weight) / Math.pow((Number(height) / 100), 2)));
}

/**
 * Calculates the daily targets based on weight and computed tdee
 */
 function get_daily_targets(weight, tdee) {
	if (isNaN(weight)) {
		weight = 0.0;
	}
	if (isNaN(tdee)) {
		tdee = 0.0;
	}
	
	var daily_calorie = Math.round(Number(tdee) * 0.8);
	var daily_protein = Math.round(Number(weight) * 1.2);
	var daily_fat = Math.round((Number(daily_calorie) * 0.2) / 9);
	var daily_carbs = Math.round((Number(daily_calorie) - ((Number(daily_protein) * 4) + (Number(daily_fat) * 9))) / 4);
	
	return {
		'daily_calorie': daily_calorie,
		'daily_protein': daily_protein,
		'daily_fat': daily_fat,
		'daily_carbs': daily_carbs
    };
}



module.exports = {
    body_fat,
    tdee,
    healthy_weight,
    find_body_frame,
    bmi,
    get_daily_targets
}