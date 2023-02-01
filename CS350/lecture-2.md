# Lecture 2
September 12, 2017

## Why Threads?
* Parallel execution! Programs will run faster
* Enables better processor utilization
	* If one thread blocks (thread is waiting for data), another is able to run

**Review from CS241: Fetch/Execute Cycle**
1. Fetch instruction PC points to
2. Decode and execute instruction (AKA magic!)
3. Advance program counter

See `kern/arch/mips/include/kernregdefs.h` for MIPS registers

**The Stack**

Stack grows down, data grows up

**What's local and what's global between threads?**
* Every thread gets its own bank of registers, and its own stack (local)
	* Stored on its own CPU
* Global state is shared between threads

### Implementing Concurrent Threads

* Option 1: multiple processors, multiple cores, hardware multithreading per core
	* P processors, C cores per processor, M multithreading degree per core **P x C x M** threads can execute *simultaneously*
	* Separate register set for each running thread, to hold its execution context
* Option 2: timesharing
	* Multiple threads take turns on the *same* hardware
	* rapidly switch from thread to thread
	* "good enough"

Use GDB for debugging!

#### Timesharing and Context Switches

 * The switch from one thread to another is called a *context switch*
 * What happens during a context switch:
 	1. Decide which thread will run next (scheduling)
 	2. Save register contents of current thread
 	3. Load register contents of next thread
* Thread must be saved/restored carefully!! Thread execution changes context!

(See slides 13 and 14 for code)