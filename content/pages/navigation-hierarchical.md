Title: Diagram Editor UI Spikes &mdash; Navigation &mdash; Hierarchy
save_as: navigation-hierarchy.html

<div id="diagram">
  <h2>Element navigation using diagram hierarchy</h2>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       id="canvas" width="600" height="600">

    <rect x="450" y="175" width="100" height="350" class="element" id="e1"></rect>

    <g transform="translate(50, 75)">
      <rect x="0" y="0" width="375" height="275" class="container" id="e02"></rect>
      <rect x="25" y="25" width="325" height="50" class="element" id="e02-e03"></rect>

      <g transform="translate(25, 100)">
	<rect x="0" y="0" width="150" height="150" class="container" id="e02-e04"></rect>
	<rect x="25" y="25" width="100" height="30" class="element" id="e02-e04-e05"></rect>
	<rect x="25" y="65" width="100" height="30" class="element" id="e02-e04-e06"></rect>
      </g>

      <g transform="translate(200, 100)">
	<rect x="0" y="0" width="150" height="150" class="container" id="e02-e07"></rect>
	<rect x="25" y="25" width="100" height="30" class="element" id="e02-e07-e08"></rect>
	<rect x="25" y="65" width="100" height="30" class="element" id="e02-e07-e09"></rect>
      </g>
    </g>

    <g transform="translate(50, 375)">
      <rect x="0" y="0" width="375" height="150" class="container" id="e10"></rect>
      <rect x="25" y="25" width="75" height="100" class="element" id="e10-e11"></rect>
      <rect x="125" y="25" width="125" height="100" class="element" id="e10-e12"></rect>
      <rect x="275" y="25" width="75" height="100" class="element" id="e10-e13"></rect>
    </g>

  </svg>
</div>
<div id="shortcuts">
  <h2>Keyboard Commands</h2>
  <dl>
    <dt>Navigation mode</dt>
    <dd>
      <dl class="short">
	<dt><kbd>h</kbd></dt><dd>Left</dd>
	<dt><kbd>j</kbd></dt><dd>Down</dd>
	<dt><kbd>k</kbd></dt><dd>Up</dd>
	<dt><kbd>l</kbd></dt><dd>Right</dd>
	<dt><kbd>i</kbd></dt><dd>In</dd>
	<dt><kbd>o</kbd></dt><dd>Out</dd>
      </dl>
    </dd>
  </dl>
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
     if (commands[e.key]) {
       state = commands[e.key](state)
	 render(state);
     }
   });
 });

 function init() {
   var e = document.getElementById('e02');

   return {
     activeElement: e
   }
 }

 function render(state) {
   Array.prototype.slice.call(document.querySelectorAll('.active')).map(function(el) {
     el.classList.remove('active');
   });

   state.activeElement.classList.add('active');
 }

 function moveIn(state) {
   if ( ! state.activeElement.matches('.container')) {
     return state
   }

   directChildIds = getDirectChildIds(state.activeElement.id);
   if (directChildIds.length > 0) {
     state.activeElement = document.getElementById(directChildIds[0]);
   }
   return state;
 }

 function getDirectChildIds(aid) {
   var children = Array.prototype.slice.call(document.querySelectorAll('*[id^="' + aid + '-"]'));
   var childIds = children.map(function (e) { return e.id; });
   return childIds.filter(function(cid) {
     return aid.split('-').length === cid.split('-').length - 1;
   }).sort();
 }


 function moveOut(state) {
   var parentId = getParentId(state.activeElement.id);
   if (parentId == '') {
     return state;
   }

   var parent = document.getElementById(parentId);
   if (parent) {
     state.activeElement = parent
   }
   return state;
 }

 function getParentId(id) {
   return id.split('-').slice(0, -1).join('-');
 }

 function generateMoveFunc(axis, direction) {
   var NAV_AXIS_THRESHOLD = 0.1;

   return function(state) {

     var parentId = getParentId(state.activeElement.id);
     var childIds = (parentId != '')
       ? getDirectChildIds(parentId)
       : Array.prototype.slice
	      .call(document.querySelectorAll('svg rect:not([id*="-"])'))
	      .map(function(e) { return e.id });


     var siblings = childIds.filter(function(i) { return i !== state.activeElement.id });

     var best = { distance:Infinity, sibling:null },
	 ar = state.activeElement.getBoundingClientRect();

     for (var i = 0; i < siblings.length; i++) {
       var s = document.getElementById(siblings[i]),
	   r = s.getBoundingClientRect(),
	   dx = r.left - ar.left,
	   dy = r.top - ar.top,
	   dAxis = axis == 'x' ? dx : dy,
	   dOrtAxis = axis == 'x' ? dy : dx;

       if (direction == '-' && dAxis > 0) { continue; }
       else if (direction == '+' && dAxis < 0) { continue; }
       else if (dOrtAxis != 0.0 && Math.abs(dAxis / dOrtAxis) < NAV_AXIS_THRESHOLD) { continue; }

       var d = Math.sqrt(dAxis*dAxis + dOrtAxis*dOrtAxis);
       if (d < best.distance) {
	 best.distance = d;
	 best.sibling = s;
       }
     }

     if (best.sibling) {
       state.activeElement = best.sibling;
     }

     return state;
   }
 }

 var commands = {
   'h': generateMoveFunc('x', '-'),
   'j': generateMoveFunc('y', '+'),
   'k': generateMoveFunc('y', '-'),
   'l': generateMoveFunc('x', '+'),
   'i': moveIn,
   'o': moveOut,
 };

</script>

<div id="info">
  <h2>Description</h2>
  <p>
    This spike was built to investigate hierarchical navigation of diagrams by extending
    the homerow navigation commands &mdash; <kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd> and <kbd>l</kbd> &mdash; with two extra commands:
    <kbd>i</kbd> for moving inside an element and <kbd>o</kbd> for changing focus to the parent container.
  </p>
</div>
