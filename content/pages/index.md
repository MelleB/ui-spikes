Title:Diagram Editor UI Spikes
save_as: index.html

<div id="intro">
  <h2 class="main">Introduction</h2>
  <p>
    With these spikes I want to investigate and gather feedback about
    efficient diagram creation using the keyboard, as this is often
    considered a second-class citizen.
  </p>
  <p>
    The goal is to build a native, open source editor for software
    diagrams aimed at power users.
  </p>
  <p>
    The idea to build an editor grew out of frustration with existing
    solutions. The de facto solutions are optimized for point-and-click,
    with keyboard navigation being a second-class citizen. Sure they have
    shortcuts for most common operations, but the application was not
    designed with keyboard-only interaction in mind.
  </p>
  <p>
    As a long-time <a href="http://www.vim.org" >vim</a> user I do not
    believe mouse interaction is required for diagram navigation and
    manipulation. In the same way cursor keys simplify text
    navigation, the mouse simplifies diagram navigation (and
    manipulation). Although Vim has quite a steep learning curve, I
    have yet to come accross someone who seriously used vim for a
    while and found it a waste of time. Being able to navigate and
    modify text efficiently using only a few keystrokes has something
    magical.
  </p>
  <p>
    Currently the list of completed spikes is very limited, but I hope to
    be able to add more experiments soon.
  </p>
</div>

<div id="info">
  <h2>Types of keyboard interactions</h2>
  <p>
    AKA my TODO-list. If you have suggestions for keyboard interactions
    please let me know!
  </p>
  <ul class="spike-list">
    <li><span>Diagram traversal</span>
      <ul>
	<li><span>Elements</span>
	  <ul>
	    <li class="checked"><a href="navigation-hierarchy.html">Element traversal using diagram hierarchy</a></li>
	    <li class="checked"><a href="navigation-jump.html">Element traversal by jumping</a></li>
	  </ul>
	  <li><span>Relationships</span>
	    <ul>
	      <li>Naive (H, J, K, L)</li>
	      <li>Jumping</li>
	    </ul>
	  </li>
	  <li>Switching between element and relation traversal</li>
      </ul>
	</li>
	<li><span>Diagram manipulation</span>
	  <ul>
	    <li><span>Addition of elements</span><ul><li>...</li></ul></li>
	    <li><span>Addition of relationships</span><ul><li>...</li></ul></li>
	    <li><span>Element positioning</span>
	      <ul>
		<li class="checked"><a href="positioning-single-axis.html">Single axis</a></li>
		<li>Dual axis</li>
		<li>...</li>
	      </ul>
	    </li>
	    <li><span>Elements</span>
	      <ul>
		<li>Size</li>
		<li>Style (e.g. background + border)</li>
	      </ul>
	    </li>
	    <li>
	      <span>Relationship routing</span>
	      <ul>
		<li>Adding control points</li>
		<li>Change type (e.g. association, generalization)</li>
	      </ul>
	    </li>
	  </ul>
	</li>
  </ul>
</div>
