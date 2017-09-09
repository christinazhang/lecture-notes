# Lecture 1
September 7, 2017

## Grading Scheme
* Assignments: 35%
* Midterm: 20%
* Final: 45%
* Fail exams, fail the course

## What is an operating system?

Services provided to applications so that they don't have to worry about how different each computer is.

Three views:
1. Application view: what services does it provide?

	* Execution environment - the "convenient lie" for the application
	* Gives processor time, memory, and resources for the application to run
	* Interfaces through which a program can use networks, storage, IO devices, etc.
		* A simplified, abstract view of hardware
	* Also restricts programs from accessing things it's not supposed to, isolating them from one another

2. System view: what problems does it solve?

	* Manages hardware resources: processors, memory, disks, storage devices, etc.
	* Allocates resources among running programs
	* Also uses resources, which it shares with the other programs

3. Implementation view: how is it built?

	* OS is **concurrent**, **real-time** program
		* Concurrency: doing things on the side
		* Real-time: it has deadlines
			* e.g. 60fps monitor, must give a frame every 1/60 seconds
	* Concurrency arises naturally in an OS when it supports concurrent applications, because it interacts directly with hardware
	* Interacting with the hardware has timing constraints

 ## The Operating System and the Kernel

**Kernel - ** the operating system kernel is the part of the operating system that responds to system calls, interrupts (hardware), and exceptions (segfaults, etc).
**Operating system - ** the operating system as a whole, including the kernel and other related programs that provide services for applications, e.g:
* utility programs
* command interpreters
* programming libraries

* Programs live in user space, where they can make system calls and nothing else
* Kernel commands hardware for data
* Hardware interrupts the kernel with data

## Operating System Abstractions
Execution environment includes abstract entities that can be manipulated by a program, such as
* Files and file systems: storage
* Address spaces: primary memory
* Processes, threads: program execution
	* Each thread tells you how much time you get on the CPU
	* If you have 4 cores and 10 threads, it get shares between the 4 cores
* Sockets, pipes: network and message channels

# Threads and Concurrency
## What is a thread?
* Threads are a way for programmers to express *concurrency*
* A sequential program consists of a single thread of execution
* Threaded concurrent programs have multiple threads at the same time

##OS/161 Threaded Concurrency Examples
Key ideas:
* Threads can create new threads using `thread_fork`
* Start execution in a function parameter to `thread_fork`
* Original and new proceed concurrently
* All threads share global variables and heap
* Function activations are private

