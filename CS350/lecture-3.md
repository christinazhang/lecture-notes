# Lecture 3
September 14, 2017

## What causes context switches?
* `thread_yield` voluntarily allows other threads to run
* `thread exit` terminates the running thread
* `wchan_sleep` *blocks* the running thread
* The thread is *preempted* running thread stops involuntarily
  * For belligerent threads

`thread_switch` calls `switchframe_switch`

## Thread states:
(Slide 18)
* Running: currently executing
* Ready: ready to execute
* Blocked: waiting for something (a resource). When another thread discovers that resource is ready, it will switch that thread to ready.

We can store a list of all the threads that are ready in the kernel, so then we can know what we can switch to.

A thread will spend most of its time between running and ready. `thread_switch` finds threads in the ready state.

## Preemption
Some threads could run forever, so *preemption* forces a running thread to stop running, so that another thread can have a chance.

To do this, we need to use *interrupts* so the thread library can "have control"

Interrupts: an event that occurs during the execution of a program, usually caused by hardware like a timer or disk controller.

Hardware transfers control to a place in memory, which executes the interrupt handler.

This is hard to predict because this could happen at any time!

### Interrupt Handlers
1. Creates a trap frame to remember thread context (like switch-frame switch)
2. Determines which device caused interrupt and performs device-specific processing
2. Restores the context and resumes execution

### Preemptive Scheduling
* A timer that imposes a limit on how long the thread can run before being preempted (*scheduling quantum*)
  * Calls `thread_yield`
  * Preempted thread goes from running to ready, and placed at the back of the ready queue
	  * Called "round-robin" scheduling

## Synchronization
* *Critical section* - section when a shared object is called in a concurrent program
* What happens if several threads try to access the same global variable/heap object at the same time?