

export function pricePercent(a, b) {
  
  const max = Math.max(a.price, b.price);
  console.log(max)
  return {
    a: ((1 - a.price / max) * 100).toFixed(1),
    b: ((1 - b.price / max) * 100).toFixed(1)
  };
}

export function ratingPercent(a, b) {
  const max = Math.max(a.rating, b.rating);
  return {
    a: (a.rating / max) * 100,
    b: (b.rating / max) * 100
  };
}
