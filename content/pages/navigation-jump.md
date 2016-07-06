Title: Diagram Editor UI Spikes &mdash; Navigation &mdash; Jump mode
save_as: navigation-jump.html

<div id="intro">
  <h2>Element navigation using jumping</h2>
  <p>
    With this spike we investigate movement between diagram elements
    by means of jumping. Inspiration from this method came from
    <a href="https://github.com/winterTTr/ace-jump-mode">Ace Jump Mode</a> for Emacs.
  </p>
  <p>
    If you press <kbd>z</kbd> labels will pop up in the top right
    corner of the elements. After that you can press the key
    associated with the element to navigate to that specific element.
    E.g. pressing <kbd>i</kbd> will navigate to the right most element.
  </p>
  <p class="highlight">
    I would really appreciate feedback on this form of navigation. Would you
    like to use this in your daily work? Or would you go for the mouse
    instead? You can use the form below to send me some feedback (both
    positive and negative!).
    Or <a href="https://github.com/MelleB/ui-spikes/issues/new">open an issue</a>.
  </p>
</div>
<div id="container">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       xmlns:data="urn:data-namespace" id="canvas" width="600" height="600">

    <g transform="translate(50, 75)">
      <rect x="0" y="0" width="375" height="275" class="container" id="e02" data:char="a"></rect>
      <rect x="25" y="25" width="325" height="50" class="element" id="e02-e03" data:char="b"></rect>

      <g transform="translate(25, 100)">
	<rect x="0" y="0" width="150" height="150" class="container" id="e02-e04" data:char="c"></rect>
	<rect x="25" y="25" width="100" height="30" class="element" id="e02-e04-e05" data:char="d"></rect>
	<rect x="25" y="65" width="100" height="30" class="element" id="e02-e04-e06" data:char="e"></rect>
      </g>

      <g transform="translate(200, 100)">
	<rect x="0" y="0" width="150" height="150" class="container" id="e02-e07" data:char="f"></rect>
	<rect x="25" y="25" width="100" height="30" class="element" id="e02-e07-e08" data:char="g"></rect>
	<rect x="25" y="65" width="100" height="30" class="element" id="e02-e07-e09" data:char="h"></rect>
      </g>
    </g>

    <rect x="450" y="175" width="100" height="350" class="element" id="e1" data:char="i"></rect>

    <g transform="translate(50, 375)">
      <rect x="0" y="0" width="375" height="150" class="container" id="e10" data:char="j"></rect>
      <rect x="25" y="25" width="75" height="100" class="element" id="e10-e11" data:char="k"></rect>
      <rect x="125" y="25" width="125" height="100" class="element" id="e10-e12" data:char="l"></rect>
      <rect x="275" y="25" width="75" height="100" class="element" id="e10-e13" data:char="m"></rect>
    </g>

    <g id="labels">
      <g data:char="a">
	<rect x="50" y="75" width="20" height="20" class="bg-container"></rect>
	<text x ="55" y="90">a</text>
      </g>

      <g data:char="b">
	<rect x="75" y="100" width="20" height="20" class="bg-element"></rect>
	<text x ="80" y="115">b</text>
      </g>

      <g data:char="c">
	<rect x="75" y="175" width="20" height="20" class="bg-container"></rect>
	<text x ="80" y="190">c</text>
      </g>

      <g data:char="d">
	<rect x="100" y="200" width="20" height="20" class="bg-element"></rect>
	<text x ="105" y="215">d</text>
      </g>

      <g data:char="e">
	<rect x="100" y="240" width="20" height="20" class="bg-element"></rect>
	<text x ="105" y="255">e</text>
      </g>

      <g data:char="f">
	<rect x="250" y="175" width="20" height="20" class="bg-container"></rect>
	<text x ="255" y="190">f</text>
      </g>

      <g data:char="g">
	<rect x="275" y="200" width="20" height="20" class="bg-element"></rect>
	<text x ="280" y="215">g</text>
      </g>

      <g data:char="h">
	<rect x="275" y="240" width="20" height="20" class="bg-element"></rect>
	<text x ="280" y="255">h</text>
      </g>

      <g data:char="i">
	<rect x="450" y="175" width="20" height="20" class="bg-element"></rect>
	<text x ="455" y="190">i</text>
      </g>

      <g data:char="j">
	<rect x="50" y="375" width="20" height="20" class="bg-container"></rect>
	<text x ="55" y="390">j</text>
      </g>

      <g data:char="k">
	<rect x="75" y="400" width="20" height="20" class="bg-element"></rect>
	<text x ="80" y="415">k</text>
      </g>

      <g data:char="l">
	<rect x="175" y="400" width="20" height="20" class="bg-element"></rect>
	<text x ="182" y="415">l</text>
      </g>

      <g data:char="m">
	<rect x="325" y="400" width="20" height="20" class="bg-element"></rect>
	<text x ="330" y="415">m</text>
      </g>
    </g>

  </svg>
  <div id="key-list">
    <h2>Shortcut</h2>
    <ul>
      <li><kbd>z [a .. m]</kbd>Jump to node. First press <em>z</em>, then one of the letters <em>a</em>, <em>b</em>, <em>c</em>, ..., <em>l</em>, <em>m</em> that
	show up in the left upper corner of the element you wish to
	navigate to.</li>
    </ul>
  </div>
</div>

<div id="feedbackForm">
  <iframe src="https://docs.google.com/forms/d/1p-pS0qObRI2aWjyRIG54fhk7zFJENEVs4P9DpMSTvno/viewform?embedded=true" width="800" height="900" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
</div>

<script type="text/javascript">
 // You might not need jquery . com
 function ready(fn) {
   if (document.readyState != 'loading'){
     fn();
   } else {
     document.addEventListener('DOMContentLoaded', fn);
   }
 }

 var state = {};

 ready(function() {

   state = init();
   render(state);

   window.addEventListener('keydown', function(e) {
     state = state.keyDownHandler(e, state);
     render(state);
   });

 });

 function listenForZ(e, state) {
   if (e.key == 'z') {
     state.keyDownHandler = listenForKeyInMap;
   }

   return state;
 }

 function listenForKeyInMap(e, state) {
   if (state.keyMap[e.key]) {
     state.activeElement = state.keyMap[e.key]
     state.activeKey = e.key;
   }

   state.keyDownHandler = listenForZ;
   return state;
 }

 function getNodes(selector) {
   return Array.prototype.slice.call(document.querySelectorAll(selector));
 }

 function init() {
   var keyMap = {};
   getNodes('rect[data\\:char]').forEach(function(e) {
     keyMap[e.getAttribute('data:char')] = e;
   });

   return {
     activeElement: document.getElementById('e02'),
     keyMap: keyMap,
     keyDownHandler: listenForZ
   }
 }

 function render(state) {

   getNodes('.active').map(function(el) {
     el.classList.remove('active');
   });
   state.activeElement.classList.add('active');

   if (state.keyDownHandler == listenForZ) {
     document.getElementById('labels').style.opacity = 0;

   } else {
     var activeKey = state.activeElement.getAttribute('data:char');
     var label = document.querySelectorAll('g[data\\:char="'+activeKey+'"]').item(0);
     label.classList.add('active');

     document.getElementById('labels').style.opacity = 100;
   }
 }

</script>