# Diagram Editor UI Spikes

The goal of these pages is to gather feedback on different means of
diagram navigation and modification using keyboard interaction. To be
more concrete: I'm trying to find ways to create diagrams primarily
for use in software development. Examples of these are Domain Models,
Component Diagrams and Use-case diagrams.

The idea to build an editor grew out of frustration with existing
solutions. The de facto solutions are optimized for point-and-click,
with keyboard navigation being a second-class citizen. Sure they have
shortcuts for most common operations, but the application was not
designed with keyboard-only interaction in mind.

Having used vim extensively for the past decade, I sometimes miss it's
power when manipulating non-textual documents, especially when I need
to capture my thoughts as fast as possible.

I want to use this repository to create several demos or spikes
representing a specific interaction with a diagram. It's very much an
exploration of efficient keyboard navigation for diagram manupilation.

If you have any suggestions, examples or comments I'd be very
interested in hearing them. My (probably incomplete) list of
interactions to investigate:

## Spikes:

- [ ] Diagram traversal
      - [X] Elements
            - [X] Hierarchical
	    - [X] By jumping
      - [ ] Relationships
	    - [ ] Naive (H, J, K, L)
	    - [ ] Jumping
      - [ ] Switching between element and relation traversal
- [ ] Diagram manipulation
      - [ ] Elements
            - [ ] Creation
            - [ ] Position
	    - [ ] Size
	    - [ ] Style (e.g. background + border)
      - [ ] Relationship routing
            - [ ] Creation
            - [ ] Adding control points
	    - [ ] Change relationship type (association, generalization, etc.)
