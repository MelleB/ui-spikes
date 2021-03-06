Title: Diagram Editor UI Spikes &mdash; Positioning &mdash; Simple
save_as: positioning-single-axis.html

<div id="diagram">
  <h2>Element positioning on a single axis</h2>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       xmlns:data="urn:data-namespace" id="canvas" width="600" height="600">
    <defs>
      <!-- From: http://tutorials.jenkov.com/svg/marker-element.html -->
      <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
              orient="auto">
        <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;" />
      </marker>
    </defs>
    <rect x="125" y="485" width="100" height="30" class="element" id="e2" />
    <rect x="450" y="100" width="100" height="30" class="element" id="e3" />
    <rect x="100" y="150" width="100" height="30" class="element" id="e4" />
    <rect x="400" y="450" width="100" height="30" class="element" id="e5" />
    <rect x="250" y="285" width="100" height="30" class="element active" id="e1" />
    <g id="overlay">
    </g>
  </svg>
</div>

<div id="shortcuts">
  <h2>Keyboard Commands</h2>
  <dl>
    <dt>Global Mode</dt>
    <dd>
      This would be considered the 'base' state of the eventual application.
      <dl>
	<dt><kbd>m</kbd></dt>
	<dd>Enter <em>Movement Mode</em></dd>
      </dl>
    </dd>
    <dt>Movement mode</dt>
    <dd>
      In this mode you chose which direction to move
      <dl>
	<dt><kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, <kbd>l</kbd></dt>
	<dd>Direction to move (left, down, up, right respectivily)</dd>
      </dl>
    </dd>
    <dt>Ruler mode</dt>
    <dd>
      Rulers appear on the screen. You can position the element using numbered input, labels or incremental steps.
      <dl>
	<dt><kbd>0</kbd> &ndash; <kbd>9</kbd></dt>
	<dd>
	  Enter the amount of pixels you want to move in the direction you chose in the <em>Movement Mode</em>.
	</dd>
	<dt><kbd>a</kbd> &ndash; <kbd>d</kbd></dt>
	<dd>
	  Jump to marker depicted on the axis. Switches to <em>Movement Mode</em>.
	</dd>
	<dt><kbd>-</kbd></dt>
	<dd>Substract 10 pixels from the current position</dd>
	<dt><kbd>=</kbd></dt>
	<dd>Add 10 pixels from the current position</dd>
	<dt><kbd>+</kbd></dt>
	<dd>Substract 1 pixel from the current position</dd>
	<dt><kbd>_</kbd></dt>
	<dd>Add 1 pixel from the current position</dd>
	<dt><kbd>Enter</kbd></dt>
	<dd>Move element to new position. Switches to <em>Movement Mode</em>.</dd>
	<dt><kbd>Backspace</kbd></dt>
	<dd>Remove last entered number.</dd>
      </dl>
    </dd>
  </dl>
</div>

<div id="info">
  <h2>Description</h2>
  <p>
    This is an experiment with element positioning.
    The approach taken here is to move the element over a single axis,
    creating shortcuts to 'nice' positions, currently limited to sibling alignment.
    This is the third spike that I built, and already
    the keyboard operations start to get pretty complex.
  </p>
  <p>
    Enter <em>Movement Mode</em> by pressing <kbd>m</kbd>. Four arrows are shown indicating you should pick a direction. The direction you want to move is picked by one of the home-row movement keys &mdash; <kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd>, <kbd>l</kbd>. You can press <kbd>Esc</kbd> to get out of <em>Movement Mode</em>.
  </p>
  <p>
    Now you've entered <em>Ruler Mode</em> (I'm still working on the terminology...)
    A ruler appears with tick marks and labels. You can press the letter of the label (e.g. <kbd>a</kbd> or <kbd>b</kbd>) to jump to that position. Another option is to enter the number of pixels you want to move.
    You can move in increments of 10 by pressing <kbd>-</kbd> or <kbd>=</kbd>. Fine tuning can be done using <kbd>_</kbd> or <kbd>+</kbd>. You can undo a number you've entered by hitting <kbd>Backspace</kbd>.
  </p>
  <p>
    In <em>Ruler Mode</em>, at any point you can press <kbd>Esc</kbd> to return to the <em>Movement Mode</em>.
  </p>
</div>

<script type="text/javascript">
 ready(function() {

   var ResetActor = KeyActor('Escape', init);
   var MoveModeActor = KeyActor('m', enableOverlayRendering);
   var DirectionActor = XorActor(ResetActor, KeyMapActor({
     'h': enableRulerRendering('left'),
     'j': enableRulerRendering('down'),
     'k': enableRulerRendering('up'),
     'l': enableRulerRendering('right'),
   }));
   var AmountActor = XorActor(ResetActor, NumericActor(updateEnteredNumerics, updateElementCoordinates));

   function init(state) {
     return {
       'actor': MoveModeActor,
       'element': document.getElementById('e1')
     };
   }

   function enableOverlayRendering(state) {
     state.renderOverlay = true;
     state.actor = DirectionActor;
     return state;
   }

   function enableRulerRendering(direction) {
     var excludeElem = {
       'left': function(e) { return state.element.compare(e, 'x') != 1 },
       'right': function(e) { return state.element.compare(e, 'x') != -1 },
       'up': function(e) { return state.element.compare(e, 'y') != 1 },
       'down': function(e) { return state.element.compare(e, 'y') != -1 }
     }[direction];

     return function(state) {
       state.direction = direction;

       state.markers = [];

       var elements = document.querySelectorAll("rect:not(#e1)");
       for (var e of elements) {
	 if (excludeElem(e)) {
	   continue;
	 }

	 var e_bbox = e.getBBox(),
	     ae_bbox = state.element.getBBox(),
	     marker = {'char': 'a',
		       'element': e, 'coordinates': [] };

	 if (['up', 'down'].includes(state.direction)) {
	   var width = state.element.compare(e, 'x') == -1 ? 0 : e_bbox.width,
	       height = state.element.compare(e, 'y') == 1 ? 0 : e_bbox.height,
	       half_width = Math.round(ae_bbox.width / 2);
	   marker.coordinates = [e_bbox.x + width,       e_bbox.y + height,
				 ae_bbox.x + half_width, e_bbox.y + height ];

	 } else { // Left or right
	   var width = state.element.compare(e, 'x') == 1 ? 0 : e_bbox.width,
	       height = state.element.compare(e, 'y') == -1 ? 0 : e_bbox.height,
	       half_height = Math.round(ae_bbox.height / 2);
	   marker.coordinates = [e_bbox.x + width, e_bbox.y + height,
				 e_bbox.x + width, ae_bbox.y + half_height];
	 }

	 state.markers.push(marker);
       }

       state.markers.sort(function(a, b) {
	 var attr = ['left', 'right'].includes(state.direction) ? 'x' : 'y';
	 var dir = ['left', 'up'].includes(state.direction) ? -1 : 1;
	 return a.element.compare(b.element, attr) * dir;
       });

       var markerStart = 'a'.charCodeAt(0);
       var markerMap = {};
       state.markers.forEach(function(e, i) {
	 e.char = String.fromCharCode(markerStart + i);
	 markerMap[e.char] = jumpToMarker(e);
       });

       state.actor = XorActor(AmountActor, KeyMapActor(markerMap));

       return state;
     }
   }

   function jumpToMarker(marker) {
     return function(state) {
       var prop = ['left', 'right'].includes(state.direction) ? 'x' : 'y';
       var val = marker.element.getAttribute(prop);
       state.element.setAttribute(prop, val);

       return enableOverlayRendering(init());
     }

   }

   function updateElementCoordinates(state) {

     var prop = ['left', 'right'].includes(state.direction) ? 'x' : 'y',
	 dir = ['up', 'left'].includes(state.direction) ? -1 : 1,
	 size = 0,
	 val = parseInt(state.element.getAttribute(prop));

     if (['down', 'right'].includes(state.direction)) {
       var r = state.element.getBBox();
       size = state.direction == 'down' ? r.height : r.width;
     }

     state.element.setAttribute(prop, val + dir * state.number + size);

     return enableOverlayRendering(init());
   }

   function updateEnteredNumerics(state) {
     return state;
   }

   function render(state) {
     var overlay = document.getElementById('overlay');
     var r = state.element.getBBox();
     while (overlay.firstChild) {
       overlay.removeChild(overlay.firstChild);
     }

     if (state.renderOverlay && !state.direction) {
       var yh = r.y + Math.round(r.height / 2);
       var xh = r.x + Math.round(r.width / 2);
       var w = 10;
       var lines = [
	 addLine(overlay, r.x, yh, r.x - w, yh, 'arrow'),
	 addLine(overlay, r.x + r.width, yh, r.x + r.width + w, yh, 'arrow'),
	 addLine(overlay, xh, r.y, xh, r.y - w, 'arrow'),
	 addLine(overlay, xh, r.y + r.height, xh, r.y + r.height + w, 'arrow')
       ].map(function(l) {
	 l.style.markerEnd = 'url(#markerArrow)';
       });

     } else if (state.renderOverlay && state.direction) {
       drawRuler(overlay, state);

       state.markers.forEach(function(m, _) {
	 var mcs = m.coordinates;

	 var d = ['left', 'right'].includes(state.direction) ? -1 : 1,
	     rx = mcs[2] + (state.element.compare(m.element, 'x') == d ? -20 : 0),
	     ry = mcs[3] + (state.element.compare(m.element, 'y') == d ? 0 : -20),
	     tx = mcs[2] + (state.element.compare(m.element, 'x') == d ? -15 : 5),
	     ty = mcs[3] + (state.element.compare(m.element, 'y') == d ? 15 : -5);

	 addLine(overlay, mcs[0], mcs[1], mcs[2], mcs[3], 'indicator');
	 addRect(overlay, rx, ry, 20, 20, 'label-bg');
	 addText(overlay, tx, ty, m.char, 'label');
       });

       if (state._numberInput) {
	 var n = state._numberInput,
	     m = ['left', 'up'].includes(state.direction) ? -1 : 1;
	 if (['left', 'right'].includes(state.direction)) {
	   addRect(overlay, r.x + n * m, r.y, r.width, r.height, 'placeholder');
	 } else {
	   addRect(overlay, r.x, r.y + n * m, r.width, r.height, 'placeholder');
	 }
       }
     }
   }

   function getRulerCoordinates(r) {
     var c = document.getElementById('canvas').getBoundingClientRect();
     var x1, y1, x2, y2;
     switch (state.direction) {
       case 'left':
	 x1 = r.x;
	 x2 = 0;
	 y1 = y2 = r.y + r.height / 2;
	 break;
       case 'right':
	 x1 = r.x + r.width;
	 x2 = c.width;
	 y1 = y2 = r.y + r.height / 2;
	 break;
       case 'up':
	 x1 = x2 = r.x + r.width / 2;
	 y1 = r.y;
	 y2 = 0;
	 break;
       case 'down':
	 x1 = x2 = r.x + r.width / 2;
	 y1 = r.y + r.height;
	 y2 = c.height;
	 break;
       default:
	 throw 'Unhandled state.direction: ' + state.direction
     }
     return [x1, y1, x2, y2].map(Math.round);
   }

   function drawRuler(overlay, state) {
     var bbox	= state.element.getBBox();
     var cs	= getRulerCoordinates(bbox);
     addLine(overlay, cs[0], cs[1], cs[2], cs[3]);

     var d	= 2,
	 step	= 10,
	 axis	= ['left', 'right'].includes(state.direction) ? 'x' : 'y',
	 dir	= ['left', 'up'].includes(state.direction) ? -1 : 1,
	 ends	= axis == 'x' ? [cs[0], cs[2]] : [cs[1], cs[3]];

     for (var a = ends[0] + dir * 10; dir * a < dir * ends[1]; a += dir * step) {
       var x = axis == 'x' ? a : cs[2];
       var y = axis == 'x' ? cs[3] : a;
       if ((a - ends[0]) % 50 == 0) {
	 var lbl	= (a - ends[0]) * dir,
	     ty		= axis == 'x' ? y + 12 : y + 3,
	     tx		= axis == 'x' ? x - 5 : x + 5;
	 addText(overlay, tx, ty, lbl, 'ruler');

	 var x, y, lx1, lx2, ly1, ly2;
	 if (axis == 'x') {
	   x = lx1 = lx2 = a;
	   y = cs[3];
	   ly1 = y - d; ly2 = y + d;
	 } else {
	   x = cs[2]
	   y = ly1 = ly2 = a;
	   lx1 = x - d; lx2 = x + d;

	 }
	 addLine(overlay, lx1, ly1, lx2, ly2);
       }
     }
   }

   function addText(parent, x, y, text, cls) {
     var t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
     var textNode = document.createTextNode(text);
     t.appendChild(textNode);
     t.setAttribute('x', x);
     t.setAttribute('y', y);
     if (cls) {
       t.setAttribute('class', cls);
     }
     parent.appendChild(t);
     return t;
   }


   function addRect(parent, x, y, w, h, cls) {
     var r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
     r.setAttribute('x', x);
     r.setAttribute('y', y);
     r.setAttribute('width', w);
     r.setAttribute('height', h);
     if (cls) {
       r.setAttribute('class', cls);
     }
     parent.appendChild(r);
     return r;
   }

   function addLine(parent, x1, y1, x2, y2, cls) {
     var l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
     l.setAttribute('x1', x1);
     l.setAttribute('y1', y1);
     l.setAttribute('x2', x2);
     l.setAttribute('y2', y2);
     if (cls) {
       l.setAttribute('class', cls);
     }
     parent.appendChild(l);
     return l;
   }

   var state = init();
   window.addEventListener('keydown', function(e) {
     var f = state.actor(e);
     if (f) {
       state = f(state);
       render(state);
       //console.log(state);
     }
   });
 });

</script>


