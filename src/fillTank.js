'use strict';

/**
 * @typedef {Object} Vehicle
 * @property {number} maxTankCapacity
 * @property {number} fuelRemains
 *
 * @typedef {Object} Customer
 * @property {number} money
 * @property {Vehicle} vehicle
 *
 * @param {Customer} customer
 * @param {number} fuelPrice
 * @param {number} amount
 */
function fillTank(customer, fuelPrice, amount = Infinity) {
  const { vehicle, money } = customer;

  if (typeof customer !== 'object'
    || customer === null || Array.isArray(customer)) {
    throw new Error('customer should be only an object');
  }

  if ((!money && money !== 0)
    || (!vehicle.fuelRemains && vehicle.fuelRemains !== 0)
    || (!vehicle.maxTankCapacity || vehicle.maxTankCapacity <= 0)
    || !vehicle) {
    throw new Error('customer should be with proper properties');
  }

  if (isNaN(fuelPrice) || typeof fuelPrice !== 'number' || !fuelPrice) {
    throw new Error('Fuel price should be a number and greater than 0');
  }

  if (isNaN(amount) || typeof amount !== 'number') {
    throw new Error('amount should be only a number');
  }

  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;
  const canBuy = money / fuelPrice;
  const requiredAmount = Math.min(amount, freeSpace, canBuy);
  const roundedAmount = roundFuel(requiredAmount);

  if (roundedAmount < 2) {
    return;
  }

  vehicle.fuelRemains += roundedAmount;
  customer.money -= roundPrice(roundedAmount * fuelPrice);
}

function roundFuel(fuel) {
  return Math.floor(fuel * 10) / 10;
}

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

module.exports = { fillTank };
