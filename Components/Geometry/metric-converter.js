/**
* Converts a metric from one metric to another
*
* @param {number} value - the value to be converted
* @param {string} source - the source metric
* @param {string} target - output metric
* @throws {Error} if source or target metric is not in the conversion table
* @return {number} the converted metric
*/
export default function convertMetric(value, source, target) {
 const conversionTable = {
   mm: { mm: 1, cm: 0.1, dm: 0.01, m: 0.001, km: 0.000001, in: 0.0393701, ft: 0.00328084, yd: 0.00109361, mi: 0.000000621371 },
   cm: { mm: 10, cm: 1, dm: 0.1, m: 0.01, km: 0.00001, in: 0.393701, ft: 0.0328084, yd: 0.0109361, mi: 0.00000621371 },
   dm: { mm: 100, cm: 10, dm: 1, m: 0.1, km: 0.0001, in: 3.93701, ft: 0.328084, yd: 0.109361, mi: 0.0000621371 },
   m: { mm: 1000, cm: 100, dm: 10, m: 1, km: 0.001, in: 39.3701, ft: 3.28084, yd: 1.09361, mi: 0.000621371 },
   km: { mm: 1000000, cm: 100000, dm: 10000, m: 1000, km: 1, in: 39370.1, ft: 3280.84, yd: 1093.61, mi: 0.621371 },
   in: { mm: 25.4, cm: 2.54, dm: 0.254, m: 0.0254, km: 0.0000254, in: 1, ft: 0.0833333, yd: 0.0277778, mi: 0.0000157828 },
   ft: { mm: 304.8, cm: 30.48, dm: 3.048, m: 0.3048, km: 0.0003048, in: 12, ft: 1, yd: 0.333333, mi: 0.000189394 },
   yd: { mm: 914.4, cm: 91.44, dm: 9.144, m: 0.9144, km: 0.0009144, in: 36, ft: 3, yd: 1, mi: 0.000568182 },
   mi: { mm: 1609340, cm: 160934, dm: 16093.4, m: 1609.34, km: 1.60934, in: 63360, ft: 5280, yd: 1760, mi: 1 },
 };

 const allowed = conversionTable.hasOwnProperty(source) && conversionTable.hasOwnProperty(target);

 if (!allowed) {
   throw new Error("Invalid units");
 }

 return Number(parseFloat(value) * conversionTable[source][target]);
}
