(function () {
  const wrap = document.getElementById('tlTrackWrap');
  const line = document.getElementById('tlLine');
  if (!wrap) return;

  const anchors = Array.from(wrap.querySelectorAll('.tl-anchor'));
  const yearLabels = Array.from(wrap.querySelectorAll('.tl-year'));
  if (!anchors.length) return;

  const START_YEAR = 1900;
  const CURRENT_YEAR = new Date().getFullYear();
  const SPAN = CURRENT_YEAR - START_YEAR;
  const TRACK_WIDTH = Math.max(2400, anchors.length * 220);

  const IMG_MIN_GAP = 140;
  const LABEL_MIN_GAP = 42;
  const THUMB_H = 72;
  const GAP_ABOVE_AXIS = 26;
  const STAGGER_STEP = 46;
  const TOP_MARGIN = 40;
  const BELOW_SPACE = 50;

  // sort by year, keep track of original DOM node per item
  const items = anchors.map((el, i) => ({
    el, label: yearLabels[i], year: parseInt(el.dataset.year, 10)
  })).sort((a, b) => a.year - b.year);

  const trueX = items.map(it => ((it.year - START_YEAR) / SPAN) * TRACK_WIDTH);

  // image collision -> vertical stagger
  const stagger = [0];
  for (let i = 1; i < items.length; i++) {
    stagger.push((trueX[i] - trueX[i - 1] < IMG_MIN_GAP) ? stagger[i - 1] + 1 : 0);
  }
  const maxStagger = Math.max(...stagger);

  // label collision -> horizontal-only redistribution, clustered
  const labelX = trueX.slice();
  let i = 0;
  while (i < items.length) {
    let j = i;
    while (j + 1 < items.length && (trueX[j + 1] - labelX[j]) < LABEL_MIN_GAP) j++;
    if (j > i) {
      const cluster = [];
      for (let k = i; k <= j; k++) cluster.push(k);
      const center = cluster.reduce((s, k) => s + trueX[k], 0) / cluster.length;
      cluster.forEach((k, idx) => {
        labelX[k] = center + (idx - (cluster.length - 1) / 2) * LABEL_MIN_GAP;
      });
    }
    i = j + 1;
  }

  const AXIS_TOP = TOP_MARGIN + maxStagger * STAGGER_STEP + GAP_ABOVE_AXIS + THUMB_H;
  const WRAP_HEIGHT = AXIS_TOP + BELOW_SPACE;

  wrap.style.width = TRACK_WIDTH + 'px';
  wrap.style.height = WRAP_HEIGHT + 'px';
  line.style.top = AXIS_TOP + 'px';

  items.forEach((it, idx) => {
    const dottedLen = GAP_ABOVE_AXIS + stagger[idx] * STAGGER_STEP;
    const thumbTop = AXIS_TOP - dottedLen - THUMB_H;
    const dottedTop = AXIS_TOP - dottedLen;

    const anchor = it.el;
    anchor.style.position = 'absolute';
    anchor.style.top = '0';
    anchor.style.left = (trueX[idx] / TRACK_WIDTH * 100) + '%';

    const thumb = anchor.querySelector('.tl-thumb');
    thumb.style.position = 'absolute';
    thumb.style.left = '50%';
    thumb.style.marginLeft = -(THUMB_H / 2) + 'px';
    thumb.style.top = thumbTop + 'px';
    thumb.style.width = THUMB_H + 'px';
    thumb.style.height = THUMB_H + 'px';

    const dotted = anchor.querySelector('.tl-dotted');
    dotted.style.position = 'absolute';
    dotted.style.left = '50%';
    dotted.style.marginLeft = '-0.5px';
    dotted.style.top = dottedTop + 'px';
    dotted.style.height = dottedLen + 'px';

    it.label.style.position = 'absolute';
    it.label.style.top = (AXIS_TOP + 8) + 'px';
    it.label.style.left = (labelX[idx] / TRACK_WIDTH * 100) + '%';
    it.label.style.transform = 'translateX(-50%)';
  });
})();
