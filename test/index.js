"use strict"

const {body_fat, tdee, healthy_weight, find_body_frame, bmi, get_daily_targets, macros, caloriesBurnt} = require('@presspage/fitnessjs');

var weight = 350;
var height = 78;
var age = 61;

var fat = body_fat('male',weight,10);
console.log('Body Fat: ',fat);

var tdee_result = tdee(0,'male',1.2,weight,height,age);
console.log("TDEE: ",tdee_result);

var body_frame = find_body_frame(0,height,10);
console.log("Body Frame: ",body_frame);

var weight_healthy = healthy_weight(0,'male',height,body_frame);
console.log("Health Weight: ",weight_healthy);

var bmi_result = bmi(0,weight,height);
console.log("BMI: ", bmi_result);

var daily = get_daily_targets(weight,tdee_result);
console.log("Daily Targets: ", daily);

var macros_result = macros(weight,height,age);
console.log("Macros: ",macros_result);

var result = caloriesBurnt(1000, -0.015,false, age, 80, 80);
console.log("Calroies Burnt: ",result);


// Healthy Weight Stats: 195.8

weight = 195.8

var fat = body_fat('male',weight,10);
console.log('Healthy Body Fat: ',fat);

var tdee_result = tdee(0,'male',1.2,weight,height,age);
console.log("Healthy TDEE: ",tdee_result);

var body_frame = find_body_frame(0,height,10);
console.log("Healthy Body Frame: ",body_frame);

var weight_healthy = healthy_weight(0,'male',height,body_frame);
console.log("Health Weight: ",weight_healthy);

var bmi_result = bmi(0,weight,height);
console.log("Healthy BMI: ", bmi_result);

var daily = get_daily_targets(weight,tdee_result);
console.log("Healthy Daily Targets: ", daily);

var macros_result = macros(weight,height,age);
console.log("Healthy Macros: ",macros_result);
