"use strict"

const {body_fat, tdee, healthy_weight, find_body_frame, bmi, get_daily_targets} = require('@presspage/fitnessjs');

var weight = 210;

var fat = body_fat('male',weight,10);
console.log('Body Fat: ',fat);

var tdee_result = tdee(0,'male',1.2,weight,72,42);
console.log("TDEE: ",tdee_result);

var body_frame = find_body_frame(0,72,10);
console.log("Body Frame: ",body_frame);

var weight_healthy = healthy_weight(0,'male',72,body_frame);
console.log("Health Weight: ",weight_healthy);

var bmi_result = bmi(0,weight,72);
console.log("BMI: ", bmi_result);

var daily = get_daily_targets(weight,tdee_result);
console.log("Daily Targets: ", daily);

// Healthy Weight Stats: 195.8

weight = 195.8

var fat = body_fat('male',weight,10);
console.log('Healthy Body Fat: ',fat);

var tdee_result = tdee(0,'male',1.2,weight,72,42);
console.log("Healthy TDEE: ",tdee_result);

var body_frame = find_body_frame(0,72,10);
console.log("Healthy Body Frame: ",body_frame);

var weight_healthy = healthy_weight(0,'male',72,body_frame);
console.log("Health Weight: ",weight_healthy);

var bmi_result = bmi(0,weight,72);
console.log("Healthy BMI: ", bmi_result);

var daily = get_daily_targets(weight,tdee_result);
console.log("Healthy Daily Targets: ", daily);
