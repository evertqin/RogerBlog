Title: Combine WCF, ASP.NET, SignalR for event broadcasting
Author: Ruogu Qin
Date: 07/25/2015
Tag: Technology
CSharp

Previously, I introduced a way to broadcast logging events from log4net. Today I'm taking it a step forward by enabling event broadcasting on website.

In traditional desktop applications, such as WinForms, events handling is quite a breeze -- For built in events like Timer.Elaspsed,  the only thing we need to do is to subscribe a delegate. However, when it comes to the web word, events handling is not that simple anymore. The reason is browser does not actively run and wait for events after the page is rendered, so there is no way to change the DOM except for by using frontend javascript. Also, regular ways to send data between frontend and backend, regardless whether it is a synchronized call or AJAX requires a series of actions, including open the socket, sending the request, process the request, send back response, close the socket. The whole process needs to open and close socket each time so it is not very efficient so it is ideal if we need real-time data.

Luckily, there is a great technology called [SignalR](http://www.asp.net/signalr) that makes the real-time communication between ASP.NET frontend and backend much easier. What I am going to show here contains three compoents:

***
#### Create dummy business logic
1. An assembly that mimic logging event generation from business logic.

2. A WCF service running in either interactive mode or as windows service. This is the backend service.

3. An ASP.NET website that calls the WCF service reference and receive logging events broadcasted all the way from the business logic.

Let's start by creating the dummy business logic.

1. Create an empty console application (we will change it to class library later but let's make it console application first for easier debugging)

  ![Create a Console Application]()

2. Add log4net through NuGet

3. Create EventAppender, BroadcastEventArgs and BroadcastEvetnService as introduced in my previous blog.

4. Make a new folder called "Configs" and add log4net_config.xml to that forlder, make sure for the line `<appender name="EventAppender" type="LogBroadcaster.Broadcast.EventAppender, LogBroadcaster">`, you use the correct classes. For the type attribute, the field before comma should be the full reference path to the EventAppender, the field after comma should be the assembly name containing the EventAppender.

5. Add a new folder called "Test" and add a new class "TestRunner"

  ~~~~~{.cs}
  using System;
  using System.Timers;
  using log4net;

  namespace LogBroadcaster.Test
  {
      /// <summary>
      /// This is a class to mimic events logged from business logic
      /// </summary>
      public class TestRunner
      {
          private static readonly ILog _log = LogManager.GetLogger(typeof (TestRunner));

          private Timer timer;

          public TestRunner()
          {
              timer = new Timer();
          }

          public void GeneratingRandomLog()
          {
              Random rand = new Random();
              double interval = rand.NextDouble()*10000;

              timer.Interval = interval;
              timer.Elapsed +=
                  (sender, eventArgs) =>
                  {
                      _log.Warn(string.Format("This is a test. Now timer is {0}", eventArgs.SignalTime));
                  };
              timer.Start();
          }
      }
  }

  ~~~~~~

6. Add the folloing code snippet to Main function:

  ~~~~{.cs}
  TestRunner testRunner = new TestRunner();
  testRunner.GeneratingRandomLog();

  Console.ReadKey();
  ~~~~
  Now run the project, and you should see some dummy log messages scrolling in the console

7. Change the project property to dll by changing Application -> Output type to "Class Library".

#### Create WCF Service and enabling asynchronous callback
