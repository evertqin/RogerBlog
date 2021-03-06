Title: Combine WCF, ASP.NET, SignalR for event broadcasting (2)
Author: Ruogu Qin
Date: 07/29/2015
Tag: Technology
     CSharp

#### Create ASP.NET website with SignalR

From [asp.net](http://www.asp.net/signalr/overview/getting-started/introduction-to-signalr), SignalR *"is a library for ASP.NET developers that simplifies the process of adding real-time web functionality to applications. Real-time web functionality is the ability to have server code push content to connected clients instantly as it becomes available, rather than having the server wait for a client to request new data."* with signalR, it is relatively easy to create a socket between frontend an backend so we can pass data bi-directionally.

* Create an empty website (File->New...->Web Site..-> ASP.NET Empty Web Site)

* Add SignalR through Nuget. Current version is 2.2.0 and the minimal required .NET framework is 4.5. You can open Nuget Package Manager Console and run `Install-Package Microsoft.AspNet.SignalR`. This will install all the dependencies.

* Start the WCF Service. Use the endpoint from the WCF service (net.tcp://localhost:8733/MyWcfService/), add it as a service Reference.

* Add Owin Startup class. Right Click project then Add...-> New Item... -> OWIN Startup class. You can name it Startup.cs. Add `app.MapSignalR();` into the function "Configuration" for now.

* Add Hub class. Hub class, by the name, is the place that all the clients are connecting to so they can exchange messages. To make sure out hub class can talk with both javascript frontend and WCF backend, we need to derive our class from Hub class and implements our IClientCallback. The full code:

~~~~{.cs}
public delegate void BroadcastEventhander(object sender, string message);

[CallbackBehavior(ConcurrencyMode = ConcurrencyMode.Reentrant, UseSynchronizationContext = false)]
public class StatusUpdateHandlerHub : Hub, IMyWcfServiceAsyncCallback
{
    public static event BroadcastEventhander BroadcastEvent;

    public void ListenToStatus()
    {
        if (BroadcastEvent == null)
        {
            BroadcastEvent += (sender, message) => { Clients.All.listenToStatus(message); };
        }
    }

    public void NotifyClient(string message)
    {
        if (BroadcastEvent != null)
        {
            BroadcastEvent(this, message);
        }
    }
}
~~~~


* Add or Replace the content of index.html with the following code:

~~~~{.html}
<!DOCTYPE html>
<html>
<head>
    <title>LogStatusBroadcast Simple Chat</title>
    <style type="text/css">
        .container {
            background-color: #99CCFF;
            border: thick solid #808080;
            padding: 20px;
            margin: 20px;
        }
    </style>
</head>
<body>
<div class="container">
    <span>Status: </span>
    <span id="statusDiv"></span>
</div>

<!--Script references. -->
<!--Reference the jQuery library. -->
<script src="Scripts/jquery-1.10.2.min.js"></script>
<!--Reference the SignalR library. -->
<script src="Scripts/jquery.signalR-2.2.0.min.js"></script>
<!--Reference the autogenerated SignalR hub script. -->
<script src="signalr/hubs"></script>
<!--Add script to update the page and send messages.-->
<script src="Scripts/broadcast.js"></script>
</body>
</html>
~~~~

  The actualy jQuery library may vary, double check your Scripts folder and use correct jQuery library.


* Add some logic to OWIN Startup class to mimic to following workflow: client first subscribe it to the service log broadcaster, then client explicitly call another service and get updates. Updated Startup.cs will look like this:

~~~~{.cs}
public class Startup
{
    private string DEFAULT_TCP_BINDING_ENDPOINT_NAME = "NetTcpBinding_IMyWcfService";
    private string DEFAULT_TCP_ASYNC_BINDING_ENDPOINT_NAME = "NetTcpBinding_IMyWcfServiceAsync";

    private MyWcfServiceClient _mywcfServiceClient;
    private MyWcfServiceAsyncClient _myWcfServiceAsyncClient;
    private StatusUpdateHandlerHub _statusUpdateHanderHub;


    public MyWcfServiceClient MyWcfServiceClient
    {
        get
        {
            if (_mywcfServiceClient == null)
            {
                _mywcfServiceClient = new MyWcfServiceClient(DEFAULT_TCP_BINDING_ENDPOINT_NAME);
            }

            if (_mywcfServiceClient.State == System.ServiceModel.CommunicationState.Closed)
            {
                _mywcfServiceClient.Open();
            }
            return _mywcfServiceClient;
        }
    }

    public MyWcfServiceAsyncClient MyWcfServiceAsyncClient
    {
        get
        {
            if (_myWcfServiceAsyncClient == null)
            {
                InstanceContext instanceContext = new InstanceContext(StatusUpdateHandlerHub);
                _myWcfServiceAsyncClient = new MyWcfServiceAsyncClient(instanceContext);
            }

            if (_myWcfServiceAsyncClient.State == CommunicationState.Closed)
            {
                _myWcfServiceAsyncClient.Open();
            }

            return _myWcfServiceAsyncClient;
        }
    }

    public StatusUpdateHandlerHub StatusUpdateHandlerHub
    {
        get { return _statusUpdateHanderHub ?? (_statusUpdateHanderHub = new StatusUpdateHandlerHub()); }
    }


    public void Configuration(IAppBuilder app)
    {

        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
        app.MapSignalR();
        MyWcfServiceAsyncClient.ListenToEvents();

        MyWcfServiceClient.DoWork();

    }
}
~~~~

* Add broadcast.js under Scripts with the following content:

~~~~{.js}
$(function() {
  var anaHub = $.connection.statusUpdateHandlerHub; // this is always the class name with the first letter lower case

  anaHub.client.listenToStatus = function(message) {
      $("#statusDiv").html(message);
  };
  $.connection.hub.start().done(function() {
      anaHub.server.listenToStatus(); // similarly, this is the function name in the hub with the first letter lowered
  });
});
~~~~

Explanation: We first get a object of the hub by calling $.connection.{hubname}. Then we add a listenToStatus function to the clients. So we can invoke this from backend `Clients.All.listenToStatus(message);`  

From the client, we also call the server function `listenToStatus` which is also defined in the Hub class `public void ListenToStatus() {...}`

![Complete SignalR Project](/home/ruogu/Pictures/SignalR/signalR_asp_net.png)

Run the program, you should be able to see the ticking time now!

![Ticking Timer](/home/ruogu/Pictures/SignalR/final_result.png)

Source code can be found on [GitHub](https://github.com/evertqin/DotNetDemos/tree/master/SignalR_ASP_WCF)
