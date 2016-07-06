Title: Diagram Editor UI Spikes &mdash; Navigation &mdash; Hierarchy
save_as: navigation-hierarchy.html

<div id="intro">
  <h2>Element navigation using diagram hierarchy</h2>
  <p>
    This spike was built to investigate hierarchical navigation of diagrams by extending
    the homerow navigation commands &mdash; <kbd>h</kbd>, <kbd>j</kbd>, <kbd>k</kbd> and <kbd>l</kbd> &mdash; with two extra commands:
    <kbd>i</kbd> for moving inside an element and <kbd>o</kbd> for changing focus to the parent container.
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
  <div id="key-list">
    <h2>Keys</h2>
    <ul>
      <li><kbd>h</kbd>Left</li>
      <li><kbd>j</kbd>Down</li>
      <li><kbd>k</kbd>Up</li>
      <li><kbd>l</kbd>Right</li>
      <li><kbd>i</kbd>In</li>
      <li><kbd>o</kbd>Out</li>
    </ul>
  </div>
</div>
<div id="feedbackForm">
  <iframe src="https://docs.google.com/forms/d/1pm_Fb3wVTPGmOtqtSlLiqt4LPPCC0DjmtZ5AhP-CWPs/viewform?embedded=true" width="800" height="900" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
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
