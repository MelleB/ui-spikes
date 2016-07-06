Title:Diagram Editor UI Spikes
save_as: index.html

<div id="intro">
  <!--
  <p>
    The goal of these pages is to gather feedback on different means of
    diagram navigation and modification using keyboard interaction. To be
    more concrete: I'm trying to find ways to create diagrams primarily
    for use in software development. Examples of these are Domain Models,
    Component Diagrams and Use-case diagrams.
  </p>
  <p>
    The idea to build an editor grew out of frustration with existing
    solutions. The de facto solutions are optimized for point-and-click,
    with keyboard navigation being a second-class citizen. Sure they have
    shortcuts for most common operations, but the application was not
    designed with keyboard-only interaction in mind.
  </p>
  <p>
    Having used vim extensively for the past decade, I sometimes miss it's
    power when manipulating non-textual documents, especially when I need
    to capture my thoughts as fast as possible.
  </p>
  <p>
    The idea here is to create several demos or spikes representing a
    specific interaction with a diagram. It's very much an exploration of
    efficient keyboard navigation for diagram manupilation.
  </p>
  <p>
    If you have any suggestions, examples or comments I'd be very
    interested in hearing them. My (probably incomplete) list of
    interactions to investigate:
  </p>
  -->

  <h2>Introduction</h2>
  <div class="double-column">
    <p>
      With these spikes I want to investigate and gather feedback about
      efficient diagram creation using the keyboard, as this is often
      considered a second-class citizen.
    </p>
    <p>
      The idea to build an editor grew out of frustration with existing
      solutions. The de facto solutions are optimized for point-and-click,
      with keyboard navigation being a second-class citizen. Sure they have
      shortcuts for most common operations, but the application was not
      designed with keyboard-only interaction in mind.
    </p>
    <p>
      Currently the list of completed spikes is very limited:
      
    </p>
    <ul>
      <li><a href="navigation-hierarchy.html">Element traversal using diagram hierarchy</a></li>
      <li><a href="navigation-jump.html">Element traversal by jumping</a></li>
    </ul>
    <p>
      I hope to be able to add more experiments soon.
    </p>
    <p>
      If you have any suggestions, examples or comments I'd be very
      interested in hearing them. You can <a href="https://github.com/MelleB/ui-spikes/issues/new">open an issue</a> for general comments. The spike pages themselves have a simple Google Form embedded which you can use to send some quick feedback.
    </p>
  </div>

  <h2>TODO / In development</h2>
  <ul class="spike-list">
    <li><span>Diagram traversal</span>
      <ul>
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
	<li><span>Elements</span>
	  <ul>
	    <li>Position</li>
	    <li>Size</li>
	    <li>Style (e.g. background + border)</li>
	  </ul>
	</li>
	<li>
	  <span>Relationship routing</span>
	  <ul>
	    <li>Adding control points</li>
	    <li>Change relationship type (association, generalization, etc.)</li>
	  </ul>
	</li>
      </ul>
    </li>
  </ul>
</div>