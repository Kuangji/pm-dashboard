(() => {
  // node_modules/xstate/dev/dist/xstate-dev.esm.js
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
  }
  function getDevTools() {
    const w = getGlobal();
    if (w.__xstate__) {
      return w.__xstate__;
    }
    return void 0;
  }
  var devToolsAdapter = (service) => {
    if (typeof window === "undefined") {
      return;
    }
    const devTools = getDevTools();
    if (devTools) {
      devTools.register(service);
    }
  };

  // node_modules/xstate/dist/raise-b47daa89.esm.js
  var Mailbox = class {
    constructor(_process) {
      this._process = _process;
      this._active = false;
      this._current = null;
      this._last = null;
    }
    start() {
      this._active = true;
      this.flush();
    }
    clear() {
      if (this._current) {
        this._current.next = null;
        this._last = this._current;
      }
    }
    enqueue(event) {
      const enqueued = {
        value: event,
        next: null
      };
      if (this._current) {
        this._last.next = enqueued;
        this._last = enqueued;
        return;
      }
      this._current = enqueued;
      this._last = enqueued;
      if (this._active) {
        this.flush();
      }
    }
    flush() {
      while (this._current) {
        const consumed = this._current;
        this._process(consumed.value);
        this._current = consumed.next;
      }
      this._last = null;
    }
  };
  var STATE_DELIMITER = ".";
  var TARGETLESS_KEY = "";
  var NULL_EVENT = "";
  var STATE_IDENTIFIER = "#";
  var WILDCARD = "*";
  var XSTATE_INIT = "xstate.init";
  var XSTATE_STOP = "xstate.stop";
  function createAfterEvent(delayRef, id) {
    return {
      type: `xstate.after.${delayRef}.${id}`
    };
  }
  function createDoneStateEvent(id, output) {
    return {
      type: `xstate.done.state.${id}`,
      output
    };
  }
  function createDoneActorEvent(invokeId, output) {
    return {
      type: `xstate.done.actor.${invokeId}`,
      output,
      actorId: invokeId
    };
  }
  function createErrorActorEvent(id, error) {
    return {
      type: `xstate.error.actor.${id}`,
      error,
      actorId: id
    };
  }
  function createInitEvent(input) {
    return {
      type: XSTATE_INIT,
      input
    };
  }
  function reportUnhandledError(err) {
    setTimeout(() => {
      throw err;
    });
  }
  var symbolObservable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
  function matchesState(parentStateId, childStateId) {
    const parentStateValue = toStateValue(parentStateId);
    const childStateValue = toStateValue(childStateId);
    if (typeof childStateValue === "string") {
      if (typeof parentStateValue === "string") {
        return childStateValue === parentStateValue;
      }
      return false;
    }
    if (typeof parentStateValue === "string") {
      return parentStateValue in childStateValue;
    }
    return Object.keys(parentStateValue).every((key) => {
      if (!(key in childStateValue)) {
        return false;
      }
      return matchesState(parentStateValue[key], childStateValue[key]);
    });
  }
  function toStatePath(stateId) {
    if (isArray(stateId)) {
      return stateId;
    }
    const result = [];
    let segment = "";
    for (let i = 0; i < stateId.length; i++) {
      const char = stateId.charCodeAt(i);
      switch (char) {
        // \
        case 92:
          segment += stateId[i + 1];
          i++;
          continue;
        // .
        case 46:
          result.push(segment);
          segment = "";
          continue;
      }
      segment += stateId[i];
    }
    result.push(segment);
    return result;
  }
  function toStateValue(stateValue) {
    if (isMachineSnapshot(stateValue)) {
      return stateValue.value;
    }
    if (typeof stateValue !== "string") {
      return stateValue;
    }
    const statePath = toStatePath(stateValue);
    return pathToStateValue(statePath);
  }
  function pathToStateValue(statePath) {
    if (statePath.length === 1) {
      return statePath[0];
    }
    const value = {};
    let marker = value;
    for (let i = 0; i < statePath.length - 1; i++) {
      if (i === statePath.length - 2) {
        marker[statePath[i]] = statePath[i + 1];
      } else {
        const previous = marker;
        marker = {};
        previous[statePath[i]] = marker;
      }
    }
    return value;
  }
  function mapValues(collection, iteratee) {
    const result = {};
    const collectionKeys = Object.keys(collection);
    for (let i = 0; i < collectionKeys.length; i++) {
      const key = collectionKeys[i];
      result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
  }
  function toArrayStrict(value) {
    if (isArray(value)) {
      return value;
    }
    return [value];
  }
  function toArray(value) {
    if (value === void 0) {
      return [];
    }
    return toArrayStrict(value);
  }
  function resolveOutput(mapper, context, event, self2) {
    if (typeof mapper === "function") {
      return mapper({
        context,
        event,
        self: self2
      });
    }
    return mapper;
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isErrorActorEvent(event) {
    return event.type.startsWith("xstate.error.actor");
  }
  function toTransitionConfigArray(configLike) {
    return toArrayStrict(configLike).map((transitionLike) => {
      if (typeof transitionLike === "undefined" || typeof transitionLike === "string") {
        return {
          target: transitionLike
        };
      }
      return transitionLike;
    });
  }
  function normalizeTarget(target) {
    if (target === void 0 || target === TARGETLESS_KEY) {
      return void 0;
    }
    return toArray(target);
  }
  function toObserver(nextHandler, errorHandler, completionHandler) {
    const isObserver = typeof nextHandler === "object";
    const self2 = isObserver ? nextHandler : void 0;
    return {
      next: (isObserver ? nextHandler.next : nextHandler)?.bind(self2),
      error: (isObserver ? nextHandler.error : errorHandler)?.bind(self2),
      complete: (isObserver ? nextHandler.complete : completionHandler)?.bind(self2)
    };
  }
  function createInvokeId(stateNodeId, index) {
    return `${index}.${stateNodeId}`;
  }
  function resolveReferencedActor(machine, src) {
    const match = src.match(/^xstate\.invoke\.(\d+)\.(.*)/);
    if (!match) {
      return machine.implementations.actors[src];
    }
    const [, indexStr, nodeId] = match;
    const node = machine.getStateNodeById(nodeId);
    const invokeConfig = node.config.invoke;
    return (Array.isArray(invokeConfig) ? invokeConfig[indexStr] : invokeConfig).src;
  }
  function matchesEventDescriptor(eventType, descriptor) {
    if (descriptor === eventType) {
      return true;
    }
    if (descriptor === WILDCARD) {
      return true;
    }
    if (!descriptor.endsWith(".*")) {
      return false;
    }
    const partialEventTokens = descriptor.split(".");
    const eventTokens = eventType.split(".");
    for (let tokenIndex = 0; tokenIndex < partialEventTokens.length; tokenIndex++) {
      const partialEventToken = partialEventTokens[tokenIndex];
      const eventToken = eventTokens[tokenIndex];
      if (partialEventToken === "*") {
        const isLastToken = tokenIndex === partialEventTokens.length - 1;
        return isLastToken;
      }
      if (partialEventToken !== eventToken) {
        return false;
      }
    }
    return true;
  }
  function createScheduledEventId(actorRef, id) {
    return `${actorRef.sessionId}.${id}`;
  }
  var idCounter = 0;
  function createSystem(rootActor, options) {
    const children = /* @__PURE__ */ new Map();
    const keyedActors = /* @__PURE__ */ new Map();
    const reverseKeyedActors = /* @__PURE__ */ new WeakMap();
    const inspectionObservers = /* @__PURE__ */ new Set();
    const timerMap = {};
    const {
      clock,
      logger
    } = options;
    const scheduler = {
      schedule: (source, target, event, delay, id = Math.random().toString(36).slice(2)) => {
        const scheduledEvent = {
          source,
          target,
          event,
          delay,
          id,
          startedAt: Date.now()
        };
        const scheduledEventId = createScheduledEventId(source, id);
        system._snapshot._scheduledEvents[scheduledEventId] = scheduledEvent;
        const timeout = clock.setTimeout(() => {
          delete timerMap[scheduledEventId];
          delete system._snapshot._scheduledEvents[scheduledEventId];
          system._relay(source, target, event);
        }, delay);
        timerMap[scheduledEventId] = timeout;
      },
      cancel: (source, id) => {
        const scheduledEventId = createScheduledEventId(source, id);
        const timeout = timerMap[scheduledEventId];
        delete timerMap[scheduledEventId];
        delete system._snapshot._scheduledEvents[scheduledEventId];
        if (timeout !== void 0) {
          clock.clearTimeout(timeout);
        }
      },
      cancelAll: (actorRef) => {
        for (const scheduledEventId in system._snapshot._scheduledEvents) {
          const scheduledEvent = system._snapshot._scheduledEvents[scheduledEventId];
          if (scheduledEvent.source === actorRef) {
            scheduler.cancel(actorRef, scheduledEvent.id);
          }
        }
      }
    };
    const sendInspectionEvent = (event) => {
      if (!inspectionObservers.size) {
        return;
      }
      const resolvedInspectionEvent = {
        ...event,
        rootId: rootActor.sessionId
      };
      inspectionObservers.forEach((observer) => observer.next?.(resolvedInspectionEvent));
    };
    const system = {
      _snapshot: {
        _scheduledEvents: (options?.snapshot && options.snapshot.scheduler) ?? {}
      },
      _bookId: () => `x:${idCounter++}`,
      _register: (sessionId, actorRef) => {
        children.set(sessionId, actorRef);
        return sessionId;
      },
      _unregister: (actorRef) => {
        children.delete(actorRef.sessionId);
        const systemId = reverseKeyedActors.get(actorRef);
        if (systemId !== void 0) {
          keyedActors.delete(systemId);
          reverseKeyedActors.delete(actorRef);
        }
      },
      get: (systemId) => {
        return keyedActors.get(systemId);
      },
      getAll: () => {
        return Object.fromEntries(keyedActors.entries());
      },
      _set: (systemId, actorRef) => {
        const existing = keyedActors.get(systemId);
        if (existing && existing !== actorRef) {
          throw new Error(`Actor with system ID '${systemId}' already exists.`);
        }
        keyedActors.set(systemId, actorRef);
        reverseKeyedActors.set(actorRef, systemId);
      },
      inspect: (observerOrFn) => {
        const observer = toObserver(observerOrFn);
        inspectionObservers.add(observer);
        return {
          unsubscribe() {
            inspectionObservers.delete(observer);
          }
        };
      },
      _sendInspectionEvent: sendInspectionEvent,
      _relay: (source, target, event) => {
        system._sendInspectionEvent({
          type: "@xstate.event",
          sourceRef: source,
          actorRef: target,
          event
        });
        target._send(event);
      },
      scheduler,
      getSnapshot: () => {
        return {
          _scheduledEvents: {
            ...system._snapshot._scheduledEvents
          }
        };
      },
      start: () => {
        const scheduledEvents = system._snapshot._scheduledEvents;
        system._snapshot._scheduledEvents = {};
        for (const scheduledId in scheduledEvents) {
          const {
            source,
            target,
            event,
            delay,
            id
          } = scheduledEvents[scheduledId];
          scheduler.schedule(source, target, event, delay, id);
        }
      },
      _clock: clock,
      _logger: logger
    };
    return system;
  }
  var executingCustomAction = false;
  var $$ACTOR_TYPE = 1;
  var ProcessingStatus = /* @__PURE__ */ (function(ProcessingStatus2) {
    ProcessingStatus2[ProcessingStatus2["NotStarted"] = 0] = "NotStarted";
    ProcessingStatus2[ProcessingStatus2["Running"] = 1] = "Running";
    ProcessingStatus2[ProcessingStatus2["Stopped"] = 2] = "Stopped";
    return ProcessingStatus2;
  })({});
  var defaultOptions = {
    clock: {
      setTimeout: (fn, ms) => {
        return setTimeout(fn, ms);
      },
      clearTimeout: (id) => {
        return clearTimeout(id);
      }
    },
    logger: console.log.bind(console),
    devTools: false
  };
  var Actor = class {
    /**
     * Creates a new actor instance for the given logic with the provided options,
     * if any.
     *
     * @param logic The logic to create an actor from
     * @param options Actor options
     */
    constructor(logic, options) {
      this.logic = logic;
      this._snapshot = void 0;
      this.clock = void 0;
      this.options = void 0;
      this.id = void 0;
      this.mailbox = new Mailbox(this._process.bind(this));
      this.observers = /* @__PURE__ */ new Set();
      this.eventListeners = /* @__PURE__ */ new Map();
      this.logger = void 0;
      this._processingStatus = ProcessingStatus.NotStarted;
      this._parent = void 0;
      this._syncSnapshot = void 0;
      this.ref = void 0;
      this._actorScope = void 0;
      this.systemId = void 0;
      this.sessionId = void 0;
      this.system = void 0;
      this._doneEvent = void 0;
      this.src = void 0;
      this._deferred = [];
      const resolvedOptions = {
        ...defaultOptions,
        ...options
      };
      const {
        clock,
        logger,
        parent,
        syncSnapshot,
        id,
        systemId,
        inspect
      } = resolvedOptions;
      this.system = parent ? parent.system : createSystem(this, {
        clock,
        logger
      });
      if (inspect && !parent) {
        this.system.inspect(toObserver(inspect));
      }
      this.sessionId = this.system._bookId();
      this.id = id ?? this.sessionId;
      this.logger = options?.logger ?? this.system._logger;
      this.clock = options?.clock ?? this.system._clock;
      this._parent = parent;
      this._syncSnapshot = syncSnapshot;
      this.options = resolvedOptions;
      this.src = resolvedOptions.src ?? logic;
      this.ref = this;
      this._actorScope = {
        self: this,
        id: this.id,
        sessionId: this.sessionId,
        logger: this.logger,
        defer: (fn) => {
          this._deferred.push(fn);
        },
        system: this.system,
        stopChild: (child) => {
          if (child._parent !== this) {
            throw new Error(`Cannot stop child actor ${child.id} of ${this.id} because it is not a child`);
          }
          child._stop();
        },
        emit: (emittedEvent) => {
          const listeners = this.eventListeners.get(emittedEvent.type);
          const wildcardListener = this.eventListeners.get("*");
          if (!listeners && !wildcardListener) {
            return;
          }
          const allListeners = [...listeners ? listeners.values() : [], ...wildcardListener ? wildcardListener.values() : []];
          for (const handler of allListeners) {
            try {
              handler(emittedEvent);
            } catch (err) {
              reportUnhandledError(err);
            }
          }
        },
        actionExecutor: (action) => {
          const exec = () => {
            this._actorScope.system._sendInspectionEvent({
              type: "@xstate.action",
              actorRef: this,
              action: {
                type: action.type,
                params: action.params
              }
            });
            if (!action.exec) {
              return;
            }
            const saveExecutingCustomAction = executingCustomAction;
            try {
              executingCustomAction = true;
              action.exec(action.info, action.params);
            } finally {
              executingCustomAction = saveExecutingCustomAction;
            }
          };
          if (this._processingStatus === ProcessingStatus.Running) {
            exec();
          } else {
            this._deferred.push(exec);
          }
        }
      };
      this.send = this.send.bind(this);
      this.system._sendInspectionEvent({
        type: "@xstate.actor",
        actorRef: this
      });
      if (systemId) {
        this.systemId = systemId;
        this.system._set(systemId, this);
      }
      this._initState(options?.snapshot ?? options?.state);
      if (systemId && this._snapshot.status !== "active") {
        this.system._unregister(this);
      }
    }
    _initState(persistedState) {
      try {
        this._snapshot = persistedState ? this.logic.restoreSnapshot ? this.logic.restoreSnapshot(persistedState, this._actorScope) : persistedState : this.logic.getInitialSnapshot(this._actorScope, this.options?.input);
      } catch (err) {
        this._snapshot = {
          status: "error",
          output: void 0,
          error: err
        };
      }
    }
    update(snapshot, event) {
      this._snapshot = snapshot;
      let deferredFn;
      while (deferredFn = this._deferred.shift()) {
        try {
          deferredFn();
        } catch (err) {
          this._deferred.length = 0;
          this._snapshot = {
            ...snapshot,
            status: "error",
            error: err
          };
        }
      }
      switch (this._snapshot.status) {
        case "active":
          for (const observer of this.observers) {
            try {
              observer.next?.(snapshot);
            } catch (err) {
              reportUnhandledError(err);
            }
          }
          break;
        case "done":
          for (const observer of this.observers) {
            try {
              observer.next?.(snapshot);
            } catch (err) {
              reportUnhandledError(err);
            }
          }
          this._stopProcedure();
          this._complete();
          this._doneEvent = createDoneActorEvent(this.id, this._snapshot.output);
          if (this._parent) {
            this.system._relay(this, this._parent, this._doneEvent);
          }
          break;
        case "error":
          this._error(this._snapshot.error);
          break;
      }
      this.system._sendInspectionEvent({
        type: "@xstate.snapshot",
        actorRef: this,
        event,
        snapshot
      });
    }
    /**
     * Subscribe an observer to an actor’s snapshot values.
     *
     * @remarks
     * The observer will receive the actor’s snapshot value when it is emitted.
     * The observer can be:
     *
     * - A plain function that receives the latest snapshot, or
     * - An observer object whose `.next(snapshot)` method receives the latest
     *   snapshot
     *
     * @example
     *
     * ```ts
     * // Observer as a plain function
     * const subscription = actor.subscribe((snapshot) => {
     *   console.log(snapshot);
     * });
     * ```
     *
     * @example
     *
     * ```ts
     * // Observer as an object
     * const subscription = actor.subscribe({
     *   next(snapshot) {
     *     console.log(snapshot);
     *   },
     *   error(err) {
     *     // ...
     *   },
     *   complete() {
     *     // ...
     *   }
     * });
     * ```
     *
     * The return value of `actor.subscribe(observer)` is a subscription object
     * that has an `.unsubscribe()` method. You can call
     * `subscription.unsubscribe()` to unsubscribe the observer:
     *
     * @example
     *
     * ```ts
     * const subscription = actor.subscribe((snapshot) => {
     *   // ...
     * });
     *
     * // Unsubscribe the observer
     * subscription.unsubscribe();
     * ```
     *
     * When the actor is stopped, all of its observers will automatically be
     * unsubscribed.
     *
     * @param observer - Either a plain function that receives the latest
     *   snapshot, or an observer object whose `.next(snapshot)` method receives
     *   the latest snapshot
     */
    subscribe(nextListenerOrObserver, errorListener, completeListener) {
      const observer = toObserver(nextListenerOrObserver, errorListener, completeListener);
      if (this._processingStatus !== ProcessingStatus.Stopped) {
        this.observers.add(observer);
      } else {
        switch (this._snapshot.status) {
          case "done":
            try {
              observer.complete?.();
            } catch (err) {
              reportUnhandledError(err);
            }
            break;
          case "error": {
            const err = this._snapshot.error;
            if (!observer.error) {
              reportUnhandledError(err);
            } else {
              try {
                observer.error(err);
              } catch (err2) {
                reportUnhandledError(err2);
              }
            }
            break;
          }
        }
      }
      return {
        unsubscribe: () => {
          this.observers.delete(observer);
        }
      };
    }
    on(type, handler) {
      let listeners = this.eventListeners.get(type);
      if (!listeners) {
        listeners = /* @__PURE__ */ new Set();
        this.eventListeners.set(type, listeners);
      }
      const wrappedHandler = handler.bind(void 0);
      listeners.add(wrappedHandler);
      return {
        unsubscribe: () => {
          listeners.delete(wrappedHandler);
        }
      };
    }
    select(selector, equalityFn = Object.is) {
      return {
        subscribe: (observerOrFn) => {
          const observer = toObserver(observerOrFn);
          const snapshot = this.getSnapshot();
          let previousSelected = selector(snapshot);
          return this.subscribe((snapshot2) => {
            const nextSelected = selector(snapshot2);
            if (!equalityFn(previousSelected, nextSelected)) {
              previousSelected = nextSelected;
              observer.next?.(nextSelected);
            }
          });
        },
        get: () => selector(this.getSnapshot())
      };
    }
    /** Starts the Actor from the initial state */
    start() {
      if (this._processingStatus === ProcessingStatus.Running) {
        return this;
      }
      if (this._syncSnapshot) {
        this.subscribe({
          next: (snapshot) => {
            if (snapshot.status === "active") {
              this.system._relay(this, this._parent, {
                type: `xstate.snapshot.${this.id}`,
                snapshot
              });
            }
          },
          error: () => {
          }
        });
      }
      this.system._register(this.sessionId, this);
      if (this.systemId) {
        this.system._set(this.systemId, this);
      }
      this._processingStatus = ProcessingStatus.Running;
      const initEvent = createInitEvent(this.options.input);
      this.system._sendInspectionEvent({
        type: "@xstate.event",
        sourceRef: this._parent,
        actorRef: this,
        event: initEvent
      });
      const status = this._snapshot.status;
      switch (status) {
        case "done":
          this.update(this._snapshot, initEvent);
          return this;
        case "error":
          this._error(this._snapshot.error);
          return this;
      }
      if (!this._parent) {
        this.system.start();
      }
      if (this.logic.start) {
        try {
          this.logic.start(this._snapshot, this._actorScope);
        } catch (err) {
          this._snapshot = {
            ...this._snapshot,
            status: "error",
            error: err
          };
          this._error(err);
          return this;
        }
      }
      this.update(this._snapshot, initEvent);
      if (this.options.devTools) {
        this.attachDevTools();
      }
      this.mailbox.start();
      return this;
    }
    _process(event) {
      let nextState;
      let caughtError;
      try {
        nextState = this.logic.transition(this._snapshot, event, this._actorScope);
      } catch (err) {
        caughtError = {
          err
        };
      }
      if (caughtError) {
        const {
          err
        } = caughtError;
        this._snapshot = {
          ...this._snapshot,
          status: "error",
          error: err
        };
        this._error(err);
        return;
      }
      this.update(nextState, event);
      if (event.type === XSTATE_STOP) {
        this._stopProcedure();
        this._complete();
      }
    }
    _stop() {
      if (this._processingStatus === ProcessingStatus.Stopped) {
        return this;
      }
      this.mailbox.clear();
      if (this._processingStatus === ProcessingStatus.NotStarted) {
        this._processingStatus = ProcessingStatus.Stopped;
        return this;
      }
      this.mailbox.enqueue({
        type: XSTATE_STOP
      });
      return this;
    }
    /** Stops the Actor and unsubscribe all listeners. */
    stop() {
      if (this._parent) {
        throw new Error("A non-root actor cannot be stopped directly.");
      }
      return this._stop();
    }
    _complete() {
      for (const observer of this.observers) {
        try {
          observer.complete?.();
        } catch (err) {
          reportUnhandledError(err);
        }
      }
      this.observers.clear();
      this.eventListeners.clear();
    }
    _reportError(err) {
      if (!this.observers.size) {
        if (!this._parent) {
          reportUnhandledError(err);
        }
        this.eventListeners.clear();
        return;
      }
      let reportError = false;
      for (const observer of this.observers) {
        const errorListener = observer.error;
        reportError ||= !errorListener;
        try {
          errorListener?.(err);
        } catch (err2) {
          reportUnhandledError(err2);
        }
      }
      this.observers.clear();
      this.eventListeners.clear();
      if (reportError) {
        reportUnhandledError(err);
      }
    }
    _error(err) {
      this._stopProcedure();
      this._reportError(err);
      if (this._parent) {
        this.system._relay(this, this._parent, createErrorActorEvent(this.id, err));
      }
    }
    // TODO: atm children don't belong entirely to the actor so
    // in a way - it's not even super aware of them
    // so we can't stop them from here but we really should!
    // right now, they are being stopped within the machine's transition
    // but that could throw and leave us with "orphaned" active actors
    _stopProcedure() {
      if (this._processingStatus !== ProcessingStatus.Running) {
        return this;
      }
      this.system.scheduler.cancelAll(this);
      this.mailbox.clear();
      this.mailbox = new Mailbox(this._process.bind(this));
      this._processingStatus = ProcessingStatus.Stopped;
      this.system._unregister(this);
      return this;
    }
    /** @internal */
    _send(event) {
      if (this._processingStatus === ProcessingStatus.Stopped) {
        return;
      }
      this.mailbox.enqueue(event);
    }
    /**
     * Sends an event to the running Actor to trigger a transition.
     *
     * @param event The event to send
     */
    send(event) {
      this.system._relay(void 0, this, event);
    }
    attachDevTools() {
      const {
        devTools
      } = this.options;
      if (devTools) {
        const resolvedDevToolsAdapter = typeof devTools === "function" ? devTools : devToolsAdapter;
        resolvedDevToolsAdapter(this);
      }
    }
    toJSON() {
      return {
        xstate$$type: $$ACTOR_TYPE,
        id: this.id
      };
    }
    /**
     * Obtain the internal state of the actor, which can be persisted.
     *
     * @remarks
     * The internal state can be persisted from any actor, not only machines.
     *
     * Note that the persisted state is not the same as the snapshot from
     * {@link Actor.getSnapshot}. Persisted state represents the internal state of
     * the actor, while snapshots represent the actor's last emitted value.
     *
     * Can be restored with {@link ActorOptions.state}
     * @see https://stately.ai/docs/persistence
     */
    getPersistedSnapshot(options) {
      return this.logic.getPersistedSnapshot(this._snapshot, options);
    }
    [symbolObservable]() {
      return this;
    }
    /**
     * Read an actor’s snapshot synchronously.
     *
     * @remarks
     * The snapshot represent an actor's last emitted value.
     *
     * When an actor receives an event, its internal state may change. An actor
     * may emit a snapshot when a state transition occurs.
     *
     * Note that some actors, such as callback actors generated with
     * `fromCallback`, will not emit snapshots.
     * @see {@link Actor.subscribe} to subscribe to an actor’s snapshot values.
     * @see {@link Actor.getPersistedSnapshot} to persist the internal state of an actor (which is more than just a snapshot).
     */
    getSnapshot() {
      return this._snapshot;
    }
  };
  function createActor(logic, ...[options]) {
    return new Actor(logic, options);
  }
  function resolveCancel(_, snapshot, actionArgs, actionParams, {
    sendId
  }) {
    const resolvedSendId = typeof sendId === "function" ? sendId(actionArgs, actionParams) : sendId;
    return [snapshot, {
      sendId: resolvedSendId
    }, void 0];
  }
  function executeCancel(actorScope, params) {
    actorScope.defer(() => {
      actorScope.system.scheduler.cancel(actorScope.self, params.sendId);
    });
  }
  function cancel(sendId) {
    function cancel2(_args, _params) {
    }
    cancel2.type = "xstate.cancel";
    cancel2.sendId = sendId;
    cancel2.resolve = resolveCancel;
    cancel2.execute = executeCancel;
    return cancel2;
  }
  function resolveSpawn(actorScope, snapshot, actionArgs, _actionParams, {
    id,
    systemId,
    src,
    input,
    syncSnapshot
  }) {
    const logic = typeof src === "string" ? resolveReferencedActor(snapshot.machine, src) : src;
    const resolvedId = typeof id === "function" ? id(actionArgs) : id;
    let actorRef;
    let resolvedInput = void 0;
    if (logic) {
      resolvedInput = typeof input === "function" ? input({
        context: snapshot.context,
        event: actionArgs.event,
        self: actorScope.self
      }) : input;
      actorRef = createActor(logic, {
        id: resolvedId,
        src,
        parent: actorScope.self,
        syncSnapshot,
        systemId,
        input: resolvedInput
      });
    }
    return [cloneMachineSnapshot(snapshot, {
      children: {
        ...snapshot.children,
        [resolvedId]: actorRef
      }
    }), {
      id,
      systemId,
      actorRef,
      src,
      input: resolvedInput
    }, void 0];
  }
  function executeSpawn(actorScope, {
    actorRef
  }) {
    if (!actorRef) {
      return;
    }
    actorScope.defer(() => {
      if (actorRef._processingStatus === ProcessingStatus.Stopped) {
        return;
      }
      actorRef.start();
    });
  }
  function spawnChild(...[src, {
    id,
    systemId,
    input,
    syncSnapshot = false
  } = {}]) {
    function spawnChild2(_args, _params) {
    }
    spawnChild2.type = "xstate.spawnChild";
    spawnChild2.id = id;
    spawnChild2.systemId = systemId;
    spawnChild2.src = src;
    spawnChild2.input = input;
    spawnChild2.syncSnapshot = syncSnapshot;
    spawnChild2.resolve = resolveSpawn;
    spawnChild2.execute = executeSpawn;
    return spawnChild2;
  }
  function resolveStop(_, snapshot, args, actionParams, {
    actorRef
  }) {
    const actorRefOrString = typeof actorRef === "function" ? actorRef(args, actionParams) : actorRef;
    const resolvedActorRef = typeof actorRefOrString === "string" ? snapshot.children[actorRefOrString] : actorRefOrString;
    let children = snapshot.children;
    if (resolvedActorRef) {
      children = {
        ...children
      };
      delete children[resolvedActorRef.id];
    }
    return [cloneMachineSnapshot(snapshot, {
      children
    }), resolvedActorRef, void 0];
  }
  function unregisterRecursively(actorScope, actorRef) {
    const snapshot = actorRef.getSnapshot();
    if (snapshot && "children" in snapshot) {
      for (const child of Object.values(snapshot.children)) {
        unregisterRecursively(actorScope, child);
      }
    }
    actorScope.system._unregister(actorRef);
  }
  function executeStop(actorScope, actorRef) {
    if (!actorRef) {
      return;
    }
    unregisterRecursively(actorScope, actorRef);
    if (actorRef._processingStatus !== ProcessingStatus.Running) {
      actorScope.stopChild(actorRef);
      return;
    }
    actorScope.defer(() => {
      actorScope.stopChild(actorRef);
    });
  }
  function stopChild(actorRef) {
    function stop2(_args, _params) {
    }
    stop2.type = "xstate.stopChild";
    stop2.actorRef = actorRef;
    stop2.resolve = resolveStop;
    stop2.execute = executeStop;
    return stop2;
  }
  function evaluateGuard(guard, context, event, snapshot) {
    const {
      machine
    } = snapshot;
    const isInline = typeof guard === "function";
    const resolved = isInline ? guard : machine.implementations.guards[typeof guard === "string" ? guard : guard.type];
    if (!isInline && !resolved) {
      throw new Error(`Guard '${typeof guard === "string" ? guard : guard.type}' is not implemented.'.`);
    }
    if (typeof resolved !== "function") {
      return evaluateGuard(resolved, context, event, snapshot);
    }
    const guardArgs = {
      context,
      event
    };
    const guardParams = isInline || typeof guard === "string" ? void 0 : "params" in guard ? typeof guard.params === "function" ? guard.params({
      context,
      event
    }) : guard.params : void 0;
    if (!("check" in resolved)) {
      return resolved(guardArgs, guardParams);
    }
    const builtinGuard = resolved;
    return builtinGuard.check(
      snapshot,
      guardArgs,
      resolved
      // this holds all params
    );
  }
  function isAtomicStateNode(stateNode) {
    return stateNode.type === "atomic" || stateNode.type === "final";
  }
  function getChildren(stateNode) {
    return Object.values(stateNode.states).filter((sn) => sn.type !== "history");
  }
  function getProperAncestors(stateNode, toStateNode) {
    const ancestors = [];
    if (toStateNode === stateNode) {
      return ancestors;
    }
    let m = stateNode.parent;
    while (m && m !== toStateNode) {
      ancestors.push(m);
      m = m.parent;
    }
    return ancestors;
  }
  function getAllStateNodes(stateNodes) {
    const nodeSet = new Set(stateNodes);
    const adjList = getAdjList(nodeSet);
    for (const s of nodeSet) {
      if (s.type === "compound" && (!adjList.get(s) || !adjList.get(s).length)) {
        getInitialStateNodesWithTheirAncestors(s).forEach((sn) => nodeSet.add(sn));
      } else {
        if (s.type === "parallel") {
          for (const child of getChildren(s)) {
            if (child.type === "history") {
              continue;
            }
            if (!nodeSet.has(child)) {
              const initialStates = getInitialStateNodesWithTheirAncestors(child);
              for (const initialStateNode of initialStates) {
                nodeSet.add(initialStateNode);
              }
            }
          }
        }
      }
    }
    for (const s of nodeSet) {
      let m = s.parent;
      while (m) {
        nodeSet.add(m);
        m = m.parent;
      }
    }
    return nodeSet;
  }
  function getValueFromAdj(baseNode, adjList) {
    const childStateNodes = adjList.get(baseNode);
    if (!childStateNodes) {
      return {};
    }
    if (baseNode.type === "compound") {
      const childStateNode = childStateNodes[0];
      if (childStateNode) {
        if (isAtomicStateNode(childStateNode)) {
          return childStateNode.key;
        }
      } else {
        return {};
      }
    }
    const stateValue = {};
    for (const childStateNode of childStateNodes) {
      stateValue[childStateNode.key] = getValueFromAdj(childStateNode, adjList);
    }
    return stateValue;
  }
  function getAdjList(stateNodes) {
    const adjList = /* @__PURE__ */ new Map();
    for (const s of stateNodes) {
      if (!adjList.has(s)) {
        adjList.set(s, []);
      }
      if (s.parent) {
        if (!adjList.has(s.parent)) {
          adjList.set(s.parent, []);
        }
        adjList.get(s.parent).push(s);
      }
    }
    return adjList;
  }
  function getStateValue(rootNode, stateNodes) {
    const config = getAllStateNodes(stateNodes);
    return getValueFromAdj(rootNode, getAdjList(config));
  }
  function isInFinalState(stateNodeSet, stateNode) {
    if (stateNode.type === "compound") {
      return getChildren(stateNode).some((s) => s.type === "final" && stateNodeSet.has(s));
    }
    if (stateNode.type === "parallel") {
      return getChildren(stateNode).every((sn) => isInFinalState(stateNodeSet, sn));
    }
    return stateNode.type === "final";
  }
  var isStateId = (str) => str[0] === STATE_IDENTIFIER;
  function getCandidates(stateNode, receivedEventType) {
    const candidates = stateNode.transitions.get(receivedEventType) || [...stateNode.transitions.keys()].filter((eventDescriptor) => matchesEventDescriptor(receivedEventType, eventDescriptor)).sort((a, b) => b.length - a.length).flatMap((key) => stateNode.transitions.get(key));
    return candidates;
  }
  function getDelayedTransitions(stateNode) {
    const afterConfig = stateNode.config.after;
    if (!afterConfig) {
      return [];
    }
    const mutateEntryExit = (delay) => {
      const afterEvent = createAfterEvent(delay, stateNode.id);
      const eventType = afterEvent.type;
      stateNode.entry.push(raise(afterEvent, {
        id: eventType,
        delay
      }));
      stateNode.exit.push(cancel(eventType));
      return eventType;
    };
    const delayedTransitions = Object.keys(afterConfig).flatMap((delay) => {
      const configTransition = afterConfig[delay];
      const resolvedTransition = typeof configTransition === "string" ? {
        target: configTransition
      } : configTransition;
      const resolvedDelay = Number.isNaN(+delay) ? delay : +delay;
      const eventType = mutateEntryExit(resolvedDelay);
      return toArray(resolvedTransition).map((transition) => ({
        ...transition,
        event: eventType,
        delay: resolvedDelay
      }));
    });
    return delayedTransitions.map((delayedTransition) => {
      const {
        delay
      } = delayedTransition;
      return {
        ...formatTransition(stateNode, delayedTransition.event, delayedTransition),
        delay
      };
    });
  }
  function formatTransition(stateNode, descriptor, transitionConfig) {
    const normalizedTarget = normalizeTarget(transitionConfig.target);
    const reenter = transitionConfig.reenter ?? false;
    const target = resolveTarget(stateNode, normalizedTarget);
    const transition = {
      ...transitionConfig,
      actions: toArray(transitionConfig.actions),
      guard: transitionConfig.guard,
      target,
      source: stateNode,
      reenter,
      eventType: descriptor,
      toJSON: () => ({
        ...transition,
        source: `#${stateNode.id}`,
        target: target ? target.map((t) => `#${t.id}`) : void 0
      })
    };
    return transition;
  }
  function formatTransitions(stateNode) {
    const transitions = /* @__PURE__ */ new Map();
    if (stateNode.config.on) {
      for (const descriptor of Object.keys(stateNode.config.on)) {
        if (descriptor === NULL_EVENT) {
          throw new Error('Null events ("") cannot be specified as a transition key. Use `always: { ... }` instead.');
        }
        const transitionsConfig = stateNode.config.on[descriptor];
        transitions.set(descriptor, toTransitionConfigArray(transitionsConfig).map((t) => formatTransition(stateNode, descriptor, t)));
      }
    }
    if (stateNode.config.onDone) {
      const descriptor = `xstate.done.state.${stateNode.id}`;
      transitions.set(descriptor, toTransitionConfigArray(stateNode.config.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
    }
    for (const invokeDef of stateNode.invoke) {
      if (invokeDef.onDone) {
        const descriptor = `xstate.done.actor.${invokeDef.id}`;
        transitions.set(descriptor, toTransitionConfigArray(invokeDef.onDone).map((t) => formatTransition(stateNode, descriptor, t)));
      }
      if (invokeDef.onError) {
        const descriptor = `xstate.error.actor.${invokeDef.id}`;
        transitions.set(descriptor, toTransitionConfigArray(invokeDef.onError).map((t) => formatTransition(stateNode, descriptor, t)));
      }
      if (invokeDef.onSnapshot) {
        const descriptor = `xstate.snapshot.${invokeDef.id}`;
        transitions.set(descriptor, toTransitionConfigArray(invokeDef.onSnapshot).map((t) => formatTransition(stateNode, descriptor, t)));
      }
    }
    for (const delayedTransition of stateNode.after) {
      let existing = transitions.get(delayedTransition.eventType);
      if (!existing) {
        existing = [];
        transitions.set(delayedTransition.eventType, existing);
      }
      existing.push(delayedTransition);
    }
    return transitions;
  }
  function formatRouteTransitions(rootStateNode) {
    const routeTransitions = [];
    const collectRoutes = (states) => {
      Object.values(states).forEach((sn) => {
        if (sn.config.route && sn.config.id) {
          const routeId = sn.config.id;
          const userGuard = sn.config.route.guard;
          const routeGuard = (args, params) => {
            if (args.event.to !== `#${routeId}`) {
              return false;
            }
            if (!userGuard) {
              return true;
            }
            if (typeof userGuard === "function") {
              return userGuard(args, params);
            }
            return true;
          };
          const transition = {
            ...sn.config.route,
            guard: routeGuard,
            target: `#${routeId}`
          };
          routeTransitions.push(formatTransition(rootStateNode, "xstate.route", transition));
        }
        if (sn.states) {
          collectRoutes(sn.states);
        }
      });
    };
    collectRoutes(rootStateNode.states);
    if (routeTransitions.length > 0) {
      rootStateNode.transitions.set("xstate.route", routeTransitions);
    }
  }
  function formatInitialTransition(stateNode, _target) {
    const resolvedTarget = typeof _target === "string" ? stateNode.states[_target] : _target ? stateNode.states[_target.target] : void 0;
    if (!resolvedTarget && _target) {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
        `Initial state node "${_target}" not found on parent state node #${stateNode.id}`
      );
    }
    const transition = {
      source: stateNode,
      actions: !_target || typeof _target === "string" ? [] : toArray(_target.actions),
      eventType: null,
      reenter: false,
      target: resolvedTarget ? [resolvedTarget] : [],
      toJSON: () => ({
        ...transition,
        source: `#${stateNode.id}`,
        target: resolvedTarget ? [`#${resolvedTarget.id}`] : []
      })
    };
    return transition;
  }
  function resolveTarget(stateNode, targets) {
    if (targets === void 0) {
      return void 0;
    }
    return targets.map((target) => {
      if (typeof target !== "string") {
        return target;
      }
      if (isStateId(target)) {
        return stateNode.machine.getStateNodeById(target);
      }
      const isInternalTarget = target[0] === STATE_DELIMITER;
      if (isInternalTarget && !stateNode.parent) {
        return getStateNodeByPath(stateNode, target.slice(1));
      }
      const resolvedTarget = isInternalTarget ? stateNode.key + target : target;
      if (stateNode.parent) {
        try {
          const targetStateNode = getStateNodeByPath(stateNode.parent, resolvedTarget);
          return targetStateNode;
        } catch (err) {
          throw new Error(`Invalid transition definition for state node '${stateNode.id}':
${err.message}`);
        }
      } else {
        throw new Error(`Invalid target: "${target}" is not a valid target from the root node. Did you mean ".${target}"?`);
      }
    });
  }
  function resolveHistoryDefaultTransition(stateNode) {
    const normalizedTarget = normalizeTarget(stateNode.config.target);
    if (!normalizedTarget) {
      return stateNode.parent.initial;
    }
    return {
      target: normalizedTarget.map((t) => typeof t === "string" ? getStateNodeByPath(stateNode.parent, t) : t)
    };
  }
  function isHistoryNode(stateNode) {
    return stateNode.type === "history";
  }
  function getInitialStateNodesWithTheirAncestors(stateNode) {
    const states = getInitialStateNodes(stateNode);
    for (const initialState of states) {
      for (const ancestor of getProperAncestors(initialState, stateNode)) {
        states.add(ancestor);
      }
    }
    return states;
  }
  function getInitialStateNodes(stateNode) {
    const set = /* @__PURE__ */ new Set();
    function iter(descStateNode) {
      if (set.has(descStateNode)) {
        return;
      }
      set.add(descStateNode);
      if (descStateNode.type === "compound") {
        iter(descStateNode.initial.target[0]);
      } else if (descStateNode.type === "parallel") {
        for (const child of getChildren(descStateNode)) {
          iter(child);
        }
      }
    }
    iter(stateNode);
    return set;
  }
  function getStateNode(stateNode, stateKey) {
    if (isStateId(stateKey)) {
      return stateNode.machine.getStateNodeById(stateKey);
    }
    if (!stateNode.states) {
      throw new Error(`Unable to retrieve child state '${stateKey}' from '${stateNode.id}'; no child states exist.`);
    }
    const result = stateNode.states[stateKey];
    if (!result) {
      throw new Error(`Child state '${stateKey}' does not exist on '${stateNode.id}'`);
    }
    return result;
  }
  function getStateNodeByPath(stateNode, statePath) {
    if (typeof statePath === "string" && isStateId(statePath)) {
      try {
        return stateNode.machine.getStateNodeById(statePath);
      } catch {
      }
    }
    const arrayStatePath = toStatePath(statePath).slice();
    let currentStateNode = stateNode;
    while (arrayStatePath.length) {
      const key = arrayStatePath.shift();
      if (!key.length) {
        break;
      }
      currentStateNode = getStateNode(currentStateNode, key);
    }
    return currentStateNode;
  }
  function getStateNodes(stateNode, stateValue) {
    if (typeof stateValue === "string") {
      const childStateNode = stateNode.states[stateValue];
      if (!childStateNode) {
        throw new Error(`State '${stateValue}' does not exist on '${stateNode.id}'`);
      }
      return [stateNode, childStateNode];
    }
    const childStateKeys = Object.keys(stateValue);
    const childStateNodes = childStateKeys.map((subStateKey) => getStateNode(stateNode, subStateKey)).filter(Boolean);
    return [stateNode.machine.root, stateNode].concat(childStateNodes, childStateKeys.reduce((allSubStateNodes, subStateKey) => {
      const subStateNode = getStateNode(stateNode, subStateKey);
      if (!subStateNode) {
        return allSubStateNodes;
      }
      const subStateNodes = getStateNodes(subStateNode, stateValue[subStateKey]);
      return allSubStateNodes.concat(subStateNodes);
    }, []));
  }
  function transitionAtomicNode(stateNode, stateValue, snapshot, event) {
    const childStateNode = getStateNode(stateNode, stateValue);
    const next = childStateNode.next(snapshot, event);
    if (!next || !next.length) {
      return stateNode.next(snapshot, event);
    }
    return next;
  }
  function transitionCompoundNode(stateNode, stateValue, snapshot, event) {
    const subStateKeys = Object.keys(stateValue);
    const childStateNode = getStateNode(stateNode, subStateKeys[0]);
    const next = transitionNode(childStateNode, stateValue[subStateKeys[0]], snapshot, event);
    if (!next || !next.length) {
      return stateNode.next(snapshot, event);
    }
    return next;
  }
  function transitionParallelNode(stateNode, stateValue, snapshot, event) {
    const allInnerTransitions = [];
    for (const subStateKey of Object.keys(stateValue)) {
      const subStateValue = stateValue[subStateKey];
      if (!subStateValue) {
        continue;
      }
      const subStateNode = getStateNode(stateNode, subStateKey);
      const innerTransitions = transitionNode(subStateNode, subStateValue, snapshot, event);
      if (innerTransitions) {
        allInnerTransitions.push(...innerTransitions);
      }
    }
    if (!allInnerTransitions.length) {
      return stateNode.next(snapshot, event);
    }
    return allInnerTransitions;
  }
  function transitionNode(stateNode, stateValue, snapshot, event) {
    if (typeof stateValue === "string") {
      return transitionAtomicNode(stateNode, stateValue, snapshot, event);
    }
    if (Object.keys(stateValue).length === 1) {
      return transitionCompoundNode(stateNode, stateValue, snapshot, event);
    }
    return transitionParallelNode(stateNode, stateValue, snapshot, event);
  }
  function getHistoryNodes(stateNode) {
    return Object.keys(stateNode.states).map((key) => stateNode.states[key]).filter((sn) => sn.type === "history");
  }
  function isDescendant(childStateNode, parentStateNode) {
    let marker = childStateNode;
    while (marker.parent && marker.parent !== parentStateNode) {
      marker = marker.parent;
    }
    return marker.parent === parentStateNode;
  }
  function hasIntersection(s1, s2) {
    const set1 = new Set(s1);
    const set2 = new Set(s2);
    for (const item of set1) {
      if (set2.has(item)) {
        return true;
      }
    }
    for (const item of set2) {
      if (set1.has(item)) {
        return true;
      }
    }
    return false;
  }
  function removeConflictingTransitions(enabledTransitions, stateNodeSet, historyValue) {
    const filteredTransitions = /* @__PURE__ */ new Set();
    for (const t1 of enabledTransitions) {
      let t1Preempted = false;
      const transitionsToRemove = /* @__PURE__ */ new Set();
      for (const t2 of filteredTransitions) {
        if (hasIntersection(computeExitSet([t1], stateNodeSet, historyValue), computeExitSet([t2], stateNodeSet, historyValue))) {
          if (isDescendant(t1.source, t2.source)) {
            transitionsToRemove.add(t2);
          } else {
            t1Preempted = true;
            break;
          }
        }
      }
      if (!t1Preempted) {
        for (const t3 of transitionsToRemove) {
          filteredTransitions.delete(t3);
        }
        filteredTransitions.add(t1);
      }
    }
    return Array.from(filteredTransitions);
  }
  function findLeastCommonAncestor(stateNodes) {
    const [head, ...tail] = stateNodes;
    for (const ancestor of getProperAncestors(head, void 0)) {
      if (tail.every((sn) => isDescendant(sn, ancestor))) {
        return ancestor;
      }
    }
  }
  function getEffectiveTargetStates(transition, historyValue) {
    if (!transition.target) {
      return [];
    }
    const targets = /* @__PURE__ */ new Set();
    for (const targetNode of transition.target) {
      if (isHistoryNode(targetNode)) {
        if (historyValue[targetNode.id]) {
          for (const node of historyValue[targetNode.id]) {
            targets.add(node);
          }
        } else {
          for (const node of getEffectiveTargetStates(resolveHistoryDefaultTransition(targetNode), historyValue)) {
            targets.add(node);
          }
        }
      } else {
        targets.add(targetNode);
      }
    }
    return [...targets];
  }
  function getTransitionDomain(transition, historyValue) {
    const targetStates = getEffectiveTargetStates(transition, historyValue);
    if (!targetStates) {
      return;
    }
    if (!transition.reenter && targetStates.every((target) => target === transition.source || isDescendant(target, transition.source))) {
      return transition.source;
    }
    const lca = findLeastCommonAncestor(targetStates.concat(transition.source));
    if (lca) {
      return lca;
    }
    if (transition.reenter) {
      return;
    }
    return transition.source.machine.root;
  }
  function computeExitSet(transitions, stateNodeSet, historyValue) {
    const statesToExit = /* @__PURE__ */ new Set();
    for (const t of transitions) {
      if (t.target?.length) {
        const domain = getTransitionDomain(t, historyValue);
        if (t.reenter && t.source === domain) {
          statesToExit.add(domain);
        }
        for (const stateNode of stateNodeSet) {
          if (isDescendant(stateNode, domain)) {
            statesToExit.add(stateNode);
          }
        }
      }
    }
    return [...statesToExit];
  }
  function areStateNodeCollectionsEqual(prevStateNodes, nextStateNodeSet) {
    if (prevStateNodes.length !== nextStateNodeSet.size) {
      return false;
    }
    for (const node of prevStateNodes) {
      if (!nextStateNodeSet.has(node)) {
        return false;
      }
    }
    return true;
  }
  function initialMicrostep(root, preInitialState, actorScope, initEvent, internalQueue) {
    return microstep([{
      target: [...getInitialStateNodes(root)],
      source: root,
      reenter: true,
      actions: [],
      eventType: null,
      toJSON: null
    }], preInitialState, actorScope, initEvent, true, internalQueue);
  }
  function microstep(transitions, currentSnapshot, actorScope, event, isInitial, internalQueue) {
    const actions = [];
    if (!transitions.length) {
      return [currentSnapshot, actions];
    }
    const originalExecutor = actorScope.actionExecutor;
    actorScope.actionExecutor = (action) => {
      actions.push(action);
      originalExecutor(action);
    };
    try {
      const mutStateNodeSet = new Set(currentSnapshot._nodes);
      let historyValue = currentSnapshot.historyValue;
      const filteredTransitions = removeConflictingTransitions(transitions, mutStateNodeSet, historyValue);
      let nextState = currentSnapshot;
      if (!isInitial) {
        [nextState, historyValue] = exitStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, historyValue, internalQueue, actorScope.actionExecutor);
      }
      nextState = resolveActionsAndContext(nextState, event, actorScope, filteredTransitions.flatMap((t) => t.actions), internalQueue, void 0);
      nextState = enterStates(nextState, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial);
      const nextStateNodes = [...mutStateNodeSet];
      if (nextState.status === "done") {
        nextState = resolveActionsAndContext(nextState, event, actorScope, nextStateNodes.sort((a, b) => b.order - a.order).flatMap((state) => state.exit), internalQueue, void 0);
      }
      try {
        if (historyValue === currentSnapshot.historyValue && areStateNodeCollectionsEqual(currentSnapshot._nodes, mutStateNodeSet)) {
          return [nextState, actions];
        }
        return [cloneMachineSnapshot(nextState, {
          _nodes: nextStateNodes,
          historyValue
        }), actions];
      } catch (e) {
        throw e;
      }
    } finally {
      actorScope.actionExecutor = originalExecutor;
    }
  }
  function getMachineOutput(snapshot, event, actorScope, rootNode, rootCompletionNode) {
    if (rootNode.output === void 0) {
      return;
    }
    const doneStateEvent = createDoneStateEvent(rootCompletionNode.id, rootCompletionNode.output !== void 0 && rootCompletionNode.parent ? resolveOutput(rootCompletionNode.output, snapshot.context, event, actorScope.self) : void 0);
    return resolveOutput(rootNode.output, snapshot.context, doneStateEvent, actorScope.self);
  }
  function enterStates(currentSnapshot, event, actorScope, filteredTransitions, mutStateNodeSet, internalQueue, historyValue, isInitial) {
    let nextSnapshot = currentSnapshot;
    const statesToEnter = /* @__PURE__ */ new Set();
    const statesForDefaultEntry = /* @__PURE__ */ new Set();
    computeEntrySet(filteredTransitions, historyValue, statesForDefaultEntry, statesToEnter);
    if (isInitial) {
      statesForDefaultEntry.add(currentSnapshot.machine.root);
    }
    const completedNodes = /* @__PURE__ */ new Set();
    for (const stateNodeToEnter of [...statesToEnter].sort((a, b) => a.order - b.order)) {
      mutStateNodeSet.add(stateNodeToEnter);
      const actions = [];
      actions.push(...stateNodeToEnter.entry);
      for (const invokeDef of stateNodeToEnter.invoke) {
        actions.push(spawnChild(invokeDef.src, {
          ...invokeDef,
          syncSnapshot: !!invokeDef.onSnapshot
        }));
      }
      if (statesForDefaultEntry.has(stateNodeToEnter)) {
        const initialActions = stateNodeToEnter.initial.actions;
        actions.push(...initialActions);
      }
      nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, actions, internalQueue, stateNodeToEnter.invoke.map((invokeDef) => invokeDef.id));
      if (stateNodeToEnter.type === "final") {
        const parent = stateNodeToEnter.parent;
        let ancestorMarker = parent?.type === "parallel" ? parent : parent?.parent;
        let rootCompletionNode = ancestorMarker || stateNodeToEnter;
        if (parent?.type === "compound") {
          internalQueue.push(createDoneStateEvent(parent.id, stateNodeToEnter.output !== void 0 ? resolveOutput(stateNodeToEnter.output, nextSnapshot.context, event, actorScope.self) : void 0));
        }
        while (ancestorMarker?.type === "parallel" && !completedNodes.has(ancestorMarker) && isInFinalState(mutStateNodeSet, ancestorMarker)) {
          completedNodes.add(ancestorMarker);
          internalQueue.push(createDoneStateEvent(ancestorMarker.id));
          rootCompletionNode = ancestorMarker;
          ancestorMarker = ancestorMarker.parent;
        }
        if (ancestorMarker) {
          continue;
        }
        nextSnapshot = cloneMachineSnapshot(nextSnapshot, {
          status: "done",
          output: getMachineOutput(nextSnapshot, event, actorScope, nextSnapshot.machine.root, rootCompletionNode)
        });
      }
    }
    return nextSnapshot;
  }
  function computeEntrySet(transitions, historyValue, statesForDefaultEntry, statesToEnter) {
    for (const t of transitions) {
      const domain = getTransitionDomain(t, historyValue);
      for (const s of t.target || []) {
        if (!isHistoryNode(s) && // if the target is different than the source then it will *definitely* be entered
        (t.source !== s || // we know that the domain can't lie within the source
        // if it's different than the source then it's outside of it and it means that the target has to be entered as well
        t.source !== domain || // reentering transitions always enter the target, even if it's the source itself
        t.reenter)) {
          statesToEnter.add(s);
          statesForDefaultEntry.add(s);
        }
        addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
      }
      const targetStates = getEffectiveTargetStates(t, historyValue);
      for (const s of targetStates) {
        const ancestors = getProperAncestors(s, domain);
        if (domain?.type === "parallel") {
          ancestors.push(domain);
        }
        addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, !t.source.parent && t.reenter ? void 0 : domain);
      }
    }
  }
  function addDescendantStatesToEnter(stateNode, historyValue, statesForDefaultEntry, statesToEnter) {
    if (isHistoryNode(stateNode)) {
      if (historyValue[stateNode.id]) {
        const historyStateNodes = historyValue[stateNode.id];
        for (const s of historyStateNodes) {
          statesToEnter.add(s);
          addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
        }
        for (const s of historyStateNodes) {
          addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
        }
      } else {
        const historyDefaultTransition = resolveHistoryDefaultTransition(stateNode);
        for (const s of historyDefaultTransition.target) {
          statesToEnter.add(s);
          if (historyDefaultTransition === stateNode.parent?.initial) {
            statesForDefaultEntry.add(stateNode.parent);
          }
          addDescendantStatesToEnter(s, historyValue, statesForDefaultEntry, statesToEnter);
        }
        for (const s of historyDefaultTransition.target) {
          addProperAncestorStatesToEnter(s, stateNode.parent, statesToEnter, historyValue, statesForDefaultEntry);
        }
      }
    } else {
      if (stateNode.type === "compound") {
        const [initialState] = stateNode.initial.target;
        if (!isHistoryNode(initialState)) {
          statesToEnter.add(initialState);
          statesForDefaultEntry.add(initialState);
        }
        addDescendantStatesToEnter(initialState, historyValue, statesForDefaultEntry, statesToEnter);
        addProperAncestorStatesToEnter(initialState, stateNode, statesToEnter, historyValue, statesForDefaultEntry);
      } else {
        if (stateNode.type === "parallel") {
          for (const child of getChildren(stateNode).filter((sn) => !isHistoryNode(sn))) {
            if (![...statesToEnter].some((s) => isDescendant(s, child))) {
              if (!isHistoryNode(child)) {
                statesToEnter.add(child);
                statesForDefaultEntry.add(child);
              }
              addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
            }
          }
        }
      }
    }
  }
  function addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, ancestors, reentrancyDomain) {
    for (const anc of ancestors) {
      if (!reentrancyDomain || isDescendant(anc, reentrancyDomain)) {
        statesToEnter.add(anc);
      }
      if (anc.type === "parallel") {
        for (const child of getChildren(anc).filter((sn) => !isHistoryNode(sn))) {
          if (![...statesToEnter].some((s) => isDescendant(s, child))) {
            statesToEnter.add(child);
            addDescendantStatesToEnter(child, historyValue, statesForDefaultEntry, statesToEnter);
          }
        }
      }
    }
  }
  function addProperAncestorStatesToEnter(stateNode, toStateNode, statesToEnter, historyValue, statesForDefaultEntry) {
    addAncestorStatesToEnter(statesToEnter, historyValue, statesForDefaultEntry, getProperAncestors(stateNode, toStateNode));
  }
  function exitStates(currentSnapshot, event, actorScope, transitions, mutStateNodeSet, historyValue, internalQueue, _actionExecutor) {
    let nextSnapshot = currentSnapshot;
    const statesToExit = computeExitSet(transitions, mutStateNodeSet, historyValue);
    statesToExit.sort((a, b) => b.order - a.order);
    let changedHistory;
    for (const exitStateNode of statesToExit) {
      for (const historyNode of getHistoryNodes(exitStateNode)) {
        let predicate;
        if (historyNode.history === "deep") {
          predicate = (sn) => isAtomicStateNode(sn) && isDescendant(sn, exitStateNode);
        } else {
          predicate = (sn) => {
            return sn.parent === exitStateNode;
          };
        }
        changedHistory ??= {
          ...historyValue
        };
        changedHistory[historyNode.id] = Array.from(mutStateNodeSet).filter(predicate);
      }
    }
    for (const s of statesToExit) {
      nextSnapshot = resolveActionsAndContext(nextSnapshot, event, actorScope, [...s.exit, ...s.invoke.map((def) => stopChild(def.id))], internalQueue, void 0);
      mutStateNodeSet.delete(s);
    }
    return [nextSnapshot, changedHistory || historyValue];
  }
  function getAction(machine, actionType) {
    return machine.implementations.actions[actionType];
  }
  function resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, extra, retries) {
    const {
      machine
    } = currentSnapshot;
    let intermediateSnapshot = currentSnapshot;
    for (const action of actions) {
      const isInline = typeof action === "function";
      const resolvedAction = isInline ? action : (
        // the existing type of `.actions` assumes non-nullable `TExpressionAction`
        // it's fine to cast this here to get a common type and lack of errors in the rest of the code
        // our logic below makes sure that we call those 2 "variants" correctly
        getAction(machine, typeof action === "string" ? action : action.type)
      );
      const actionArgs = {
        context: intermediateSnapshot.context,
        event,
        self: actorScope.self,
        system: actorScope.system
      };
      const actionParams = isInline || typeof action === "string" ? void 0 : "params" in action ? typeof action.params === "function" ? action.params({
        context: intermediateSnapshot.context,
        event
      }) : action.params : void 0;
      if (!resolvedAction || !("resolve" in resolvedAction)) {
        actorScope.actionExecutor({
          type: typeof action === "string" ? action : typeof action === "object" ? action.type : action.name || "(anonymous)",
          info: actionArgs,
          params: actionParams,
          exec: resolvedAction
        });
        continue;
      }
      const builtinAction = resolvedAction;
      const [nextState, params, actions2] = builtinAction.resolve(
        actorScope,
        intermediateSnapshot,
        actionArgs,
        actionParams,
        resolvedAction,
        // this holds all params
        extra
      );
      intermediateSnapshot = nextState;
      if ("retryResolve" in builtinAction) {
        retries?.push([builtinAction, params]);
      }
      if ("execute" in builtinAction) {
        actorScope.actionExecutor({
          type: builtinAction.type,
          info: actionArgs,
          params,
          exec: builtinAction.execute.bind(null, actorScope, params)
        });
      }
      if (actions2) {
        intermediateSnapshot = resolveAndExecuteActionsWithContext(intermediateSnapshot, event, actorScope, actions2, extra, retries);
      }
    }
    return intermediateSnapshot;
  }
  function resolveActionsAndContext(currentSnapshot, event, actorScope, actions, internalQueue, deferredActorIds) {
    const retries = deferredActorIds ? [] : void 0;
    const nextState = resolveAndExecuteActionsWithContext(currentSnapshot, event, actorScope, actions, {
      internalQueue,
      deferredActorIds
    }, retries);
    retries?.forEach(([builtinAction, params]) => {
      builtinAction.retryResolve(actorScope, nextState, params);
    });
    return nextState;
  }
  function macrostep(snapshot, event, actorScope, internalQueue) {
    let nextSnapshot = snapshot;
    const microsteps = [];
    function addMicrostep(step, event2, transitions) {
      actorScope.system._sendInspectionEvent({
        type: "@xstate.microstep",
        actorRef: actorScope.self,
        event: event2,
        snapshot: step[0],
        _transitions: transitions
      });
      microsteps.push(step);
    }
    if (event.type === XSTATE_STOP) {
      nextSnapshot = cloneMachineSnapshot(stopChildren(nextSnapshot, event, actorScope), {
        status: "stopped"
      });
      addMicrostep([nextSnapshot, []], event, []);
      return {
        snapshot: nextSnapshot,
        microsteps
      };
    }
    let nextEvent = event;
    if (nextEvent.type !== XSTATE_INIT) {
      const currentEvent = nextEvent;
      const isErr = isErrorActorEvent(currentEvent);
      const transitions = selectTransitions(currentEvent, nextSnapshot);
      if (isErr && !transitions.length) {
        nextSnapshot = cloneMachineSnapshot(snapshot, {
          status: "error",
          error: currentEvent.error
        });
        addMicrostep([nextSnapshot, []], currentEvent, []);
        return {
          snapshot: nextSnapshot,
          microsteps
        };
      }
      const step = microstep(
        transitions,
        snapshot,
        actorScope,
        nextEvent,
        false,
        // isInitial
        internalQueue
      );
      nextSnapshot = step[0];
      addMicrostep(step, currentEvent, transitions);
    }
    let shouldSelectEventlessTransitions = true;
    while (nextSnapshot.status === "active") {
      let enabledTransitions = shouldSelectEventlessTransitions ? selectEventlessTransitions(nextSnapshot, nextEvent) : [];
      const previousState = enabledTransitions.length ? nextSnapshot : void 0;
      if (!enabledTransitions.length) {
        if (!internalQueue.length) {
          break;
        }
        nextEvent = internalQueue.shift();
        enabledTransitions = selectTransitions(nextEvent, nextSnapshot);
      }
      const step = microstep(enabledTransitions, nextSnapshot, actorScope, nextEvent, false, internalQueue);
      nextSnapshot = step[0];
      shouldSelectEventlessTransitions = nextSnapshot !== previousState;
      addMicrostep(step, nextEvent, enabledTransitions);
    }
    if (nextSnapshot.status !== "active") {
      stopChildren(nextSnapshot, nextEvent, actorScope);
    }
    return {
      snapshot: nextSnapshot,
      microsteps
    };
  }
  function stopChildren(nextState, event, actorScope) {
    return resolveActionsAndContext(nextState, event, actorScope, Object.values(nextState.children).map((child) => stopChild(child)), [], void 0);
  }
  function selectTransitions(event, nextState) {
    return nextState.machine.getTransitionData(nextState, event);
  }
  function selectEventlessTransitions(nextState, event) {
    const enabledTransitionSet = /* @__PURE__ */ new Set();
    const atomicStates = nextState._nodes.filter(isAtomicStateNode);
    for (const stateNode of atomicStates) {
      loop: for (const s of [stateNode].concat(getProperAncestors(stateNode, void 0))) {
        if (!s.always) {
          continue;
        }
        for (const transition of s.always) {
          if (transition.guard === void 0 || evaluateGuard(transition.guard, nextState.context, event, nextState)) {
            enabledTransitionSet.add(transition);
            break loop;
          }
        }
      }
    }
    return removeConflictingTransitions(Array.from(enabledTransitionSet), new Set(nextState._nodes), nextState.historyValue);
  }
  function resolveStateValue(rootNode, stateValue) {
    const allStateNodes = getAllStateNodes(getStateNodes(rootNode, stateValue));
    return getStateValue(rootNode, [...allStateNodes]);
  }
  function isMachineSnapshot(value) {
    return !!value && typeof value === "object" && "machine" in value && "value" in value;
  }
  var machineSnapshotMatches = function matches(testValue) {
    return matchesState(testValue, this.value);
  };
  var machineSnapshotHasTag = function hasTag(tag) {
    return this.tags.has(tag);
  };
  var machineSnapshotCan = function can(event) {
    const transitionData = this.machine.getTransitionData(this, event);
    return !!transitionData?.length && // Check that at least one transition is not forbidden
    transitionData.some((t) => t.target !== void 0 || t.actions.length);
  };
  var machineSnapshotToJSON = function toJSON() {
    const {
      _nodes: nodes,
      tags,
      machine,
      getMeta: getMeta2,
      toJSON: toJSON2,
      can: can2,
      hasTag: hasTag2,
      matches: matches2,
      ...jsonValues
    } = this;
    return {
      ...jsonValues,
      tags: Array.from(tags)
    };
  };
  var machineSnapshotGetMeta = function getMeta() {
    return this._nodes.reduce((acc, stateNode) => {
      if (stateNode.meta !== void 0) {
        acc[stateNode.id] = stateNode.meta;
      }
      return acc;
    }, {});
  };
  function createMachineSnapshot(config, machine) {
    return {
      status: config.status,
      output: config.output,
      error: config.error,
      machine,
      context: config.context,
      _nodes: config._nodes,
      value: getStateValue(machine.root, config._nodes),
      tags: new Set(config._nodes.flatMap((sn) => sn.tags)),
      children: config.children,
      historyValue: config.historyValue || {},
      matches: machineSnapshotMatches,
      hasTag: machineSnapshotHasTag,
      can: machineSnapshotCan,
      getMeta: machineSnapshotGetMeta,
      toJSON: machineSnapshotToJSON
    };
  }
  function cloneMachineSnapshot(snapshot, config = {}) {
    return createMachineSnapshot({
      ...snapshot,
      ...config
    }, snapshot.machine);
  }
  function serializeHistoryValue(historyValue) {
    if (typeof historyValue !== "object" || historyValue === null) {
      return {};
    }
    const result = {};
    for (const key in historyValue) {
      const value = historyValue[key];
      if (Array.isArray(value)) {
        result[key] = value.map((item) => ({
          id: item.id
        }));
      }
    }
    return result;
  }
  function getPersistedSnapshot(snapshot, options) {
    const {
      _nodes: nodes,
      tags,
      machine,
      children,
      context,
      can: can2,
      hasTag: hasTag2,
      matches: matches2,
      getMeta: getMeta2,
      toJSON: toJSON2,
      ...jsonValues
    } = snapshot;
    const childrenJson = {};
    for (const id in children) {
      const child = children[id];
      childrenJson[id] = {
        snapshot: child.getPersistedSnapshot(options),
        src: child.src,
        systemId: child.systemId,
        syncSnapshot: child._syncSnapshot
      };
    }
    const persisted = {
      ...jsonValues,
      context: persistContext(context),
      children: childrenJson,
      historyValue: serializeHistoryValue(jsonValues.historyValue)
    };
    return persisted;
  }
  function persistContext(contextPart) {
    let copy;
    for (const key in contextPart) {
      const value = contextPart[key];
      if (value && typeof value === "object") {
        if ("sessionId" in value && "send" in value && "ref" in value) {
          copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
            ...contextPart
          };
          copy[key] = {
            xstate$$type: $$ACTOR_TYPE,
            id: value.id
          };
        } else {
          const result = persistContext(value);
          if (result !== value) {
            copy ??= Array.isArray(contextPart) ? contextPart.slice() : {
              ...contextPart
            };
            copy[key] = result;
          }
        }
      }
    }
    return copy ?? contextPart;
  }
  function resolveRaise(_, snapshot, args, actionParams, {
    event: eventOrExpr,
    id,
    delay
  }, {
    internalQueue
  }) {
    const delaysMap = snapshot.machine.implementations.delays;
    if (typeof eventOrExpr === "string") {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Only event objects may be used with raise; use raise({ type: "${eventOrExpr}" }) instead`
      );
    }
    const resolvedEvent = typeof eventOrExpr === "function" ? eventOrExpr(args, actionParams) : eventOrExpr;
    let resolvedDelay;
    if (typeof delay === "string") {
      const configDelay = delaysMap && delaysMap[delay];
      resolvedDelay = typeof configDelay === "function" ? configDelay(args, actionParams) : configDelay;
    } else {
      resolvedDelay = typeof delay === "function" ? delay(args, actionParams) : delay;
    }
    if (typeof resolvedDelay !== "number") {
      internalQueue.push(resolvedEvent);
    }
    return [snapshot, {
      event: resolvedEvent,
      id,
      delay: resolvedDelay
    }, void 0];
  }
  function executeRaise(actorScope, params) {
    const {
      event,
      delay,
      id
    } = params;
    if (typeof delay === "number") {
      actorScope.defer(() => {
        const self2 = actorScope.self;
        actorScope.system.scheduler.schedule(self2, self2, event, delay, id);
      });
      return;
    }
  }
  function raise(eventOrExpr, options) {
    function raise2(_args, _params) {
    }
    raise2.type = "xstate.raise";
    raise2.event = eventOrExpr;
    raise2.id = options?.id;
    raise2.delay = options?.delay;
    raise2.resolve = resolveRaise;
    raise2.execute = executeRaise;
    return raise2;
  }

  // node_modules/xstate/actors/dist/xstate-actors.esm.js
  function fromTransition(transition, initialContext) {
    return {
      config: transition,
      transition: (snapshot, event, actorScope) => {
        return {
          ...snapshot,
          context: transition(snapshot.context, event, actorScope)
        };
      },
      getInitialSnapshot: (_, input) => {
        return {
          status: "active",
          output: void 0,
          error: void 0,
          context: typeof initialContext === "function" ? initialContext({
            input
          }) : initialContext
        };
      },
      getPersistedSnapshot: (snapshot) => snapshot,
      restoreSnapshot: (snapshot) => snapshot
    };
  }
  var emptyLogic = fromTransition((_) => void 0, void 0);

  // node_modules/xstate/dist/assign-128c3f01.esm.js
  function createSpawner(actorScope, {
    machine,
    context
  }, event, spawnedChildren) {
    const spawn = (src, options) => {
      if (typeof src === "string") {
        const logic = resolveReferencedActor(machine, src);
        if (!logic) {
          throw new Error(`Actor logic '${src}' not implemented in machine '${machine.id}'`);
        }
        const actorRef = createActor(logic, {
          id: options?.id,
          parent: actorScope.self,
          syncSnapshot: options?.syncSnapshot,
          input: typeof options?.input === "function" ? options.input({
            context,
            event,
            self: actorScope.self
          }) : options?.input,
          src,
          systemId: options?.systemId
        });
        spawnedChildren[actorRef.id] = actorRef;
        return actorRef;
      } else {
        const actorRef = createActor(src, {
          id: options?.id,
          parent: actorScope.self,
          syncSnapshot: options?.syncSnapshot,
          input: options?.input,
          src,
          systemId: options?.systemId
        });
        return actorRef;
      }
    };
    return (src, options) => {
      const actorRef = spawn(src, options);
      spawnedChildren[actorRef.id] = actorRef;
      actorScope.defer(() => {
        if (actorRef._processingStatus === ProcessingStatus.Stopped) {
          return;
        }
        actorRef.start();
      });
      return actorRef;
    };
  }
  function resolveAssign(actorScope, snapshot, actionArgs, actionParams, {
    assignment
  }) {
    if (!snapshot.context) {
      throw new Error("Cannot assign to undefined `context`. Ensure that `context` is defined in the machine config.");
    }
    const spawnedChildren = {};
    const assignArgs = {
      context: snapshot.context,
      event: actionArgs.event,
      spawn: createSpawner(actorScope, snapshot, actionArgs.event, spawnedChildren),
      self: actorScope.self,
      system: actorScope.system
    };
    let partialUpdate = {};
    if (typeof assignment === "function") {
      partialUpdate = assignment(assignArgs, actionParams);
    } else {
      for (const key of Object.keys(assignment)) {
        const propAssignment = assignment[key];
        partialUpdate[key] = typeof propAssignment === "function" ? propAssignment(assignArgs, actionParams) : propAssignment;
      }
    }
    const updatedContext = Object.assign({}, snapshot.context, partialUpdate);
    return [cloneMachineSnapshot(snapshot, {
      context: updatedContext,
      children: Object.keys(spawnedChildren).length ? {
        ...snapshot.children,
        ...spawnedChildren
      } : snapshot.children
    }), void 0, void 0];
  }
  function assign(assignment) {
    function assign2(_args, _params) {
    }
    assign2.type = "xstate.assign";
    assign2.assignment = assignment;
    assign2.resolve = resolveAssign;
    return assign2;
  }

  // node_modules/xstate/dist/StateMachine-bf2cec8d.esm.js
  var cache = /* @__PURE__ */ new WeakMap();
  function memo(object, key, fn) {
    let memoizedData = cache.get(object);
    if (!memoizedData) {
      memoizedData = {
        [key]: fn()
      };
      cache.set(object, memoizedData);
    } else if (!(key in memoizedData)) {
      memoizedData[key] = fn();
    }
    return memoizedData[key];
  }
  var EMPTY_OBJECT = {};
  var toSerializableAction = (action) => {
    if (typeof action === "string") {
      return {
        type: action
      };
    }
    if (typeof action === "function") {
      if ("resolve" in action) {
        return {
          type: action.type
        };
      }
      return {
        type: action.name
      };
    }
    return action;
  };
  var StateNode = class _StateNode {
    constructor(config, options) {
      this.config = config;
      this.key = void 0;
      this.id = void 0;
      this.type = void 0;
      this.path = void 0;
      this.states = void 0;
      this.history = void 0;
      this.entry = void 0;
      this.exit = void 0;
      this.parent = void 0;
      this.machine = void 0;
      this.meta = void 0;
      this.output = void 0;
      this.order = -1;
      this.description = void 0;
      this.tags = [];
      this.transitions = void 0;
      this.always = void 0;
      this.parent = options._parent;
      this.key = options._key;
      this.machine = options._machine;
      this.path = this.parent ? this.parent.path.concat(this.key) : [];
      this.id = this.config.id || [this.machine.id, ...this.path].join(STATE_DELIMITER);
      this.type = this.config.type || (this.config.states && Object.keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
      this.description = this.config.description;
      this.order = this.machine.idMap.size;
      this.machine.idMap.set(this.id, this);
      this.states = this.config.states ? mapValues(this.config.states, (stateConfig, key) => {
        const stateNode = new _StateNode(stateConfig, {
          _parent: this,
          _key: key,
          _machine: this.machine
        });
        return stateNode;
      }) : EMPTY_OBJECT;
      if (this.type === "compound" && !this.config.initial) {
        throw new Error(`No initial state specified for compound state node "#${this.id}". Try adding { initial: "${Object.keys(this.states)[0]}" } to the state config.`);
      }
      this.history = this.config.history === true ? "shallow" : this.config.history || false;
      this.entry = toArray(this.config.entry).slice();
      this.exit = toArray(this.config.exit).slice();
      this.meta = this.config.meta;
      this.output = this.type === "final" || !this.parent ? this.config.output : void 0;
      this.tags = toArray(config.tags).slice();
    }
    /** @internal */
    _initialize() {
      this.transitions = formatTransitions(this);
      if (this.config.always) {
        this.always = toTransitionConfigArray(this.config.always).map((t) => formatTransition(this, NULL_EVENT, t));
      }
      Object.keys(this.states).forEach((key) => {
        this.states[key]._initialize();
      });
    }
    /** The well-structured state node definition. */
    get definition() {
      return {
        id: this.id,
        key: this.key,
        version: this.machine.version,
        type: this.type,
        initial: this.initial ? {
          target: this.initial.target,
          source: this,
          actions: this.initial.actions.map(toSerializableAction),
          eventType: null,
          reenter: false,
          toJSON: () => ({
            target: this.initial.target.map((t) => `#${t.id}`),
            source: `#${this.id}`,
            actions: this.initial.actions.map(toSerializableAction),
            eventType: null
          })
        } : void 0,
        history: this.history,
        states: mapValues(this.states, (state) => {
          return state.definition;
        }),
        on: this.on,
        transitions: [...this.transitions.values()].flat().map((t) => ({
          ...t,
          actions: t.actions.map(toSerializableAction)
        })),
        entry: this.entry.map(toSerializableAction),
        exit: this.exit.map(toSerializableAction),
        meta: this.meta,
        order: this.order || -1,
        output: this.output,
        invoke: this.invoke,
        description: this.description,
        tags: this.tags
      };
    }
    /** @internal */
    toJSON() {
      return this.definition;
    }
    /** The logic invoked as actors by this state node. */
    get invoke() {
      return memo(this, "invoke", () => toArray(this.config.invoke).map((invokeConfig, i) => {
        const {
          src,
          systemId
        } = invokeConfig;
        const resolvedId = invokeConfig.id ?? createInvokeId(this.id, i);
        const sourceName = typeof src === "string" ? src : `xstate.invoke.${createInvokeId(this.id, i)}`;
        return {
          ...invokeConfig,
          src: sourceName,
          id: resolvedId,
          systemId,
          toJSON() {
            const {
              onDone,
              onError,
              ...invokeDefValues
            } = invokeConfig;
            return {
              ...invokeDefValues,
              type: "xstate.invoke",
              src: sourceName,
              id: resolvedId
            };
          }
        };
      }));
    }
    /** The mapping of events to transitions. */
    get on() {
      return memo(this, "on", () => {
        const transitions = this.transitions;
        return [...transitions].flatMap(([descriptor, t]) => t.map((t2) => [descriptor, t2])).reduce((map, [descriptor, transition]) => {
          map[descriptor] = map[descriptor] || [];
          map[descriptor].push(transition);
          return map;
        }, {});
      });
    }
    get after() {
      return memo(this, "delayedTransitions", () => getDelayedTransitions(this));
    }
    get initial() {
      return memo(this, "initial", () => formatInitialTransition(this, this.config.initial));
    }
    /** @internal */
    next(snapshot, event) {
      const eventType = event.type;
      const actions = [];
      let selectedTransition;
      const candidates = memo(this, `candidates-${eventType}`, () => getCandidates(this, eventType));
      for (const candidate of candidates) {
        const {
          guard
        } = candidate;
        const resolvedContext = snapshot.context;
        let guardPassed = false;
        try {
          guardPassed = !guard || evaluateGuard(guard, resolvedContext, event, snapshot);
        } catch (err) {
          const guardType = typeof guard === "string" ? guard : typeof guard === "object" ? guard.type : void 0;
          throw new Error(`Unable to evaluate guard ${guardType ? `'${guardType}' ` : ""}in transition for event '${eventType}' in state node '${this.id}':
${err.message}`);
        }
        if (guardPassed) {
          actions.push(...candidate.actions);
          selectedTransition = candidate;
          break;
        }
      }
      return selectedTransition ? [selectedTransition] : void 0;
    }
    /** All the event types accepted by this state node and its descendants. */
    get events() {
      return memo(this, "events", () => {
        const {
          states
        } = this;
        const events = new Set(this.ownEvents);
        if (states) {
          for (const stateId of Object.keys(states)) {
            const state = states[stateId];
            if (state.states) {
              for (const event of state.events) {
                events.add(`${event}`);
              }
            }
          }
        }
        return Array.from(events);
      });
    }
    /**
     * All the events that have transitions directly from this state node.
     *
     * Excludes any inert events.
     */
    get ownEvents() {
      const keys = Object.keys(Object.fromEntries(this.transitions));
      const events = new Set(keys.filter((descriptor) => {
        return this.transitions.get(descriptor).some((transition) => !(!transition.target && !transition.actions.length && !transition.reenter));
      }));
      return Array.from(events);
    }
  };
  var STATE_IDENTIFIER2 = "#";
  var StateMachine = class _StateMachine {
    constructor(config, implementations) {
      this.config = config;
      this.version = void 0;
      this.schemas = void 0;
      this.implementations = void 0;
      this.__xstatenode = true;
      this.idMap = /* @__PURE__ */ new Map();
      this.root = void 0;
      this.id = void 0;
      this.states = void 0;
      this.events = void 0;
      this.id = config.id || "(machine)";
      this.implementations = {
        actors: implementations?.actors ?? {},
        actions: implementations?.actions ?? {},
        delays: implementations?.delays ?? {},
        guards: implementations?.guards ?? {}
      };
      this.version = this.config.version;
      this.schemas = this.config.schemas;
      this.transition = this.transition.bind(this);
      this.getInitialSnapshot = this.getInitialSnapshot.bind(this);
      this.getPersistedSnapshot = this.getPersistedSnapshot.bind(this);
      this.restoreSnapshot = this.restoreSnapshot.bind(this);
      this.start = this.start.bind(this);
      this.root = new StateNode(config, {
        _key: this.id,
        _machine: this
      });
      this.root._initialize();
      formatRouteTransitions(this.root);
      this.states = this.root.states;
      this.events = this.root.events;
    }
    /**
     * Clones this state machine with the provided implementations.
     *
     * @param implementations Options (`actions`, `guards`, `actors`, `delays`) to
     *   recursively merge with the existing options.
     * @returns A new `StateMachine` instance with the provided implementations.
     */
    provide(implementations) {
      const {
        actions,
        guards,
        actors,
        delays
      } = this.implementations;
      return new _StateMachine(this.config, {
        actions: {
          ...actions,
          ...implementations.actions
        },
        guards: {
          ...guards,
          ...implementations.guards
        },
        actors: {
          ...actors,
          ...implementations.actors
        },
        delays: {
          ...delays,
          ...implementations.delays
        }
      });
    }
    resolveState(config) {
      const resolvedStateValue = resolveStateValue(this.root, config.value);
      const nodeSet = getAllStateNodes(getStateNodes(this.root, resolvedStateValue));
      return createMachineSnapshot({
        _nodes: [...nodeSet],
        context: config.context || {},
        children: {},
        status: isInFinalState(nodeSet, this.root) ? "done" : config.status || "active",
        output: config.output,
        error: config.error,
        historyValue: config.historyValue
      }, this);
    }
    /**
     * Determines the next snapshot given the current `snapshot` and received
     * `event`. Calculates a full macrostep from all microsteps.
     *
     * @param snapshot The current snapshot
     * @param event The received event
     */
    transition(snapshot, event, actorScope) {
      return macrostep(snapshot, event, actorScope, []).snapshot;
    }
    /**
     * Determines the next state given the current `state` and `event`. Calculates
     * a microstep.
     *
     * @param state The current state
     * @param event The received event
     */
    microstep(snapshot, event, actorScope) {
      return macrostep(snapshot, event, actorScope, []).microsteps.map(([s]) => s);
    }
    getTransitionData(snapshot, event) {
      return transitionNode(this.root, snapshot.value, snapshot, event) || [];
    }
    /**
     * The initial state _before_ evaluating any microsteps. This "pre-initial"
     * state is provided to initial actions executed in the initial state.
     *
     * @internal
     */
    _getPreInitialState(actorScope, initEvent, internalQueue) {
      const {
        context
      } = this.config;
      const preInitial = createMachineSnapshot({
        context: typeof context !== "function" && context ? context : {},
        _nodes: [this.root],
        children: {},
        status: "active"
      }, this);
      if (typeof context === "function") {
        const assignment = ({
          spawn,
          event,
          self: self2
        }) => context({
          spawn,
          input: event.input,
          self: self2
        });
        return resolveActionsAndContext(preInitial, initEvent, actorScope, [assign(assignment)], internalQueue, void 0);
      }
      return preInitial;
    }
    /**
     * Returns the initial `State` instance, with reference to `self` as an
     * `ActorRef`.
     */
    getInitialSnapshot(actorScope, input) {
      const initEvent = createInitEvent(input);
      const internalQueue = [];
      const preInitialState = this._getPreInitialState(actorScope, initEvent, internalQueue);
      const [nextState] = initialMicrostep(this.root, preInitialState, actorScope, initEvent, internalQueue);
      const {
        snapshot: macroState
      } = macrostep(nextState, initEvent, actorScope, internalQueue);
      return macroState;
    }
    start(snapshot) {
      Object.values(snapshot.children).forEach((child) => {
        if (child.getSnapshot().status === "active") {
          child.start();
        }
      });
    }
    getStateNodeById(stateId) {
      const fullPath = toStatePath(stateId);
      const relativePath = fullPath.slice(1);
      const resolvedStateId = isStateId(fullPath[0]) ? fullPath[0].slice(STATE_IDENTIFIER2.length) : fullPath[0];
      const stateNode = this.idMap.get(resolvedStateId);
      if (!stateNode) {
        throw new Error(`Child state node '#${resolvedStateId}' does not exist on machine '${this.id}'`);
      }
      return getStateNodeByPath(stateNode, relativePath);
    }
    get definition() {
      return this.root.definition;
    }
    toJSON() {
      return this.definition;
    }
    getPersistedSnapshot(snapshot, options) {
      return getPersistedSnapshot(snapshot, options);
    }
    restoreSnapshot(snapshot, _actorScope) {
      const children = {};
      const snapshotChildren = snapshot.children;
      Object.keys(snapshotChildren).forEach((actorId) => {
        const actorData = snapshotChildren[actorId];
        const childState = actorData.snapshot;
        const src = actorData.src;
        const logic = typeof src === "string" ? resolveReferencedActor(this, src) : src;
        if (!logic) {
          return;
        }
        const actorRef = createActor(logic, {
          id: actorId,
          parent: _actorScope.self,
          syncSnapshot: actorData.syncSnapshot,
          snapshot: childState,
          src,
          systemId: actorData.systemId
        });
        children[actorId] = actorRef;
      });
      function resolveHistoryReferencedState(root, referenced) {
        if (referenced instanceof StateNode) {
          return referenced;
        }
        try {
          return root.machine.getStateNodeById(referenced.id);
        } catch {
        }
      }
      function reviveHistoryValue(root, historyValue) {
        if (!historyValue || typeof historyValue !== "object") {
          return {};
        }
        const revived = {};
        for (const key in historyValue) {
          const arr = historyValue[key];
          for (const item of arr) {
            const resolved = resolveHistoryReferencedState(root, item);
            if (!resolved) {
              continue;
            }
            revived[key] ??= [];
            revived[key].push(resolved);
          }
        }
        return revived;
      }
      const revivedHistoryValue = reviveHistoryValue(this.root, snapshot.historyValue);
      const restoredSnapshot = createMachineSnapshot({
        ...snapshot,
        children,
        _nodes: Array.from(getAllStateNodes(getStateNodes(this.root, snapshot.value))),
        historyValue: revivedHistoryValue
      }, this);
      const seen = /* @__PURE__ */ new Set();
      function reviveContext(contextPart, children2) {
        if (seen.has(contextPart)) {
          return;
        }
        seen.add(contextPart);
        for (const key in contextPart) {
          const value = contextPart[key];
          if (value && typeof value === "object") {
            if ("xstate$$type" in value && value.xstate$$type === $$ACTOR_TYPE) {
              contextPart[key] = children2[value.id];
              continue;
            }
            reviveContext(value, children2);
          }
        }
      }
      reviveContext(restoredSnapshot.context, children);
      return restoredSnapshot;
    }
  };

  // node_modules/xstate/dist/xstate.esm.js
  function createMachine(config, implementations) {
    return new StateMachine(config, implementations);
  }

  // src/machines/inputMachine.js
  var inputMachineConfig = {
    initial: "empty_input",
    states: {
      empty_input: {},
      draft_keyword: {},
      editing_keyword: {},
      committed_keyword: {},
      committed_anchor: {},
      followup_waiting: {},
      draft_followup: {}
    }
  };
  var inputMachine = createMachine({
    id: "input",
    ...inputMachineConfig
  });

  // src/machines/containerMachine.js
  var containerMachineConfig = {
    initial: "compact_classic",
    states: {
      compact_classic: {},
      compact_resolving: {},
      expanded_agent: {},
      expanded_clarifying: {},
      expanded_repair: {}
    }
  };
  var containerMachine = createMachine({
    id: "container",
    ...containerMachineConfig
  });

  // src/machines/sessionMachine.js
  var sessionMachineConfig = {
    initial: "idle",
    states: {
      idle: {},
      retrieving: {},
      results_ready: {},
      clarifying: {},
      refining: {},
      empty_repair: {},
      unsupported: {}
    }
  };
  var sessionMachine = createMachine({
    id: "session",
    ...sessionMachineConfig
  });

  // src/machines/searchboxOrchestrator.js
  function buildFixtureTarget(triple) {
    return [
      `.input.${triple.input}`,
      `.container.${triple.container}`,
      `.session.${triple.session}`
    ];
  }
  function buildFixtureLoaders(fixtures2) {
    return Object.entries(fixtures2).map(([fixtureId, fixture]) => ({
      guard: ({ event }) => event.fixtureId === fixtureId,
      target: buildFixtureTarget(fixture.machineTriplet),
      actions: assign({
        currentFixtureId: fixtureId,
        currentScene: fixture.scene
      })
    }));
  }
  function buildActionTransitions(fixtures2) {
    const transitions = {};
    Object.entries(fixtures2).forEach(([fixtureId, fixture]) => {
      (fixture.actions || []).forEach((action) => {
        const eventType = action.event?.type;
        if (!eventType) return;
        if (!transitions[eventType]) {
          transitions[eventType] = [];
        }
        transitions[eventType].push({
          guard: ({ context, event }) => context.currentFixtureId === fixtureId && event.targetFixtureId === action.targetFixtureId,
          target: buildFixtureTarget(fixtures2[action.targetFixtureId].machineTriplet),
          actions: assign({
            currentFixtureId: action.targetFixtureId,
            currentScene: fixtures2[action.targetFixtureId].scene
          })
        });
      });
    });
    return transitions;
  }
  function createSearchboxOrchestratorMachine({ fixtures: fixtures2, initialFixtureId, initialVariant }) {
    const initialFixture = fixtures2[initialFixtureId];
    return createMachine({
      id: "searchboxOrchestrator",
      type: "parallel",
      context: {
        currentFixtureId: initialFixtureId,
        currentScene: initialFixture.scene,
        currentVariant: initialVariant
      },
      states: {
        input: {
          ...inputMachineConfig
        },
        container: {
          ...containerMachineConfig
        },
        session: {
          ...sessionMachineConfig
        }
      },
      on: {
        LOAD_FIXTURE: buildFixtureLoaders(fixtures2),
        SELECT_VARIANT: {
          actions: assign({
            currentVariant: ({ event }) => event.variant
          })
        },
        ...buildActionTransitions(fixtures2)
      }
    });
  }

  // src/selectors.js
  function getFixture(snapshot, fixtures2) {
    return fixtures2[snapshot.context.currentFixtureId];
  }
  function getTriplet(snapshot) {
    return {
      input: String(snapshot.value.input),
      container: String(snapshot.value.container),
      session: String(snapshot.value.session)
    };
  }
  function getVariant(snapshot) {
    return snapshot.context.currentVariant;
  }
  function getScene(snapshot) {
    return snapshot.context.currentScene;
  }
  function getCurrentFixtureId(snapshot) {
    return snapshot.context.currentFixtureId;
  }

  // src/main.js
  var scenarios = {
    "keyword-empty": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false
      }
    },
    "keyword-input": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "swim vest",
        tags: [],
        openMenu: false
      }
    },
    "keyword-tag": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [{ text: "swim vest", scope: "\u6807\u7B7E" }],
        openMenu: false
      }
    },
    "keyword-edit": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "swim vest",
        tags: [],
        openMenu: false
      }
    },
    "keyword-multi": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "water sports",
        tags: [{ text: "swim vest", scope: "\u6807\u7B7E" }],
        openMenu: false
      }
    },
    "keyword-anchor-seed": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "outdoor gear",
        tags: [
          { text: "swim vest", scope: "\u6807\u7B7E" },
          { text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" },
          { text: "water sports", scope: "\u6807\u7B7E" }
        ],
        openMenu: false
      }
    },
    "keyword-menu": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [
          { text: "swim vest", scope: "\u6807\u7B7E" },
          { text: "water sports", scope: "\u6807\u7B7E" }
        ],
        openMenu: true
      }
    },
    "url-resolving": {
      mode: "resolving",
      inputTitle: "https://www.youtube.com/@HollylandTech",
      inputHint: "",
      miniAction: "\u8BC6\u522B\u4E2D",
      primaryAction: null,
      status: {
        state: "\u8BC6\u522B\u4E2D",
        stateClass: "",
        spinner: true,
        text: "\u6B63\u5728\u8BC6\u522B\u94FE\u63A5\u7C7B\u578B\u4E0E\u76EE\u6807\u9891\u9053\u3002\u5982\u679C\u80FD\u76F4\u63A5\u9501\u5B9A\u76EE\u6807\uFF0C\u5C06\u8FDB\u5165\u951A\u70B9\u641C\u7D22\u5E76\u53EC\u56DE\u76F8\u4F3C\u9891\u9053\u3002"
      },
      session: null,
      question: null,
      conditions: null
    },
    "url-exact": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u951A\u70B9\u641C\u7D22\u5DF2\u5C31\u7EEA",
        stateClass: "ok",
        spinner: false,
        text: "\u5DF2\u9501\u5B9A\u53C2\u8003\u9891\u9053 @HollylandTech\u3002\u7ED3\u679C\u5217\u8868\u4E2D\u951A\u70B9\u9891\u9053\u7F6E\u9876\uFF0C\u5176\u4F59\u7ED3\u679C\u9ED8\u8BA4\u6309\u76F8\u4F3C\u7A0B\u5EA6\u53EC\u56DE\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u5F53\u524D\u6309 @HollylandTech \u4F5C\u4E3A\u951A\u70B9\u9891\u9053\uFF0C\u6B63\u5728\u53EC\u56DE\u76F8\u4F3C\u9891\u9053\u3002",
        meta: ["\u951A\u70B9\u9891\u9053\u7F6E\u9876", "\u76F8\u4F3C\u9891\u9053\u53EC\u56DE", "\u9ED8\u8BA4\u6309\u76F8\u4F3C\u7A0B\u5EA6\u6392\u5E8F"]
      },
      question: null,
      conditions: {
        anchor: "\u951A\u70B9\u9891\u9053\uFF1A@HollylandTech",
        hard: [],
        soft: ["\u76F8\u4F3C\u9891\u9053\u9ED8\u8BA4\u6309\u76F8\u4F3C\u7A0B\u5EA6\u6392\u5E8F"],
        hint: "\u951A\u70B9\u9891\u9053\u4E0D\u6DF7\u5165\u666E\u901A\u76F8\u4F3C\u7ED3\u679C\u6392\u5E8F\u6D41\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false
      }
    },
    "url-keyword-seed": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "outdoor gear",
        tags: [
          { text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" },
          { text: "swim vest", scope: "\u6807\u7B7E" },
          { text: "water sports", scope: "\u6807\u7B7E" }
        ],
        openMenu: false
      }
    },
    "url-low-recall-hint": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      inlineHint: {
        text: "\u7ED3\u679C\u504F\u5C11\uFF0C\u53EF\u4F18\u5316\u6761\u4EF6",
        caption: "\u5F53\u524D\u4ECD\u4FDD\u7559\u951A\u70B9\u9891\u9053\u4E0E\u5C11\u91CF\u76F8\u4F3C\u7ED3\u679C\uFF0C\u70B9\u51FB\u540E\u518D\u5C55\u5F00\u4FEE\u6B63\u52A8\u4F5C\u3002",
        actionId: "A_HINT_OPEN_REPAIR_LOW_RECALL",
        actionLabel: "\u4F18\u5316\u6761\u4EF6"
      },
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false
      }
    },
    "url-mismatch": {
      mode: "expanded",
      inputTitle: "https://www.instagram.com/creator_xxx",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u5E73\u53F0\u4E0D\u5339\u914D",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u5728 YouTube \u9891\u9053\u641C\u7D22\u9875\uFF0C\u8BE5\u94FE\u63A5\u5C5E\u4E8E Instagram\u3002\u9700\u8981\u4FEE\u6B63\u540E\u518D\u7EE7\u7EED\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u94FE\u63A5\u53EF\u8BC6\u522B\uFF0C\u4F46\u76EE\u6807\u5E73\u53F0\u4E0E\u5F53\u524D\u9875\u9762\u4E0D\u4E00\u81F4\u3002",
        meta: ["\u53EF\u5207\u5E73\u53F0", "\u53EF\u5220\u94FE\u63A5\u6539\u5199", "\u4E0D\u5EFA\u8BAE\u9759\u9ED8\u5FFD\u7565\u94FE\u63A5"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u60F3\u5207\u6362\u5230 Instagram \u641C\u7D22\uFF0C\u8FD8\u662F\u7EE7\u7EED\u641C YouTube\uFF1F",
        choices: ["\u5207\u5230 Instagram", "\u5220\u6389\u94FE\u63A5\u7EE7\u7EED\u641C YouTube", "\u91CD\u65B0\u7C98\u8D34 YouTube \u94FE\u63A5"],
        caption: "\u8FD9\u662F URL \u4FEE\u6B63\u95EE\u9898\uFF0C\u4E0D\u662F\u5F00\u653E\u5F0F\u8FFD\u95EE\u3002"
      },
      conditions: {
        anchor: null,
        hard: ["\u5F53\u524D\u5E73\u53F0\uFF1AYouTube"],
        soft: [],
        hint: "\u5E73\u53F0\u51B2\u7A81\u4F18\u5148\u4E8E\u5176\u5B83\u504F\u597D\u3002"
      }
    },
    "url-unsupported": {
      mode: "expanded",
      inputTitle: "https://www.amazon.com/dp/B0XXXXXX",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u7C7B\u578B\u4E0D\u652F\u6301",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u76F4\u63A5\u4F7F\u7528\u8BE5\u7C7B\u94FE\u63A5\u8D77\u641C\uFF0C\u53EF\u6539\u4E3A\u9891\u9053\u94FE\u63A5\u3001\u5173\u952E\u8BCD\u6216\u81EA\u7136\u8BED\u8A00\u63CF\u8FF0\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u94FE\u63A5\u7ED3\u6784\u53EF\u8BC6\u522B\uFF0C\u4F46\u4E0D\u5C5E\u4E8E\u672C\u641C\u7D22\u6846\u5F53\u524D\u652F\u6301\u7684 URL \u7C7B\u578B\u3002",
        meta: ["\u53EF\u6539\u4E3A\u9891\u9053\u94FE\u63A5", "\u53EF\u6539\u4E3A\u5173\u952E\u8BCD", "\u53EF\u6539\u4E3A\u81EA\u7136\u8BED\u8A00"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u8981\u7EE7\u7EED\u7528\u4EC0\u4E48\u65B9\u5F0F\u641C\u7D22\uFF1F",
        choices: ["\u6539\u4E3A\u9891\u9053\u94FE\u63A5", "\u5220\u6389\u94FE\u63A5\u8F93\u5165\u5173\u952E\u8BCD", "\u76F4\u63A5\u63CF\u8FF0\u60F3\u627E\u4EC0\u4E48"],
        caption: "\u8FD9\u91CC\u53EA\u5904\u7406\u8F93\u5165\u7C7B\u578B\u4FEE\u6B63\u3002"
      },
      conditions: null
    },
    "url-invalid": {
      mode: "expanded",
      inputTitle: "https://www.youtube.com/this-link-is-broken",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u65E0\u6CD5\u8BC6\u522B",
        stateClass: "warn",
        spinner: false,
        text: "\u672A\u8BC6\u522B\u5230\u53EF\u7528\u9891\u9053\u94FE\u63A5\u3002\u4F60\u53EF\u4EE5\u91CD\u65B0\u7C98\u8D34\u9891\u9053\u4E3B\u9875\u94FE\u63A5\uFF0C\u6216\u76F4\u63A5\u8F93\u5165\u9891\u9053\u540D\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u8BE5\u94FE\u63A5\u672A\u80FD\u6620\u5C04\u4E3A\u6709\u6548\u9891\u9053\u8D44\u6E90\u3002",
        meta: ["\u91CD\u65B0\u8D34\u94FE\u63A5", "\u53EA\u8F93\u9891\u9053\u540D", "\u6539\u6210\u81EA\u7136\u8BED\u8A00"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u66F4\u60F3\u600E\u4E48\u4FEE\u6B63\uFF1F",
        choices: ["\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5", "\u76F4\u63A5\u8F93\u5165\u9891\u9053\u540D", "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u641C\u7D22"],
        caption: "\u4FEE\u6B63\u6001\u5E94\u8BE5\u77ED\u3001\u660E\u786E\uFF0C\u53EA\u5904\u7406\u5F53\u524D\u5361\u70B9\u3002"
      },
      conditions: null
    },
    "natural-init": {
      mode: "expanded",
      inputTitle: "\u5E2E\u6211\u627E\u7F8E\u56FD\u505A\u6C7D\u914D\u8BC4\u6D4B\u3001\u6700\u8FD1\u6D3B\u8DC3\u3001\u7C89\u4E1D 5k-20k \u7684 YouTube \u7EA2\u4EBA",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: null,
      session: {
        label: "\u641C\u7D22\u6846\u5DF2\u5C55\u5F00",
        summary: "\u7CFB\u7EDF\u6B63\u5728\u628A\u81EA\u7136\u8BED\u8A00\u62C6\u6210\u53EF\u6267\u884C\u641C\u7D22\u6761\u4EF6\u3002",
        meta: ["\u521A\u8FDB\u5165 Agent \u6A21\u5F0F", "\u5C1A\u672A\u8FD4\u56DE\u7ED3\u679C"]
      },
      question: null,
      conditions: null
    },
    "natural-retrieving": {
      mode: "expanded",
      inputTitle: "\u5E2E\u6211\u627E\u7F8E\u56FD\u505A\u6C7D\u914D\u8BC4\u6D4B\u3001\u6700\u8FD1\u6D3B\u8DC3\u3001\u7C89\u4E1D 5k-20k \u7684 YouTube \u7EA2\u4EBA",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u9996\u8F6E\u641C\u7D22\u4E2D",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u5DF2\u63D0\u53D6\u4E3B\u8981\u6761\u4EF6\uFF0C\u6B63\u5728\u5F53\u524D\u5E73\u53F0\u7ED3\u679C\u96C6\u4E2D\u6267\u884C\u7B2C\u4E00\u8F6E\u641C\u7D22\u3002"
      },
      session: {
        label: "\u5F53\u524D\u4EFB\u52A1",
        summary: "\u6B63\u5728\u641C\u7D22\uFF1AYouTube \u9891\u9053 \xB7 \u7F8E\u56FD \xB7 \u6C7D\u914D/\u5DE5\u5177\u6D4B\u8BC4 \xB7 \u7C89\u4E1D 5k-20k \xB7 \u8FD1\u671F\u6D3B\u8DC3",
        meta: ["\u5DF2\u7406\u89E3 5 \u4E2A\u786C\u6761\u4EF6", "\u6B63\u5728 retrieving"]
      },
      question: null,
      conditions: null
    },
    "natural-results": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u9996\u8F6E\u7ED3\u679C\u5DF2\u8FD4\u56DE",
        stateClass: "ok",
        spinner: false,
        text: "\u5DF2\u5C06\u4F60\u7684\u63CF\u8FF0\u62C6\u6210\u53EF\u6267\u884C\u641C\u7D22\u6761\u4EF6\uFF0C\u5E76\u5728\u5F53\u524D\u5E73\u53F0\u7ED3\u679C\u96C6\u4E2D\u5B8C\u6210\u7B2C\u4E00\u8F6E\u53EC\u56DE\u3002"
      },
      session: {
        label: "\u5F53\u524D\u4EFB\u52A1",
        summary: "\u6B63\u5728\u641C\u7D22\uFF1AYouTube \u9891\u9053 \xB7 \u7F8E\u56FD \xB7 \u6C7D\u914D/\u5DE5\u5177\u6D4B\u8BC4 \xB7 \u7C89\u4E1D 5k-20k \xB7 \u8FD1\u671F\u6D3B\u8DC3",
        meta: ["\u7CFB\u7EDF\u5DF2\u7406\u89E3 5 \u4E2A\u786C\u6761\u4EF6", "\u672A\u89E6\u53D1\u8FFD\u95EE", "\u7ED3\u679C\u533A\u5DF2\u5237\u65B0"]
      },
      question: null,
      conditions: {
        anchor: null,
        hard: ["\u7F8E\u56FD", "YouTube", "\u6C7D\u914D / \u5DE5\u5177\u6D4B\u8BC4", "5k-20k \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: [],
        hint: "\u6240\u6709\u6761\u4EF6\u90FD\u5DF2\u8FDB\u5165\u9996\u8F6E\u641C\u7D22\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u7EE7\u7EED\u8865\u5145\u7B5B\u9009\u8981\u6C42"
      }
    },
    "natural-clarifying": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u9700\u8981\u8865\u5145",
        stateClass: "",
        spinner: false,
        text: "\u9996\u8F6E\u7ED3\u679C\u5DF2\u8FD4\u56DE\uFF0C\u4F46\u201C\u6C7D\u914D\u8BC4\u6D4B\u201D\u4ECD\u53EF\u7EE7\u7EED\u7F29\u5C0F\u8303\u56F4\u3002"
      },
      session: {
        label: "\u5F53\u524D\u4EFB\u52A1",
        summary: "\u7CFB\u7EDF\u5DF2\u627E\u5230\u4E00\u6279\u5019\u9009\u9891\u9053\uFF0C\u4F46\u8FD8\u6709\u4E00\u4E2A\u9AD8\u5F71\u54CD\u95EE\u9898\u53EF\u8FDB\u4E00\u6B65 refine\u3002",
        meta: ["\u7ED3\u679C\u5DF2\u8FD4\u56DE", "\u5F53\u524D\u5B58\u5728 1 \u4E2A\u8FFD\u95EE"]
      },
      question: {
        slot: "question",
        title: "\u4F60\u66F4\u504F\u7EF4\u4FEE\u6559\u7A0B\u3001\u4EA7\u54C1\u5F00\u7BB1\uFF0C\u8FD8\u662F\u8F66\u8F7D\u914D\u4EF6\u6D4B\u8BC4\uFF1F",
        choices: ["\u7EF4\u4FEE\u6559\u7A0B", "\u4EA7\u54C1\u5F00\u7BB1", "\u8F66\u8F7D\u914D\u4EF6\u6D4B\u8BC4"],
        caption: "\u6BCF\u6B21\u53EA\u95EE\u4E00\u4E2A\u9AD8\u5F71\u54CD\u95EE\u9898\u3002"
      },
      conditions: {
        anchor: null,
        hard: ["\u7F8E\u56FD", "YouTube", "5k-20k \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u6C7D\u914D\u8BC4\u6D4B"],
        hint: "\u201C\u6C7D\u914D\u8BC4\u6D4B\u201D\u5F53\u524D\u4F5C\u4E3A\u5F85\u7EC6\u5316\u6761\u4EF6\u5B58\u5728\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8865\u4E00\u53E5\u8BF4\u660E"
      }
    },
    "natural-followup-draft": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u8BB0\u5F55\u8865\u5145",
        stateClass: "",
        spinner: false,
        text: "\u7CFB\u7EDF\u5DF2\u4FDD\u7559\u4E4B\u524D\u7684\u7406\u89E3\uFF0C\u73B0\u5728\u4F60\u6B63\u5728\u8F93\u5165\u4E00\u6761\u65B0\u7684\u8865\u5145\u8981\u6C42\u3002"
      },
      session: {
        label: "\u5F53\u524D\u4EFB\u52A1",
        summary: "\u9996\u8F6E\u7ED3\u679C\u5DF2\u8FD4\u56DE\uFF0C\u5F53\u524D\u51C6\u5907\u63A5\u6536\u4E00\u6761\u65B0\u7684\u81EA\u7136\u8BED\u8A00\u8865\u5145\u3002",
        meta: ["follow-up input", "\u4E0D\u4F1A\u56DE\u5230\u539F\u59CB query \u7F16\u8F91"]
      },
      question: null,
      conditions: {
        anchor: null,
        hard: ["\u7F8E\u56FD", "YouTube", "\u6C7D\u914D / \u5DE5\u5177\u6D4B\u8BC4", "5k-20k \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: [],
        hint: "\u539F\u59CB query \u5DF2\u88AB\u5438\u6536\u5230\u6761\u4EF6\u5C42\u3002"
      },
      keywordFlow: {
        draft: "\u4E0D\u8981\u592A\u5927\u7684\u53F7",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u7EE7\u7EED\u8865\u5145\u7B5B\u9009\u8981\u6C42"
      }
    },
    "natural-followup-refining": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u5E94\u7528\u8865\u5145\u8981\u6C42",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u6B63\u5728\u628A\u4F60\u521A\u8865\u5145\u7684\u81EA\u7136\u8BED\u8A00\u589E\u91CF\u5E76\u5165\u5F53\u524D\u4EFB\u52A1\uFF0C\u5E76\u5237\u65B0\u7ED3\u679C\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u539F\u6709\u4EFB\u52A1\u4FDD\u6301\u4E0D\u53D8\uFF0C\u65B0\u7684 follow-up \u6B63\u5728\u4F5C\u4E3A\u589E\u91CF\u6761\u4EF6\u8FDB\u5165 refine\u3002",
        meta: ["\u589E\u91CF refine", "\u4E0D\u4F1A\u56DE\u5230\u9996\u8F6E retrieving", "\u53EF\u80FD\u56DE\u5230\u7ED3\u679C / \u8FFD\u95EE / \u4FEE\u6B63"]
      },
      question: null,
      conditions: {
        anchor: null,
        hard: ["\u7F8E\u56FD", "YouTube", "\u6C7D\u914D / \u5DE5\u5177\u6D4B\u8BC4", "5k-20k \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u4E0D\u8981\u592A\u5927\u7684\u53F7"],
        hint: "follow-up \u4F1A\u5148\u4F5C\u4E3A\u65B0\u589E\u6761\u4EF6\u8FDB\u5165 refine\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u6B63\u5728\u5237\u65B0\uFF0C\u8BF7\u7A0D\u5019"
      }
    },
    "mixed-parse": {
      mode: "expanded",
      inputTitle: "https://www.youtube.com/@HollylandTech \u5E2E\u6211\u627E\u7F8E\u56FD\u7C7B\u4F3C\u8C03\u6027\u7684\u9891\u9053\uFF0C\u7C89\u4E1D 1w-10w\uFF0C\u6700\u597D\u8FD1\u671F\u6D3B\u8DC3\uFF0C\u6027\u4EF7\u6BD4\u9AD8",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u89E3\u6790\u4E2D",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u6B63\u5728\u5224\u65AD\u8FD9\u4E32\u8F93\u5165\u91CC\u54EA\u4E9B\u662F\u951A\u70B9\uFF0C\u54EA\u4E9B\u662F\u786C\u6761\u4EF6\uFF0C\u54EA\u4E9B\u53EA\u662F\u53C2\u8003\u504F\u597D\u3002"
      },
      session: {
        label: "\u7CFB\u7EDF\u89E3\u6790\u6458\u8981",
        summary: "\u5F53\u524D\u8F93\u5165\u5305\u542B URL\u3001\u5730\u533A\u3001\u7C89\u4E1D\u91CF\u3001\u6D3B\u8DC3\u5EA6\u548C\u8F6F\u6027\u504F\u597D\u3002",
        meta: ["\u89E3\u6790\u951A\u70B9", "\u89E3\u6790\u786C\u6761\u4EF6", "\u89E3\u6790\u8F6F\u504F\u597D"]
      },
      question: null,
      conditions: null
    },
    "mixed-anchor": {
      mode: "expanded",
      inputTitle: "https://www.youtube.com/@HollylandTech \u5E2E\u6211\u627E\u7F8E\u56FD\u7C7B\u4F3C\u8C03\u6027\u7684\u9891\u9053\uFF0C\u7C89\u4E1D 1w-10w\uFF0C\u6700\u597D\u8FD1\u671F\u6D3B\u8DC3\uFF0C\u6027\u4EF7\u6BD4\u9AD8",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u951A\u70B9\u4F18\u5148",
        stateClass: "ok",
        spinner: false,
        text: "\u5F53\u524D\u6309 URL \u951A\u70B9\u4F18\u5148\u5904\u7406\uFF0C\u5176\u4ED6\u63CF\u8FF0\u4E0D\u4F1A\u81EA\u52A8\u8986\u76D6\u7CBE\u786E\u9891\u9053\u8BED\u4E49\u3002"
      },
      session: {
        label: "\u7CFB\u7EDF\u89E3\u6790\u6458\u8981",
        summary: "\u5DF2\u6309 URL \u9501\u5B9A\u9891\u9053\uFF1A@HollylandTech\u3002",
        meta: ["URL \u4F18\u5148", "\u5176\u5B83\u6761\u4EF6\u540E\u7F6E\u89E3\u91CA"]
      },
      question: null,
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD", "1w-10w \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: [],
        hint: "\u5F53\u524D\u4F18\u5148\u4FDD\u8BC1\u7CBE\u786E URL \u8BED\u4E49\u4E0D\u88AB\u7834\u574F\u3002"
      }
    },
    "mixed-soft": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u8F6F\u6761\u4EF6\u5F85\u6F84\u6E05",
        stateClass: "",
        spinner: false,
        text: "\u201C\u7C7B\u4F3C\u8C03\u6027\u201D\u201C\u6027\u4EF7\u6BD4\u9AD8\u201D\u6682\u4E0D\u76F4\u63A5\u4F5C\u4E3A\u786C\u8FC7\u6EE4\u5668\uFF0C\u800C\u662F\u5148\u4F5C\u4E3A\u53C2\u8003\u504F\u597D\u5C55\u793A\u3002"
      },
      session: {
        label: "\u7CFB\u7EDF\u89E3\u6790\u6458\u8981",
        summary: "\u786C\u6761\u4EF6\u5DF2\u7ECF\u751F\u6548\uFF0C\u8F6F\u6761\u4EF6\u88AB\u964D\u7EA7\u4E3A\u53C2\u8003\u504F\u597D\u3002",
        meta: ["\u786C\u6761\u4EF6 3 \u9879", "\u8F6F\u504F\u597D 2 \u9879"]
      },
      question: null,
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD", "1w-10w \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u7C7B\u4F3C\u8C03\u6027", "\u6027\u4EF7\u6BD4\u9AD8"],
        hint: "\u8F6F\u504F\u597D\u4E0D\u4F1A\u4F2A\u88C5\u6210\u5DF2\u4E25\u683C\u751F\u6548\u7684\u8FC7\u6EE4\u5668\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false,
        followup: true,
        placeholder: "\u7EE7\u7EED\u8865\u5145\u4F60\u771F\u6B63\u60F3\u8981\u7684\u65B9\u5411"
      }
    },
    "mixed-clarifying": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6DF7\u5408\u89E3\u6790\u5B8C\u6210",
        stateClass: "ok",
        spinner: false,
        text: "\u5F53\u524D\u6309 URL \u951A\u70B9\u4F18\u5148\u5904\u7406\uFF0C\u5176\u4ED6\u63CF\u8FF0\u88AB\u62C6\u6210\u786C\u6761\u4EF6\u4E0E\u8F6F\u504F\u597D\u3002\u4E0D\u4F1A\u81EA\u52A8\u628A URL \u89E3\u91CA\u6210\u201C\u627E\u7C7B\u4F3C\u9891\u9053\u201D\u3002"
      },
      session: {
        label: "\u7CFB\u7EDF\u89E3\u6790\u6458\u8981",
        summary: "\u5DF2\u6309 URL \u9501\u5B9A\u9891\u9053\uFF1A@HollylandTech\uFF1B\u5F53\u524D\u4E0D\u4F1A\u81EA\u52A8\u6269\u5C55\u4E3A\u201C\u627E\u7C7B\u4F3C\u9891\u9053\u201D\u4EFB\u52A1\u3002",
        meta: ["\u786C\u6761\u4EF6 3 \u9879", "\u8F6F\u504F\u597D 2 \u9879", "\u5EFA\u8BAE\u5148\u786E\u8BA4\u662F\u5426\u8981\u627E\u201C\u7C7B\u4F3C\u9891\u9053\u201D"]
      },
      question: {
        slot: "question",
        title: "\u4F60\u662F\u60F3\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053\uFF0C\u8FD8\u662F\u60F3\u627E\u201C\u548C\u5B83\u7C7B\u4F3C\u201D\u7684\u5176\u4ED6\u9891\u9053\uFF1F",
        choices: ["\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053", "\u627E\u7C7B\u4F3C\u9891\u9053", "\u5148\u6309\u5F53\u524D\u6761\u4EF6\u770B\u7ED3\u679C"],
        caption: "\u8FD9\u91CC\u53EA\u95EE\u4E00\u4E2A\u9AD8\u4EF7\u503C\u95EE\u9898\uFF0C\u4E0D\u628A\u4F1A\u8BDD\u63A8\u6210\u957F\u804A\u5929\u6D41\u3002"
      },
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD", "1w-10w \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u7C7B\u4F3C\u8C03\u6027", "\u6027\u4EF7\u6BD4\u9AD8"],
        hint: "\u8F6F\u504F\u597D\u4E0D\u4F1A\u88AB\u4F2A\u88C5\u6210\u5DF2\u4E25\u683C\u751F\u6548\u7684\u8FC7\u6EE4\u5668\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false,
        followup: true,
        placeholder: "\u7EE7\u7EED\u8865\u4E00\u53E5\uFF0C\u6216\u8005\u76F4\u63A5\u56DE\u7B54\u95EE\u9898"
      }
    },
    "mixed-followup-draft": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u8BB0\u5F55\u8865\u5145",
        stateClass: "",
        spinner: false,
        text: "\u4F60\u6B63\u5728\u8865\u5145\u65B0\u7684\u81EA\u7136\u8BED\u8A00\u8981\u6C42\uFF0C\u7CFB\u7EDF\u4F1A\u628A\u5B83\u4F5C\u4E3A\u589E\u91CF\u800C\u4E0D\u662F\u6539\u5199\u539F\u59CB query\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u5F53\u524D\u5DF2\u5B58\u5728 URL \u951A\u70B9\u4E0E\u7ED3\u6784\u5316\u6761\u4EF6\uFF0C\u6B63\u5728\u63A5\u6536\u4E00\u6761\u65B0\u7684 follow-up\u3002",
        meta: ["anchor \u4FDD\u7559", "follow-up input"]
      },
      question: null,
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD", "1w-10w \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u7C7B\u4F3C\u8C03\u6027"],
        hint: "\u65B0\u7684\u8865\u5145\u4E0D\u4F1A\u8986\u76D6 URL \u951A\u70B9\u3002"
      },
      keywordFlow: {
        draft: "\u66F4\u504F\u6559\u7A0B\u7C7B\uFF0C\u4E0D\u8981\u5F00\u7BB1",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false,
        followup: true,
        placeholder: "\u7EE7\u7EED\u8865\u5145\u4F60\u771F\u6B63\u60F3\u8981\u7684\u65B9\u5411"
      }
    },
    "mixed-followup-refining": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u5E94\u7528\u8865\u5145\u8981\u6C42",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u6B63\u5728\u4FDD\u7559 URL \u951A\u70B9\u7684\u524D\u63D0\u4E0B\uFF0C\u91CD\u65B0\u89E3\u91CA\u5E76\u5E94\u7528\u4F60\u521A\u8865\u5145\u7684\u8981\u6C42\u3002"
      },
      session: {
        label: "task_summary",
        summary: "URL \u951A\u70B9\u4FDD\u7559\uFF0C\u65B0\u7684 follow-up \u6B63\u5728\u8FDB\u5165 refine\u3002",
        meta: ["anchor \u4FDD\u7559", "\u589E\u91CF refine", "\u4E0D\u4F1A\u8986\u76D6\u539F\u951A\u70B9"]
      },
      question: null,
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD", "1w-10w \u7C89\u4E1D", "\u8FD1 30 \u5929\u6D3B\u8DC3"],
        soft: ["\u7C7B\u4F3C\u8C03\u6027", "\u66F4\u504F\u6559\u7A0B\u7C7B", "\u4E0D\u8981\u5F00\u7BB1"],
        hint: "\u65B0\u7684 follow-up \u4F1A\u5148\u5F71\u54CD\u504F\u597D\u89E3\u91CA\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u4E0A\u5347\u4E3A\u786C\u6761\u4EF6\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false,
        followup: true,
        placeholder: "\u6B63\u5728\u5237\u65B0\uFF0C\u8BF7\u7A0D\u5019"
      }
    },
    "repair-invalid": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "URL \u65E0\u6CD5\u8BC6\u522B",
        stateClass: "warn",
        spinner: false,
        text: "\u672A\u8BC6\u522B\u5230\u53EF\u7528\u9891\u9053\u94FE\u63A5\u3002\u4F60\u53EF\u4EE5\u91CD\u65B0\u8D34\u94FE\u63A5\uFF0C\u6216\u6539\u4E3A\u9891\u9053\u540D / \u81EA\u7136\u8BED\u8A00\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u94FE\u63A5\u672A\u6620\u5C04\u5230\u6709\u6548\u9891\u9053\u8D44\u6E90\u3002",
        meta: ["\u91CD\u65B0\u8D34\u94FE\u63A5", "\u8F93\u5165\u9891\u9053\u540D", "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u60F3\u600E\u4E48\u7EE7\u7EED\u4FEE\u6B63\uFF1F",
        choices: ["\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5", "\u76F4\u63A5\u8F93\u5165\u9891\u9053\u540D", "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u641C\u7D22"],
        caption: "\u8FD9\u91CC\u53EA\u5904\u7406 URL \u4FEE\u6B63\u3002"
      },
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u4F60\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8865\u4E00\u53E5\u65B0\u7684\u641C\u7D22\u8981\u6C42"
      }
    },
    "repair-mismatch": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u5E73\u53F0\u4E0D\u5339\u914D",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u5728 YouTube \u9891\u9053\u641C\u7D22\u9875\uFF0C\u8BE5\u94FE\u63A5\u5C5E\u4E8E Instagram\u3002\u5EFA\u8BAE\u4F60\u5207\u6362\u5E73\u53F0\uFF0C\u6216\u5220\u9664\u94FE\u63A5\u540E\u76F4\u63A5\u63CF\u8FF0\u4F60\u60F3\u627E\u7684 YouTube \u9891\u9053\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u94FE\u63A5\u53EF\u8BC6\u522B\uFF0C\u4F46\u4E0E\u5F53\u524D\u641C\u7D22\u9875\u5E73\u53F0\u4E0D\u5339\u914D\u3002",
        meta: ["\u53EF\u4FEE\u6539 URL", "\u53EF\u5220\u9664\u94FE\u63A5\u6539\u4E3A\u81EA\u7136\u8BED\u8A00", "\u4E0D\u5EFA\u8BAE\u9759\u9ED8\u5FFD\u7565\u8BE5\u94FE\u63A5"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u66F4\u60F3\u600E\u4E48\u7EE7\u7EED\uFF1F",
        choices: ["\u5207\u5230 Instagram \u641C\u7D22", "\u5220\u6389\u94FE\u63A5\u7EE7\u7EED\u641C YouTube", "\u91CD\u65B0\u7C98\u8D34 YouTube \u9891\u9053\u94FE\u63A5"],
        caption: "\u4FEE\u6B63\u6001\u5E94\u8BE5\u77ED\u3001\u660E\u786E\uFF0C\u53EA\u5904\u7406\u5F53\u524D\u5361\u70B9\u3002"
      },
      conditions: {
        anchor: null,
        hard: ["\u5F53\u524D\u5E73\u53F0\uFF1AYouTube"],
        soft: ["\u7C7B\u4F3C\u98CE\u683C"],
        hint: "\u5E73\u53F0\u51B2\u7A81\u4F18\u5148\u4E8E\u98CE\u683C\u504F\u597D\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u6216\u76F4\u63A5\u8F93\u5165\u4F60\u60F3\u627E\u7684 YouTube \u9891\u9053\u8981\u6C42"
      }
    },
    "repair-unsupported": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u7C7B\u578B\u4E0D\u652F\u6301",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u4F7F\u7528\u8BE5\u7C7B\u94FE\u63A5\u8D77\u641C\uFF0C\u8BF7\u6539\u4E3A\u9891\u9053\u94FE\u63A5\u3001\u5173\u952E\u8BCD\u6216\u81EA\u7136\u8BED\u8A00\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u94FE\u63A5\u7ED3\u6784\u53EF\u8BC6\u522B\uFF0C\u4F46\u4E0D\u5C5E\u4E8E\u641C\u7D22\u6846\u5F53\u524D\u652F\u6301\u7684 URL \u7C7B\u578B\u3002",
        meta: ["\u53EF\u6539\u6210\u9891\u9053\u94FE\u63A5", "\u53EF\u5220\u6389\u94FE\u63A5", "\u53EF\u6539\u4E3A\u81EA\u7136\u8BED\u8A00"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u8981\u6362\u6210\u4EC0\u4E48\u65B9\u5F0F\u7EE7\u7EED\u641C\u7D22\uFF1F",
        choices: ["\u6539\u4E3A\u9891\u9053\u94FE\u63A5", "\u5220\u6389\u94FE\u63A5\u8F93\u5173\u952E\u8BCD", "\u76F4\u63A5\u63CF\u8FF0\u60F3\u627E\u4EC0\u4E48"],
        caption: "\u8FD9\u91CC\u53EA\u5904\u7406\u8F93\u5165\u7C7B\u578B\u4FEE\u6B63\u3002"
      },
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u76F4\u63A5\u63CF\u8FF0\u4F60\u60F3\u627E\u4EC0\u4E48\u4E5F\u53EF\u4EE5"
      }
    },
    "repair-empty": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u6709\u6761\u4EF6\u65E0\u7ED3\u679C",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u6761\u4EF6\u8FC7\u7A84\uFF0C\u7ED3\u679C\u4E3A\u7A7A\u3002\u7CFB\u7EDF\u5EFA\u8BAE\u4F60\u5148\u653E\u5BBD\u4E00\u4E2A\u6700\u5F71\u54CD\u7ED3\u679C\u7684\u6761\u4EF6\u3002"
      },
      session: {
        label: "\u5F53\u524D\u5361\u70B9",
        summary: "\u7CFB\u7EDF\u6CA1\u6709\u627E\u5230\u6EE1\u8DB3\u6240\u6709\u6761\u4EF6\u7684\u9891\u9053\u3002",
        meta: ["\u53EF\u653E\u5BBD\u7C89\u4E1D\u8303\u56F4", "\u53EF\u653E\u5BBD\u7C7B\u76EE", "\u53EF\u5220\u6389\u6D3B\u8DC3\u9650\u5236"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u60F3\u5148\u653E\u5BBD\u54EA\u4E00\u4E2A\u6761\u4EF6\uFF1F",
        choices: ["\u7C89\u4E1D\u8303\u56F4", "\u5185\u5BB9\u7C7B\u76EE", "\u8FD1\u671F\u6D3B\u8DC3"],
        caption: "\u4FEE\u6B63\u6001\u4E0D\u662F\u804A\u5929\uFF0C\u800C\u662F\u5E2E\u52A9\u4F60\u6062\u590D\u53EF\u641C\u72B6\u6001\u3002"
      },
      conditions: {
        anchor: null,
        hard: ["\u7F8E\u56FD", "\u6237\u5916 / \u6C34\u4E0A\u8FD0\u52A8", "5k-10k \u7C89\u4E1D", "\u8FD1\u671F\u6D3B\u8DC3"],
        soft: [],
        hint: "\u81F3\u5C11\u9700\u8981\u653E\u5BBD\u4E00\u9879\u786C\u6761\u4EF6\u624D\u80FD\u6062\u590D\u7ED3\u679C\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u8865\u4E00\u53E5\u653E\u5BBD\u6761\u4EF6\u7684\u8981\u6C42"
      }
    },
    "low-recall-repair-open": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: {
        state: "\u7ED3\u679C\u504F\u5C11\uFF0C\u5EFA\u8BAE\u4F18\u5316\u6761\u4EF6",
        stateClass: "warn",
        spinner: false,
        text: "\u5F53\u524D\u951A\u70B9\u9891\u9053\u4ECD\u4FDD\u7559\uFF0C\u5DF2\u6709\u5C11\u91CF\u76F8\u4F3C\u7ED3\u679C\u53EF\u770B\u3002\u4F60\u53EF\u4EE5\u624B\u52A8\u4F18\u5316\u53EC\u56DE\uFF0C\u800C\u4E0D\u662F\u88AB\u7CFB\u7EDF\u5F3A\u5236\u6253\u65AD\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u5F53\u524D\u5904\u4E8E low_recall \u4FEE\u6B63\u533A\uFF1A\u951A\u70B9\u9891\u9053\u4FDD\u7559\uFF0C\u7ED3\u679C\u4ECD\u53EF\u770B\uFF0C\u4F46\u5EFA\u8BAE\u6269\u5927\u53EC\u56DE\u8303\u56F4\u3002",
        meta: ["low_recall", "manual open", "non-blocking before open"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u60F3\u600E\u4E48\u4F18\u5316\u5F53\u524D\u53EC\u56DE\uFF1F",
        choices: ["\u66F4\u6362\u951A\u70B9\u9891\u9053", "\u6269\u5927\u53EC\u56DE\u8303\u56F4", "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u63CF\u8FF0"],
        caption: "\u8FD9\u662F\u624B\u52A8\u5C55\u5F00\u540E\u7684\u4FEE\u6B63\u533A\uFF0C\u4E0D\u4F1A\u5728 low_recall \u53D1\u751F\u65F6\u81EA\u52A8\u62A2\u7126\u70B9\u3002"
      },
      conditions: {
        anchor: "\u951A\u70B9\u9891\u9053\uFF1A@HollylandTech",
        hard: ["swim vest\uFF08\u6807\u7B7E\uFF09"],
        soft: ["\u5F53\u524D\u7ED3\u679C\u504F\u5C11", "\u53EF\u5C1D\u8BD5\u6269\u5927\u53EC\u56DE\u8303\u56F4"],
        hint: "\u6B64\u65F6\u7ED3\u679C\u4ECD\u7EE7\u7EED\u5C55\u793A\uFF0C\u53EA\u662F\u641C\u7D22\u6846\u8865\u5145\u4E86\u4FEE\u6B63\u80FD\u529B\u3002"
      },
      keywordFlow: {
        draft: "",
        tags: [
          { text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" },
          { text: "swim vest", scope: "\u6807\u7B7E" }
        ],
        openMenu: false,
        followup: true,
        placeholder: "\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8865\u4E00\u53E5\u4F60\u771F\u6B63\u60F3\u8981\u7684\u65B9\u5411"
      }
    },
    "repair-followup-draft": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u8BB0\u5F55\u4FEE\u6B63\u8981\u6C42",
        stateClass: "",
        spinner: false,
        text: "\u5F53\u524D\u5361\u70B9\u5DF2\u88AB\u8BC6\u522B\uFF0C\u4F60\u6B63\u5728\u8865\u4E00\u53E5\u4FEE\u6B63\u8981\u6C42\uFF0C\u7CFB\u7EDF\u4F1A\u636E\u6B64\u91CD\u65B0\u7EC4\u7EC7\u641C\u7D22\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u7CFB\u7EDF\u6B63\u5728\u4ECE\u4FEE\u6B63\u6001\u63A5\u6536\u4E00\u4E2A\u65B0\u7684 follow-up \u8F93\u5165\u3002",
        meta: ["repair input", "\u4E0D\u4F1A\u6062\u590D\u539F\u59CB query \u5168\u6587"]
      },
      question: {
        slot: "repair_options",
        title: "\u4F60\u4E5F\u53EF\u4EE5\u76F4\u63A5\u63CF\u8FF0\u60F3\u600E\u4E48\u4FEE\u6B63\u3002",
        choices: ["\u5220\u6389\u94FE\u63A5\u7EE7\u7EED\u641C", "\u76F4\u63A5\u8BF4\u60F3\u627E\u4EC0\u4E48", "\u6539\u4E3A\u5173\u952E\u8BCD\u641C\u7D22"],
        caption: "\u4FEE\u6B63\u6001\u652F\u6301\u70B9\u9009\uFF0C\u4E5F\u652F\u6301\u4E3B\u52A8\u8865\u4E00\u53E5\u3002"
      },
      conditions: null,
      keywordFlow: {
        draft: "\u90A3\u5C31\u76F4\u63A5\u5E2E\u6211\u627E\u7F8E\u56FD YouTube \u6237\u5916\u535A\u4E3B",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u76F4\u63A5\u8865\u4E00\u53E5\u4F60\u60F3\u600E\u4E48\u4FEE\u6B63"
      }
    },
    "repair-followup-refining": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u5E94\u7528\u4FEE\u6B63\u8981\u6C42",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u6B63\u5728\u628A\u4F60\u8865\u5145\u7684\u4FEE\u6B63\u8981\u6C42\u8F6C\u6210\u65B0\u7684\u53EF\u6267\u884C\u641C\u7D22\u6761\u4EF6\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u4FEE\u6B63\u6001\u8F93\u5165\u5DF2\u63D0\u4EA4\uFF0C\u5F53\u524D\u6B63\u5728\u5C1D\u8BD5\u6062\u590D\u7ED3\u679C\u3002",
        meta: ["repair refine", "\u53EF\u80FD\u6062\u590D\u7ED3\u679C", "\u4E5F\u53EF\u80FD\u7EE7\u7EED\u505C\u7559\u5728\u4FEE\u6B63\u6001"]
      },
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "",
        tags: [],
        openMenu: false,
        followup: true,
        placeholder: "\u6B63\u5728\u5237\u65B0\uFF0C\u8BF7\u7A0D\u5019"
      }
    },
    "upgrade-keyword-trigger": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "\u5E2E\u6211\u627E\u7F8E\u56FD\u5988\u5988\u535A\u4E3B",
        tags: [{ text: "swim vest", scope: "\u6807\u7B7E" }],
        openMenu: false
      }
    },
    "upgrade-keyword-transition": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u5347\u7EA7\u4E3A Agent \u6001",
        stateClass: "",
        spinner: true,
        text: "\u5DF2\u4FDD\u7559\u539F\u6709\u5173\u952E\u8BCD tag\uFF0C\u7CFB\u7EDF\u6B63\u5728\u628A\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u8F6C\u6210\u4EFB\u52A1\u89E3\u91CA\u4E0E\u6761\u4EF6\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u7ECF\u5178\u641C\u7D22\u5DF2\u5347\u7EA7\uFF1A\u5173\u952E\u8BCD\u4FDD\u6301\u4E0D\u53D8\uFF0C\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u5C06\u4F5C\u4E3A\u4EFB\u52A1\u589E\u91CF\u5904\u7406\u3002",
        meta: ["\u4FDD\u7559\u5173\u952E\u8BCD tag", "\u89E3\u6790\u65B0\u589E\u81EA\u7136\u8BED\u8A00", "\u8FDB\u5165 expanded_agent"]
      },
      question: null,
      conditions: {
        anchor: null,
        hard: ["swim vest\uFF08\u6807\u7B7E\uFF09"],
        soft: ["\u7F8E\u56FD\u5988\u5988\u535A\u4E3B"],
        hint: "\u5347\u7EA7\u4E2D\uFF0C\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u6682\u4F5C\u4E3A\u5F85\u89E3\u6790\u610F\u56FE\u3002"
      }
    },
    "upgrade-keyword-stable": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u5DF2\u5347\u7EA7\u5B8C\u6210",
        stateClass: "ok",
        spinner: false,
        text: "\u5173\u952E\u8BCD tag \u5DF2\u4FDD\u7559\u4E3A\u663E\u5F0F\u6761\u4EF6\uFF0C\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u5DF2\u8F6C\u6210\u4EFB\u52A1\u6458\u8981\u4E0E\u7ED3\u6784\u5316\u6761\u4EF6\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u6B63\u5728\u641C\u7D22\uFF1Aswim vest \u76F8\u5173\u9891\u9053 \xB7 \u7F8E\u56FD \xB7 \u5988\u5988\u535A\u4E3B",
        meta: ["\u5173\u952E\u8BCD\u4FDD\u7559", "\u81EA\u7136\u8BED\u8A00\u5DF2\u5438\u6536", "\u53EF\u7EE7\u7EED refine"]
      },
      question: null,
      conditions: {
        anchor: null,
        hard: ["swim vest\uFF08\u6807\u7B7E\uFF09", "\u7F8E\u56FD"],
        soft: ["\u5988\u5988\u535A\u4E3B"],
        hint: "\u7ECF\u5178\u5173\u952E\u8BCD\u5DF2\u53D8\u6210 Agent \u6001\u4E2D\u7684\u524D\u7F6E\u663E\u5F0F\u6761\u4EF6\u3002"
      }
    },
    "upgrade-url-trigger": {
      mode: "classic",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: null,
      status: null,
      session: null,
      question: null,
      conditions: null,
      keywordFlow: {
        draft: "\u627E\u548C\u5B83\u7C7B\u4F3C\u7684\u7F8E\u56FD\u9891\u9053",
        tags: [{ text: "@HollylandTech", scope: "\u9891\u9053", anchor: true, platform: "YouTube" }],
        openMenu: false
      }
    },
    "upgrade-url-transition": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u6B63\u5728\u89E3\u91CA URL \u4E0E\u81EA\u7136\u8BED\u8A00\u7684\u5173\u7CFB",
        stateClass: "",
        spinner: true,
        text: "\u7CFB\u7EDF\u6B63\u5728\u5224\u65AD URL \u662F\u5426\u7EE7\u7EED\u4F5C\u4E3A\u7CBE\u786E\u951A\u70B9\uFF0C\u4EE5\u53CA\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u5E94\u88AB\u5F53\u4F5C refine \u8FD8\u662F\u65B0\u7684\u641C\u7D22\u4EFB\u52A1\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u5DF2\u8BC6\u522B URL \u951A\u70B9\uFF1A@HollylandTech\uFF0C\u6B63\u5728\u89E3\u91CA\u201C\u627E\u548C\u5B83\u7C7B\u4F3C\u7684\u7F8E\u56FD\u9891\u9053\u201D\u8FD9\u53E5\u65B0\u8981\u6C42\u3002",
        meta: ["URL \u951A\u70B9\u4F18\u5148", "\u89E3\u91CA\u65B0\u589E\u81EA\u7136\u8BED\u8A00", "\u907F\u514D\u9759\u9ED8\u6539\u5199\u610F\u56FE"]
      },
      question: null,
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: [],
        soft: ["\u627E\u7C7B\u4F3C\u9891\u9053", "\u7F8E\u56FD"],
        hint: "\u5347\u7EA7\u4E2D\uFF0C\u7CFB\u7EDF\u8FD8\u672A\u51B3\u5B9A\u662F\u7EE7\u7EED\u770B\u8BE5\u9891\u9053\u8FD8\u662F\u8F6C\u4E3A\u627E\u7C7B\u4F3C\u9891\u9053\u3002"
      }
    },
    "upgrade-url-stable": {
      mode: "expanded",
      inputTitle: "",
      inputHint: "",
      miniAction: null,
      primaryAction: "\u641C\u7D22",
      status: {
        state: "\u951A\u70B9\u5347\u7EA7\u5B8C\u6210",
        stateClass: "ok",
        spinner: false,
        text: "URL \u4F5C\u4E3A anchor \u88AB\u4FDD\u7559\uFF0C\u65B0\u589E\u81EA\u7136\u8BED\u8A00\u5DF2\u88AB\u89E3\u91CA\u4E3A refine \u8981\u6C42\uFF0C\u800C\u4E0D\u662F\u9759\u9ED8\u8986\u76D6\u539F\u6709\u7CBE\u786E\u8BED\u4E49\u3002"
      },
      session: {
        label: "task_summary",
        summary: "\u5F53\u524D\u6309 @HollylandTech \u4F5C\u4E3A\u951A\u70B9\uFF0C\u5E76\u5F00\u59CB\u641C\u7D22\u201C\u7C7B\u4F3C\u8C03\u6027 + \u7F8E\u56FD\u201D\u7684\u9891\u9053\u3002",
        meta: ["URL \u4FDD\u7559\u4E3A anchor", "\u65B0\u589E\u8981\u6C42\u5DF2\u89E3\u91CA", "\u5FC5\u8981\u65F6\u53EF\u7EE7\u7EED\u8FFD\u95EE"]
      },
      question: {
        slot: "question",
        title: "\u4F60\u662F\u60F3\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053\uFF0C\u8FD8\u662F\u60F3\u4EE5\u5B83\u4E3A\u53C2\u8003\u627E\u65B0\u7684\u9891\u9053\uFF1F",
        choices: ["\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053", "\u627E\u65B0\u7684\u7C7B\u4F3C\u9891\u9053"],
        caption: "URL \u8D77\u624B\u5347\u7EA7\u65F6\uFF0C\u5FC5\u987B\u5148\u5904\u7406\u951A\u70B9\u8BED\u4E49\u3002"
      },
      conditions: {
        anchor: "URL \u951A\u70B9\uFF1A@HollylandTech",
        hard: ["\u7F8E\u56FD"],
        soft: ["\u7C7B\u4F3C\u8C03\u6027"],
        hint: "URL \u7CBE\u786E\u8BED\u4E49\u4F18\u5148\u4E8E\u8F6F\u504F\u597D\u3002"
      }
    }
  };
  var INITIAL_FIXTURE_ID = "keyword-empty";
  var INITIAL_VARIANT = "glass";
  var sceneMap = {
    keyword: [
      { id: "keyword-empty", label: "\u521D\u59CB\u7A7A\u767D\u6001" },
      { id: "keyword-input", label: "\u8F93\u5165\u6001" },
      { id: "keyword-tag", label: "\u5B8C\u6210\u6001" },
      { id: "keyword-edit", label: "\u7F16\u8F91\u5DF2\u6709\u5173\u952E\u8BCD" },
      { id: "keyword-multi", label: "\u591A\u5173\u952E\u8BCD" },
      { id: "keyword-anchor-seed", label: "\u5173\u952E\u8BCD+URL\u79CD\u5B50" },
      { id: "keyword-menu", label: "\u5339\u914D\u76EE\u6807" }
    ],
    url: [
      { id: "url-resolving", label: "\u8BC6\u522B\u4E2D" },
      { id: "url-exact", label: "\u951A\u70B9\u641C\u7D22\u5C31\u7EEA" },
      { id: "url-keyword-seed", label: "URL+\u5173\u952E\u8BCD\u79CD\u5B50" },
      { id: "url-low-recall-hint", label: "\u4F4E\u53EC\u56DE\u63D0\u793A\u6001" },
      { id: "low-recall-repair-open", label: "\u4F4E\u53EC\u56DE\u4FEE\u6B63\u5C55\u5F00\u6001" },
      { id: "url-mismatch", label: "\u5E73\u53F0\u4E0D\u5339\u914D" },
      { id: "url-unsupported", label: "\u7C7B\u578B\u4E0D\u652F\u6301" },
      { id: "url-invalid", label: "\u65E0\u6CD5\u8BC6\u522B" }
    ],
    natural: [
      { id: "natural-init", label: "\u521A\u5C55\u5F00" },
      { id: "natural-retrieving", label: "\u9996\u8F6E\u641C\u7D22\u4E2D" },
      { id: "natural-results", label: "\u9996\u8F6E\u7ED3\u679C\u5DF2\u8FD4\u56DE" },
      { id: "natural-clarifying", label: "\u8FFD\u95EE\u6001" },
      { id: "natural-followup-draft", label: "\u4E3B\u52A8\u8865\u5145\u8F93\u5165\u4E2D" },
      { id: "natural-followup-refining", label: "\u8865\u5145\u540E\u5237\u65B0\u4E2D" }
    ],
    mixed: [
      { id: "mixed-parse", label: "\u89E3\u6790\u6458\u8981\u6001" },
      { id: "mixed-anchor", label: "\u951A\u70B9\u4F18\u5148\u6001" },
      { id: "mixed-soft", label: "\u8F6F\u6761\u4EF6\u5F85\u6F84\u6E05\u6001" },
      { id: "mixed-clarifying", label: "\u8FFD\u95EE\u6001" },
      { id: "mixed-followup-draft", label: "\u4E3B\u52A8\u8865\u5145\u8F93\u5165\u4E2D" },
      { id: "mixed-followup-refining", label: "\u8865\u5145\u540E\u5237\u65B0\u4E2D" }
    ],
    repair: [
      { id: "repair-invalid", label: "URL \u65E0\u6CD5\u8BC6\u522B" },
      { id: "repair-mismatch", label: "\u5E73\u53F0\u4E0D\u5339\u914D" },
      { id: "repair-unsupported", label: "\u7C7B\u578B\u4E0D\u652F\u6301" },
      { id: "repair-empty", label: "\u6709\u6761\u4EF6\u65E0\u7ED3\u679C" },
      { id: "repair-followup-draft", label: "\u4E3B\u52A8\u8865\u5145\u8F93\u5165\u4E2D" },
      { id: "repair-followup-refining", label: "\u4FEE\u6B63\u540E\u5237\u65B0\u4E2D" }
    ],
    upgrade: [
      { id: "upgrade-keyword-trigger", label: "\u5173\u952E\u8BCD\u8D77\u624B-\u89E6\u53D1\u524D" },
      { id: "upgrade-keyword-transition", label: "\u5173\u952E\u8BCD\u8D77\u624B-\u5347\u7EA7\u4E2D" },
      { id: "upgrade-keyword-stable", label: "\u5173\u952E\u8BCD\u8D77\u624B-\u5347\u7EA7\u7A33\u5B9A" },
      { id: "upgrade-url-trigger", label: "URL \u8D77\u624B-\u89E6\u53D1\u524D" },
      { id: "upgrade-url-transition", label: "URL \u8D77\u624B-\u5347\u7EA7\u4E2D" },
      { id: "upgrade-url-stable", label: "URL \u8D77\u624B-\u5347\u7EA7\u7A33\u5B9A" }
    ]
  };
  var KEYWORD_EXPANSION_ACTION_IDS = {
    open: "A_OPEN_KEYWORD_EXPANSION",
    applyOne: "A_APPLY_EXPANDED_KEYWORD",
    applyMany: "A_APPLY_EXPANDED_KEYWORDS",
    dismiss: "A_DISMISS_KEYWORD_EXPANSION"
  };
  var keywordExpansionPresets = {
    "keyword-multi": {
      reason: "proactive",
      title: "\u57FA\u4E8E\u73B0\u6709\u5173\u952E\u8BCD\u8865\u66F4\u591A\u663E\u5F0F keyword",
      caption: "\u6F14\u793A\uFF1A\u5728\u7ECF\u5178\u7F16\u8F91\u6001\u91CC\u5148\u8865\u8BCD\uFF0C\u4E0D\u81EA\u52A8\u89E6\u53D1\u641C\u7D22\u3002",
      sourceKeywords: ["swim vest", "water sports"],
      candidates: ["life vest", "watersports gear", "boating safety"]
    },
    "url-keyword-seed": {
      reason: "proactive",
      title: "URL + keyword \u79CD\u5B50\u4E5F\u53EF\u4EE5\u7EE7\u7EED\u6269\u8BCD",
      caption: "\u6F14\u793A\uFF1Aanchor \u4FDD\u7559\uFF0C\u6269\u51FA\u6765\u7684\u65B0\u8BCD\u4ECD\u7136\u53EA\u662F\u666E\u901A keyword\u3002",
      sourceKeywords: ["swim vest", "water sports"],
      candidates: ["kayak vest", "pfd gear", "marine safety"]
    },
    "upgrade-keyword-stable": {
      reason: "proactive",
      title: "\u5347\u7EA7\u5230 Agent \u7A33\u5B9A\u6001\u540E\u4ECD\u53EF\u4E3B\u52A8\u6269\u8BCD",
      caption: "\u6F14\u793A\uFF1A\u6269\u8BCD\u7ED3\u679C\u786E\u8BA4\u540E\u4F1A\u81EA\u52A8\u89E6\u53D1\u4E00\u6B21 refine\u3002",
      sourceKeywords: ["swim vest"],
      candidates: ["learn to swim", "family water sports", "pool safety"]
    },
    "low-recall-repair-open": {
      reason: "low_recall_repair",
      title: "low_recall \u65F6\u628A\u6269\u8BCD\u4F5C\u4E3A\u4FEE\u6B63\u52A8\u4F5C\u590D\u7528",
      caption: "\u6F14\u793A\uFF1A\u7ED3\u679C\u504F\u5C11\u65F6\uFF0C\u7528\u6237\u53EF\u76F4\u63A5\u8865\u66F4\u591A\u663E\u5F0F\u5173\u952E\u8BCD\u6765\u653E\u5BBD\u53EC\u56DE\u3002",
      sourceKeywords: ["swim vest"],
      candidates: ["life jacket", "watersports", "boating"]
    }
  };
  var keywordExpansionUiState = /* @__PURE__ */ new Map();
  var abstractSubstateMeta = {
    classic_editing: {
      title: "\u7ECF\u5178\u79CD\u5B50\u7F16\u8F91",
      summary: "\u7528\u6237\u8FD8\u5728\u7EC4\u7EC7\u5173\u952E\u8BCD / URL \u79CD\u5B50\uFF0C\u5C1A\u672A\u8FDB\u5165 Agent \u68C0\u7D22\u95ED\u73AF\u3002",
      speakingHint: "\u5148\u8BB2\u5F53\u524D\u8F93\u5165\u6750\u6599\u5982\u4F55\u7EC4\u6210\u9996\u8F6E\u641C\u7D22 seed\uFF0C\u518D\u8BB2\u5B83\u4F1A\u5BFC\u5411\u54EA\u7C7B\u641C\u7D22\u3002",
      actionGroups: ["seed_editing", "keyword_expansion", "search_submission", "upgrade_entry"],
      canonicalActionIds: []
    },
    url_resolving: {
      title: "URL \u8BC6\u522B\u4E2D",
      summary: "\u7EAF URL \u5DF2\u63D0\u4EA4\uFF0C\u7CFB\u7EDF\u6B63\u5728\u5C1D\u8BD5\u5F62\u6210\u53EF\u9501\u5B9A\u7684 anchor\u3002",
      speakingHint: "\u8FD9\u91CC\u91CD\u70B9\u89E3\u91CA URL \u8BC6\u522B\u6210\u529F\u3001\u5931\u8D25\u4E0E\u4FEE\u6B63\u5165\u53E3\u7684\u5206\u53C9\u3002",
      actionGroups: ["resolve_success", "resolve_failure", "rewrite_or_remove_url"],
      canonicalActionIds: []
    },
    classic_results: {
      title: "\u7ECF\u5178\u7ED3\u679C\u7A33\u5B9A\u6001",
      summary: "\u7ED3\u679C\u5DF2\u7ECF\u53EF\u6D4F\u89C8\uFF0C\u4F46\u4EA4\u4E92\u4ECD\u4EE5\u7ECF\u5178\u641C\u7D22\u4E3A\u4E3B\uFF0C\u8FD8\u6CA1\u6709\u8FDB\u5165 Agent \u89E3\u91CA\u6D41\u3002",
      speakingHint: "\u8FD9\u91CC\u9002\u5408\u8BB2\u951A\u70B9\u9891\u9053\u7F6E\u9876\u3001\u76F8\u4F3C\u7ED3\u679C\u53EC\u56DE\uFF0C\u4EE5\u53CA low_recall \u8F7B\u63D0\u793A\u3002",
      actionGroups: ["browse_results", "append_seed", "keyword_expansion", "upgrade_to_agent", "low_recall_hint"],
      canonicalActionIds: ["A_HINT_OPEN_REPAIR_LOW_RECALL", "A_HINT_DISMISS_LOW_RECALL"]
    },
    agent_retrieving: {
      title: "Agent \u68C0\u7D22\u8FDB\u884C\u4E2D",
      summary: "Agent \u6B63\u5728\u89E3\u6790\u3001\u9996\u8F6E\u68C0\u7D22\uFF0C\u6216\u6839\u636E\u8FFD\u95EE / \u4FEE\u6B63\u8FDB\u884C\u5237\u65B0\u3002",
      speakingHint: "\u8FD9\u91CC\u5F3A\u8C03\u7CFB\u7EDF\u8FD8\u5728\u5904\u7406\uFF0C\u4E0D\u5EFA\u8BAE\u628A\u5B83\u8BB2\u6210\u7A33\u5B9A\u7ED3\u679C\u6001\u3002",
      actionGroups: ["await_result", "clarify_if_needed", "enter_repair_if_needed"],
      canonicalActionIds: []
    },
    agent_stable: {
      title: "Agent \u7A33\u5B9A\u6001",
      summary: "Agent \u5DF2\u8FDB\u5165\u53EF\u6D4F\u89C8\u3001\u53EF\u7EE7\u7EED\u8865\u5145\u7684\u7A33\u5B9A\u533A\uFF0C\u7528\u6237\u53EF\u4EE5\u7EE7\u7EED refine\u3002",
      speakingHint: "\u6F14\u793A\u65F6\u5148\u8BB2\u5F53\u524D\u7ED3\u679C\u7ED3\u6784\uFF0C\u518D\u8BB2\u540E\u7EED follow-up \u6216\u8865\u6761\u4EF6\u7684\u5165\u53E3\u3002",
      actionGroups: ["followup_entry", "append_explicit_condition", "keyword_expansion", "replace_anchor", "open_repair_entry"],
      canonicalActionIds: ["A_HINT_OPEN_REPAIR_LOW_RECALL", "A_HINT_DISMISS_LOW_RECALL"]
    },
    agent_clarifying: {
      title: "Agent \u5F85\u6F84\u6E05\u6001",
      summary: "\u7CFB\u7EDF\u5DF2\u7ECF\u660E\u786E\u63D0\u51FA\u4E00\u4E2A\u9AD8\u4EF7\u503C\u95EE\u9898\uFF0C\u5F53\u524D\u91CD\u70B9\u662F\u7B49\u5F85\u7528\u6237\u56DE\u7B54\u3002",
      speakingHint: "\u8FD9\u91CC\u8981\u628A\u201C\u7CFB\u7EDF\u5728\u95EE\u95EE\u9898\u201D\u548C\u201C\u7528\u6237\u4E3B\u52A8\u8865\u5145\u201D\u8BB2\u6E05\u695A\u3002",
      actionGroups: ["answer_question", "skip_to_followup", "rewrite_input"],
      canonicalActionIds: []
    },
    repairing: {
      title: "\u4FEE\u6B63\u8FDB\u884C\u6001",
      summary: "\u641C\u7D22\u6846\u5185\u90E8\u4FEE\u6B63\u5DF2\u7ECF\u6253\u5F00\uFF0C\u9700\u8981\u5148\u4FEE\u6B63 URL / \u6761\u4EF6 / \u53EC\u56DE\u8303\u56F4\uFF0C\u518D\u7EE7\u7EED\u641C\u7D22\u3002",
      speakingHint: "\u8FD9\u91CC\u9002\u5408\u6F14\u793A\u4FEE\u6B63\u52A8\u4F5C\u69FD\u4F4D\uFF0C\u4EE5\u53CA\u4E0D\u540C\u4FEE\u6B63\u52A8\u4F5C\u7684\u540E\u7EED\u8DEF\u5F84\u3002",
      actionGroups: ["fix_url", "remove_anchor_keep_keywords", "switch_to_nl", "replace_anchor", "expand_recall_scope", "keyword_expansion"],
      canonicalActionIds: [
        "A_REPAIR_FIX_URL",
        "A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS",
        "A_REPAIR_SWITCH_TO_NL",
        "A_REPAIR_REPLACE_ANCHOR",
        "A_REPAIR_EXPAND_RECALL_SCOPE"
      ]
    }
  };
  var fixtureAbstractSubstateMap = {
    "keyword-empty": "classic_editing",
    "keyword-input": "classic_editing",
    "keyword-tag": "classic_editing",
    "keyword-edit": "classic_editing",
    "keyword-multi": "classic_editing",
    "keyword-anchor-seed": "classic_editing",
    "keyword-menu": "classic_editing",
    "url-resolving": "url_resolving",
    "url-exact": "classic_results",
    "url-keyword-seed": "classic_editing",
    "url-low-recall-hint": "classic_results",
    "low-recall-repair-open": "repairing",
    "url-mismatch": "repairing",
    "url-unsupported": "repairing",
    "url-invalid": "repairing",
    "natural-init": "agent_stable",
    "natural-retrieving": "agent_retrieving",
    "natural-results": "agent_stable",
    "natural-clarifying": "agent_clarifying",
    "natural-followup-draft": "agent_stable",
    "natural-followup-refining": "agent_retrieving",
    "mixed-parse": "agent_stable",
    "mixed-anchor": "agent_stable",
    "mixed-soft": "agent_stable",
    "mixed-clarifying": "agent_clarifying",
    "mixed-followup-draft": "agent_stable",
    "mixed-followup-refining": "agent_retrieving",
    "repair-invalid": "repairing",
    "repair-mismatch": "repairing",
    "repair-unsupported": "repairing",
    "repair-empty": "repairing",
    "repair-followup-draft": "repairing",
    "repair-followup-refining": "agent_retrieving",
    "upgrade-keyword-trigger": "classic_editing",
    "upgrade-keyword-transition": "agent_retrieving",
    "upgrade-keyword-stable": "agent_stable",
    "upgrade-url-trigger": "classic_editing",
    "upgrade-url-transition": "agent_retrieving",
    "upgrade-url-stable": "agent_stable"
  };
  var shellTargets = {
    balanced: document.getElementById("balanced-shell"),
    glass: document.getElementById("glass-shell"),
    neon: document.getElementById("neon-shell"),
    querychip: document.getElementById("querychip-shell"),
    workbench: document.getElementById("workbench-shell"),
    assistant: document.getElementById("assistant-shell")
  };
  var stateNodeMap = {
    "keyword-empty": ["empty_input", "compact_classic", "idle"],
    "keyword-input": ["draft_keyword", "compact_classic", "idle"],
    "keyword-tag": ["committed_keyword", "compact_classic", "idle"],
    "keyword-edit": ["draft_keyword", "committed_keyword", "compact_classic", "idle"],
    "keyword-multi": ["committed_keyword", "compact_classic", "idle"],
    "keyword-anchor-seed": ["draft_keyword", "committed_keyword", "committed_anchor", "compact_classic", "idle"],
    "keyword-menu": ["committed_keyword", "compact_classic", "idle"],
    "url-resolving": ["compact_resolving"],
    "url-exact": ["committed_anchor", "return-state"],
    "url-keyword-seed": ["draft_keyword", "committed_keyword", "committed_anchor", "compact_classic", "idle"],
    "url-low-recall-hint": ["committed_anchor", "return-state"],
    "url-mismatch": ["expanded_repair"],
    "url-unsupported": ["expanded_repair"],
    "url-invalid": ["expanded_repair"],
    "natural-init": ["expanded_agent"],
    "natural-retrieving": ["expanded_agent", "retrieving"],
    "natural-results": ["results_ready", "followup_waiting"],
    "natural-clarifying": ["expanded_clarifying", "clarifying", "followup_waiting"],
    "natural-followup-draft": ["expanded_agent", "results_ready", "draft_followup"],
    "natural-followup-refining": ["expanded_agent", "refining", "followup_waiting"],
    "mixed-parse": ["expanded_agent"],
    "mixed-anchor": ["expanded_agent", "committed_anchor", "followup_waiting"],
    "mixed-soft": ["expanded_agent", "committed_anchor", "followup_waiting"],
    "mixed-clarifying": ["expanded_agent", "committed_anchor", "clarifying", "followup_waiting"],
    "mixed-followup-draft": ["expanded_agent", "committed_anchor", "results_ready", "draft_followup"],
    "mixed-followup-refining": ["expanded_agent", "committed_anchor", "refining", "followup_waiting"],
    "repair-invalid": ["expanded_repair", "followup_waiting"],
    "repair-mismatch": ["expanded_repair", "followup_waiting"],
    "repair-unsupported": ["expanded_repair", "followup_waiting"],
    "repair-empty": ["empty_repair", "followup_waiting"],
    "low-recall-repair-open": ["expanded_repair", "committed_anchor", "return-state"],
    "repair-followup-draft": ["expanded_repair", "empty_repair", "draft_followup"],
    "repair-followup-refining": ["expanded_repair", "refining", "followup_waiting"],
    "upgrade-keyword-trigger": ["draft_keyword", "compact_classic", "idle"],
    "upgrade-keyword-transition": ["expanded_agent", "retrieving", "committed_keyword"],
    "upgrade-keyword-stable": ["expanded_agent", "results_ready", "committed_keyword", "followup_waiting"],
    "upgrade-url-trigger": ["compact_classic", "committed_anchor"],
    "upgrade-url-transition": ["expanded_agent", "retrieving", "committed_anchor"],
    "upgrade-url-stable": ["expanded_agent", "clarifying", "committed_anchor", "followup_waiting"]
  };
  var stateTriples = {
    "keyword-empty": { input: "empty_input", container: "compact_classic", session: "idle" },
    "keyword-input": { input: "draft_keyword", container: "compact_classic", session: "idle" },
    "keyword-tag": { input: "committed_keyword", container: "compact_classic", session: "idle" },
    "keyword-edit": { input: "editing_keyword", container: "compact_classic", session: "idle" },
    "keyword-multi": { input: "draft_keyword + committed_keyword", container: "compact_classic", session: "idle" },
    "keyword-anchor-seed": { input: "committed_keyword + committed_anchor + committed_keyword + draft_keyword", container: "compact_classic", session: "idle" },
    "keyword-menu": { input: "committed_keyword", container: "compact_classic", session: "idle" },
    "url-resolving": { input: "draft_keyword", container: "compact_resolving", session: "retrieving" },
    "url-exact": { input: "committed_anchor", container: "compact_classic", session: "results_ready" },
    "url-keyword-seed": { input: "committed_anchor + committed_keyword + committed_keyword + draft_keyword", container: "compact_classic", session: "idle" },
    "url-low-recall-hint": { input: "committed_anchor", container: "compact_classic", session: "results_ready" },
    "url-mismatch": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
    "url-unsupported": { input: "followup_waiting", container: "expanded_repair", session: "unsupported" },
    "url-invalid": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
    "natural-init": { input: "draft_keyword", container: "expanded_agent", session: "idle" },
    "natural-retrieving": { input: "draft_keyword", container: "expanded_agent", session: "retrieving" },
    "natural-results": { input: "followup_waiting", container: "expanded_agent", session: "results_ready" },
    "natural-clarifying": { input: "followup_waiting", container: "expanded_clarifying", session: "clarifying" },
    "natural-followup-draft": { input: "draft_followup", container: "expanded_agent", session: "results_ready" },
    "natural-followup-refining": { input: "followup_waiting", container: "expanded_agent", session: "refining" },
    "mixed-parse": { input: "draft_keyword + committed_anchor", container: "expanded_agent", session: "retrieving" },
    "mixed-anchor": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "results_ready" },
    "mixed-soft": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "results_ready" },
    "mixed-clarifying": { input: "committed_anchor + followup_waiting", container: "expanded_clarifying", session: "clarifying" },
    "mixed-followup-draft": { input: "committed_anchor + draft_followup", container: "expanded_agent", session: "results_ready" },
    "mixed-followup-refining": { input: "committed_anchor + followup_waiting", container: "expanded_agent", session: "refining" },
    "repair-invalid": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
    "repair-mismatch": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
    "repair-unsupported": { input: "followup_waiting", container: "expanded_repair", session: "unsupported" },
    "repair-empty": { input: "followup_waiting", container: "expanded_repair", session: "empty_repair" },
    "low-recall-repair-open": { input: "committed_anchor + followup_waiting", container: "expanded_repair", session: "results_ready" },
    "repair-followup-draft": { input: "draft_followup", container: "expanded_repair", session: "empty_repair" },
    "repair-followup-refining": { input: "followup_waiting", container: "expanded_repair", session: "refining" },
    "upgrade-keyword-trigger": { input: "draft_keyword + committed_keyword", container: "compact_classic", session: "idle" },
    "upgrade-keyword-transition": { input: "draft_keyword + committed_keyword", container: "expanded_agent", session: "retrieving" },
    "upgrade-keyword-stable": { input: "committed_keyword + followup_waiting", container: "expanded_agent", session: "results_ready" },
    "upgrade-url-trigger": { input: "committed_anchor + draft_keyword", container: "compact_classic", session: "results_ready" },
    "upgrade-url-transition": { input: "committed_anchor + draft_keyword", container: "expanded_agent", session: "retrieving" },
    "upgrade-url-stable": { input: "committed_anchor + followup_waiting", container: "expanded_clarifying", session: "clarifying" }
  };
  var stateActions = {
    "keyword-empty": [
      { label: "\u5F00\u59CB\u8F93\u5165\u5173\u952E\u8BCD", target: "keyword-input" },
      { label: "\u76F4\u63A5\u7C98\u8D34 URL", target: "url-resolving" },
      { label: "\u76F4\u63A5\u63CF\u8FF0\u9700\u6C42\uFF0C\u8FDB\u5165\u81EA\u7136\u8BED\u8A00\u573A\u666F", target: "natural-init" }
    ],
    "keyword-input": [
      { label: "\u6309\u56DE\u8F66\u56FA\u5316\u4E3A\u5173\u952E\u8BCD tag", target: "keyword-tag" },
      { label: "\u6E05\u7A7A\u8F93\u5165\uFF0C\u56DE\u5230\u521D\u59CB\u7A7A\u767D\u6001", target: "keyword-empty" },
      { label: "\u7EE7\u7EED\u8865\u81EA\u7136\u8BED\u8A00\uFF0C\u5347\u7EA7\u4E3A Agent \u6001", target: "upgrade-keyword-trigger" }
    ],
    "keyword-tag": [
      { label: "\u7F16\u8F91\u5F53\u524D\u5173\u952E\u8BCD", target: "keyword-edit" },
      { label: "\u5220\u9664\u6700\u540E\u4E00\u4E2A\u5173\u952E\u8BCD", target: "keyword-empty" },
      { label: "\u7EE7\u7EED\u8F93\u5165\u7B2C\u4E8C\u4E2A\u5173\u952E\u8BCD", target: "keyword-multi" },
      { label: "\u6253\u5F00\u5339\u914D\u76EE\u6807\u83DC\u5355", target: "keyword-menu" },
      { label: "\u8FFD\u52A0\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7", target: "upgrade-keyword-trigger" }
    ],
    "keyword-edit": [
      { label: "\u63D0\u4EA4\u7F16\u8F91\u7ED3\u679C", target: "keyword-tag" },
      { label: "\u53D6\u6D88\u7F16\u8F91\uFF0C\u6062\u590D\u539F\u5173\u952E\u8BCD", target: "keyword-tag" },
      { label: "\u6E05\u7A7A\u5E76\u5220\u9664\u8BE5\u5173\u952E\u8BCD", target: "keyword-empty" }
    ],
    "keyword-multi": [
      { label: "\u6E05\u7A7A\u5F53\u524D\u8F93\u5165\uFF0C\u56DE\u5230\u5355\u5173\u952E\u8BCD\u6001", target: "keyword-tag" },
      { label: "\u56FA\u5316\u5F53\u524D\u7B2C\u4E8C\u4E2A\u5173\u952E\u8BCD", target: "keyword-menu" },
      { label: "\u63D2\u5165\u4E00\u4E2A URL \u951A\u70B9\u5E76\u7EE7\u7EED\u8F93\u5165", target: "keyword-anchor-seed" },
      { label: "\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7", target: "upgrade-keyword-trigger" }
    ],
    "keyword-anchor-seed": [
      { label: "\u7EE7\u7EED\u8F93\u5165\u4E0B\u4E00\u4E2A\u5173\u952E\u8BCD", target: "keyword-anchor-seed" },
      { label: "\u5220\u9664 URL \u951A\u70B9\uFF0C\u56DE\u5230\u591A\u5173\u952E\u8BCD\u6001", target: "keyword-multi" },
      { label: "\u89E6\u53D1\u641C\u7D22\uFF0C\u8FDB\u5165\u89E3\u6790\u6458\u8981\u6001", target: "mixed-parse" },
      { label: "\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7", target: "upgrade-url-trigger" }
    ],
    "keyword-menu": [
      { label: "\u5173\u95ED\u83DC\u5355", target: "keyword-tag" },
      { label: "\u5207\u6362\u5339\u914D\u76EE\u6807", target: "keyword-tag" },
      { label: "\u8F6C\u4E3A\u6392\u9664\u5173\u952E\u8BCD", target: "keyword-menu" },
      { label: "\u5347\u7EA7\u4E3A Agent \u6001", target: "upgrade-keyword-trigger" }
    ],
    "url-resolving": [
      { label: "\u8BC6\u522B\u6210\u529F", target: "url-exact" },
      { label: "\u5E73\u53F0\u4E0D\u5339\u914D", target: "url-mismatch" },
      { label: "\u7C7B\u578B\u4E0D\u652F\u6301", target: "url-unsupported" },
      { label: "\u65E0\u6CD5\u8BC6\u522B", target: "url-invalid" }
    ],
    "url-exact": [
      { label: "\u7EE7\u7EED\u6D4F\u89C8\u76F8\u4F3C\u9891\u9053\u7ED3\u679C", target: "url-exact" },
      { label: "\u53EA\u67E5\u770B\u951A\u70B9\u9891\u9053", target: "url-exact" },
      { label: "\u8FFD\u52A0\u5173\u952E\u8BCD\u5F62\u6210 URL+\u5173\u952E\u8BCD\u79CD\u5B50", target: "url-keyword-seed" },
      { actionId: "A_HINT_OPEN_REPAIR_LOW_RECALL", label: "\u6A21\u62DF\u4F4E\u53EC\u56DE\u63D0\u793A", target: "url-low-recall-hint" },
      { label: "\u5220\u9664\u9891\u9053\u951A\u70B9\uFF0C\u56DE\u5230\u521D\u59CB\u7A7A\u767D\u6001", target: "keyword-empty" },
      { label: "\u8865\u5145\u81EA\u7136\u8BED\u8A00\uFF0C\u5347\u7EA7\u4E3A Agent \u6001", target: "upgrade-url-trigger" }
    ],
    "url-keyword-seed": [
      { label: "\u7EE7\u7EED\u8F93\u5165\u4E0B\u4E00\u4E2A\u5173\u952E\u8BCD", target: "url-keyword-seed" },
      { label: "\u5220\u9664 URL \u951A\u70B9\uFF0C\u56DE\u5230\u591A\u5173\u952E\u8BCD\u6001", target: "keyword-multi" },
      { label: "\u89E6\u53D1\u641C\u7D22\uFF0C\u8FDB\u5165\u89E3\u6790\u6458\u8981\u6001", target: "mixed-parse" },
      { label: "\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7", target: "upgrade-url-trigger" }
    ],
    "url-low-recall-hint": [
      { actionId: "A_HINT_OPEN_REPAIR_LOW_RECALL", label: "\u624B\u52A8\u5C55\u5F00\u4FEE\u6B63\u533A", target: "low-recall-repair-open" },
      { actionId: "A_HINT_DISMISS_LOW_RECALL", label: "\u7EE7\u7EED\u6D4F\u89C8\u5F53\u524D\u7ED3\u679C", target: "url-exact" }
    ],
    "url-mismatch": [
      { label: "\u5220\u9664\u94FE\u63A5\uFF0C\u56DE\u5230\u5173\u952E\u8BCD\u6001", target: "keyword-input" },
      { label: "\u91CD\u65B0\u8D34\u53EF\u7528 URL", target: "url-resolving" }
    ],
    "url-unsupported": [
      { label: "\u6539\u4E3A\u5173\u952E\u8BCD", target: "keyword-input" },
      { label: "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00", target: "natural-init" }
    ],
    "url-invalid": [
      { label: "\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5", target: "url-resolving" },
      { label: "\u6539\u4E3A\u9891\u9053\u540D", target: "keyword-input" }
    ],
    "natural-init": [
      { label: "\u5F00\u59CB\u9996\u8F6E\u641C\u7D22", target: "natural-retrieving" }
    ],
    "natural-retrieving": [
      { label: "\u9996\u8F6E\u7ED3\u679C\u8FD4\u56DE", target: "natural-results" },
      { label: "\u4ECD\u65E0\u7ED3\u679C\uFF0C\u8FDB\u5165\u4FEE\u6B63\u6001", target: "repair-empty" }
    ],
    "natural-results": [
      { label: "\u63D0\u51FA\u4E00\u4E2A\u9AD8\u4EF7\u503C\u8FFD\u95EE", target: "natural-clarifying" },
      { label: "\u7EE7\u7EED\u7A33\u5B9A\u6D4F\u89C8", target: "natural-results" },
      { label: "\u7528\u81EA\u7136\u8BED\u8A00\u4E3B\u52A8\u8865\u5145", target: "natural-followup-draft" }
    ],
    "natural-clarifying": [
      { label: "\u56DE\u7B54\u8FFD\u95EE\u5E76\u5237\u65B0", target: "natural-results" },
      { label: "\u56DE\u7B54\u540E\u4ECD\u65E0\u7ED3\u679C", target: "repair-empty" },
      { label: "\u8DF3\u8FC7\u70B9\u9009\uFF0C\u76F4\u63A5\u8865\u4E00\u53E5", target: "natural-followup-draft" }
    ],
    "natural-followup-draft": [
      { label: "\u63D0\u4EA4\u8865\u5145\u5E76\u5237\u65B0", target: "natural-followup-refining" },
      { label: "\u653E\u5F03\u8865\u5145\uFF0C\u56DE\u5230\u7A33\u5B9A\u7ED3\u679C", target: "natural-results" }
    ],
    "natural-followup-refining": [
      { label: "\u5237\u65B0\u540E\u7ED3\u679C\u7A33\u5B9A", target: "natural-results" },
      { label: "\u5237\u65B0\u540E\u9700\u8981\u4E00\u4E2A\u8FFD\u95EE", target: "natural-clarifying" },
      { label: "\u5237\u65B0\u540E\u4ECD\u65E0\u7ED3\u679C", target: "repair-empty" }
    ],
    "mixed-parse": [
      { label: "\u89E3\u6790\u5B8C\u6210\uFF0C\u8FDB\u5165\u951A\u70B9\u4F18\u5148\u7ED3\u679C", target: "mixed-anchor" },
      { label: "\u5148\u964D\u7EA7\u8F6F\u6761\u4EF6", target: "mixed-soft" }
    ],
    "mixed-anchor": [
      { label: "\u7EE7\u7EED\u6309\u951A\u70B9\u4F18\u5148\u8FD4\u56DE\u7ED3\u679C", target: "mixed-anchor" },
      { label: "\u8865\u4E00\u4E2A\u6F84\u6E05\u95EE\u9898", target: "mixed-clarifying" }
    ],
    "mixed-soft": [
      { label: "\u4FDD\u7559\u8F6F\u6761\u4EF6\u4E3A\u53C2\u8003\u504F\u597D", target: "mixed-soft" },
      { label: "\u8981\u6C42\u8FDB\u4E00\u6B65\u6F84\u6E05", target: "mixed-clarifying" },
      { label: "\u7528\u81EA\u7136\u8BED\u8A00\u4E3B\u52A8\u8865\u5145", target: "mixed-followup-draft" }
    ],
    "mixed-clarifying": [
      { label: "\u56DE\u7B54\u8FFD\u95EE\u5E76\u7EE7\u7EED refine", target: "mixed-anchor" },
      { label: "\u56DE\u7B54\u540E\u8FDB\u5165\u4FEE\u6B63\u6001", target: "repair-empty" },
      { label: "\u8DF3\u8FC7\u70B9\u9009\uFF0C\u76F4\u63A5\u8865\u4E00\u53E5", target: "mixed-followup-draft" }
    ],
    "mixed-followup-draft": [
      { label: "\u63D0\u4EA4\u8865\u5145\u5E76\u5237\u65B0", target: "mixed-followup-refining" },
      { label: "\u653E\u5F03\u8865\u5145\uFF0C\u56DE\u5230\u8F6F\u6761\u4EF6\u5F85\u6F84\u6E05\u6001", target: "mixed-soft" }
    ],
    "mixed-followup-refining": [
      { label: "\u5237\u65B0\u540E\u56DE\u5230\u951A\u70B9\u4F18\u5148\u7ED3\u679C", target: "mixed-anchor" },
      { label: "\u5237\u65B0\u540E\u4ECD\u9700\u6F84\u6E05", target: "mixed-clarifying" },
      { label: "\u5237\u65B0\u540E\u4ECD\u65E0\u7ED3\u679C", target: "repair-empty" }
    ],
    "repair-invalid": [
      { actionId: "A_REPAIR_FIX_URL", label: "\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5", target: "url-resolving" },
      { actionId: "A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS", label: "\u6539\u4E3A\u5173\u952E\u8BCD\u641C\u7D22", target: "keyword-input" },
      { actionId: "A_REPAIR_SWITCH_TO_NL", label: "\u76F4\u63A5\u63CF\u8FF0\u4FEE\u6B63\u8981\u6C42", target: "repair-followup-draft" }
    ],
    "repair-mismatch": [
      { actionId: "A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS", label: "\u5220\u6389\u94FE\u63A5\u7EE7\u7EED\u641C\u5F53\u524D\u5E73\u53F0", target: "keyword-input" },
      { actionId: "A_REPAIR_FIX_URL", label: "\u6362\u5E73\u53F0\u540E\u91CD\u65B0\u5F00\u59CB", target: "url-resolving" },
      { actionId: "A_REPAIR_SWITCH_TO_NL", label: "\u76F4\u63A5\u8865\u4E00\u53E5\u4FEE\u6B63\u8981\u6C42", target: "repair-followup-draft" }
    ],
    "repair-unsupported": [
      { label: "\u6539\u4E3A\u5173\u952E\u8BCD", target: "keyword-input" },
      { label: "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00", target: "natural-init" },
      { actionId: "A_REPAIR_SWITCH_TO_NL", label: "\u76F4\u63A5\u8865\u4E00\u53E5\u4FEE\u6B63\u8981\u6C42", target: "repair-followup-draft" }
    ],
    "repair-empty": [
      { label: "\u653E\u5BBD\u6761\u4EF6\u540E\u91CD\u641C", target: "natural-retrieving" },
      { actionId: "A_REPAIR_REMOVE_ANCHOR_KEEP_KEYWORDS", label: "\u9000\u56DE\u7ECF\u5178\u5173\u952E\u8BCD\u6001", target: "keyword-tag" },
      { label: "\u76F4\u63A5\u8865\u4E00\u53E5\u653E\u5BBD\u8981\u6C42", target: "repair-followup-draft" }
    ],
    "low-recall-repair-open": [
      { actionId: "A_REPAIR_REPLACE_ANCHOR", label: "\u66F4\u6362\u951A\u70B9\u9891\u9053", target: "url-resolving" },
      { actionId: "A_REPAIR_EXPAND_RECALL_SCOPE", label: "\u6269\u5927\u53EC\u56DE\u8303\u56F4", target: "url-exact" },
      { actionId: "A_REPAIR_SWITCH_TO_NL", label: "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u63CF\u8FF0", target: "natural-init" }
    ],
    "repair-followup-draft": [
      { label: "\u63D0\u4EA4\u4FEE\u6B63\u8981\u6C42\u5E76\u5237\u65B0", target: "repair-followup-refining" },
      { label: "\u6539\u4E3A\u5173\u952E\u8BCD\u641C\u7D22", target: "keyword-input" },
      { label: "\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u641C\u7D22", target: "natural-init" }
    ],
    "repair-followup-refining": [
      { label: "\u4FEE\u6B63\u6210\u529F\u5E76\u6062\u590D\u7ED3\u679C", target: "natural-results" },
      { label: "\u4FEE\u6B63\u540E\u4ECD\u65E0\u7ED3\u679C", target: "repair-empty" },
      { label: "\u4FEE\u6B63\u540E\u4ECD\u4E0D\u652F\u6301", target: "repair-unsupported" }
    ],
    "upgrade-keyword-trigger": [
      { label: "\u7CFB\u7EDF\u5F00\u59CB\u89E3\u91CA\u65B0\u589E\u81EA\u7136\u8BED\u8A00", target: "upgrade-keyword-transition" }
    ],
    "upgrade-keyword-transition": [
      { label: "\u5347\u7EA7\u5B8C\u6210\uFF0C\u8FDB\u5165\u7A33\u5B9A Agent \u6001", target: "upgrade-keyword-stable" }
    ],
    "upgrade-keyword-stable": [
      { label: "\u7EE7\u7EED refine", target: "natural-clarifying" },
      { label: "\u4FDD\u6301\u5F53\u524D\u7A33\u5B9A\u7ED3\u679C", target: "natural-results" }
    ],
    "upgrade-url-trigger": [
      { label: "\u5F00\u59CB\u89E3\u91CA URL \u4E0E\u81EA\u7136\u8BED\u8A00\u5173\u7CFB", target: "upgrade-url-transition" }
    ],
    "upgrade-url-transition": [
      { label: "\u5347\u7EA7\u5B8C\u6210\uFF0C\u7B49\u5F85\u951A\u70B9\u786E\u8BA4", target: "upgrade-url-stable" }
    ],
    "upgrade-url-stable": [
      { label: "\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053", target: "url-exact" },
      { label: "\u8F6C\u4E3A\u627E\u7C7B\u4F3C\u9891\u9053", target: "mixed-clarifying" }
    ]
  };
  var ACTION_EVENT_TYPE_MAP = {
    "keyword-empty::\u5F00\u59CB\u8F93\u5165\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "keyword-empty::\u76F4\u63A5\u7C98\u8D34 URL": "PASTE_URL",
    "keyword-empty::\u76F4\u63A5\u63CF\u8FF0\u9700\u6C42\uFF0C\u8FDB\u5165\u81EA\u7136\u8BED\u8A00\u573A\u666F": "SUBMIT_SEARCH",
    "keyword-input::\u6309\u56DE\u8F66\u56FA\u5316\u4E3A\u5173\u952E\u8BCD tag": "COMMIT_KEYWORD",
    "keyword-input::\u6E05\u7A7A\u8F93\u5165\uFF0C\u56DE\u5230\u521D\u59CB\u7A7A\u767D\u6001": "CLEAR_DRAFT",
    "keyword-input::\u7EE7\u7EED\u8865\u81EA\u7136\u8BED\u8A00\uFF0C\u5347\u7EA7\u4E3A Agent \u6001": "UPGRADE_TO_AGENT",
    "keyword-tag::\u7F16\u8F91\u5F53\u524D\u5173\u952E\u8BCD": "EDIT_TAG",
    "keyword-tag::\u5220\u9664\u6700\u540E\u4E00\u4E2A\u5173\u952E\u8BCD": "DELETE_TAG",
    "keyword-tag::\u7EE7\u7EED\u8F93\u5165\u7B2C\u4E8C\u4E2A\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "keyword-tag::\u6253\u5F00\u5339\u914D\u76EE\u6807\u83DC\u5355": "OPEN_TAG_SCOPE",
    "keyword-tag::\u8FFD\u52A0\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7": "UPGRADE_TO_AGENT",
    "keyword-edit::\u63D0\u4EA4\u7F16\u8F91\u7ED3\u679C": "SAVE_TAG_EDIT",
    "keyword-edit::\u53D6\u6D88\u7F16\u8F91\uFF0C\u6062\u590D\u539F\u5173\u952E\u8BCD": "CANCEL_TAG_EDIT",
    "keyword-edit::\u6E05\u7A7A\u5E76\u5220\u9664\u8BE5\u5173\u952E\u8BCD": "DELETE_TAG",
    "keyword-multi::\u6E05\u7A7A\u5F53\u524D\u8F93\u5165\uFF0C\u56DE\u5230\u5355\u5173\u952E\u8BCD\u6001": "CLEAR_DRAFT",
    "keyword-multi::\u56FA\u5316\u5F53\u524D\u7B2C\u4E8C\u4E2A\u5173\u952E\u8BCD": "COMMIT_KEYWORD",
    "keyword-multi::\u63D2\u5165\u4E00\u4E2A URL \u951A\u70B9\u5E76\u7EE7\u7EED\u8F93\u5165": "PASTE_URL",
    "keyword-multi::\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7": "UPGRADE_TO_AGENT",
    "keyword-anchor-seed::\u7EE7\u7EED\u8F93\u5165\u4E0B\u4E00\u4E2A\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "keyword-anchor-seed::\u5220\u9664 URL \u951A\u70B9\uFF0C\u56DE\u5230\u591A\u5173\u952E\u8BCD\u6001": "REMOVE_ANCHOR",
    "keyword-anchor-seed::\u89E6\u53D1\u641C\u7D22\uFF0C\u8FDB\u5165\u89E3\u6790\u6458\u8981\u6001": "SUBMIT_SEARCH",
    "keyword-anchor-seed::\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7": "UPGRADE_TO_AGENT",
    "keyword-menu::\u5173\u95ED\u83DC\u5355": "CLOSE_TAG_SCOPE",
    "keyword-menu::\u5207\u6362\u5339\u914D\u76EE\u6807": "SET_TAG_SCOPE",
    "keyword-menu::\u8F6C\u4E3A\u6392\u9664\u5173\u952E\u8BCD": "TOGGLE_EXCLUDE",
    "keyword-menu::\u5347\u7EA7\u4E3A Agent \u6001": "UPGRADE_TO_AGENT",
    "url-resolving::\u8BC6\u522B\u6210\u529F": "URL_RESOLVE_SUCCESS",
    "url-resolving::\u5E73\u53F0\u4E0D\u5339\u914D": "URL_RESOLVE_MISMATCH",
    "url-resolving::\u7C7B\u578B\u4E0D\u652F\u6301": "URL_RESOLVE_UNSUPPORTED",
    "url-resolving::\u65E0\u6CD5\u8BC6\u522B": "URL_RESOLVE_INVALID",
    "url-exact::\u7EE7\u7EED\u6D4F\u89C8\u76F8\u4F3C\u9891\u9053\u7ED3\u679C": "BROWSE_SIMILAR_RESULTS",
    "url-exact::\u53EA\u67E5\u770B\u951A\u70B9\u9891\u9053": "VIEW_ANCHOR_ONLY",
    "url-exact::\u8FFD\u52A0\u5173\u952E\u8BCD\u5F62\u6210 URL+\u5173\u952E\u8BCD\u79CD\u5B50": "TYPE_KEYWORD",
    "url-exact::\u6A21\u62DF\u4F4E\u53EC\u56DE\u63D0\u793A": "BROWSE_RESULTS",
    "url-exact::\u5220\u9664\u9891\u9053\u951A\u70B9\uFF0C\u56DE\u5230\u521D\u59CB\u7A7A\u767D\u6001": "REMOVE_ANCHOR",
    "url-exact::\u8865\u5145\u81EA\u7136\u8BED\u8A00\uFF0C\u5347\u7EA7\u4E3A Agent \u6001": "UPGRADE_TO_AGENT",
    "url-keyword-seed::\u7EE7\u7EED\u8F93\u5165\u4E0B\u4E00\u4E2A\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "url-keyword-seed::\u5220\u9664 URL \u951A\u70B9\uFF0C\u56DE\u5230\u591A\u5173\u952E\u8BCD\u6001": "REMOVE_ANCHOR",
    "url-keyword-seed::\u89E6\u53D1\u641C\u7D22\uFF0C\u8FDB\u5165\u89E3\u6790\u6458\u8981\u6001": "SUBMIT_SEARCH",
    "url-keyword-seed::\u8865\u5145\u81EA\u7136\u8BED\u8A00\u5E76\u5347\u7EA7": "UPGRADE_TO_AGENT",
    "url-low-recall-hint::\u624B\u52A8\u5C55\u5F00\u4FEE\u6B63\u533A": "OPEN_REPAIR_HINT",
    "url-low-recall-hint::\u7EE7\u7EED\u6D4F\u89C8\u5F53\u524D\u7ED3\u679C": "DISMISS_REPAIR_HINT",
    "url-mismatch::\u5220\u9664\u94FE\u63A5\uFF0C\u56DE\u5230\u5173\u952E\u8BCD\u6001": "REMOVE_ANCHOR",
    "url-mismatch::\u91CD\u65B0\u8D34\u53EF\u7528 URL": "PASTE_URL",
    "url-unsupported::\u6539\u4E3A\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "url-unsupported::\u6539\u4E3A\u81EA\u7136\u8BED\u8A00": "SUBMIT_SEARCH",
    "url-invalid::\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5": "PASTE_URL",
    "url-invalid::\u6539\u4E3A\u9891\u9053\u540D": "TYPE_KEYWORD",
    "natural-init::\u5F00\u59CB\u9996\u8F6E\u641C\u7D22": "SUBMIT_SEARCH",
    "natural-retrieving::\u9996\u8F6E\u7ED3\u679C\u8FD4\u56DE": "RETRIEVE_SUCCESS",
    "natural-retrieving::\u4ECD\u65E0\u7ED3\u679C\uFF0C\u8FDB\u5165\u4FEE\u6B63\u6001": "RETRIEVE_EMPTY",
    "natural-results::\u63D0\u51FA\u4E00\u4E2A\u9AD8\u4EF7\u503C\u8FFD\u95EE": "ASK_CLARIFYING_QUESTION",
    "natural-results::\u7EE7\u7EED\u7A33\u5B9A\u6D4F\u89C8": "BROWSE_RESULTS",
    "natural-results::\u7528\u81EA\u7136\u8BED\u8A00\u4E3B\u52A8\u8865\u5145": "TYPE_FOLLOWUP",
    "natural-clarifying::\u56DE\u7B54\u8FFD\u95EE\u5E76\u5237\u65B0": "ANSWER_CLARIFYING_QUESTION",
    "natural-clarifying::\u56DE\u7B54\u540E\u4ECD\u65E0\u7ED3\u679C": "REFINE_EMPTY",
    "natural-clarifying::\u8DF3\u8FC7\u70B9\u9009\uFF0C\u76F4\u63A5\u8865\u4E00\u53E5": "TYPE_FOLLOWUP",
    "natural-followup-draft::\u63D0\u4EA4\u8865\u5145\u5E76\u5237\u65B0": "SUBMIT_FOLLOWUP",
    "natural-followup-draft::\u653E\u5F03\u8865\u5145\uFF0C\u56DE\u5230\u7A33\u5B9A\u7ED3\u679C": "CLEAR_FOLLOWUP",
    "natural-followup-refining::\u5237\u65B0\u540E\u7ED3\u679C\u7A33\u5B9A": "REFINE_SUCCESS",
    "natural-followup-refining::\u5237\u65B0\u540E\u9700\u8981\u4E00\u4E2A\u8FFD\u95EE": "ASK_CLARIFYING_QUESTION",
    "natural-followup-refining::\u5237\u65B0\u540E\u4ECD\u65E0\u7ED3\u679C": "REFINE_EMPTY",
    "mixed-parse::\u89E3\u6790\u5B8C\u6210\uFF0C\u8FDB\u5165\u951A\u70B9\u4F18\u5148\u7ED3\u679C": "RESOLVE_INTENT",
    "mixed-parse::\u5148\u964D\u7EA7\u8F6F\u6761\u4EF6": "DOWNGRADE_SOFT_CONDITIONS",
    "mixed-anchor::\u7EE7\u7EED\u6309\u951A\u70B9\u4F18\u5148\u8FD4\u56DE\u7ED3\u679C": "BROWSE_RESULTS",
    "mixed-anchor::\u8865\u4E00\u4E2A\u6F84\u6E05\u95EE\u9898": "ASK_CLARIFYING_QUESTION",
    "mixed-soft::\u4FDD\u7559\u8F6F\u6761\u4EF6\u4E3A\u53C2\u8003\u504F\u597D": "BROWSE_RESULTS",
    "mixed-soft::\u8981\u6C42\u8FDB\u4E00\u6B65\u6F84\u6E05": "ASK_CLARIFYING_QUESTION",
    "mixed-soft::\u7528\u81EA\u7136\u8BED\u8A00\u4E3B\u52A8\u8865\u5145": "TYPE_FOLLOWUP",
    "mixed-clarifying::\u56DE\u7B54\u8FFD\u95EE\u5E76\u7EE7\u7EED refine": "ANSWER_CLARIFYING_QUESTION",
    "mixed-clarifying::\u56DE\u7B54\u540E\u8FDB\u5165\u4FEE\u6B63\u6001": "REFINE_EMPTY",
    "mixed-clarifying::\u8DF3\u8FC7\u70B9\u9009\uFF0C\u76F4\u63A5\u8865\u4E00\u53E5": "TYPE_FOLLOWUP",
    "mixed-followup-draft::\u63D0\u4EA4\u8865\u5145\u5E76\u5237\u65B0": "SUBMIT_FOLLOWUP",
    "mixed-followup-draft::\u653E\u5F03\u8865\u5145\uFF0C\u56DE\u5230\u8F6F\u6761\u4EF6\u5F85\u6F84\u6E05\u6001": "CLEAR_FOLLOWUP",
    "mixed-followup-refining::\u5237\u65B0\u540E\u56DE\u5230\u951A\u70B9\u4F18\u5148\u7ED3\u679C": "REFINE_SUCCESS",
    "mixed-followup-refining::\u5237\u65B0\u540E\u4ECD\u9700\u6F84\u6E05": "ASK_CLARIFYING_QUESTION",
    "mixed-followup-refining::\u5237\u65B0\u540E\u4ECD\u65E0\u7ED3\u679C": "REFINE_EMPTY",
    "repair-invalid::\u91CD\u65B0\u7C98\u8D34\u94FE\u63A5": "PASTE_URL",
    "repair-invalid::\u6539\u4E3A\u5173\u952E\u8BCD\u641C\u7D22": "TYPE_KEYWORD",
    "repair-invalid::\u76F4\u63A5\u63CF\u8FF0\u4FEE\u6B63\u8981\u6C42": "APPLY_REPAIR",
    "repair-mismatch::\u5220\u6389\u94FE\u63A5\u7EE7\u7EED\u641C\u5F53\u524D\u5E73\u53F0": "REMOVE_ANCHOR",
    "repair-mismatch::\u6362\u5E73\u53F0\u540E\u91CD\u65B0\u5F00\u59CB": "PASTE_URL",
    "repair-mismatch::\u76F4\u63A5\u8865\u4E00\u53E5\u4FEE\u6B63\u8981\u6C42": "APPLY_REPAIR",
    "repair-unsupported::\u6539\u4E3A\u5173\u952E\u8BCD": "TYPE_KEYWORD",
    "repair-unsupported::\u6539\u4E3A\u81EA\u7136\u8BED\u8A00": "SUBMIT_SEARCH",
    "repair-unsupported::\u76F4\u63A5\u8865\u4E00\u53E5\u4FEE\u6B63\u8981\u6C42": "APPLY_REPAIR",
    "repair-empty::\u653E\u5BBD\u6761\u4EF6\u540E\u91CD\u641C": "APPLY_REPAIR",
    "repair-empty::\u9000\u56DE\u7ECF\u5178\u5173\u952E\u8BCD\u6001": "RESET_TO_CLASSIC",
    "repair-empty::\u76F4\u63A5\u8865\u4E00\u53E5\u653E\u5BBD\u8981\u6C42": "TYPE_FOLLOWUP",
    "low-recall-repair-open::\u66F4\u6362\u951A\u70B9\u9891\u9053": "APPLY_REPAIR",
    "low-recall-repair-open::\u6269\u5927\u53EC\u56DE\u8303\u56F4": "APPLY_REPAIR",
    "low-recall-repair-open::\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u63CF\u8FF0": "SUBMIT_SEARCH",
    "repair-followup-draft::\u63D0\u4EA4\u4FEE\u6B63\u8981\u6C42\u5E76\u5237\u65B0": "SUBMIT_FOLLOWUP",
    "repair-followup-draft::\u6539\u4E3A\u5173\u952E\u8BCD\u641C\u7D22": "TYPE_KEYWORD",
    "repair-followup-draft::\u6539\u4E3A\u81EA\u7136\u8BED\u8A00\u641C\u7D22": "SUBMIT_SEARCH",
    "repair-followup-refining::\u4FEE\u6B63\u6210\u529F\u5E76\u6062\u590D\u7ED3\u679C": "REFINE_SUCCESS",
    "repair-followup-refining::\u4FEE\u6B63\u540E\u4ECD\u65E0\u7ED3\u679C": "REFINE_EMPTY",
    "repair-followup-refining::\u4FEE\u6B63\u540E\u4ECD\u4E0D\u652F\u6301": "REFINE_UNSUPPORTED",
    "upgrade-keyword-trigger::\u7CFB\u7EDF\u5F00\u59CB\u89E3\u91CA\u65B0\u589E\u81EA\u7136\u8BED\u8A00": "UPGRADE_TO_AGENT",
    "upgrade-keyword-transition::\u5347\u7EA7\u5B8C\u6210\uFF0C\u8FDB\u5165\u7A33\u5B9A Agent \u6001": "RETRIEVE_SUCCESS",
    "upgrade-keyword-stable::\u7EE7\u7EED refine": "ASK_CLARIFYING_QUESTION",
    "upgrade-keyword-stable::\u4FDD\u6301\u5F53\u524D\u7A33\u5B9A\u7ED3\u679C": "BROWSE_RESULTS",
    "upgrade-url-trigger::\u5F00\u59CB\u89E3\u91CA URL \u4E0E\u81EA\u7136\u8BED\u8A00\u5173\u7CFB": "UPGRADE_TO_AGENT",
    "upgrade-url-transition::\u5347\u7EA7\u5B8C\u6210\uFF0C\u7B49\u5F85\u951A\u70B9\u786E\u8BA4": "RETRIEVE_SUCCESS",
    "upgrade-url-stable::\u7EE7\u7EED\u770B\u8FD9\u4E2A\u9891\u9053": "BROWSE_RESULTS",
    "upgrade-url-stable::\u8F6C\u4E3A\u627E\u7C7B\u4F3C\u9891\u9053": "ASK_CLARIFYING_QUESTION"
  };
  function normalizeActionToken(value) {
    return String(value || "NA").toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "NA";
  }
  function buildActionId({ fixtureId, eventType, targetFixtureId, index }) {
    const position = String(index + 1).padStart(2, "0");
    return `A_${normalizeActionToken(fixtureId)}__${normalizeActionToken(eventType)}__${normalizeActionToken(targetFixtureId)}__${position}`;
  }
  function getSceneByFixtureId(fixtureId) {
    const entry = Object.entries(sceneMap).find(([, list]) => list.some((item) => item.id === fixtureId));
    return entry?.[0] || "keyword";
  }
  function getAbstractSubstateByFixtureId(fixtureId) {
    const abstractId = fixtureAbstractSubstateMap[fixtureId] || "classic_editing";
    return {
      id: abstractId,
      ...abstractSubstateMeta[abstractId]
    };
  }
  function normalizeInputState(input) {
    if (!input) return "empty_input";
    if (input.includes("draft_followup")) return "draft_followup";
    if (input.includes("followup_waiting")) return "followup_waiting";
    if (input.includes("editing_keyword")) return "editing_keyword";
    if (input.includes("committed_anchor")) return "committed_anchor";
    if (input.includes("draft_keyword")) return "draft_keyword";
    if (input.includes("committed_keyword")) return "committed_keyword";
    return "empty_input";
  }
  function buildMachineTriplet(displayTriplet) {
    return {
      input: normalizeInputState(displayTriplet.input),
      container: displayTriplet.container,
      session: displayTriplet.session
    };
  }
  function buildFixtures() {
    return Object.fromEntries(
      Object.entries(scenarios).map(([fixtureId, ui]) => {
        const scene = getSceneByFixtureId(fixtureId);
        const sceneState = sceneMap[scene].find((item) => item.id === fixtureId);
        const actions = (stateActions[fixtureId] || []).map((action, index) => {
          const actionKey = `${fixtureId}::${action.label}`;
          const eventType = ACTION_EVENT_TYPE_MAP[actionKey] || "LOAD_FIXTURE";
          const targetFixtureId = action.target;
          const actionId = action.actionId || buildActionId({
            fixtureId,
            eventType,
            targetFixtureId,
            index
          });
          return {
            ...action,
            actionId,
            targetFixtureId,
            event: {
              type: eventType,
              actionId,
              targetFixtureId
            }
          };
        });
        return [
          fixtureId,
          {
            id: fixtureId,
            scene,
            label: sceneState?.label || fixtureId,
            ui,
            triplet: stateTriples[fixtureId],
            machineTriplet: buildMachineTriplet(stateTriples[fixtureId]),
            nodeIds: stateNodeMap[fixtureId] || [],
            actions
          }
        ];
      })
    );
  }
  var fixtures = buildFixtures();
  var actor = createActor(
    createSearchboxOrchestratorMachine({
      fixtures,
      initialFixtureId: INITIAL_FIXTURE_ID,
      initialVariant: INITIAL_VARIANT
    })
  );
  actor.start();
  var DOCK_LAYOUT_STORAGE_KEY = "channel-search-agent-upgrade-demo:dock-layout";
  var DOCK_LAYOUT_BOTTOM = "bottom";
  var DOCK_LAYOUT_LEFT = "left";
  var currentDockLayout = DOCK_LAYOUT_BOTTOM;
  try {
    if (localStorage.getItem(DOCK_LAYOUT_STORAGE_KEY) === DOCK_LAYOUT_LEFT) {
      currentDockLayout = DOCK_LAYOUT_LEFT;
    }
  } catch {
  }
  var XSTATE_SCOPE_SCENE = "scene";
  var XSTATE_SCOPE_ALL = "all";
  var currentXStateScope = XSTATE_SCOPE_SCENE;
  var pinnedStateBySvg = /* @__PURE__ */ new WeakMap();
  var xstateLayerStates = {
    input: Object.keys(inputMachineConfig.states),
    container: Object.keys(containerMachineConfig.states),
    session: Object.keys(sessionMachineConfig.states)
  };
  var xstateLayoutPresets = {
    input: {
      width: 1360,
      nodeWidth: 228,
      nodeHeight: 88,
      rowGap: 174,
      marginX: 52,
      startY: 56,
      rows: [
        ["empty_input", "draft_keyword", "committed_keyword"],
        ["editing_keyword"],
        ["committed_anchor", "followup_waiting", "draft_followup"]
      ]
    },
    container: {
      width: 1360,
      nodeWidth: 244,
      nodeHeight: 90,
      rowGap: 178,
      marginX: 52,
      startY: 56,
      rows: [
        ["compact_classic", "expanded_agent", "expanded_clarifying"],
        ["compact_resolving", "expanded_repair"]
      ]
    },
    session: {
      width: 1360,
      nodeWidth: 228,
      nodeHeight: 88,
      rowGap: 172,
      marginX: 52,
      startY: 56,
      rows: [
        ["idle", "retrieving", "results_ready", "clarifying"],
        ["empty_repair", "refining", "unsupported"]
      ]
    }
  };
  var xstateEdgeSamples = /* @__PURE__ */ new Map();
  function isXStateSvg(svg) {
    return Boolean(svg?.classList?.contains("xstate-machine-svg"));
  }
  function isPinnedLockEnabledForSvg(svg) {
    if (!svg) return false;
    if (!isXStateSvg(svg)) return true;
    return currentXStateScope === XSTATE_SCOPE_SCENE;
  }
  function resolveXStateLayerFromSvg(svg) {
    const svgId = svg?.id || "";
    if (svgId.includes("input")) return "input";
    if (svgId.includes("container")) return "container";
    if (svgId.includes("session")) return "session";
    return null;
  }
  function resolveCurrentStateIdForSvg(svg, snapshot) {
    if (!svg) return null;
    const layer = resolveXStateLayerFromSvg(svg);
    const triplet = getTriplet(snapshot);
    if (!layer || !triplet) return null;
    return triplet[layer] || null;
  }
  function syncPinnedStatesWithCurrentFixture(snapshot = actor.getSnapshot()) {
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      const existing = pinnedStateBySvg.get(svg);
      if (!existing) return;
      if (!isPinnedLockEnabledForSvg(svg)) {
        pinnedStateBySvg.delete(svg);
        clearXStateFocus(svg);
        return;
      }
      const stateId = resolveCurrentStateIdForSvg(svg, snapshot);
      if (!stateId) return;
      pinnedStateBySvg.set(svg, { kind: existing.kind, id: stateId });
    });
  }
  function ensureDefaultPinnedStates(snapshot = actor.getSnapshot()) {
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      if (!isPinnedLockEnabledForSvg(svg)) return;
      if (pinnedStateBySvg.has(svg)) return;
      const stateId = resolveCurrentStateIdForSvg(svg, snapshot);
      if (!stateId) return;
      pinnedStateBySvg.set(svg, { kind: "xstate", id: stateId });
    });
  }
  function summarizeEvents(events) {
    const list = [...events];
    if (!list.length) return "";
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} / ${list[1]}`;
    return `${list[0]} +${list.length - 1}`;
  }
  function collectLayerTransitions(layerKey, snapshot, scopeMode = currentXStateScope) {
    const edges = /* @__PURE__ */ new Map();
    const allFixtures = Object.values(fixtures);
    const currentScene = getScene(snapshot);
    const scopedFixtures = scopeMode === XSTATE_SCOPE_SCENE ? allFixtures.filter((fixture) => fixture.scene === currentScene) : allFixtures;
    scopedFixtures.forEach((fixture) => {
      const from = fixture.machineTriplet?.[layerKey];
      if (!from) return;
      (fixture.actions || []).forEach((action) => {
        const targetFixture = fixtures[action.targetFixtureId];
        const to = targetFixture?.machineTriplet?.[layerKey];
        if (!to || from === to) return;
        const key = `${from}__${to}`;
        const existing = edges.get(key) || {
          from,
          to,
          events: /* @__PURE__ */ new Set(),
          count: 0,
          signatures: /* @__PURE__ */ new Set(),
          samples: []
        };
        existing.events.add(action.event.type);
        existing.count += 1;
        const signature = `${fixture.id}__${action.targetFixtureId}__${action.event.type}`;
        if (!existing.signatures.has(signature)) {
          existing.signatures.add(signature);
          existing.samples.push({
            fromFixtureId: fixture.id,
            targetFixtureId: action.targetFixtureId,
            eventType: action.event.type,
            actionId: action.actionId,
            label: action.label
          });
        }
        edges.set(key, existing);
      });
    });
    return [...edges.values()];
  }
  function mergeLayerTransitions(allEdges, scopedEdges) {
    const scopedByKey = new Map(
      scopedEdges.map((edge) => [`${edge.from}__${edge.to}`, edge])
    );
    return allEdges.map((edge) => {
      const key = `${edge.from}__${edge.to}`;
      const scoped = scopedByKey.get(key);
      return {
        ...edge,
        scopedEvents: scoped?.events || /* @__PURE__ */ new Set(),
        scopedCount: scoped?.count || 0,
        scopedSamples: scoped?.samples || [],
        inScope: Boolean(scoped)
      };
    });
  }
  function buildNodeLayout(layerKey) {
    const preset = xstateLayoutPresets[layerKey] || {
      width: 1360,
      nodeWidth: 228,
      nodeHeight: 78,
      rowGap: 166,
      marginX: 52,
      startY: 56,
      rows: []
    };
    const {
      width,
      nodeWidth,
      nodeHeight,
      rowGap,
      marginX,
      startY,
      rows: preferredRows
    } = preset;
    const states = xstateLayerStates[layerKey] || [];
    const rows = (preferredRows || []).map(
      (row) => row.filter((state) => states.includes(state))
    );
    const remainingStates = states.filter((state) => !rows.some((row) => row.includes(state)));
    if (remainingStates.length) rows.push(remainingStates);
    const layout = /* @__PURE__ */ new Map();
    rows.forEach((rowStates, rowIndex) => {
      const count = rowStates.length;
      const usableWidth = width - marginX * 2;
      const colGap = count > 1 ? Math.floor((usableWidth - nodeWidth) / (count - 1)) : 0;
      const rowSpan = count > 1 ? nodeWidth + colGap * (count - 1) : nodeWidth;
      const rowStartX = marginX + Math.max(0, Math.floor((usableWidth - rowSpan) / 2));
      rowStates.forEach((state, colIndex) => {
        const x = rowStartX + colIndex * colGap;
        const y = startY + rowIndex * rowGap;
        layout.set(state, { x, y, width: nodeWidth, height: nodeHeight, row: rowIndex });
      });
    });
    const computedHeight = startY + Math.max(0, rows.length - 1) * rowGap + nodeHeight + 52;
    return { layout, computedHeight, width };
  }
  function classifyEdge(events) {
    const merged = [...events].join(" ");
    if (merged.includes("REPAIR") || merged.includes("EMPTY") || merged.includes("UNSUPPORTED") || merged.includes("MISMATCH") || merged.includes("INVALID")) {
      return "branch";
    }
    return "main";
  }
  function choosePortSides(fromBox, toBox) {
    const fromCenterX = fromBox.x + fromBox.width / 2;
    const toCenterX = toBox.x + toBox.width / 2;
    const rowDiff = toBox.row - fromBox.row;
    const colDiff = toCenterX - fromCenterX;
    if (Math.abs(rowDiff) >= 1) {
      if (rowDiff > 0) return { fromSide: "bottom", toSide: "top" };
      return { fromSide: "top", toSide: "bottom" };
    }
    if (colDiff >= 0) return { fromSide: "right", toSide: "left" };
    return { fromSide: "left", toSide: "right" };
  }
  function getPortPoint(box, side, slotIndex, slotTotal) {
    const centerOffset = slotIndex - (slotTotal - 1) / 2;
    const verticalStep = slotTotal <= 1 ? 0 : Math.min(28, Math.max(13, (box.height - 20) / (slotTotal - 1)));
    const horizontalStep = slotTotal <= 1 ? 0 : Math.min(52, Math.max(20, (box.width - 28) / (slotTotal - 1)));
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    if (side === "left") {
      return {
        x: box.x,
        y: Math.round(clamp(
          box.y + box.height / 2 + centerOffset * verticalStep,
          box.y + 10,
          box.y + box.height - 10
        ))
      };
    }
    if (side === "right") {
      return {
        x: box.x + box.width,
        y: Math.round(clamp(
          box.y + box.height / 2 + centerOffset * verticalStep,
          box.y + 10,
          box.y + box.height - 10
        ))
      };
    }
    if (side === "top") {
      return {
        x: Math.round(clamp(
          box.x + box.width / 2 + centerOffset * horizontalStep,
          box.x + 14,
          box.x + box.width - 14
        )),
        y: box.y
      };
    }
    return {
      x: Math.round(clamp(
        box.x + box.width / 2 + centerOffset * horizontalStep,
        box.x + 14,
        box.x + box.width - 14
      )),
      y: box.y + box.height
    };
  }
  function offsetPointBySide(point, side, distance) {
    if (side === "left") return { x: point.x - distance, y: point.y };
    if (side === "right") return { x: point.x + distance, y: point.y };
    if (side === "top") return { x: point.x, y: point.y - distance };
    return { x: point.x, y: point.y + distance };
  }
  function normalizePolyline(points) {
    const normalized = [];
    points.forEach((point) => {
      const x = Math.round(point.x);
      const y = Math.round(point.y);
      const prev = normalized[normalized.length - 1];
      if (!prev || prev.x !== x || prev.y !== y) {
        normalized.push({ x, y, lock: Boolean(point.lock) });
      }
    });
    let changed = true;
    while (changed) {
      changed = false;
      for (let index = 1; index < normalized.length - 1; index += 1) {
        const prev = normalized[index - 1];
        const current = normalized[index];
        const next = normalized[index + 1];
        if (current.lock) continue;
        if (prev.x === current.x && current.x === next.x || prev.y === current.y && current.y === next.y) {
          normalized.splice(index, 1);
          changed = true;
          break;
        }
      }
    }
    return normalized;
  }
  function segmentsFromPolyline(points) {
    const segments = [];
    for (let index = 0; index < points.length - 1; index += 1) {
      const a = points[index];
      const b = points[index + 1];
      const vertical = a.x === b.x;
      const horizontal = a.y === b.y;
      if (!vertical && !horizontal) continue;
      segments.push({
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y,
        vertical,
        horizontal,
        minX: Math.min(a.x, b.x),
        maxX: Math.max(a.x, b.x),
        minY: Math.min(a.y, b.y),
        maxY: Math.max(a.y, b.y),
        length: Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
      });
    }
    return segments;
  }
  function rangeOverlap(a1, a2, b1, b2) {
    const min = Math.max(Math.min(a1, a2), Math.min(b1, b2));
    const max = Math.min(Math.max(a1, a2), Math.max(b1, b2));
    return Math.max(0, max - min);
  }
  function segmentOverlapWithBox(segment, box) {
    const left = box.x;
    const right = box.x + box.width;
    const top = box.y;
    const bottom = box.y + box.height;
    if (segment.horizontal) {
      if (segment.y1 <= top || segment.y1 >= bottom) return 0;
      return rangeOverlap(segment.x1, segment.x2, left, right);
    }
    if (segment.vertical) {
      if (segment.x1 <= left || segment.x1 >= right) return 0;
      return rangeOverlap(segment.y1, segment.y2, top, bottom);
    }
    return 0;
  }
  function scoreRoute(candidateSegments, placedSegments, obstacleBoxes = []) {
    let intersections = 0;
    let overlaps = 0;
    let obstacleHits = 0;
    let score = 0;
    candidateSegments.forEach((seg) => {
      score += seg.length * 0.02;
      obstacleBoxes.forEach((box) => {
        const overlap = segmentOverlapWithBox(seg, box);
        if (overlap > 0) {
          obstacleHits += overlap;
          score += 12e3 + overlap * 24;
        }
      });
      placedSegments.forEach((existing) => {
        if (seg.vertical && existing.vertical && seg.x1 === existing.x1) {
          const overlap = rangeOverlap(seg.y1, seg.y2, existing.y1, existing.y2);
          if (overlap > 0) {
            overlaps += overlap;
            score += 1600 + overlap * 5;
          }
          return;
        }
        if (seg.horizontal && existing.horizontal && seg.y1 === existing.y1) {
          const overlap = rangeOverlap(seg.x1, seg.x2, existing.x1, existing.x2);
          if (overlap > 0) {
            overlaps += overlap;
            score += 1600 + overlap * 5;
          }
          return;
        }
        if (seg.vertical && existing.vertical && Math.abs(seg.x1 - existing.x1) <= 24) {
          const overlap = rangeOverlap(seg.y1, seg.y2, existing.y1, existing.y2);
          if (overlap > 0) {
            score += 180 + overlap * 1.1;
          }
          return;
        }
        if (seg.horizontal && existing.horizontal && Math.abs(seg.y1 - existing.y1) <= 24) {
          const overlap = rangeOverlap(seg.x1, seg.x2, existing.x1, existing.x2);
          if (overlap > 0) {
            score += 180 + overlap * 1.1;
          }
          return;
        }
        if (seg.vertical && existing.horizontal) {
          if (seg.x1 >= existing.minX && seg.x1 <= existing.maxX && existing.y1 >= seg.minY && existing.y1 <= seg.maxY) {
            intersections += 1;
            score += 78;
          }
          return;
        }
        if (seg.horizontal && existing.vertical) {
          if (existing.x1 >= seg.minX && existing.x1 <= seg.maxX && seg.y1 >= existing.minY && seg.y1 <= existing.maxY) {
            intersections += 1;
            score += 78;
          }
        }
      });
    });
    return { score, intersections, overlaps, obstacleHits };
  }
  function buildRouteCandidates(start, end, portMeta, edgeIndex, layerHeight, layerWidth, obstacleBoxes = []) {
    const candidates = [];
    const seen = /* @__PURE__ */ new Set();
    const laneSeed = edgeIndex % 8;
    const leadDistance = 24;
    const lockedStart = { ...start, lock: true };
    const lockedEnd = { ...end, lock: true };
    const routeStart = { ...offsetPointBySide(start, portMeta.fromSide, leadDistance), lock: true };
    const routeEnd = { ...offsetPointBySide(end, portMeta.toSide, leadDistance), lock: true };
    const midX = Math.round((routeStart.x + routeEnd.x) / 2);
    const midY = Math.round((routeStart.y + routeEnd.y) / 2);
    const horizontalClearance = 42 + laneSeed * 14;
    const verticalClearance = 42 + laneSeed * 12;
    const addCandidate = (points) => {
      const normalized = normalizePolyline([lockedStart, routeStart, ...points, routeEnd, lockedEnd]);
      if (normalized.length < 2) return;
      const key = normalized.map((point) => `${point.x},${point.y}`).join("|");
      if (seen.has(key)) return;
      seen.add(key);
      candidates.push(normalized);
    };
    addCandidate([routeStart, { x: midX, y: routeStart.y }, { x: midX, y: routeEnd.y }, routeEnd]);
    addCandidate([routeStart, { x: routeStart.x, y: midY }, { x: routeEnd.x, y: midY }, routeEnd]);
    for (let lane = 0; lane < 4; lane += 1) {
      const offset = 72 + (laneSeed + lane) * 20;
      const topY = Math.max(18, Math.min(routeStart.y, routeEnd.y) - offset);
      const bottomY = Math.min(layerHeight - 18, Math.max(routeStart.y, routeEnd.y) + offset);
      const shiftedMidX = midX + (lane - 1.5) * (34 + laneSeed * 5);
      addCandidate([routeStart, { x: routeStart.x, y: topY }, { x: routeEnd.x, y: topY }, routeEnd]);
      addCandidate([routeStart, { x: routeStart.x, y: bottomY }, { x: routeEnd.x, y: bottomY }, routeEnd]);
      addCandidate([routeStart, { x: shiftedMidX, y: routeStart.y }, { x: shiftedMidX, y: routeEnd.y }, routeEnd]);
    }
    if (portMeta.fromSide === "right" || portMeta.fromSide === "left") {
      const direction = portMeta.fromSide === "right" ? 1 : -1;
      [horizontalClearance, horizontalClearance + 26, horizontalClearance + 52, horizontalClearance + 78].forEach((spread, lane) => {
        const outX = routeStart.x + direction * spread;
        const bendY = routeEnd.y + (lane % 2 === 0 ? 1 : -1) * (26 + lane * 10);
        addCandidate([routeStart, { x: outX, y: routeStart.y }, { x: outX, y: routeEnd.y }, routeEnd]);
        addCandidate([routeStart, { x: outX, y: routeStart.y }, { x: outX, y: bendY }, { x: routeEnd.x, y: bendY }, routeEnd]);
      });
      [118, 168, 220, 274, 330].forEach((spread) => {
        const topY = Math.max(18, Math.min(routeStart.y, routeEnd.y) - spread);
        const bottomY = Math.min(layerHeight - 18, Math.max(routeStart.y, routeEnd.y) + spread);
        addCandidate([routeStart, { x: routeStart.x, y: topY }, { x: routeEnd.x, y: topY }, routeEnd]);
        addCandidate([routeStart, { x: routeStart.x, y: bottomY }, { x: routeEnd.x, y: bottomY }, routeEnd]);
      });
      obstacleBoxes.forEach((box) => {
        const spansHorizontalCorridor = !(box.x + box.width < Math.min(routeStart.x, routeEnd.x) || box.x > Math.max(routeStart.x, routeEnd.x));
        if (!spansHorizontalCorridor) return;
        const aboveY = Math.max(18, box.y - 28);
        const belowY = Math.min(layerHeight - 18, box.y + box.height + 28);
        addCandidate([routeStart, { x: routeStart.x, y: aboveY }, { x: routeEnd.x, y: aboveY }, routeEnd]);
        addCandidate([routeStart, { x: routeStart.x, y: belowY }, { x: routeEnd.x, y: belowY }, routeEnd]);
      });
    }
    if (portMeta.fromSide === "top" || portMeta.fromSide === "bottom") {
      const direction = portMeta.fromSide === "bottom" ? 1 : -1;
      [verticalClearance, verticalClearance + 26, verticalClearance + 52, verticalClearance + 78].forEach((spread, lane) => {
        const outY = routeStart.y + direction * spread;
        const bendX = routeEnd.x + (lane % 2 === 0 ? 1 : -1) * (30 + lane * 12);
        addCandidate([routeStart, { x: routeStart.x, y: outY }, { x: routeEnd.x, y: outY }, routeEnd]);
        addCandidate([routeStart, { x: routeStart.x, y: outY }, { x: bendX, y: outY }, { x: bendX, y: routeEnd.y }, routeEnd]);
      });
      [118, 168, 220, 274].forEach((spread) => {
        const leftX = Math.max(18, Math.min(routeStart.x, routeEnd.x) - spread);
        const rightX = Math.min(layerWidth - 18, Math.max(routeStart.x, routeEnd.x) + spread);
        addCandidate([routeStart, { x: leftX, y: routeStart.y }, { x: leftX, y: routeEnd.y }, routeEnd]);
        addCandidate([routeStart, { x: rightX, y: routeStart.y }, { x: rightX, y: routeEnd.y }, routeEnd]);
      });
      obstacleBoxes.forEach((box) => {
        const spansVerticalCorridor = !(box.y + box.height < Math.min(routeStart.y, routeEnd.y) || box.y > Math.max(routeStart.y, routeEnd.y));
        if (!spansVerticalCorridor) return;
        const leftX = Math.max(18, box.x - 28);
        const rightX = Math.min(layerWidth - 18, box.x + box.width + 28);
        addCandidate([routeStart, { x: leftX, y: routeStart.y }, { x: leftX, y: routeEnd.y }, routeEnd]);
        addCandidate([routeStart, { x: rightX, y: routeStart.y }, { x: rightX, y: routeEnd.y }, routeEnd]);
      });
    }
    return candidates;
  }
  function getBucketSortMetric(entry, side) {
    const box = entry.peerBox;
    if (side === "left" || side === "right") {
      return box.y + box.height / 2;
    }
    return box.x + box.width / 2;
  }
  function pickLabelPoint(polyline) {
    const segments = segmentsFromPolyline(polyline);
    if (!segments.length) {
      return { x: polyline[0]?.x || 0, y: (polyline[0]?.y || 0) - 8 };
    }
    const longest = segments.reduce((best, seg) => seg.length > best.length ? seg : best, segments[0]);
    if (longest.horizontal) {
      return {
        x: Math.round((longest.x1 + longest.x2) / 2),
        y: longest.y1 - 9
      };
    }
    return {
      x: longest.x1 + 10,
      y: Math.round((longest.y1 + longest.y2) / 2)
    };
  }
  function polylineToPath(points) {
    if (!points.length) return "";
    const commands = [`M${points[0].x} ${points[0].y}`];
    for (let index = 1; index < points.length; index += 1) {
      commands.push(`L${points[index].x} ${points[index].y}`);
    }
    return commands.join(" ");
  }
  function renderXStateLayerChart(svgId, layerKey, snapshot) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const states = xstateLayerStates[layerKey];
    const allTransitions = collectLayerTransitions(layerKey, snapshot, XSTATE_SCOPE_ALL);
    const scopedTransitions = currentXStateScope === XSTATE_SCOPE_ALL ? allTransitions : collectLayerTransitions(layerKey, snapshot, XSTATE_SCOPE_SCENE);
    const transitions = currentXStateScope === XSTATE_SCOPE_ALL ? allTransitions.map((edge) => ({
      ...edge,
      scopedEvents: edge.events,
      scopedCount: edge.count,
      scopedSamples: edge.samples,
      inScope: true
    })) : mergeLayerTransitions(allTransitions, scopedTransitions);
    const ns = "http://www.w3.org/2000/svg";
    const markerBlueId = `${svgId}-arrow-main`;
    const markerBranchId = `${svgId}-arrow-branch`;
    const { layout, computedHeight, width } = buildNodeLayout(layerKey);
    svg.setAttribute("viewBox", `0 0 ${width} ${computedHeight}`);
    svg.innerHTML = "";
    const defs = document.createElementNS(ns, "defs");
    const markerMain = document.createElementNS(ns, "marker");
    markerMain.setAttribute("id", markerBlueId);
    markerMain.setAttribute("markerWidth", "7");
    markerMain.setAttribute("markerHeight", "7");
    markerMain.setAttribute("refX", "5.8");
    markerMain.setAttribute("refY", "3.5");
    markerMain.setAttribute("orient", "auto");
    const markerMainPath = document.createElementNS(ns, "path");
    markerMainPath.setAttribute("d", "M0,0 L7,3.5 L0,7 z");
    markerMainPath.setAttribute("fill", "context-stroke");
    markerMain.appendChild(markerMainPath);
    const markerBranch = document.createElementNS(ns, "marker");
    markerBranch.setAttribute("id", markerBranchId);
    markerBranch.setAttribute("markerWidth", "7");
    markerBranch.setAttribute("markerHeight", "7");
    markerBranch.setAttribute("refX", "5.8");
    markerBranch.setAttribute("refY", "3.5");
    markerBranch.setAttribute("orient", "auto");
    const markerBranchPath = document.createElementNS(ns, "path");
    markerBranchPath.setAttribute("d", "M0,0 L7,3.5 L0,7 z");
    markerBranchPath.setAttribute("fill", "context-stroke");
    markerBranch.appendChild(markerBranchPath);
    defs.appendChild(markerMain);
    defs.appendChild(markerBranch);
    svg.appendChild(defs);
    const routedTransitions = transitions.map((edge) => {
      const from = layout.get(edge.from);
      const to = layout.get(edge.to);
      if (!from || !to) return null;
      const portMeta = choosePortSides(from, to);
      return {
        ...edge,
        fromBox: from,
        toBox: to,
        type: classifyEdge(edge.events),
        edgeKey: `${layerKey}__${edge.from}__${edge.to}`,
        portMeta
      };
    }).filter(Boolean).sort((a, b) => {
      const rowSpanA = Math.abs(a.fromBox.row - a.toBox.row);
      const rowSpanB = Math.abs(b.fromBox.row - b.toBox.row);
      if (rowSpanA !== rowSpanB) return rowSpanB - rowSpanA;
      const distanceA = Math.abs(a.fromBox.x + a.fromBox.width / 2 - (a.toBox.x + a.toBox.width / 2)) + Math.abs(a.fromBox.y + a.fromBox.height / 2 - (a.toBox.y + a.toBox.height / 2));
      const distanceB = Math.abs(b.fromBox.x + b.fromBox.width / 2 - (b.toBox.x + b.toBox.width / 2)) + Math.abs(b.fromBox.y + b.fromBox.height / 2 - (b.toBox.y + b.toBox.height / 2));
      if (distanceA !== distanceB) return distanceB - distanceA;
      if (a.fromBox.row !== b.fromBox.row) return a.fromBox.row - b.fromBox.row;
      return a.fromBox.x - b.fromBox.x;
    });
    const portBuckets = /* @__PURE__ */ new Map();
    routedTransitions.forEach((edge, index) => {
      edge.routeIndex = index;
      const startKey = `${edge.from}__${edge.portMeta.fromSide}`;
      const endKey = `${edge.to}__${edge.portMeta.toSide}`;
      if (!portBuckets.has(startKey)) portBuckets.set(startKey, []);
      if (!portBuckets.has(endKey)) portBuckets.set(endKey, []);
      portBuckets.get(startKey).push({
        edge,
        role: "start",
        peerBox: edge.toBox,
        peerState: edge.to
      });
      portBuckets.get(endKey).push({
        edge,
        role: "end",
        peerBox: edge.fromBox,
        peerState: edge.from
      });
    });
    portBuckets.forEach((bucket) => {
      const side = bucket[0]?.role === "start" ? bucket[0].edge.portMeta.fromSide : bucket[0]?.edge.portMeta.toSide;
      bucket.sort((a, b) => {
        const metricDiff = getBucketSortMetric(a, side) - getBucketSortMetric(b, side);
        if (metricDiff) return metricDiff;
        const rowDiff = a.peerBox.row - b.peerBox.row;
        if (rowDiff) return rowDiff;
        const xDiff = a.peerBox.x - b.peerBox.x;
        if (xDiff) return xDiff;
        const roleDiff = a.role.localeCompare(b.role);
        if (roleDiff) return roleDiff;
        return a.peerState.localeCompare(b.peerState);
      }).forEach((entry, slotIndex) => {
        const slot = { index: slotIndex, total: bucket.length };
        if (entry.role === "start") {
          entry.edge.startSlot = slot;
          return;
        }
        entry.edge.endSlot = slot;
      });
    });
    const placedSegments = [];
    routedTransitions.forEach((edge) => {
      const obstacleBoxes = [...layout.entries()].filter(([state]) => state !== edge.from && state !== edge.to).map(([, box]) => ({
        x: box.x - 18,
        y: box.y - 18,
        width: box.width + 36,
        height: box.height + 36
      }));
      const start = getPortPoint(
        edge.fromBox,
        edge.portMeta.fromSide,
        edge.startSlot?.index || 0,
        edge.startSlot?.total || 1
      );
      const end = getPortPoint(
        edge.toBox,
        edge.portMeta.toSide,
        edge.endSlot?.index || 0,
        edge.endSlot?.total || 1
      );
      const candidates = buildRouteCandidates(start, end, edge.portMeta, edge.routeIndex, computedHeight, width, obstacleBoxes);
      let best = null;
      candidates.forEach((candidate) => {
        const segments = segmentsFromPolyline(candidate);
        if (!segments.length) return;
        const routeQuality = scoreRoute(segments, placedSegments, obstacleBoxes);
        const bends = Math.max(0, candidate.length - 2);
        const totalScore = routeQuality.score + bends * 4;
        if (!best || totalScore < best.totalScore) {
          best = {
            points: candidate,
            segments,
            totalScore
          };
        }
      });
      edge.route = best || {
        points: normalizePolyline([start, end]),
        segments: segmentsFromPolyline(normalizePolyline([start, end])),
        totalScore: Number.POSITIVE_INFINITY
      };
      placedSegments.push(...edge.route.segments);
    });
    routedTransitions.forEach((edge) => {
      const sample = (edge.samples || [])[0] || null;
      xstateEdgeSamples.set(edge.edgeKey, {
        samples: edge.samples || [],
        scopedSamples: edge.scopedSamples || edge.samples || [],
        inScope: edge.inScope !== false
      });
      const group = document.createElementNS(ns, "g");
      group.setAttribute("class", "xstate-transition-target");
      group.setAttribute("data-layer", layerKey);
      group.setAttribute("data-from", edge.from);
      group.setAttribute("data-to", edge.to);
      group.setAttribute("data-edge-key", edge.edgeKey);
      group.setAttribute("data-in-scope", edge.inScope === false ? "false" : "true");
      if (edge.inScope === false) {
        group.classList.add("is-out-of-scope");
      }
      if (sample) {
        group.setAttribute("data-action-id", sample.actionId || "");
        group.setAttribute("data-event-type", sample.eventType || "LOAD_FIXTURE");
        group.setAttribute("data-target-fixture", sample.targetFixtureId || "");
        group.setAttribute("data-source-fixture", sample.fromFixtureId || "");
      }
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", polylineToPath(edge.route.points));
      path.setAttribute("class", `xstate-edge ${edge.type}`);
      path.setAttribute("marker-end", `url(#${edge.type === "branch" ? markerBranchId : markerBlueId})`);
      const hit = document.createElementNS(ns, "path");
      hit.setAttribute("d", polylineToPath(edge.route.points));
      hit.setAttribute("class", "xstate-edge-hit");
      group.appendChild(hit);
      group.appendChild(path);
      const label = document.createElementNS(ns, "text");
      const labelPoint = pickLabelPoint(edge.route.points);
      label.setAttribute("x", String(labelPoint.x));
      label.setAttribute("y", String(labelPoint.y));
      label.setAttribute("class", "xstate-edge-label");
      label.textContent = summarizeEvents(edge.events);
      group.appendChild(label);
      svg.appendChild(group);
    });
    states.forEach((state) => {
      const box = layout.get(state);
      if (!box) return;
      const group = document.createElementNS(ns, "g");
      group.setAttribute("class", "xstate-node");
      group.setAttribute("data-layer", layerKey);
      group.setAttribute("data-state", state);
      const rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", String(box.x));
      rect.setAttribute("y", String(box.y));
      rect.setAttribute("width", String(box.width));
      rect.setAttribute("height", String(box.height));
      rect.setAttribute("rx", "16");
      const title = document.createElementNS(ns, "text");
      title.setAttribute("x", String(box.x + 18));
      title.setAttribute("y", String(box.y + 34));
      title.setAttribute("class", "xstate-title");
      title.textContent = state;
      const sub = document.createElementNS(ns, "text");
      sub.setAttribute("x", String(box.x + 18));
      sub.setAttribute("y", String(box.y + 56));
      sub.setAttribute("class", "xstate-sub");
      sub.textContent = layerKey === "input" ? "input layer" : layerKey === "container" ? "container layer" : "session layer";
      group.appendChild(rect);
      group.appendChild(title);
      group.appendChild(sub);
      svg.appendChild(group);
    });
  }
  function renderXStateCharts() {
    const snapshot = actor.getSnapshot();
    xstateEdgeSamples.clear();
    renderXStateLayerChart("xstate-input-svg", "input", snapshot);
    renderXStateLayerChart("xstate-container-svg", "container", snapshot);
    renderXStateLayerChart("xstate-session-svg", "session", snapshot);
  }
  function applyXStateSelection() {
    const snapshot = actor.getSnapshot();
    const triple = getTriplet(snapshot);
    const currentFixtureId = getCurrentFixtureId(snapshot);
    if (!triple) return;
    const active = {
      input: triple.input,
      container: triple.container,
      session: triple.session
    };
    document.querySelectorAll(".xstate-node").forEach((node) => {
      const layer = node.dataset.layer;
      const state = node.dataset.state;
      node.classList.toggle("active", active[layer] === state);
    });
    document.querySelectorAll(".xstate-transition-target").forEach((edge) => {
      edge.classList.remove("is-selected", "is-available", "is-highlight", "is-dim");
      const layer = edge.dataset.layer;
      const edgeKey = edge.dataset.edgeKey;
      const edgeMeta = xstateEdgeSamples.get(edgeKey) || { samples: [], scopedSamples: [] };
      const relevantSamples = currentXStateScope === XSTATE_SCOPE_ALL ? edgeMeta.samples : edgeMeta.scopedSamples;
      const isAvailable = relevantSamples.some((item) => item.fromFixtureId === currentFixtureId);
      const isInbound = relevantSamples.some((item) => item.targetFixtureId === currentFixtureId);
      const fromMatch = active[layer] === edge.dataset.from && (currentXStateScope === XSTATE_SCOPE_ALL || edge.dataset.inScope === "true");
      if (isInbound) edge.classList.add("is-selected");
      else if (isAvailable || fromMatch) edge.classList.add("is-available");
    });
  }
  function clearXStateFocus(svg) {
    if (!svg) return;
    svg.classList.remove("is-focusing");
    svg.querySelectorAll(".xstate-node").forEach((node) => {
      node.classList.remove("is-dim", "is-highlight", "is-context");
    });
    svg.querySelectorAll(".xstate-transition-target").forEach((group) => {
      group.classList.remove("is-dim", "is-highlight", "is-context", "is-inbound", "is-outbound");
    });
  }
  function getPinnedState(svg) {
    if (!svg || !isPinnedLockEnabledForSvg(svg)) return null;
    return pinnedStateBySvg.get(svg) || null;
  }
  function findPinnedStateNode(svg, pinnedState) {
    if (!svg || !pinnedState) return null;
    if (pinnedState.kind === "handdrawn") {
      return [...svg.querySelectorAll(".svg-state-target")].find((node) => node.dataset.node === pinnedState.id) || null;
    }
    if (pinnedState.kind === "xstate") {
      return [...svg.querySelectorAll(".xstate-node")].find((node) => node.dataset.state === pinnedState.id) || null;
    }
    return null;
  }
  function applyPinnedFocus(svg) {
    if (!svg) return;
    if (!isPinnedLockEnabledForSvg(svg)) {
      pinnedStateBySvg.delete(svg);
      clearSvgFocus(svg);
      clearXStateFocus(svg);
      return;
    }
    const pinnedState = getPinnedState(svg);
    if (!pinnedState) {
      clearSvgFocus(svg);
      clearXStateFocus(svg);
      return;
    }
    const node = findPinnedStateNode(svg, pinnedState);
    if (!node) {
      pinnedStateBySvg.delete(svg);
      clearSvgFocus(svg);
      clearXStateFocus(svg);
      return;
    }
    if (pinnedState.kind === "handdrawn") {
      focusState(node);
      return;
    }
    focusXStateState(node);
  }
  function setPinnedState(svg, pinnedState) {
    if (!svg || !pinnedState?.id) return;
    if (!isPinnedLockEnabledForSvg(svg)) {
      pinnedStateBySvg.delete(svg);
      clearSvgFocus(svg);
      clearXStateFocus(svg);
      return;
    }
    pinnedStateBySvg.set(svg, pinnedState);
    applyPinnedFocus(svg);
  }
  function clearPinnedState(svg) {
    if (!svg) return;
    pinnedStateBySvg.delete(svg);
    clearSvgFocus(svg);
    clearXStateFocus(svg);
  }
  function restorePinnedOrClear(svg) {
    if (!svg) return;
    if (getPinnedState(svg)) {
      applyPinnedFocus(svg);
      return;
    }
    clearSvgFocus(svg);
    clearXStateFocus(svg);
  }
  function focusXStateTransition(group) {
    const svg = group.closest("svg");
    if (!svg) return;
    clearXStateFocus(svg);
    svg.classList.add("is-focusing");
    const from = group.dataset.from;
    const to = group.dataset.to;
    svg.querySelectorAll(".xstate-node").forEach((node) => node.classList.add("is-dim"));
    svg.querySelectorAll(".xstate-transition-target").forEach((edge) => edge.classList.add("is-dim"));
    group.classList.remove("is-dim");
    group.classList.add("is-highlight");
    svg.querySelectorAll(".xstate-node").forEach((node) => {
      if (node.dataset.state === from || node.dataset.state === to) {
        node.classList.remove("is-dim");
        node.classList.add("is-highlight");
      }
    });
  }
  function focusXStateState(node) {
    const svg = node.closest("svg");
    if (!svg) return;
    clearXStateFocus(svg);
    svg.classList.add("is-focusing");
    const stateId = node.dataset.state;
    const transitions = [...svg.querySelectorAll(".xstate-transition-target")];
    const directEdges = transitions.filter((edge) => edge.dataset.from === stateId || edge.dataset.to === stateId);
    const directNeighborIds = new Set(
      directEdges.flatMap((edge) => [edge.dataset.from, edge.dataset.to]).filter((id) => id && id !== stateId)
    );
    svg.querySelectorAll(".xstate-node").forEach((item) => item.classList.add("is-dim"));
    svg.querySelectorAll(".xstate-transition-target").forEach((edge) => edge.classList.add("is-dim"));
    node.classList.remove("is-dim");
    node.classList.add("is-highlight");
    directEdges.forEach((edge) => {
      edge.classList.remove("is-dim");
      edge.classList.add("is-context");
      edge.classList.toggle("is-inbound", edge.dataset.to === stateId);
      edge.classList.toggle("is-outbound", edge.dataset.from === stateId);
    });
    svg.querySelectorAll(".xstate-node").forEach((item) => {
      if (item === node) return;
      if (directNeighborIds.has(item.dataset.state)) {
        item.classList.remove("is-dim");
        item.classList.add("is-context");
      }
    });
  }
  function resolveXStateEdgeSample(group, snapshot) {
    const edgeKey = group.dataset.edgeKey;
    const samples = xstateEdgeSamples.get(edgeKey)?.samples || [];
    if (!samples.length) return null;
    const currentFixtureId = getCurrentFixtureId(snapshot);
    const currentScene = getScene(snapshot);
    const exact = samples.find((item) => item.fromFixtureId === currentFixtureId);
    if (exact) return exact;
    const sameScene = samples.find((item) => fixtures[item.fromFixtureId]?.scene === currentScene);
    if (sameScene) return sameScene;
    return samples[0];
  }
  function resolveXStateNodeFixtureId(node, snapshot) {
    const layer = node.dataset.layer;
    const state = node.dataset.state;
    if (!layer || !state) return null;
    const currentFixtureId = getCurrentFixtureId(snapshot);
    const currentScene = getScene(snapshot);
    const triple = getTriplet(snapshot);
    const currentFixture = fixtures[currentFixtureId];
    if (currentFixture?.machineTriplet?.[layer] === state) {
      return currentFixtureId;
    }
    const candidates = Object.values(fixtures).filter((fixture) => fixture.machineTriplet?.[layer] === state);
    if (!candidates.length) return null;
    const scored = candidates.map((fixture) => {
      let score = 0;
      if (fixture.scene === currentScene) score += 100;
      if (fixture.machineTriplet?.input === triple?.input) score += 30;
      if (fixture.machineTriplet?.container === triple?.container) score += 30;
      if (fixture.machineTriplet?.session === triple?.session) score += 30;
      return { fixture, score };
    }).sort((a, b) => b.score - a.score);
    return scored[0]?.fixture?.id || candidates[0].id;
  }
  function updateXStateScopeNote() {
    const note = document.getElementById("xstate-scope-note");
    if (!note) return;
    note.textContent = currentXStateScope === XSTATE_SCOPE_ALL ? "\u5168\u90E8\u573A\u666F\uFF1A\u70B9\u51FB\u4EC5\u5207\u6362\u5F53\u524D\u72B6\u6001\uFF0C\u4E0D\u9501\u5B9A\u53EF\u89C1\u6027\uFF1Bhover \u4ECD\u652F\u6301\u805A\u7126\u3002" : "\u5F53\u524D\u573A\u666F\uFF1A\u70B9\u51FB\u72B6\u6001\u4F1A\u5207\u6362\u5F53\u524D\u72B6\u6001\uFF0C\u5E76\u9501\u5B9A\u53EF\u89C1\u6027\u76F4\u5230\u53D6\u6D88\u3002";
  }
  function initializeStateMachinePanel() {
    const xstateScope = document.getElementById("xstate-scope-picker");
    if (xstateScope) {
      xstateScope.querySelectorAll("button[data-xstate-scope]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.xstateScope === currentXStateScope);
      });
    }
    updateXStateScopeNote();
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      clearXStateFocus(svg);
    });
    renderXStateCharts();
    applyXStateSelection();
    ensureDefaultPinnedStates(actor.getSnapshot());
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      applyPinnedFocus(svg);
    });
  }
  function renderShell(themeName, target) {
    const snapshot = actor.getSnapshot();
    const fixture = getFixture(snapshot, fixtures);
    const data = fixture.ui;
    const keywordExpansion = getKeywordExpansionViewModel(fixture.id);
    const isExpanded = data.mode === "expanded";
    const isResolving = data.mode === "resolving";
    const keywordFlow = appendExpandedKeywordTags(data.keywordFlow, keywordExpansion?.applied || []);
    const conditions = appendExpandedKeywordsToConditions(data.conditions, keywordExpansion?.applied || []);
    const inlineHintAction = data.inlineHint?.actionId ? fixture.actions.find((action) => action.actionId === data.inlineHint.actionId) : null;
    target.innerHTML = `
    <div class="search-box ${isExpanded ? "expanded" : "classic"}">
      <div class="shell-chrome">
        <div class="search-icon">${isResolving ? "\u21BB" : "\u2315"}</div>
        <div class="main-input">
          ${keywordFlow ? renderKeywordFlow(keywordFlow, data.inlineHint, inlineHintAction) : `<p class="line-1">${data.inputTitle}</p>`}
          ${data.inputHint ? `<p class="line-2">${data.inputHint}</p>` : ""}
        </div>
        ${data.miniAction || data.primaryAction ? `
          <div class="action-cluster">
            <span class="slot-chip">actions</span>
            ${data.miniAction ? `<span class="mini-button">${data.miniAction}</span>` : ""}
            ${data.primaryAction ? `<span class="mini-button primary">${data.primaryAction}</span>` : ""}
          </div>
        ` : ""}
      </div>
      <div class="stack ${data.status ? "" : "hidden"}">
        ${data.status ? renderStatus(data.status) : ""}
      </div>

      <div class="stack ${data.session || data.question || conditions || keywordExpansion ? "" : "hidden"}">
        ${data.session ? renderSession(data.session) : ""}
        ${data.question ? renderQuestion(data.question) : ""}
        ${conditions ? renderConditions(conditions) : ""}
        ${keywordExpansion ? renderKeywordExpansion(fixture.id) : ""}
      </div>

      ${keywordFlow?.openMenu ? renderTargetMenu() : ""}
    </div>
  `;
  }
  function renderInlineHint(inlineHint, action) {
    return `
    <span class="inline-hint-row">
      <span class="inline-hint-copy">${inlineHint.text}</span>
      ${action ? `
        <button
          class="inline-hint-action"
          data-action-id="${action.actionId}"
          data-event-type="${action.event.type}"
          data-target-fixture="${action.targetFixtureId}"
        >
          ${inlineHint.actionLabel || action.label}
        </button>
      ` : ""}
    </span>
  `;
  }
  function ensureKeywordExpansionUiState(fixtureId) {
    if (!keywordExpansionUiState.has(fixtureId)) {
      keywordExpansionUiState.set(fixtureId, {
        isOpen: false,
        selected: [],
        applied: [],
        lastAppliedMode: null
      });
    }
    return keywordExpansionUiState.get(fixtureId);
  }
  function getKeywordExpansionViewModel(fixtureId) {
    const preset = keywordExpansionPresets[fixtureId];
    if (!preset) return null;
    const state = ensureKeywordExpansionUiState(fixtureId);
    return {
      fixtureId,
      ...preset,
      ...state
    };
  }
  function normalizeKeywordValue(value) {
    return String(value || "").trim().toLowerCase();
  }
  function appendExpandedKeywordTags(keywordFlow, appliedKeywords) {
    if (!keywordFlow || !appliedKeywords.length) return keywordFlow;
    const tags = [...keywordFlow.tags || []];
    const existing = new Set(tags.map((tag) => normalizeKeywordValue(tag.text)));
    appliedKeywords.forEach((keyword) => {
      if (existing.has(normalizeKeywordValue(keyword))) return;
      tags.push({ text: keyword, scope: "\u9ED8\u8BA4" });
    });
    return {
      ...keywordFlow,
      tags
    };
  }
  function appendExpandedKeywordsToConditions(conditions, appliedKeywords) {
    if (!conditions || !appliedKeywords.length) return conditions;
    const existing = new Set((conditions.hard || []).map(normalizeKeywordValue));
    const added = appliedKeywords.filter((keyword) => !existing.has(normalizeKeywordValue(`${keyword}\uFF08\u9ED8\u8BA4\u4F5C\u7528\u57DF\uFF09`))).map((keyword) => `${keyword}\uFF08\u9ED8\u8BA4\u4F5C\u7528\u57DF\uFF09`);
    if (!added.length) return conditions;
    return {
      ...conditions,
      hard: [...conditions.hard || [], ...added]
    };
  }
  function renderKeywordExpansion(fixtureId) {
    const expansion = getKeywordExpansionViewModel(fixtureId);
    if (!expansion) return "";
    const sourceKeywords = expansion.sourceKeywords.map((item) => `<span class="chip">${item}</span>`).join("");
    const appliedKeywords = expansion.applied.map((item) => `<span class="chip soft">${item}</span>`).join("");
    if (!expansion.isOpen) {
      return `
      <section class="keyword-expansion-card is-collapsed">
        <div class="card-label">
          <span>keyword_expansion</span>
          <span class="state-badge">${expansion.reason === "low_recall_repair" ? "repair reuse" : "proactive"}</span>
        </div>
        <p class="card-text">${expansion.caption}</p>
        <div class="meta-row" style="margin-top:10px;">${sourceKeywords}</div>
        <div class="keyword-expansion-actions">
          <button
            class="keyword-expansion-action primary"
            data-expansion-action="open"
            data-fixture-id="${fixtureId}"
            data-action-id="${KEYWORD_EXPANSION_ACTION_IDS.open}"
          >
            \u6253\u5F00\u6269\u8BCD
          </button>
        </div>
      </section>
    `;
    }
    const candidates = expansion.candidates.map((item) => {
      const selected = expansion.selected.includes(item);
      const alreadyApplied = expansion.applied.includes(item);
      return `
        <div class="keyword-expansion-candidate ${selected ? "is-selected" : ""} ${alreadyApplied ? "is-applied" : ""}">
          <button
            class="keyword-expansion-chip"
            data-expansion-action="toggle"
            data-fixture-id="${fixtureId}"
            data-candidate="${item}"
          >
            ${item}
          </button>
          <button
            class="keyword-expansion-inline-action"
            data-expansion-action="apply-one"
            data-fixture-id="${fixtureId}"
            data-candidate="${item}"
            data-action-id="${KEYWORD_EXPANSION_ACTION_IDS.applyOne}"
          >
            \u5355\u4E2A\u52A0\u5165
          </button>
        </div>
      `;
    }).join("");
    const footerCopy = expansion.lastAppliedMode === "classic" ? "\u5DF2\u52A0\u5165\u8F93\u5165\uFF0C\u4F46\u4E0D\u4F1A\u81EA\u52A8\u641C\u7D22\u3002" : expansion.lastAppliedMode === "search" ? "\u5DF2\u52A0\u5165\u5E76\u81EA\u52A8\u89E6\u53D1\u4E00\u6B21\u91CD\u641C / refine\uFF08\u6F14\u793A\uFF09\u3002" : "\u65B0\u8BCD\u786E\u8BA4\u540E\u4F1A\u4F5C\u4E3A\u666E\u901A keyword\uFF0C\u9ED8\u8BA4\u843D\u5230\u7CFB\u7EDF\u9ED8\u8BA4\u4F5C\u7528\u57DF\u3002";
    return `
    <section class="keyword-expansion-card">
      <div class="card-label">
        <span>keyword_expansion</span>
        <span class="state-badge">${expansion.reason === "low_recall_repair" ? "repair reuse" : "proactive"}</span>
      </div>
      <p class="card-text">${expansion.title}</p>
      <div class="keyword-expansion-block">
        <div class="legend">source keywords</div>
        <div class="chip-row">${sourceKeywords}</div>
      </div>
      <div class="keyword-expansion-block">
        <div class="legend">candidates</div>
        <div class="keyword-expansion-candidate-list">${candidates}</div>
      </div>
      ${appliedKeywords ? `
        <div class="keyword-expansion-block">
          <div class="legend">\u5DF2\u52A0\u5165\u7684\u65B0\u8BCD</div>
          <div class="chip-row">${appliedKeywords}</div>
        </div>
      ` : ""}
      <p class="card-text keyword-expansion-footnote">${footerCopy}</p>
      <div class="keyword-expansion-actions">
        <button
          class="keyword-expansion-action"
          data-expansion-action="apply-selected"
          data-fixture-id="${fixtureId}"
          data-action-id="${KEYWORD_EXPANSION_ACTION_IDS.applyMany}"
          ${expansion.selected.length ? "" : "disabled"}
        >
          \u6279\u91CF\u52A0\u5165\u5DF2\u9009\u8BCD
        </button>
        <button
          class="keyword-expansion-action subtle"
          data-expansion-action="dismiss"
          data-fixture-id="${fixtureId}"
          data-action-id="${KEYWORD_EXPANSION_ACTION_IDS.dismiss}"
        >
          \u6536\u8D77\u6269\u8BCD
        </button>
      </div>
      <div class="guide-chip-row" style="margin-top:12px;">
        <span class="guide-chip code subtle">${KEYWORD_EXPANSION_ACTION_IDS.open}</span>
        <span class="guide-chip code subtle">${KEYWORD_EXPANSION_ACTION_IDS.applyOne}</span>
        <span class="guide-chip code subtle">${KEYWORD_EXPANSION_ACTION_IDS.applyMany}</span>
        <span class="guide-chip code subtle">${KEYWORD_EXPANSION_ACTION_IDS.dismiss}</span>
      </div>
    </section>
  `;
  }
  function getAnchorPlatformShort(platform) {
    if (platform === "YouTube") return "YT";
    if (platform === "Instagram") return "IG";
    if (platform === "TikTok") return "TT";
    if (platform === "X") return "X";
    return (platform || "AN").slice(0, 2).toUpperCase();
  }
  function normalizeAnchorData(anchorInput) {
    if (!anchorInput) return null;
    const raw = typeof anchorInput === "string" ? anchorInput : anchorInput.text || anchorInput.handle || "";
    const handleMatch = raw.match(/@[A-Za-z0-9._-]+/);
    const handle = typeof anchorInput === "object" ? anchorInput.handle || handleMatch?.[0] || raw : handleMatch?.[0] || raw.replace(/^[^:：]+[:：]\s*/, "").trim();
    const label = typeof anchorInput === "object" ? anchorInput.label || "\u53C2\u8003\u9891\u9053" : raw.includes("URL \u951A\u70B9") ? "URL \u951A\u70B9" : "\u951A\u70B9\u9891\u9053";
    const platform = typeof anchorInput === "object" ? anchorInput.platform || "YouTube" : "YouTube";
    const subtitle = typeof anchorInput === "object" ? anchorInput.subtitle || "\u76F8\u4F3C\u9891\u9053\u8D77\u70B9" : "\u76F8\u4F3C\u9891\u9053\u8D77\u70B9";
    const note = typeof anchorInput === "object" ? anchorInput.note || "\u7F6E\u9876\u4FDD\u7559\uFF0C\u4E0D\u53C2\u4E0E\u666E\u901A\u7ED3\u679C\u6392\u5E8F" : "\u7F6E\u9876\u4FDD\u7559\uFF0C\u4E0D\u53C2\u4E0E\u666E\u901A\u7ED3\u679C\u6392\u5E8F";
    return {
      label,
      handle,
      platform,
      platformShort: getAnchorPlatformShort(platform),
      subtitle,
      note
    };
  }
  function renderQueryToken(tag) {
    if (tag.anchor) {
      const anchor = normalizeAnchorData({
        text: tag.text,
        handle: tag.text,
        platform: tag.platform,
        label: "\u951A\u70B9",
        subtitle: "\u76F8\u4F3C\u9891\u9053\u8D77\u70B9",
        note: "\u7F6E\u9876\u4FDD\u7559"
      });
      return `
      <span class="anchor-token" title="${anchor.handle}">
        <span class="anchor-token-badge">${anchor.label}</span>
        <span class="anchor-token-body">
          <span class="anchor-token-handle">${anchor.handle}</span>
          <span class="anchor-token-meta">${anchor.platform} \xB7 ${anchor.subtitle}</span>
        </span>
        <span class="anchor-token-platform">${anchor.platformShort}</span>
      </span>
    `;
    }
    return `
    <span class="query-token ${tag.exclude ? "exclude" : ""}">
      <span>${tag.text}</span>
      <span class="divider"></span>
      <span class="scope">${tag.scope}</span>
    </span>
  `;
  }
  function renderAnchorCard(anchorInput) {
    const anchor = normalizeAnchorData(anchorInput);
    if (!anchor) return "";
    return `
    <div class="anchor-card">
      <div class="anchor-card-top">
        <span class="anchor-card-label">${anchor.label}</span>
        <span class="anchor-card-platform">${anchor.platform}</span>
      </div>
      <div class="anchor-card-main">
        <span class="anchor-card-avatar">${anchor.platformShort}</span>
        <span class="anchor-card-copy">
          <strong>${anchor.handle}</strong>
          <span>${anchor.subtitle}</span>
        </span>
      </div>
      <p class="anchor-card-note">${anchor.note}</p>
    </div>
  `;
  }
  function renderKeywordFlow(flow, inlineHint, inlineHintAction) {
    if (flow.followup) {
      const tags2 = (flow.tags || []).map(renderQueryToken).join("");
      const content = flow.draft ? flow.draft : `<span class="followup-placeholder">${flow.placeholder || "\u7EE7\u7EED\u8865\u5145..."}</span>`;
      const hint2 = inlineHint ? renderInlineHint(inlineHint, inlineHintAction) : "";
      return `
      <div class="query-line followup-line">
        ${tags2}
        <span class="followup-fragment with-caret">${content}</span>
        ${hint2}
      </div>
    `;
    }
    const tags = flow.tags.map(renderQueryToken).join("");
    const draft = `<span class="draft-fragment with-caret">${flow.draft || ""}</span>`;
    const hint = inlineHint ? renderInlineHint(inlineHint, inlineHintAction) : "";
    return `
    <div class="query-line">
      ${tags}
      ${draft}
      ${hint}
    </div>
  `;
  }
  function renderTargetMenu() {
    return `
    <div class="target-menu">
      <div class="menu-item is-active">\u6309\u9891\u9053\u6807\u7B7E</div>
      <div class="menu-item">\u6309\u9891\u9053\u540D</div>
      <div class="menu-item">\u6309\u9891\u9053\u7B80\u4ECB</div>
      <div class="menu-item">\u6309\u53D1\u5E03\u5185\u5BB9</div>
      <div class="menu-item">\u4ECE\u5168\u90E8\u6765\u6E90</div>
      <div class="menu-divider"></div>
      <div class="toggle-row">
        <span>\u6392\u9664\u8BE5\u5173\u952E\u8BCD</span>
        <span class="toggle-pill"></span>
      </div>
    </div>
  `;
  }
  function renderStatus(status) {
    return `
    <div class="micro-status ${status.spinner ? "" : "is-stable"}">
      <div class="status-topline">
        <span>status</span>
      </div>
      ${status.spinner ? `<div class="spinner" aria-hidden="true"></div>` : `<div class="status-mark ${status.stateClass || ""}" aria-hidden="true"></div>`}
      <div class="main-input" style="flex:1 1 auto;">
        <p class="line-1" style="font-size:14px;">${status.state}</p>
        <p class="status-text">${status.text}</p>
      </div>
      <span class="state-badge ${status.stateClass || ""}">${status.state}</span>
    </div>
  `;
  }
  function renderSession(session) {
    const meta = session.meta.map((item) => `<span class="chip">${item}</span>`).join("");
    return `
    <section class="session-card">
      <div class="card-label">
        <span>task_summary</span>
      </div>
      <p class="card-text">${session.summary}</p>
      <div class="meta-row" style="margin-top:10px;">${meta}</div>
    </section>
  `;
  }
  function renderQuestion(question) {
    const choices = question.choices.map((item) => `<span class="chip soft">${item}</span>`).join("");
    const slotLabel = question.slot || "question";
    const badge = slotLabel === "repair_options" ? "repair" : "one question only";
    return `
    <section class="question-card">
      <div class="card-label">
        <span>${slotLabel}</span>
        <span class="state-badge">${badge}</span>
      </div>
      <h3 class="question-title">${question.title}</h3>
      <div class="hint-row">${choices}</div>
      <p class="card-text" style="margin-top:10px;">${question.caption}</p>
    </section>
  `;
  }
  function renderConditions(conditions) {
    const hard = conditions.hard.map((item) => `<span class="chip">${item}</span>`).join("");
    const soft = conditions.soft.map((item) => `<span class="chip reference">${item}</span>`).join("");
    return `
    <section class="conditions-card">
      <div class="card-label">
        <span>conditions</span>
        <span class="legend">\u786C\u6761\u4EF6\u4E0E\u53C2\u8003\u504F\u597D\u5206\u5F00\u8868\u8FBE</span>
      </div>
      ${conditions.anchor ? `
        <div class="anchor-group">
          <div class="legend">\u951A\u70B9</div>
          ${renderAnchorCard(conditions.anchor)}
        </div>
      ` : ""}
      <div class="soft-group" style="${conditions.anchor ? "" : "margin-top:0;padding-top:0;border-top:none;"}">
        <div class="legend">\u5DF2\u751F\u6548\u786C\u6761\u4EF6</div>
        <div class="chip-row">${hard}</div>
      </div>
      ${conditions.soft.length ? `
        <div class="soft-group">
          <div class="legend">\u53C2\u8003\u504F\u597D / \u5F85\u6F84\u6E05</div>
          <div class="chip-row">${soft}</div>
        </div>
      ` : ""}
      <p class="card-text" style="margin-top:12px;">${conditions.hint}</p>
    </section>
  `;
  }
  function rerenderAll() {
    Object.entries(shellTargets).forEach(([variant, target]) => renderShell(variant, target));
  }
  function applyVariantVisibility() {
    const currentVariant = getVariant(actor.getSnapshot());
    document.querySelectorAll(".demo-panel").forEach((panel) => {
      const isVisible = panel.dataset.cardVariant === currentVariant;
      panel.hidden = !isVisible;
    });
  }
  function renderSubstatePicker() {
    const snapshot = actor.getSnapshot();
    const currentScene = getScene(snapshot);
    const currentFixtureId = getCurrentFixtureId(snapshot);
    const picker = document.getElementById("substate-picker");
    const states = sceneMap[currentScene] || [];
    picker.innerHTML = states.map((state) => {
      const abstract = getAbstractSubstateByFixtureId(state.id);
      return `
        <button data-scenario="${state.id}" class="${state.id === currentFixtureId ? "is-active" : ""}">
          <span class="substate-button-main">${state.label}</span>
          <span class="substate-button-abstract">${abstract.title}</span>
        </button>
      `;
    }).join("");
  }
  function renderSubstateGuide() {
    const snapshot = actor.getSnapshot();
    const currentFixtureId = getCurrentFixtureId(snapshot);
    const fixture = getFixture(snapshot, fixtures);
    const guide = document.getElementById("substate-guide");
    if (!guide || !fixture) return;
    const abstract = getAbstractSubstateByFixtureId(currentFixtureId);
    const actionGroups = (abstract.actionGroups || []).map((item) => `<span class="guide-chip">${item}</span>`).join("");
    const canonicalActionIds = (abstract.canonicalActionIds || []).map((item) => `<span class="guide-chip code">${item}</span>`).join("");
    const currentActionIds = (fixture.actions || []).map((action) => `<span class="guide-chip code subtle">${action.actionId}</span>`).join("");
    guide.hidden = false;
    guide.innerHTML = `
    <div class="substate-guide-header">
      <span class="substate-guide-pill">${abstract.title}</span>
      <span class="substate-guide-code">${abstract.id}</span>
    </div>
    <p>\u5F53\u524D\u5B50\u72B6\u6001 <strong>${fixture.label}</strong> \u5728\u8BB2\u89E3\u5C42\u5F52\u5C5E\u4E3A\u8FD9\u4E2A\u62BD\u8C61\u5B50\u72B6\u6001\u3002</p>
    <p>${abstract.summary}</p>
    <p>${abstract.speakingHint}</p>
    <div class="substate-guide-grid">
      <section class="guide-block">
        <p class="guide-block-label">\u6807\u51C6\u52A8\u4F5C\u7EC4</p>
        <div class="guide-chip-row">${actionGroups || '<span class="guide-chip subtle">\u5F53\u524D\u672A\u5355\u72EC\u62BD\u8C61</span>'}</div>
      </section>
      <section class="guide-block">
        <p class="guide-block-label">\u6807\u51C6 actionId</p>
        <div class="guide-chip-row">${canonicalActionIds || '<span class="guide-chip subtle">\u5F53\u524D\u4E3B\u8981\u4F9D\u8D56\u5B50\u72B6\u6001\u7EA7 actionId</span>'}</div>
      </section>
      <section class="guide-block">
        <p class="guide-block-label">\u5F53\u524D\u5B50\u72B6\u6001 actionId</p>
        <div class="guide-chip-row">${currentActionIds || '<span class="guide-chip subtle">\u5F53\u524D\u65E0\u52A8\u4F5C</span>'}</div>
      </section>
    </div>
  `;
  }
  function setTransitionVisualState(group, state) {
    const edge = group.querySelector(".svg-edge.main, .svg-edge.branch");
    const label = group.querySelector(".svg-edge-label");
    if (!edge || !label) return;
    const isBranch = edge.classList.contains("branch");
    if (state === "hover") {
      edge.style.stroke = isBranch ? "#ef8a2e" : "#2d7ff9";
      edge.style.strokeWidth = "4.5px";
      edge.style.filter = isBranch ? "drop-shadow(0 0 8px rgba(239, 138, 46, 0.22))" : "drop-shadow(0 0 8px rgba(45, 127, 249, 0.28))";
      label.style.fill = isBranch ? "#a55e1f" : "#1f252e";
      label.style.fontWeight = "800";
      return;
    }
    edge.style.stroke = "";
    edge.style.strokeWidth = "";
    edge.style.filter = "";
    label.style.fill = "";
    label.style.fontWeight = "";
  }
  function clearSvgFocus(svg) {
    if (!svg) return;
    svg.classList.remove("is-focusing");
    svg.querySelectorAll(".svg-state-target").forEach((node) => {
      node.classList.remove("is-dim", "is-highlight", "is-context");
    });
    svg.querySelectorAll(".svg-transition-target").forEach((group) => {
      group.classList.remove("is-dim", "is-highlight", "is-context");
      setTransitionVisualState(group, "base");
    });
  }
  function focusState(node) {
    const svg = node.closest("svg");
    if (!svg) return;
    clearSvgFocus(svg);
    svg.classList.add("is-focusing");
    const nodeId = node.dataset.node;
    const transitions = [...svg.querySelectorAll(".svg-transition-target")];
    const directEdges = transitions.filter((edge) => edge.dataset.from === nodeId || edge.dataset.to === nodeId);
    const directNeighborIds = new Set(
      directEdges.flatMap((edge) => [edge.dataset.from, edge.dataset.to]).filter((id) => id && id !== nodeId)
    );
    svg.querySelectorAll(".svg-state-target").forEach((item) => item.classList.add("is-dim"));
    svg.querySelectorAll(".svg-transition-target").forEach((edge) => edge.classList.add("is-dim"));
    node.classList.remove("is-dim");
    node.classList.add("is-highlight");
    directEdges.forEach((edge) => {
      edge.classList.remove("is-dim");
      edge.classList.add("is-context");
    });
    svg.querySelectorAll(".svg-state-target").forEach((item) => {
      if (item === node) return;
      if (directNeighborIds.has(item.dataset.node)) {
        item.classList.remove("is-dim");
        item.classList.add("is-context");
      }
    });
  }
  function renderStateDock() {
    const snapshot = actor.getSnapshot();
    const fixture = getFixture(snapshot, fixtures);
    const triple = getTriplet(snapshot);
    const currentScene = getScene(snapshot);
    const currentFixtureId = getCurrentFixtureId(snapshot);
    const currentVariant = getVariant(snapshot);
    const abstract = getAbstractSubstateByFixtureId(currentFixtureId);
    const actions = fixture.actions || [];
    document.getElementById("state-triplet").innerHTML = `
    <span class="triple-chip"><strong>input_state</strong><em>${triple?.input || "\u2014"}</em></span>
    <span class="triple-chip"><strong>container_state</strong><em>${triple?.container || "\u2014"}</em></span>
    <span class="triple-chip"><strong>session_state</strong><em>${triple?.session || "\u2014"}</em></span>
    <span class="triple-chip subtle"><strong>abstract_state</strong><em>${abstract.id}</em></span>
    <span class="triple-chip subtle"><strong>scene</strong><em>${currentScene}</em></span>
    <span class="triple-chip subtle"><strong>substate</strong><em>${currentFixtureId}</em></span>
    <span class="triple-chip subtle"><strong>variant</strong><em>${currentVariant}</em></span>
  `;
    document.getElementById("state-actions").innerHTML = actions.map(
      (action) => `<button class="dock-action" data-action-id="${action.actionId}" data-event-type="${action.event.type}" data-target-fixture="${action.targetFixtureId}">${action.label}</button>`
    ).join("");
    applyXStateSelection();
  }
  function applyDockLayout() {
    document.body.classList.toggle("is-dock-left", currentDockLayout === DOCK_LAYOUT_LEFT);
    document.querySelectorAll("#dock-layout-picker button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.dockLayout === currentDockLayout);
    });
  }
  function syncKeywordExpansionInteraction(action, fixtureId, candidate) {
    const preset = keywordExpansionPresets[fixtureId];
    if (!preset) return;
    const state = ensureKeywordExpansionUiState(fixtureId);
    const isSearchMode = !["keyword-multi", "keyword-anchor-seed", "url-keyword-seed"].includes(fixtureId);
    if (action === "open") {
      state.isOpen = true;
    } else if (action === "dismiss") {
      state.isOpen = false;
      state.selected = [];
    } else if (action === "toggle" && candidate) {
      state.isOpen = true;
      state.selected = state.selected.includes(candidate) ? state.selected.filter((item) => item !== candidate) : [...state.selected, candidate];
    } else if (action === "apply-one" && candidate) {
      state.isOpen = true;
      if (!state.applied.includes(candidate)) {
        state.applied = [...state.applied, candidate];
      }
      state.lastAppliedMode = isSearchMode ? "search" : "classic";
    } else if (action === "apply-selected") {
      state.isOpen = true;
      state.selected.forEach((item) => {
        if (!state.applied.includes(item)) {
          state.applied = [...state.applied, item];
        }
      });
      state.lastAppliedMode = isSearchMode ? "search" : "classic";
      state.selected = [];
    }
    rerenderAll();
  }
  function syncUiAfterActorChange({ rerenderShell = true } = {}) {
    const currentScene = getScene(actor.getSnapshot());
    document.querySelectorAll("#scene-picker button").forEach((node) => node.classList.toggle("is-active", node.dataset.scene === currentScene));
    renderSubstatePicker();
    renderSubstateGuide();
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      clearXStateFocus(svg);
    });
    if (rerenderShell) {
      rerenderAll();
    }
    renderXStateCharts();
    ensureDefaultPinnedStates(actor.getSnapshot());
    renderStateDock();
    syncPinnedStatesWithCurrentFixture(actor.getSnapshot());
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      applyPinnedFocus(svg);
    });
  }
  document.getElementById("scene-picker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-scene]");
    if (!button) return;
    const scene = button.dataset.scene;
    actor.send({
      type: "LOAD_FIXTURE",
      actionId: `A_NAV_SCENE__${normalizeActionToken(scene)}__01`,
      fixtureId: sceneMap[scene][0].id
    });
    syncUiAfterActorChange();
  });
  document.getElementById("substate-picker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-scenario]");
    if (!button) return;
    actor.send({
      type: "LOAD_FIXTURE",
      actionId: `A_NAV_SUBSTATE__${normalizeActionToken(button.dataset.scenario)}__01`,
      fixtureId: button.dataset.scenario
    });
    syncUiAfterActorChange();
  });
  document.getElementById("variant-picker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-variant]");
    if (!button) return;
    document.querySelectorAll("#variant-picker button").forEach((node) => node.classList.toggle("is-active", node === button));
    actor.send({ type: "SELECT_VARIANT", variant: button.dataset.variant });
    applyVariantVisibility();
    renderStateDock();
  });
  document.getElementById("dock-layout-picker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-dock-layout]");
    if (!button) return;
    currentDockLayout = button.dataset.dockLayout === DOCK_LAYOUT_LEFT ? DOCK_LAYOUT_LEFT : DOCK_LAYOUT_BOTTOM;
    try {
      localStorage.setItem(DOCK_LAYOUT_STORAGE_KEY, currentDockLayout);
    } catch {
    }
    applyDockLayout();
  });
  document.getElementById("xstate-scope-picker").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-xstate-scope]");
    if (!button) return;
    currentXStateScope = button.dataset.xstateScope === XSTATE_SCOPE_ALL ? XSTATE_SCOPE_ALL : XSTATE_SCOPE_SCENE;
    document.querySelectorAll("#xstate-scope-picker button").forEach((node) => {
      node.classList.toggle("is-active", node.dataset.xstateScope === currentXStateScope);
    });
    if (currentXStateScope === XSTATE_SCOPE_ALL) {
      document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
        pinnedStateBySvg.delete(svg);
        clearXStateFocus(svg);
      });
    }
    updateXStateScopeNote();
    renderXStateCharts();
    applyXStateSelection();
    ensureDefaultPinnedStates(actor.getSnapshot());
    document.querySelectorAll(".xstate-machine-svg").forEach((svg) => {
      applyPinnedFocus(svg);
    });
  });
  document.querySelector(".state-machine-panel").addEventListener("click", (event) => {
    const xstateTransition = event.target.closest(".xstate-transition-target");
    if (xstateTransition) {
      const svg2 = xstateTransition.closest("svg.machine-svg");
      const snapshot = actor.getSnapshot();
      const sample = resolveXStateEdgeSample(xstateTransition, snapshot);
      if (!sample?.targetFixtureId) return;
      const actionId = sample.actionId || `A_XSTATE_PATH__${normalizeActionToken(sample.fromFixtureId)}__${normalizeActionToken(sample.targetFixtureId)}__01`;
      const eventType = sample.eventType || "LOAD_FIXTURE";
      if (eventType === "LOAD_FIXTURE") {
        actor.send({
          type: "LOAD_FIXTURE",
          actionId,
          fixtureId: sample.targetFixtureId
        });
      } else {
        actor.send({
          type: eventType,
          actionId,
          targetFixtureId: sample.targetFixtureId
        });
        if (getCurrentFixtureId(actor.getSnapshot()) !== sample.targetFixtureId) {
          actor.send({
            type: "LOAD_FIXTURE",
            actionId: `${actionId}__FALLBACK`,
            fixtureId: sample.targetFixtureId
          });
        }
      }
      syncUiAfterActorChange();
      if (isPinnedLockEnabledForSvg(svg2)) {
        setPinnedState(svg2, { kind: "xstate", id: xstateTransition.dataset.to || "" });
      } else {
        clearPinnedState(svg2);
      }
      return;
    }
    const xstateNode = event.target.closest(".xstate-node");
    if (xstateNode) {
      const svg2 = xstateNode.closest("svg.machine-svg");
      const snapshot = actor.getSnapshot();
      const targetFixtureId = resolveXStateNodeFixtureId(xstateNode, snapshot);
      if (!targetFixtureId) return;
      actor.send({
        type: "LOAD_FIXTURE",
        actionId: `A_XSTATE_NODE__${normalizeActionToken(xstateNode.dataset.layer || "layer")}__${normalizeActionToken(xstateNode.dataset.state || "state")}__01`,
        fixtureId: targetFixtureId
      });
      syncUiAfterActorChange();
      if (isPinnedLockEnabledForSvg(svg2)) {
        setPinnedState(svg2, { kind: "xstate", id: xstateNode.dataset.state || "" });
      } else {
        clearPinnedState(svg2);
      }
      return;
    }
    const svg = event.target.closest("svg.machine-svg");
    if (svg) {
      clearPinnedState(svg);
    }
  });
  document.querySelector(".state-machine-panel").addEventListener("mouseover", (event) => {
    const xstateTransition = event.target.closest(".xstate-transition-target");
    if (xstateTransition) {
      focusXStateTransition(xstateTransition);
      return;
    }
    const xstateState = event.target.closest(".xstate-node");
    if (xstateState) {
      focusXStateState(xstateState);
      return;
    }
    const svg = event.target.closest("svg.machine-svg");
    if (svg) {
      restorePinnedOrClear(svg);
    }
  });
  document.querySelector(".state-machine-panel").addEventListener("mouseout", (event) => {
    const leaving = event.target.closest(".xstate-transition-target, .xstate-node");
    if (!leaving) return;
    const svg = leaving.closest("svg.machine-svg");
    if (!svg) return;
    const related = event.relatedTarget;
    if (related && leaving.contains(related)) return;
    const enteredSameSvgInteractive = related?.closest ? related.closest(".xstate-transition-target, .xstate-node") && related.closest("svg.machine-svg") === svg : false;
    if (enteredSameSvgInteractive) return;
    restorePinnedOrClear(svg);
  });
  document.querySelectorAll(".machine-svg").forEach((svg) => {
    svg.addEventListener("mouseleave", () => {
      restorePinnedOrClear(svg);
    });
  });
  document.getElementById("state-actions").addEventListener("click", (event) => {
    const button = event.target.closest(".dock-action");
    if (!button) return;
    actor.send({
      actionId: button.dataset.actionId,
      type: button.dataset.eventType,
      targetFixtureId: button.dataset.targetFixture
    });
    syncUiAfterActorChange();
  });
  document.querySelector(".compare-stack").addEventListener("click", (event) => {
    const expansionButton = event.target.closest("[data-expansion-action]");
    if (expansionButton) {
      syncKeywordExpansionInteraction(
        expansionButton.dataset.expansionAction,
        expansionButton.dataset.fixtureId,
        expansionButton.dataset.candidate
      );
      return;
    }
    const button = event.target.closest(".inline-hint-action");
    if (!button) return;
    actor.send({
      actionId: button.dataset.actionId,
      type: button.dataset.eventType,
      targetFixtureId: button.dataset.targetFixture
    });
    syncUiAfterActorChange();
  });
  document.getElementById("compare-toggle").addEventListener("click", () => {
    const section = document.getElementById("compare-section");
    const button = document.getElementById("compare-toggle");
    const expanded = section.classList.toggle("is-expanded");
    section.classList.toggle("is-collapsed", !expanded);
    button.setAttribute("aria-expanded", String(expanded));
    button.textContent = expanded ? "\u6536\u8D77" : "\u5C55\u5F00";
  });
  rerenderAll();
  applyVariantVisibility();
  renderSubstatePicker();
  renderSubstateGuide();
  initializeStateMachinePanel();
  applyDockLayout();
  renderStateDock();
})();
