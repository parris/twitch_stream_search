Dev Mode
----

If you have Node.js, you can run:

    npm install -g http-server
    http-server
    open http://localhost:8080/index.html

Architecture
----

I'm modeling the flux architecture here. I'm using the same patterns but implemented a quick version of it myself.

In summary, the way this works is "tightly coupled components" named "containers" which dispatch actions. "Actions" get passed into reducers which will take an action and transform the current state. That new state is then saved in a store. When the store updates it causes the frontend components to updated. The mechanisms presented here are really simple, and could be optimized, but they illustrate how a system like this could work.

Other conscious decisions
----
* I've purposely avoided OOP and mostly stuck to a functional paradigm with a
  couple caveats.
* My dependency managment system uses is a varient of the AMD spec. This requires
  some server.
* I'm relying on some es2015 features that I know exist in chrome and firefox.
  Vanilla JS is very different in 2016.
