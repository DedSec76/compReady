export function pricePercent(a, b) {
  const max = Math.max(a.price, b.price);
  
  return {
    a: ((a.price / max) * 100).toFixed(1),
    b: ((b.price / max) * 100).toFixed(1)
  };
}

export function ratingPercent(a, b) {
  const max = Math.max(a.rating, b.rating);

  return {
    a: (a.rating / max) * 100,
    b: (b.rating / max) * 100
  };
}

export function valuePercent(a, b) {
  let valorA = a.rating / a.price
  let valorB = b.rating / b.price

  const max = Math.max(valorA, valorB)

  return {
    a: ((valorA / max) * 100).toFixed(1),
    b: ((valorB / max) * 100).toFixed(1)
  }
}
