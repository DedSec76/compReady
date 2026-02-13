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
    a: ((a.rating / max) * 100).toFixed(1),
    b: ((b.rating / max) * 100).toFixed(1)
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

export function renderCompareBar(title, percent, a, b) {
 return  `
          <div class="compare-bar">
            <span class="label">${title}</span>

            <div class="row">
                <span id="nameStore">FakeStore</span>
                <div class="bar">
                    <div class="fill fake" style="width: ${percent.a}%"></div>
                </div>
                <span id="bar_price_f">${a}</span>
            </div>

            <div class="row">
                <span id="nameStore_c">DummyJSON</span>
                <div class="bar">
                    <div class="fill dummy" style="width: ${percent.b}%"></div>
                </div>
                <span id="bar_price_d">${b}</span>
            </div>
          </div>`
}
