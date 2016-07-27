// You might not need jquery . com

if ( ! Array.prototype.includes) {
  Array.prototype.includes = function(e) {
    return this.indexOf(e) >= 0;
  }
}

Element.prototype.compare = function(e2, attr) {
  var v1 = this.getAttribute(attr),
      v2 = e2.getAttribute(attr);

  if (v1 > v2) {
    return 1;
  } else if (v1 < v2) {
    return -1;
  } else {
    return 0;
  }
}


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function KeyActor(key, fn) {
  return function(e) {
    return (e.key == key) ? fn : null;
  }
}

function KeyMapActor(keyMap) {
  return function(e) {
    return (keyMap[e.key]) ? keyMap[e.key] : null;
  }
}

function XorActor() {
  var actors = arguments;
  return function(e) {
    for (var actor of actors) {
      var f = actor(e);
      if (f) {
	return f;
      }
    }
    return null;
  }
}

function NumericActor(progressFn, doneFn) {
  return function(e) {
    if (e.key == 'Enter') {
      return function(state) {
	state.number = state._numberInput || 0;
	state._numberInput = 0;
	return doneFn(state);
      }

    } else if (e.key == 'Backspace') {
      return function(state) {
	state._numberInput = Math.floor(state._numberInput / 10);
	return state;
      }

    } else if (/^[0-9+-_=]$/.test(e.key)) {
      return function(state) {
	if ( ! state._numberInput) {
	  state._numberInput = 0;
	}

	var map = { '-': -10, '=': 10, '_': -1, '+': 1 };

	if (map[e.key]) {
	  state._numberInput += map[e.key];
	} else {
       	  state._numberInput = state._numberInput * 10 + parseInt(e.key, 10);
	}

	return progressFn(state);
      }

    } else {
      return null;
    }
  }
}

