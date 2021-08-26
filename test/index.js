"use strict"

const {body_fat, tdee, healthy_weight, find_body_frame, bmi, get_daily_targets} = require('@presspage/fitnessjs');

var fat = body_fat('male',320,10);
console.log('Body Fat: ',fat);

var tdee_result = tdee(0,'male',1.2,210,72,42);
console.log("TDEE: ",tdee_result);

var body_frame = find_body_frame(0,72,10);
console.log("Body Frame: ",body_frame);

var weight_healthy = healthy_weight(0,'male',72,body_frame);
console.log("Health Weight: ",weight_healthy);

var bmi_result = bmi(0,210,72);
console.log("BMI: ", bmi_result);

var daily = get_daily_targets(210,tdee_result);
console.log("Daily Targets: ", daily);